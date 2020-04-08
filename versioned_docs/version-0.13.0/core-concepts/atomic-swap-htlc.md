---
id: atomic-swap-htlc
title: Atomic Swaps using HTLCs
sidebar_label: Atomic Swaps using HTLCs
---

This documentation section provides an introduction to atomic swaps, hash time locked contracts (HTLCs) and how these concepts are used in COMIT.
Atomic Swaps and HTLCs are core concepts of the COMIT protocol.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vRjJeto_eQaZ8k5Ct00UzceHaSs-uIuvPmTFV6jP9SP6N-EKmct8H4cfN3xa2h-RFs8Gm4Gia41Je7m/embed?start=true&loop=false&delayms=1000" 
    frameborder="0" 
    width="801" 
    height="480" 
    allowfullscreen="true"
    mozallowfullscreen="true" 
    webkitallowfullscreen="true">
</iframe>

This slide shows an overview of how atomics swaps using HTLCs work in COMIT, more details can be found in the sections below.

## Atomic swap

An atomic swap is an exchange of two digital assets between two parties in which both parties are guaranteed to either receive the other asset OR retain their original asset i.e., an atomic swap guarantees that neither party is able to take both assets.

Atomicity of the swap can be achieved by [HTLC](#hash-time-locked-contract-htlc)s that serve as a programmable escrow, or other concepts as explained in the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Atomic_swap).

## Hash Time Locked Contract (HTLC)

HTLC stands for hash time locked contract.
An HTLC is a script or smart contract that locks a digital asset over time.
HTLCs only work on ledgers with time locks.

Both parties are required to have the same knowledge of all parameters for the HTLCs on both ledgers before they can start.
Both parties then have the same functions available within the HTLCs and can decide to move forward or wait to take their money back. 
No party has access to both assets at the same time within the time boundaries of the atomic swap. 

HTLCs typically define three functions:

1. **Fund**: Locking up the asset in the HTLC.
1. **Redeem**: Until the expiry time-lock is reached the other party has the chance to take the locked-up assets with the secret.
1. **Refund**: After the expiry condition has been met, the party that locked up the asset can take it back.

HTLCs are secured by a time-lock and hash-lock.
The hash-lock requires the generation of a secret prior to funding. 
The order of the actions is then tied to the cryptographic roles of Alice and Bob. 
Alice is the role that comes up with the secret.
She shares the hash of that secret with Bob enabling him to fund on his side.
The party in the cryptographic role of Alice has to fund and redeem first, because she has the actual secret.

## Atomic Swaps using HTLCs in COMIT

In COMIT we distinguish between 2 different phases when performing an Atomic Swap: 
1) The [Negotiation](negotiation.md) phase where the two parties agree on the ledgers, assets and amounts to be swapped.
2) The Execution phase where the two parties follow the actual atomic swap protocol. 

Below we describe what actions Alice and Bob would need to perform if they were about to swap ETH on Ethereum for BTC on Bitcoin.


1. Alice generates a secret and hashes it. She sends to Bob:
    1. Hash of the secret. 
    1. Her refund address on Ethereum.
    1. Her redeem address on Bitcoin.
    1. Proposed expiry times for the HTLCs.
1. Bob receives the swap proposed by Alice and sends back:
    1. His refund address on Bitcoin.
    1. His redeem address on Ethereum.
1. Alice has to fund first, she deploys an Ethereum HTLC transferring the agreed amount of ETH into the contract.
1. Bob monitors the Ethereum ledger and notices that Alice has deployed the HTLC funding the ETH. 
As soon as this transaction has enough confirmations, Bob sends a Bitcoin transaction that is guarded by the script-hash of the Bitcoin HTLC (Bitcoin script).
1. Alice monitors the Bitcoin ledger and notices that Bob has sent the funding transaction. As soon as this transaction has enough confirmation, Alice can now redeem the Bitcoin HTLC. By doing so she reveals the secret.
1. Bob is monitoring the Bitcoin ledger and notices that Alice has spent from the funding transaction by revealing the secret.
He extracts the actual secret from Alice's redeem transaction and uses it to redeem on Ethereum. 

