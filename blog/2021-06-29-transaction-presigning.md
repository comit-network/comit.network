---
title: "Pre-signing transactions for non-custodial blockchain protocols"
author: thomas
author_url: https://github.com/thomaseizinger
author_image_url: https://avatars1.githubusercontent.com/u/5486389
tags: [monero]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- TODO: Find a good image -->
<!-- <img alt="Blackboard" src={useBaseUrl('blog/assets/images/2021-06/monero-lesson.png')} /> -->

Why you want it, why it doesn't work on present day Monero and what that means for applications on top.

<!--truncate-->

In this blogpost, we are going to explore the topic of *pre-signing* transactions with a focus on present day Monero.
General knowledge of how blockchains work is assumed.

## What is transaction *pre-signing*?

Signing a transaction is how users in a blockchain network authorize the transfer of funds to a new owner.
Often, it is desirable to delay this authorization for as long as possible because it can never be taken back.
Once a transaction is signed, anyone - not just the original owner - can broadcast the transaction and get it included in the blockchain.
Usually, signing and broadcasting is done by the same person.

When we talk about *pre-signing* a transaction, we deliberately separate these two steps.
We call it pre-signing because we create and therefore authorize the transfer of funds significantly earlier to broadcasting it.
In some situations, a pre-signed transaction might never be broadcasted but just acts as a fallback.

In summary, *pre-signing* as transaction can be thought of as "signing a transaction for later use".

## Why do you want transaction pre-signing?

The previous section already provided a hint: for certain protocols, we want a backup / fallback transaction that we can come back to in case the other party becomes uncooperative.
Consider a situation in which two parties fund a joint-output together.
On Monero, this would be an output whose spend and view keys have been created by adding the keys of two parties together.
To spend the coins locked in such an output, both parties need to collaborate to produce a valid signature.

The purpose of such a joint-output is manifold and depends on the protocol that is being implemented.
For example, joint-outputs are at the core of technologies like the Lightning network on Bitcoin.

We can achieve trustless protocols like the Lightning network if we don't depend on the other party's willingness to cooperate.

The solution is simple.
Both parties sign transactions that spend from a joint-output **prior** to signing the transaction that creates the joint-output.
The game theory here is:
Both parties are incentiviced to cooperate in signing the spending transactions otherwise the joint-output will never exist.
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
We [developed such a protocol](https://arxiv.org/abs/2101.12332) but in order for it to be secure from a game-theoretic PoV, we need to pre-sign spending transaction from a Monero joint output.

In a nutshell, if we want to provide a non-custodial trading solution where users can buy AND sell XMR for BTC, we need transaction pre-signing.

## It doesn't work on present day Monero

Unfortunately, it is not possible to efficiently implement pre-signing of transactions in present day Monero. 
The reason for that is very technical and we believe it can be fixed but likely requires a hard-fork.

Lucas recently [made an effort](/blog/2021/05/19/monero-transaction) in documenting the transaction structure and signature algorithms of Monero.
I'll try to reiterate the necessary concepts here but if you want more information on how things work, I suggest to take a look at Lucas' post.

To sign a transaction in Monero, one needs to choose ten other outputs that - together with the output you want to spend - form the ring for Monero's CLSAG algorithm.
These outputs are represented as what is called *key-offsets* for efficency reasons.
For the ring itself, we need the public key of each output but public keys are relatively big in size.
32 bytes even in their compressed form to be precise.
Times 11, that would be 352 bytes *per input* just to represent the ring for the signature.

To be more space efficient, we instead enumerate all outputs in the blockchain and create a list of offsets where the first element in the list is an absolute output index and all subsequent elements are relative to their previous index.
This is what Monero calls *key-offsets*.
Storing the *key-offsets* within the transaction is much more space efficient because a) the values are much smaller and b) we can store them as variable length integers.

The problem is that this list of key-offsets is also incorporated into the transaction's signature hash.

<!-- Continue here -->

<!-- 
Let's imagine two transactions, A and B.

We would like to fully construct and sign B before we broadcast A.

To sign B, we need to compute its signature hash, which means choosing key offsets. 
One of these offsets needs to refer to the actual output we want to spend: one of A's outputs. 
However, key offsets are based on the *indices* of the outputs in the blockchain. 
Until A is mined, we don't know what the output index our output is.

Only when A is mined will we know the effective output index. 
Because the key offset in our ring is computed based on the output index, our signature hash if we alter the index. 
Once the signature hash changes, any signature that was once valid is now invalid. -->

## How to achieve pre-signing on Monero?

To successfully pre-sign a transaction on Monero, we would have to define a range of possible output indices that A *could* take and make a signature for each one of them. 
While technically feasible, this is computationally very expensive and runs the risk of not having a valid spending transaction in case we miss the "window" that we defined upfront. 
Keep in mind that once the joint-output is mined, there is no game-theoretic reason why the other party would collaborate with us again in producing another signature.

To "fix" this issue, we need to make sure we can create a signature that doesn't change depending on when the UTXO is being mined. 
One solution to this is quite simple but does require a hardfork. 
What causes our signature hash to change is the key-offset that refers to our not-yet-mined transaction. 
But what actually is a key-offset? A key-offset describes an output in relation to a previous one. 
Say one output is at index 10005000, a key offset of 10, relative to this output describes the output 10005010. 
Doing this for all ring members saves quite a bit of space in the transaction because only the first number needs to be absolute (and hence large). 
All other numbers can be relative and hence stored in a more space efficient way.

To actually compute the signature, we don't need this particular number though. 
What we want is the *public-key* of this output. 
To actually compute our ring signature, we take the list of key-offsets, normalize them (i.e. 
compute the absolute output indices) and resolve all of them for their actual public key.

The public key doesn't change for an output, regardless of whether it has been included or not.

Hence, in order to fix our pre-signing issue, we need to change what the signature hash of our transaction commits to (explain what committing means here). 
Instead of hashing the list of key-offsets, we can just hash the actual ring members instead. 
Those remain unchanged, regardless of which outputs are already included in the blockchain. 
The key-offsets would still remain part of the transaction and hence there is no space-inefficiency introduced.

## What does this mean for applications on top?

Anything that relies on joint-outputs and pre-signing spending transactions doesn't actually work on present day Monero. 
We haven't done an extensive analysis on what this affects but our guess is that this applies to at least anything Layer2. 
Most "interesting" blockchain protocols today work on the basis of a joint-owned output whose spending transactions have game-theoretic elements to it like learning a secret value etc. 
As long as we want to remain trustless, we have to create valid spending transactions before the actual output gets mined, otherwise we are dependent on collaborating with the other party to unlock our funds.

## What is next

we are in contact with the monero community
next hard-fork introduces changes to how key offsets work because the anonymity set is being enlarged
good opportunity to include a fix for this as well
