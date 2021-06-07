---
title: "How to build a Monero transaction"
author: lucas
author_url: https://github.com/luckysori
author_image_url: https://avatars3.githubusercontent.com/u/9418575
tags: [monero]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Here's another post on one of our favourite privacy coins.
This time we will take a look at the technical details of Monero transactions.
Most of you will know that Monero transactions are confidential in terms of amounts and ownership of outputs, but here we'll explain what makes this work.

<!--truncate-->

Our motivation to take a deep dive into the inner works of Monero transactions stems from a desire to have direct control of how they are constructed and signed.
There are two ways in which we would benefit from this:

1. Our [swap tool](https://github.com/comit-network/xmr-btc-swap/) based on ["Bitcoin-Monero Cross-chain Atomic Swap"](https://eprint.iacr.org/2020/1126.pdf) currently relies on `monero-wallet-rpc` to build the spend transactions, which prevents us from running the swap in the browser.
2. Our ["Monero moves first" atomic swap protocol](https://arxiv.org/pdf/2101.12332.pdf) uses CLSAG adaptor signatures, which can only be constructed with direct control over how transactions are built and signed.

## Anatomy of a Monero transaction

In this section we will focus on Monero transactions of type `5` (`CLSAG`), which is the new transaction type since fork version 13.
Monero changes at a relatively high speed compared to other cryptocurrencies such as Bitcoin, so some of this information may become outdated after the next few planned hard forks.

### Overview

Before we delve into the details, let's consider what a Monero transaction does at a high level.
A transaction has to prove:

- ownership of its inputs without revealing their exact identity;
- that the inputs of the transaction have not been spent before i.e. prevent _double-spending_;
- that inputs and outputs balance out; and
- that output amounts are non-negative.

Respectively, it does so by including:

- a ring signature per input;
- a unique key image for every real input of the transaction;
- Pedersen commitments for every input and output;
- Bulletproofs for the outputs.

### Transaction prefix

The transaction prefix is the main part of the transaction, as it includes all the possible inputs and all the outputs.

#### Version

This indicates the mechanism through which output amounts are hidden.
Nowadays this value is set to `2`, which corresponds to Ring Confidential Transactions (RingCT).

#### Unlock time aka `unlock_time`

It is easy to confuse this field with Bitcoin's `nLocktime`, but there are subtle differences.
Where `nLocktime` prevents a Bitcoin transaction from being included in a block before a certain time, the value of `unlock_time` just determines how long all recipients of the outputs of a Monero transaction will have to wait until they can spend them.

#### Inputs aka `vin`

##### Amount

This is a legacy field and is always set to `0`.
Amount confidentiality used to be opt-in, but it is mandatory as of fork version 6.

##### Key offsets

Where the coins may come from for a particular transaction input.
The key word is _may_.
We include a set of 11 possible outputs for each input, but only one of them is the actual source.
This makes it almost impossible for an uninvolved onlooker draw relationships between transactions.

We refer to the remaining 10 outputs as _decoy_ outputs.
To be effective decoys, the actual output must fit seamlessly into the set of decoys.
In other words, it must not be possible to identify the real output through statistical analysis.

Monero performs some sanity checks in regards to how the key offsets are chosen.
For example, the median of all key offsets must be within [the last 40%](https://github.com/monero-project/monero/blob/ffe7165ebfbb805b3bba57de8cb3f14d0b3411a0/src/cryptonote_core/tx_sanity_check.cpp#L95-L99) of all outputs.

Ultimately though, it is the responsibility of a wallet implementation to chose key offsets in a way that resemble a typical spending pattern as close as possible.

##### Key image

Out of the 11 possible outputs corresponding to the ring of key offsets, only one is a real input to this transaction.
To ensure that a particular output can only be used once as an input, Monero includes a key image of the output's public key.
Since key images are unique, if a key image appears for a second time on the blockchain, nodes can safely reject the transaction as it represents a double-spend attempt.

The key image effectively commits to the real output's public key.
It doesn't reveal which one of the elements of the ring it corresponds to because it makes use of a one-way function.
In particular, a key image is computed as `x * H_p(X)`, where `x` is the secret key, `X` the public key and `H_p` a [specific Monero hash function](https://github.com/monero-project/monero/blob/b1873af51931410390d5db8b4590970c0a6e9d0e/src/ringct/rctOps.cpp#L653-L661) which takes one public key and produces another public key.

#### Outputs aka `vout`

Since fork version 12, transactions must have more than one output.
Transactions that do not comply will be rejected by the network.
Most transactions naturally have two outputs, the second one being the change output.
Enforcing at least two outputs for all transactions makes it more likely for transactions to be indistinguishable.

Fortunately, upholding this rule is as easy as adding a 0 amount[^1] output to single-output transactions.

##### Amount

Outputs, much like inputs, are always confidential, so this is always set to `0` since fork version 6.

##### Target

The public key of the output.
Only someone with knowledge of the corresponding secret key will be able to spend it.

Given what we learnt about key images above, address (public key) reuse does not seem like a good idea.
Instead, Monero introduces the concept of one-time addresses[^2].
These are derived from the recipient's public spend key and public view key[^3], the output index on the transaction and a random, one-time secret key.

More specifically, the one-time address is computed as `X' = H_n(r * 8 * X_v || n) * G + X_s`, where `H_n` is the hash function `Keccak256`[^4]; `r` is the one-time secret key; `X_v` is the recipient's public view key; `n` is the output index; `G` is the generator of Monero's elliptic curve; and `X_s` is the recipient's public spend key.

Therefore, the one-time address `X'` goes on the `target` field.
In order to spend it, the recipient cannot just simply use their spend key `X_s`.
They can instead compute the corresponding one-time spend key `x' = H_n(R * 8 * x_v || n) + x_s`, where `R` is the public key corresponding to `r`; `x_v` is the secret view key; and `x_s` is the secret spend key.
Because the recipient may not know `R`, since `r` is commonly generated by the sender of the transaction, the value of `R` is stored in the `extra` field of the transaction prefix.

#### Extra

Like the name suggests, this field holds extra information for the transaction.
It is usually occupied by the output `R` values discussed above.
More frequently, there is a single common `R` value for all transaction outputs, referred to as the _transaction public key_.

Additionally, the extra field can include miner-specific data as well as payment IDs used by wallets.

### Signatures

The transaction prefix needs to be complemented with a number of cryptographic proofs and data which will allow verifiers to ascertain that the confidential transaction is valid.

#### RingCT signatures aka `rct_signatures`

##### Type aka `rct_type`

The type of signing data that is included with this transaction.
As mentioned previously, transaction type `CLSAG` has been active since fork version 13, and it is the only valid type since fork version 14.
Consequently, the value for this field is currently always `5`.

##### Fee aka `txn_fee`

The transaction fee.
Contrary to the other transaction outputs, the fee is explicit.

##### Pseudo outputs aka `pseudo_outs`

This field remains _empty_ in the current version of Monero.
It is homonimous to another one which is part of the prunable signature data.

##### Output Pedersen commitments aka `out_pk`

Array of Pedersen commitments, one per transaction output.
These commitments are of the form `y * G + b * H`, where `y` is a secret blinding factor; `G` is the generator of Monero's elliptic curve; `b` is the output amount; and `H` is an alternate generator of Monero's elliptic curve[^5].

Pedersen commitments simultaneously commit to and hide values.
These are accompanied by rangeproofs which demonstrate that the hidden amounts are not negative.
Rangeproofs can be found in the prunable part of the signature data.

Blinding factors are not generated randomly.
Instead, they are generated in a similar way to how the one-time addresses are derived:
`y = H_n("commitment_mask" || H_n(R * 8 * x_v || n))`.

##### Amount commitments aka `ecdh_info`

Since signature type `CLSAG`, this field only contains the obscured amounts for all the outputs of the transaction.

It may come as a surprise that there exists another commitment per transaction output.
This second commitment is specifically designed to allow holders of the secret view key to see the output amounts of the transaction.

The amount commitment is of the form `b XOR_8 H_n("amount", H_n(R * 8 * x_v || n))`, where `b` is the output amount; `XOR_8` is an XOR operation between the first 8 bytes of each operand; and `H_n(R * 8 * x_v || n)` is the same secret key used to derive the one-time address (and the Pedersen blinding factor!) for the output.

Anyone with knowledge of the secret view key `x_v` can therefore compute `H_n("amount", H_n(R * 8 * x_v || n))` by extracting the transaction public key `R` from the extra field and using the output index `n`.
Performing the `XOR_8` operation on this recomputed value and the amount commitment reveals the original amount.

#### Prunable signature data aka `rctsig_prunable`

This part of the transaction can be safely removed and forgotten from the blockchain after enough blocks have been mined after its inclusion.

##### Bulletproofs

This is a type of rangeproof based on the [Bulletproofs paper](https://eprint.iacr.org/2017/1066.pdf).
Rangeproofs are used to ensure that transactions do not create (or destroy) coins, by demonstrating that all outputs are within a valid range.
Without rangeproofs, since Monero transaction outputs are confidential, a malicious party could for example overspend an input by creating one output paying a large sum to themself and another output with a _negative_ amount[^6] in order to balance out the transaction.
This would obviously be nonsensical and break Monero, but mathematically it would check out.

Monero's implementation of Bulletproofs is very similar to the original paper.
Given the complexity of the topic and the [wealth](https://tlu.tarilabs.com/preface/learning/bulletproofs.html) [of](https://github.com/dalek-cryptography/bulletproofs) [resources](https://github.com/monero-project/monero/blob/v0.17.2.0/src/ringct/bulletproofs.cc#L489-L777) on it, here we will focus on the things that make Monero's implementation special.

###### Multiplying things by 8

We cannot speak to the purpose of this, because it is not documented, but there are several instances in which Monero's bulletproof generation algorithm diverges from the original specification by multiplying certain terms by `8` or the modular inverse of `8`.

For example, the Pedersen commitments for the outputs are actually computed internally as `y * INV_EIGHT * G + b * INV_EIGHT * H`. They are used within the bulletproof generation algorithm as such, and are later on adjusted via multiplication by `8` to be used normally in the signing algorithm and the transaction body.

There are too many instances of this to document here, so we instead invite the interested reader to check out our [Rust implementation of Monero's bulletproof](https://github.com/comit-network/monero-rs/blob/b41ae9c32cb435a0f0c8e03f450dd248507c43b5/src/bulletproof/mod.rs).
It is a fork of [`dalek-cryptography/bulletproofs`](https://github.com/dalek-cryptography/bulletproofs) and currently resides in our fork of `monero-rs`, which we will attempt to merge back into the original repository in the future.

###### Bulletproof generators

The algorithm requires the generation of `2 * m * n` elliptic curve generators, where `m` is the number of amounts to hide in a single proof and `n` the maximum number of bits for the amount.
Monero sets `m = 16` and `n = 64`, for a total of `2 * 1024 = 2048` generators.
The number of generators actually used depends on the number of outputs in the transaction.

These generators are deterministically computed and are always the same for any bulletproof to be produced.
The algorithm to generate them looks like this

```
for (i=0; i<n*m; i++) {
    Gi[i] = H_p(H_compressed || "bulletproof" || VarInt(i*2+1));
    Hi[i] = H_p(H_compressed || "bulletproof" || VarInt(i*2));
}
```

where `Gi` and `Hi` are the arrays of points where the 2048 generators will be stored; `H_p` is the same Monero hash function used for key image derivation; `H_compressed` is the compressed representation of Monero's `H` generator; and `VarInt` is a function which maps an integer to a VarInt as described [here](https://developers.google.com/protocol-buffers/docs/encoding#varints).

##### Pseudo output commitments

Given that the real inputs of the transaction are hidden within their respective rings, it is not immediately obvious how we can go about proving that the transaction doesn't create money out of thin air.

If we could use the real inputs' Pedersen commitments (without revealing the real inputs themselves), we could actually leverage the mathematical properties of Pedersen commitments to prove that our transaction is not inflationary.
For example, for a transaction with 1 input and 1 output with commitments `y_0 * G + 100 * H` and `y_1 * G + 90 * H` respectively, and an explicit fee of `10`, a verifier could create a commitment for the fee without a blinder `0 * G + 10 * H` and sum all these `y_0 * G + 100 * H - (y_1 * G + 90 * H) - (0 * G + 10 * H)` resulting in `(y_0 - y_1) * G + 0 * H`, where all the amounts cancel out.

Since this is not the case, we instead construct a pseudo output commitment per input and actually choose the blinding factors in such a way that they cancel out when combined with the output commitments.
Returning to our example, we would choose `y_1 = y_0`, such that `(y_0 - y_0) * G + 0 * H = 0 * G + 0 * H`.
Including these pseudo output commitments in the transaction is the first step in convincing verifiers that our input and output amounts cancel out.
Obviously we still need to prove that the amounts chosen for our pseudo output commitments actually match the amounts of their respective real inputs, without revealing their identity.
This is part of the ring signature, described in the next section.

##### CLSAGs

All that remains is proving ownership of the inputs we're spending.
Once again, since we're spending one input out of a ring of possible candidates, we need something a bit more exotic than a regular Schnorr signature.
The correct tool is a ring signature, a general term used to refer to signatures which prove that one member of a group of several parties approves of a message, without revealing the identity of the member.
In our case, that is one input's secret key out of the ring of possible inputs authorising being spent in the transaction.

CLSAG is one of several instantiations of this idea, and is the one currently used in Monero.
Much like with Bulletproofs, it seems more appropriate to direct the reader elsewhere if they want to understand this signing scheme in more depth.
In particular, we would like to recommend the excellent [_Zero to Monero_](https://www.getmonero.org/library/Zero-to-Monero-2-0-0.pdf), which has been an invaluable resource when conducting our research.
Nonetheless, we would still like to mention all the particularities of Monero's implementation of CLSAG.

###### Involving Pedersen commitments

Vanilla CLSAG (as described in _Zero to Monero_) only concerns itself with authorising spending an input, but Monero's implementation has been modified to also confidentially prove that the real input used commits to the same amount as the pseudo output commitment included in the transaction.

An iteration of the CLSAG algorithm commonly consists of computing a challenge of the form `c_i+1 = H_n(domain_tag || public_parameters || L_i+1 || R_i+1)`, where the domain tag and the public parameters remain constant between iterations, and `L` and `R` are expressions which depend on the previous iteration.
We can therefore focus on the values of `L` and `R` and see how they're computed differently in Monero.

Looking at `L`, regular CLSAG computes it as `L_i+1 = r_i * G + c_i * pk_i ` whereas Monero's instead does `L_i+1 = r_i * G + c_i * mu_P * pk_i + c_i * mu_C * (C_i - C_pseudo)`, where `mu_P` and `mu_C` are constants, `C_i` is the `i`th commitment in the ring, `r_i` is the `i`th response and `C_pseudo` is the pseudo output commitment.
We can see that a third component has been introduced in Monero, which is kept orthogonal to the second one because `mu_P ≠ mu_C`.
This new component is actually responsible for attesting the fact that the pseudo output commitment hides the same amount as the real input's commitment.

Normally CLSAG enforces that, to be able to _close_ the ring and generate the response `r_π`, we need to know the real input's secret key `sk_π`: `r_π = ⍺ - c_π * sk_π`, where `⍺` is a random value generated at the start of the algorithm.
CLSAG _seeds_ the algorithm by first generating `c_π+1` based on `⍺`.
More specifically, `L_π+1 = ⍺ * G`, which is successfully closed by `r_π`:
first rearranging to get `⍺ = r_π + c_π * sk_π`; and then substituting in `L_π+1` giving `L_π+1 = r_π * G + c_π * sk_π * G = r_π * G + c_π * pk_π`, exactly what we'd expect from the definition.

In Monero's CLSAG we instead calculate `r_π = ⍺ - c_π * mu_P * sk_π - c_π * mu_C * z`, where `z` is the difference between the real commitment's blinding factor and the pseudo output's commitment blinding factor.
If we rearrange as above we get `⍺ = r_π + c_π * mu_P * sk_π + c_π * mu_C * z`, which when substituted in `L_π+1` gives `L_π+1 = r_π * G + c_π * mu_P * sk_π * G + c_π * mu_C * z * G` which is equal to `L_π+1 = r_π * G + c_π * mu_P * pk_π + c_π * mu_C * (C_π - C_pseudo)` if and only if `z * G = C_π - C_pseudo`.
Since the real input's commitment and the pseudo output's commitment hide the same amount `C_π - C_pseudo = z_0 * G + a * H - (z_1 * G + a * H) = (z_0 - z_1) * G`.
Therefore we can simplify our condition to `z * G = (z_0 - z_1) * G`, which is true given our definition of `z` above.

The differences in the `R` term can be described similarly, but we direct the interested reader to our [implementation of Monero](https://github.com/comit-network/monero-rs/blob/b41ae9c32cb435a0f0c8e03f450dd248507c43b5/src/clsag.rs)'s CLSAG for more details.

###### Constants `mu_P` and `mu_C`

These constants and their role in CLSAG were introduced in the previous section.
They are computed as

```
mu_P = H_n("CLSAG_agg_0" || ring || commitment_ring || I || D_inv_8 || pseudo_output_commitment);
mu_C = H_n("CLSAG_agg_1" || ring || commitment_ring || I || D_inv_8 || pseudo_output_commitment);
```

where `I` is the key image `I = sk_π * H_p(pk_π)`; and `D_inv_8 = z * H_p(pk_π) * INV_EIGHT`.

###### Domain tag and public parameters

The actual components that remain constant between iterations of CLSAG are

```
c_i+1 = H_n("CLSAG_round" || ring || commitment_ring || pseudo_output_commitment || transaction_hash || ...);
```

where the ellipsis represents the missing components `L` and `R` discussed above, which vary between iterations.

###### What are we signing?

With every signature algorithm the final question is: what are we actually signing?
The answer in Monero's case is actually quite surprising because we are committing to a lot of things with the signature.

Initially, we naively assumed we would be signing the transaction hash which is computed by hashing the consensus-encoding of the transaction prefix.
We eventually found out that this is not the case.
Instead, the message that is being signed is the Keccak hash of:

1. the Keccak hash of the consensus-encoded transaction prefix (which is the transaction hash);
2. the Keccak hash of the consensus-encoded `rct_signatures`; and
3. the Keccak hash of all bulletproofs.

[These](https://github.com/comit-network/monero-rs/blob/b41ae9c32cb435a0f0c8e03f450dd248507c43b5/src/blockdata/transaction.rs#L546-L630) lines of code show how that looks like in practice.

## Outlook

We have put this together hoping that this information is useful to others, particularly to those attempting to write their own Monero wallets.
We ourselves are in the process of completing a minimal Monero wallet, which you can find [here](https://github.com/comit-network/xmr-btc-swap/blob/0c501ba2cc94ed7d6982604ede26d349d115f0e3/master/monero-wallet).
The purpose of such a wallet would be to use it in the protocols mentioned in the introduction.

Needless to say, we would be very happy to amend this post based on feedback from others who may know more about Monero than we do!
As always, thank you for reading.

[^1]: By 0 amount we are not referring to an output with a 0 in its `amount` field (which is mandatory), but rather one with a `y * G + 0 * H` Pedersen commitment.
[^2]: Here address just means public key.
[^3]: Monero wallets consist of two key-pairs, each fulfilling a different function. The spend key pair is unsurprisingly used to spend coins; the view key pair is utilised to check if money has arrived at related one-time addresses and can also be used to unblind output amounts.
[^4]: Followed by the reduction of the integer modulo the order of the prime-order subgroup of the edwards25519 elliptic curve.
[^5]: This alternate generator is a public parameter of Monero's. It was generated in a particular way, ensuring that `y` is unknown for `H = y * G`.
[^6]: A negative amount in modulo arithmetic is equivalent to a very, very large amount.