The COMIT protocol acts as an enabler for atomic swaps in applications.
The [COMIT network daemon (cnd)](../comit-protocol/comit-protocol-stack.md#comit-network-daemon-cnd) mainly does two things:

1. Monitor the ledgers by processing blocks supplied by blockchain nodes.
1. Define the transaction details required for a swap and hand them over to an application built on top of COMIT.
The application is responsible for sending the actual signed transactions into the respective blockchain network.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vTSToxZxKhOjfUWHVL5sjjjyGTdEXubjM3TpOpK-qR5Cjs7b6Tda9ZoX6n_NdM9iqgXBGOtPcPnjHAA/embed?start=false&loop=false&delayms=1000"
    frameborder="0"
    width="801"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

### HTLCs in COMIT

In order to create HTLCs for the execution of an atomic swap, the two parties have to exchange the following parameters:

1. Ledgers, assets and amounts to be swapped.
1. Redeem and refund identity (address) of the respective parties.
1. Expiry times to be used for the HTLCs.
1. Hash of the secret.
This hash is sent from the party in the cryptographic role of Alice to the party in the cryptographic role of Bob.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vRYb97VhvfyMa3oFC8CiVagBrNmOioSJpasERtSCi6RMwf0MwxCb1yTJBUm8_ZT9OOw6r-_fBsV23GX/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    width="801"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

### HTLCs on different Ledgers

On Bitcoin, HTLCs can be achieved by using a [Bitcoin script](https://en.bitcoin.it/wiki/Script).
The Bitcoin HTLC Script is defined in the [COMIT Bitcoin HTLC specification](https://github.com/comit-network/RFCs/blob/master/RFC-005-SWAP-Basic-Bitcoin.adoc): 

```
OP_IF
    OP_SIZE 32 OP_EQUALVERIFY
    OP_SHA256 <secret_hash> OP_EQUALVERIFY
    OP_DUP OP_HASH160 <redeem_identity>
OP_ELSE
    <refund_timestamp> OP_CHECKLOCKTIMEVERIFY OP_DROP
    OP_DUP OP_HASH160 <refund_identity>
OP_ENDIF
OP_EQUALVERIFY
OP_CHECKSIG
```

On Ethereum this can be achieved by deploying an [Ethereum Smart Contract](https://solidity.readthedocs.io/en/v0.6.2/introduction-to-smart-contracts.html).
Note that an Ethereum HTLC does not necessarily have to be written in Solidity.
Given that HTLCs are really simple smart contracts, they can also be written in EVM assembly as defined in the [COMIT Ether HTLC specification](https://github.com/comit-network/RFCs/blob/master/RFC-007-SWAP-Basic-Ether.adoc) and [COMIT ERC20 HTLC specification](https://github.com/comit-network/RFCs/blob/master/RFC-009-SWAP-Basic-ERC20.adoc).

[Scriptless Scripts](privacy-preserving-swap.md#scriptless-scripts) enable HTLCs hidden in signatures. This allows [Privacy Preserving Swaps](privacy-preserving-swap.md).

### HTLC Expiries

The expiries of the HTLCs have to be defined so that Alice's expiry time is further in the future than Bob's.
This is because Alice is protected by the secret, and if she chooses not to reveal the secret, Bob must have the chance to refund early.

Choosing the right initial expiries, and defining if it is still *safe* for a party to move forward during swap execution is not trivial.
The presentation slides below show some scenarios to demonstrate the motivation of both parties to act according to the protocol during swap execution.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vT8l2FkYrcq_KKSDDTgsj6a4JeKBng0ESFU3xOuiYJH_V6x1_Cm_bf6d2-e01gY_IGWbbq1o_j3zwwi/embed?start=false&loop=false&delayms=5000"
    frameborder="0"
    width="801"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>
