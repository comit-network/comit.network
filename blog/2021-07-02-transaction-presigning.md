---
title: "Pre-signing transactions for non-custodial blockchain protocols"
author: thomas
author_url: https://github.com/thomaseizinger
author_image_url: https://avatars1.githubusercontent.com/u/5486389
tags: [monero]
---

Why you want it, why it doesn't work on present day[^1] Monero and what that means for applications on top.

<!--truncate-->

In this blog post, we are going to explore the topic of *pre-signing* transactions with a focus on present day Monero.
General knowledge of how blockchains work is assumed.

## What is transaction *pre-signing*?

Signing a transaction is how users in a blockchain network authorise the transfer of funds to a new owner.
Often, it is desirable to delay this authorisation for as long as possible because it can never be taken back.
Once a transaction is signed, anyone - not just the original owner - can broadcast the transaction and get it included in the blockchain.
Usually, signing and broadcasting is done by the same person.

When we talk about *pre-signing* a transaction, we deliberately separate these two steps.
Most importantly, when *pre-signing* a transaction, the output we are spending is usually not yet included in the blockchain.
We call it pre-signing because we create and therefore authorise the transfer of funds prior to them even existing.
In some situations, a *pre-signed* transaction might actually never get used and only exists as a backup / fallback option.

## Why do you want transaction pre-signing?

The previous section already provided a hint: for certain protocols, we want a backup / fallback transaction that we can come back to in case the other party becomes uncooperative.
Consider a situation in which two parties fund a joint-output together.
On Monero, this would be an output whose spend and view keys have been created by adding the keys of two parties together.
To spend the coins locked in such an output, both parties need to collaborate to produce a valid signature.

The purpose of such a joint-output is manifold and depends on the protocol that is being implemented.
For example, joint-outputs are at the core of technologies like the Lightning Network on Bitcoin.

We can achieve trustless protocols like the Lightning network if we don't depend on the other party's willingness to cooperate.

The solution is simple.
Both parties sign transactions that spend from a joint-output **prior** to signing the transaction that creates the joint-output.
The game theory here is:
Both parties are incentivised to cooperate in signing the spending transactions otherwise the joint-output will never exist.
In other words, as one party in the protocol, I am not willing to provide a signature that funds the joint-output unless I have a backup transaction that is fully signed in my pocket.

On blockchains like Monero where we don't have scripting abilities, joint-outputs are also used as a building block for atomic swap protocols.

## Why do **we** want transaction pre-signing?

The alert reader might be thinking now: "but you guys already built an atomic swap tool for BTC-XMR and it works on present day Monero no? What is all the fuss about?"
It is correct that we built an atomic swap tool.
Unfortunately, it only supports selling BTC for XMR from the user's perspective.

To explain why, we need to dive a bit further into the workings of atomic swap protocols.
From a high-level perspective, an atomic swap consists of four key actions:

1. Party A locks up funds
1. Party B locks up funds
1. Party A takes party B's funds
1. Party B takes party A's funds

To build a non-custodial XMR-BTC exchange service, you really want to be party B.
Service meaning, you are running some form of automated backend that allows users to initiate and complete a swap without direct engagement from your side.

If you were offering such a service as party A, people could come and initiate a swap (which means you have to lock up money) but then just walk away.
Even if you can take your funds back due to a timeout or some other mechanism, your service is subject to a very easy DoS where the fees end up eating up your balance.

