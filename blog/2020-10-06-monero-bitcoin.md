---
title: "Monero-Bitcoin Atomic Swap"
author: lucas
author_url: https://github.com/luckysori
author_image_url: https://avatars3.githubusercontent.com/u/9418575
tags: [monero,bitcoin,atomic,swap,adaptor,scriptless]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Over half a year ago we proved that [Grin-Bitcoin atomic swaps were possible](https://github.com/comit-network/grin-btc-poc) and now we're back to show you how it can be done for the [monero-bitcoin pair](https://github.com/comit-network/xmr-btc-swap).
In our effort to connect all the blockchains without adding yet another, we have turned our attentions to Monero.
Similar to Grin, Monero is a public ledger in which the source, destination and amount of a transaction remain hidden to observers.

The team has been interested in Monero for a long time, but until recently we assumed that atomic swaps involving it were unfeasible due to its lack of support for timelocks. <!--truncate-->
It was only through a presentation by Joël Gugger (a.k.a. [h4sh3d](https://github.com/h4sh3d/)) at [36C3](https://www.youtube.com/watch?v=G-v6hDnzpds&ab_channel=MoneroCommunityWorkgroup) that we learnt that atomic swaps can be realised using timelocks on only one of the two chains.

Nevertheless, Monero still presented a couple of challenges in terms of locking coins. In particular:

1. Monero lacks a scripting language altogether, meaning that the usual mechanism of hashlocks is unavailable.
2. Monero uses edwards25519 elliptic curve for its keypair generation, which limits our ability to use [adaptor signatures](https://github.com/LLFourn/one-time-VES/blob/master/main.pdf) with blockchains such as Bitcoin and Ethereum, which use a different curve.

Overcoming the first challenge would require a complete redesign of Monero, but the second can be dealt with some nifty cryptography, as is referenced in Joël's recently published [Bitcoin-Monero Cross-chain Atomic Swap paper](https://eprint.iacr.org/2020/1126.pdf).

## Protocol

At first we considered implementing the protocol as proposed by Joël, but we saw opportunities to simplify it, so we designed an alternate version.
One of the changes aimed to reduce the number of transactions on Bitcoin by one.
Thankfully, Joël and his team were kind enough to point out that we had introduced a race condition between the redeem and refund paths, caused by the non-instant finality of transactions on Bitcoin (and most other blockchains).

Reverting said change left us with a largely similar protocol with some key differences:

1. Simple 2-of-2 multisig scripts for all Bitcoin transactions.
2. Transaction-level timelocks.
3. An alternative approach to the DLEQ proof required to ensure that the correct keys are revealed when redeeming and refunding bitcoin.

With (1) and (2) we wanted to make the Bitcoin scripts as simple as possible, to uphold the privacy properties of Monero.
A 2-of-2 multisig is commonplace on Bitcoin, so it does not necessarily indicate that an atomic swap is taking place.
The third point will be discussed after the protocol has been properly discussed in the next section.

### Notation and terminology

- When referring to secret keys we use lowercase e.g. `x`; when referring to public keys we use uppercase e.g. `X`.
- We refer to Alice as the party that holds monero and wants bitcoin in exchange; we refer to Bob as the party that holds bitcoin and wants monero in exchange.

### Assumptions

We assume that Alice and Bob have exchanged a set of parameters before performing the protocol, namely:

- the amounts being exchanged; and
- the values of the absolute timelocks used for two of the Bitcoin transactions, `t_1` and `t_2`, where `t_2 > t_1`.

We also assume that parties have a means of communicating with each other during the protocol.

### Long story short

In the best-case scenario the protocol looks like this:

1. Alice and Bob exchange a set of addresses, keys, zero-knowledge proofs and signatures.
2. Bob publishes `Tx_lock`, locking up his bitcoin in a 2-of-2 multisig output owned by Alice and Bob.
Given the information exchanged in step 1, Bob can refund his bitcoin if he waits until time `t_1` by using `Tx_cancel` and `Tx_refund`.
If Bob doesn't refund after time `t_1`, Alice can punish Bob for being inactive by first publishing `Tx_cancel` and, after `t_2`, spending the output using `Tx_punish`.
3. Alice sees that Bob has locked up the bitcoin, so she publishes `Tx_lock` on the Monero blockchain, locking up her monero in an output which can only be spent with a secret key owned by Alice (`s_a`) *and* a secret key owned by Bob (`s_b`).
This means that neither of them can actually spend this output unless they learn the secret key of the other party.
4. Bob sees that Alice has locked up the monero, so he now sends Alice a missing key bit of information which will allow Alice to redeem the bitcoin using `Tx_redeem`.
5. Alice uses this information to spend the bitcoin to an address owned by her.
When doing so she leaks her Monero secret key `s_a` to Bob through the magic of adaptor signatures.
6. Bob sees Alice's `Tx_redeem` on Bitcoin, extracts Alice's secret key from it and combines it with his own to spend the monero to an address of his own.

<img alt="BTC/XMR Atomic Swap Protocol" src={useBaseUrl('blog/assets/images/2020-10/BTC_XMR_atomic_swap_protocol.svg')} />

### Unabridged

#### Address exchange

Alice and Bob ask their Bitcoin wallets for an address: `address_a` and `address_b` respectively.
These will be used as outputs for transactions paying to Alice and Bob.
They share their address with the other party.

#### Key exchange

- Both parties generate Bitcoin secret keys: `a` and `b` respectively.
These will be the keys which, when combined, will give ownership of the output where Bob will lock up his bitcoin.
They share the corresponding public keys `A` and `B` with each other.
- They will also generate two Monero secret keys each: `(s_a, v_a)` and `(s_b, v_b)` respectively, with `s`'s denoting [spend keys](https://web.getmonero.org/resources/moneropedia/spendkey.html) and `v`'s denoting [view keys](https://web.getmonero.org/resources/moneropedia/viewkey.html).
Alice will eventually lock up her monero in a shared output `(S_a + S_b, V_a + V_b)`, constructed using the corresponding public keys.

In order to allow both parties to see payments to that shared output, the secret view keys `v_a` and `v_b` are exchanged directly.

The parties will also exchange the Monero public spend keys `S_a` and `S_b`.

Only someone with knowledge of both `s_a + s_b` will be able to spend the shared output.

#### Interoperability between secp256k1 and edwards25519

As mentioned in the introduction, Bitcoin and Monero use different elliptic curves for their key generation.
As a result, a keypair on one chain generally does not even exist on the other chain.
This means that if we were to naively leak a secret key `x` using an adaptor signature on its public key `X` on one chain, we would have no idea what that secret key's corresponding public key `Y` would be on the other chain, making it pretty much useless.

But what if before leaking anything we could prove to the other party that `X` and `Y` actually do share the same secret key `x` (the same bytes, just a very large integer), without revealing its value?
Joël's protocol also made us aware of this possibility.
In his proposal, he includes a proof of this kind, described by Sarang Noether [in this technical note](https://web.getmonero.org/es/resources/research-lab/pubs/MRL-0010.pdf).

Attaching such a proof to an adaptor signature can serve as proof that leaking the secret key on one chain actually has a predictable meaning on the other chain i.e. it is the revelation of a secret key for a known public key.

With this key insight we can continue with the protocol.

#### Proving knowledge in zero-knowledge

With the information exchanged thus far Bob could not yet construct an adaptor signature which when decrypted and used by Alice would leak to him `s_a`, because, as mentioned in the previous section, there is no mapping between `S_a^monero` and the Bitcoin public key `S_a^bitcoin` which would result from using `s_a` as a Bitcoin secret key.

But as we also learnt in the previous section, if Alice generates a Bitcoin public key `S_a^bitcoin` from `s_a` and constructs a zero-knowledge proof of the secret key for `S_a^bitcoin` and `S_a^monero` being the same and shares this information with Bob, then Bob can in fact construct an adaptor signature on `S_a^bitcoin` which when decrypted and used by Alice will leak to him `s_a`, which he can add to `s_b` to spend an output with public spend key `S_a + S_b`.

So Alice does just that.
And Bob does something analogous with his secret spend key `s_b`, as that one should be leaked to Alice if he ever refunds his bitcoin, to allow her to refund her monero too.
He generates a Bitcoin public key `S_b^bitcoin` to go along with his previously sent `S_b^monero` and constructs a zero-knowledge proof showing that they both correspond to the same secret key `s_b`.

It may be obvious but each party must verify the proof provided by the other!

#### Bob constructs Bitcoin lock transaction

In order to allow Alice to sign Bitcoin transactions based on the shared output on `A` and `B`, Bob constructs `Tx_lock` with the help of his wallet (e.g. using bitcoind's wallet API [fundrawtransaction](https://bitcoincore.org/en/doc/0.19.0/rpc/rawtransactions/fundrawtransaction/)) and shares it with Alice, unsigned.

#### Signing worse-case scenario Bitcoin transactions
In an ideal world, one wouldn't need to worry about refund and punish transactions, but in that case one wouldn't need atomic swaps in the first place.
In the real world, we need a mechanism to incentivise the swap to take place as soon as Bob commits money on the blockchain; and a mechanism to ensure that both parties have sufficient time to refund if they so desire.

To that end, parties are now ready to produce and exchange signatures and adaptor signatures for a set of Bitcoin transactions.
Specifically:

- Alice and Bob both sign `Tx_cancel` which if published would see the shared output of the Bitcoin `Tx_lock` be spent to another output with the same spend condition of a 2-of-2 multisig `(A, B)`.
They construct this transaction in such a way that it may only be included in the blockchain at time `> t_1`.
This transaction can be used by either party as a mechanism to make the redeem impossible and lock the protocol in a state where only the refund and punish paths can be activated.
- Alice constructs and shares with Both an adaptor signature on `Tx_refund` spending from the output of `Tx_cancel` to `address_b`.
She constructs it in such a way that if Bob ever decides to refund, he will need to decrypt it using his Monero spend key `s_b`, leaking it to her when publishing the transaction to the refund blockchain.
This transaction does not need to be timelocked, because it depends on the publication of `Tx_cancel`, which already depends on time being `> t_1`.
- Bob signs a punish transaction spending from `Tx_cancel` output to `address_a`, but which can only be published at time `t_2`.
He shares this with Alice, to allow her to punish him by taking the bitcoin in exchange for nothing, in the case that Bob remains inactive for too long.
This transaction exists to prevent a situation where both Alice and Bob have locked up their coins, but Bob never shares the necessary adaptor signature for Alice to redeem the bitcoin, nor does he refund it himself.
Without this transaction, Alice could be unfairly punished for Bob's inactivity, with the money on both chains being locked up indefinitely.
With this transaction, Alice can deal with Bob's possible reckless behaviour and Bob is incentivised to act at least before time `t_2`.

#### Going on-chain

With Alice's `Tx_cancel` signature and `Tx_refund` encrypted signature, Bob can now safely lock up his bitcoin using the lock transaction he constructed before.
This is because he will be able to refund if Alice stops cooperating.

To do so, he asks his Bitcoin wallet to sign `Tx_lock` and broadcasts it to the network.
Alice will eventually see that the transaction has been included in a block, and may wait some extra time to see her desired number of confirmation on that transaction.

Alice can now lock up her monero, because she is safe knowing that she will be able to refund if Bob refunds, and that she will be able to just take the bitcoin if Bob never acts again.
Alice uses her Monero wallet to transfer the agreed upon monero to the output `(S_a + S_b, V_a + V_b)`.
Bob will be able to see that this has taken place, because he knows `S_a`, `S_b`, `V_a` and `V_b`, and also `v_a` and `v_b`, granting him the ability to see transactions paying to that output.
If he verifies that the amount of monero is correct and the transaction has enough confirmations, he can proceed with the protocol.

#### One last signature

The current situation allows both parties to abort without any further cooperation, but Alice does not yet have a way to take Bob's bitcoin (unless she waits for `t_2` and Bob hasn't refunded).
Had she had a way to do so before having committed anything on the Monero blockchain, she could have left Bob empty-handed.
Only now can Bob safely share with Alice the adaptor signature with his Bitcoin secret key `b` encrypted on Alice's public key `S_a^bitcoin` of `Tx_redeem` spending from the shared output of the Bitcoin `Tx_lock` to `address_a`.

Alice can decrypt this adaptor signature into a valid signature on `B`, which she can use in combination with her own signature on `A` to publish the Bitcoin `Tx_redeem`.
Bob just has to monitor the Bitcoin blockchain for `Tx_redeem` and learn Alice's Monero spend secret key `s_a`, leaked to him thanks to the power of adaptor signatures.

With control of `s_a` and `s_b`, Bob is the sole owner of the Monero output.
He does not even need to redeem this to an address provided by his wallet.
He may simply import this key to an existing wallet or generate a new wallet altogether.

### Our approach to the cross-curve DLEQ proof

Armed with the knowledge that one can prove in zero-knowledge that a key revealed on one chain (e.g. Bitcoin for this protocol) is the secret key corresponding to a known public key in another (e.g. Monero for this protocol), we set out to evaluate the specific protocol proposed in Sarang's technical note.

Given our unfamiliarity with ring signatures, a construct central to the protocol, and the apparent lack of an implementation in Rust, our programming language of choice, our ex-colleague Lloyd Fournier advised us to instead [turn to the textbook for answers](https://www.win.tue.nl/~berry/CryptographicProtocols/LectureNotes.pdf)

Lloyd proposed an equivalent proof based on the well-defined composition of sigma protocols.
In short, for every bit of the secret key, one can prove that said bit is either equal to 0 for the Bitcoin public key **and** the Monero public key, *or* equal to 1 for the Bitcoin public key **and** the Monero public key.

For more details on this, check out [the source code of our experimental implementation of this cross-curve DLEQ proof protocol](https://github.com/comit-network/cross-curve-dleq).

## Just show me the code

Having explained how we think this can work, it is time to show you what we've done.
Over the last couple of weeks, part of the team has been working on a [proof-of-concept pure-Rust implementation](https://github.com/comit-network/xmr-btc-swap) of this protocol.
Using cryptographic libraries such as [curve25519-dalek](https://github.com/dalek-cryptography/curve25519-dalek) and [secp256kFUN!](https://github.com/LLFourn/secp256kfun/), together with the aforementioned [cross-curve DLEQ proof library](https://github.com/comit-network/cross-curve-dleq), we have built a library which can be used to atomically swap monero and bitcoin.
We must emphasise that a considerable part of the cryptography used has not been audited or thoroughly reviewed yet, so we recommend anyone curious to use this library to only use it with as much real money as they are willing to risk losing.

## What's next

With the publication of this post marking the end of this project, we asked ourselves what we could do next.
Here are some possibilities:

- Building an experimental peer-to-peer application so that people can use it to trade test coins or small amounts of real coins.
- Extend our recent [implementation](https://github.com/comit-network/thor) of [generalised Bitcoin-compatible channels](https://eprint.iacr.org/2020/476.pdf) with support for atomic swaps between monero and off-chain bitcoin.
- Move on to a different cryptocurrency pair altogether, and possibly apply some of the learnings garnered during this project.

In any case, we will likely get to all of those at some point in the future.
For the time being, we encourage you to send us feedback, either in the form of a [ticket](https://github.com/comit-network/xmr-btc-swap/issues/new) or as an email to [our public mailing list](https://lists.comit.network/mailman/listinfo/comit-dev).
Thank you for reading!

## References

- Joël Gugger. Bitcoin-Monero Cross-chain Atomic Swap. https://eprint.iacr.org/2020/1126.pdf
- Ruben Somsen. Succint Atomic Swaps. https://gist.github.com/RubenSomsen/8853a66a64825716f51b409be528355f
- Sarang Noether. Technical Note MRL-0010. https://web.getmonero.org/es/resources/research-lab/pubs/MRL-0010.pdf
- Lloyd Fournier. One-Time Verifiably Encrypted Signatures. https://github.com/LLFourn/one-time-VES/blob/master/main.pdf
