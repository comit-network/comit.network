---
title: "Pre-signing transactions}"
author: thomas
author_url: https://github.com/thomaseizinger
author_image_url: https://avatars1.githubusercontent.com/u/5486389
tags: [monero]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Blackboard" src={useBaseUrl('blog/assets/images/2021-06/monero-lesson.png')} />

Why you want it, why it doesn't work on present day Monero and what that means for applications on top.

<!--truncate-->

Intro: what this blogpost is about

## What is transaction *pre-signing*?

Sign the spending transaction for an output before it is mined.

## Are you talking about transaction *chaining*?

Not quite.

Chaining is essentially a special case of pre-signing where the transaction you are spending on is already in mem-pool. 
In most cases with pre-signing, the transaction you are spending is purposely NOT yet in mempool.

## Why do you want transaction pre-signing?

Game-theory / security. 
If two parties fund an output together, you'd want an option of being able to bail out of the joint-output non-collaboratively. 
To achieve this both parties sign transactions for spending an output before they give away a signature on the actual output.

The idea of pre-signing spending transactions is a cornerstone of techologies like the lightning network. 
They are also present in other multi-party protocols like atomic swaps and essentially every other protocol that builds on top of a joint output.

## Why do we want transaction pre-signing?

Protocol in the other direction, also explain why we even want this protocol

An atomic swap consists of four key actions:

Party A locks up funds
Party B locks up funds
Party A takes party B's funds
Party B takes party A's funds

If you want to build a non-custodial Monero-Bitcoin exchange service, you really want to be party B. 
If you were party A and offering this as a service, people could come and initiate a swap (which means you have to lock up money) but then just walk away. 
Even if you can take your funds back due to a timeout or some other mechanism, your service is subject to a very easy DoS where the fees end up eating up your balance.

If you want to sell BTC for XMR to your users, and we assume you want to be party B, then we need a protocol where party A locks up XMR first. 
We developed such a protocol but in order for it to be secure from a game-theoretic PoV, we need to pre-sign spending transaction from a Monero joint output.

In a nutshell, if we want to provide a non-custodial trading solution where users can buy AND sell XMR for BTC, we need transaction pre-signing.

## It doesn't work on present day Monero

Unfortunately, it is not possible to efficiently implement pre-signing of transactions in present day Monero. 
The reason for that is very technical and we believe it can be fixed but likely requires a hard-fork.

Refer to other blogpost for transaction structure.

To sign a tx in monero, one needs to pick key-offsets which essentially just represent other outputs in the blockchain. 
The list of key-offsets is chosen while constructing the transaction and this list is also incorporated into the transaction's signature hash.

This is where the problem starts.

Let's imagine two transactions, A and B.

We would like to fully construct and sign B before we broadcast A.

To sign B, we need to compute its signature hash, which means choosing key offsets. 
One of these offsets needs to refer to the actual output we want to spend: one of A's outputs. 
However, key offsets are based on the *indices* of the outputs in the blockchain. 
Until A is mined, we don't know what the output index our output is.

Only when A is mined will we know the effective output index. 
Because the key offset in our ring is computed based on the output index, our signature hash if we alter the index. 
Once the signature hash changes, any signature that was once valid is now invalid.

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