A protocol where Party A locks up BTC, followed by party B locking up XMR is what is currently implemented [in our software](https://github.com/comit-network/xmr-btc-swap).
Here, the user is limited to buying XMR for BTC (or selling BTC for XMR, depending on how you look at it).

If we want to allow users to sell XMR for BTC, then we need a protocol where party A locks up XMR first.
We [developed such a protocol](https://arxiv.org/abs/2101.12332) but in order for it to be secure from a game-theoretic PoV, we need to pre-sign a transaction spending from a Monero joint output.

In a nutshell, if we want to provide a non-custodial trading solution where users can buy AND sell XMR for BTC, we need transaction pre-signing.

## It doesn't work on present day Monero

Unfortunately, it is not possible to efficiently implement pre-signing of transactions in present day Monero.
The reason for that is very technical and we believe it can be fixed but likely requires a hard-fork.

Lucas recently [made an effort](/blog/2021/05/19/monero-transaction) in documenting the transaction structure and signature algorithms of Monero.
I'll try to reiterate the necessary concepts here but if you want more information on how things work, I suggest to take a look at Lucas' post.

To sign a transaction in Monero, one needs to choose ten other outputs that - together with the output you want to spend - form the ring for Monero's CLSAG algorithm.
These outputs are represented as what is called *key-offsets* for efficiency reasons.
For the ring itself, we need the public key of each output but public keys are relatively big in size.
32 bytes even in their compressed form to be precise.
Times 11, that would be 352 bytes *per input* just to represent the ring for the signature.

To be more space efficient, we instead enumerate all outputs in the blockchain and create a list of offsets where the first element in the list is an absolute output index and all subsequent elements are relative to their previous index.
Storing the key-offsets within the transaction is much more space efficient because a) the values are much smaller and b) we can store them as variable length integers.

The problem is that this list of key-offsets is also incorporated into the transaction's signature hash.

Why is this a problem?
Imagine two transactions, `A` and `B`:

- `B` spends an output from `A` and we would like to pre-sign this spending transaction.
- To sign `B`, we need to compute the signature hash and run the CLSAG algorithm using this hash.
- To compute the signature hash, we need to come up with the key-offsets of our ring.
- To compute the key-offsets for the ring, we need to know what the output index of `A` is.
- To know the output index of `A`, the transaction needs to be picked up by a miner and included in the blockchain.

Remember that the whole point of pre-signing `B` is that we have a transaction with valid signatures **prior** to the point of signing and broadcasting `A`.
Because the key-offsets are included in the signature hash, we can't produce it up until the output we want to spend is included in the blockchain.

In summary: We cannot pre-sign transaction `B` which spends from transaction `A` before transaction `A` has been included in the blockchain.

## How to achieve pre-signing on Monero?

To sign a transaction using CLSAG, we don't actually need the key-offsets but the public keys these key-offsets point to!
The public key of an output never changes, whether it has been included in the blockchain or not.

To fix the pre-signing issue, we need to change how the signature hash of a transaction is being computed.
We cannot just remove the key-offsets from the transaction.
It is important that the signature *commits*[^2] to the ring members that were used to create it.
At the moment though, we are *over-committing*.

Instead of hashing the list of key-offsets, we can just hash the actual ring members (i.e. the public keys).
Those remain unchanged, regardless of which outputs are already included in the blockchain.
The key-offsets would still remain part of the transaction to retain the space-efficient look-up algorithm of the ring members.

Unfortunately, this change requires a hard-fork of Monero.
Changing how the signature hash is computed will make transactions from new clients appear invalid for an old client.

## What does this mean for applications on top?

It is our assumption that anything that relies on joint-outputs and pre-signing spending transactions doesn't actually work on present day Monero.
We haven't done an extensive analysis on what this affects but our guess is that this applies to at least anything Layer2 but likely also to other blockchain protocols developed for Monero.
Most "interesting" blockchain protocols today work on the basis of a joint-owned output with spending transactions which leak secrets when broadcast.
As long as we want to remain trustless, we have to create valid spending transactions before the actual output gets mined, otherwise we are dependent on cooperating with the other party to unlock our funds.

## What is next

For the moment, our hands are tied here.
We cannot implement selling of XMR for BTC in our tool due to this limitation.

We are already in contact with the Monero community and have raised our issue with some developers.
As part of that, we learned that the next hard-fork will introduce changes in how key-offsets work anyway because the anonymity set is being enlarged.

We hope that this opportunity will be used to fix this issue as well to allow pre-signing of transactions on Monero.
By the looks of it, [that might actually be the case](https://github.com/monero-project/research-lab/issues/84)!

[^1]: Version 0.17 at the time of writing.
[^2]: Committing here means that the signature will only be valid for exactly these ring members. More generally speaking, *committing* ensures we cannot use the signature for anything else other than these specific inputs.
