---
id: atomic-swap-htlc
title: Atomic Swaps using HTLCs
sidebar_label: Atomic Swaps using HTLCs
---

[Atomic Swap](#atomic-swap)s using [HTLC](#htlc)s defines solution using time-locks for exchanging two digital assets without the need of a trusted third party.

Prior to the actual swap execution there is usually a [Negotiation](negotiation.md) phase where the two parties agree on the ledgers, assets and amounts to be swapped.

Assuming, that Alice has ETH on Ethereum and Bob has BTC on Bitcoin, Alice wants Bob's BTC and Bob wants Alice's ETH, the execution of a swap would be like this:

1. Alice's sets up by generating a secret and hashing it. She sends to Bob:
    1. Hash of the secret. 
    1. Her refund address on Ethereum.
    1. Her redeem address on Bitcoin.
    1. Proposed expiry times on the for the [HTLC](#htlc)s. (Note: That could also be done by Bob.)
1. Bob receives the swap proposed by Alice and sends back (if he accepts):
    1. His refund address on Bitcoin.
    1. His redeem address on Ethereum.
1. Alice has to fund first, she deploys an Ethereum HTLC transferring the agreed amount of ETH into the contract.
1. Bob monitors the Ethereum ledger and notices that Alice has deployed the HTLC funding the ETH. 
He now sends a Bitcoin transaction into the Bitcoin network that is guarded by the script-hash of the Bitcoin HTLC (Bitcoin script).
1. Alice monitors the Bitcoin ledger and notices that Bob has sent the funding transaction. She can now redeem the Bitcoin by spending the Bitcoin by reveiling the secret.
1. Bob is monitoring the Bitcoin ledger and notices that Alice has spent from the funding transaction by revealing the secret.
He extracts the actual secret from Alice's redeem transaction and uses it to redeem on Ethereum. 

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vRjJeto_eQaZ8k5Ct00UzceHaSs-uIuvPmTFV6jP9SP6N-EKmct8H4cfN3xa2h-RFs8Gm4Gia41Je7m/embed?start=true&loop=false&delayms=1000" 
    frameborder="0" 
    width="801" 
    height="480" 
    allowfullscreen="true"
    mozallowfullscreen="true" 
    webkitallowfullscreen="true">
</iframe>

The COMIT protocol acts as enabler for atomic swaps in applications.
The [COMIT network deamon (cnd)](../comit-protocol/comit-protocol-stack.md#comit-network-daemon-cnd) mainly does two things:

1. Monitor the ledgers by processing blocks supplied by blockchain nodes.
1. Define the transaction details and hand them over to an application on top to send the actual signed transaction into the respective blockchain network.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vTSToxZxKhOjfUWHVL5sjjjyGTdEXubjM3TpOpK-qR5Cjs7b6Tda9ZoX6n_NdM9iqgXBGOtPcPnjHAA/embed?start=false&loop=false&delayms=1000"
    frameborder="0"
    width="801"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

## Atomic Swap

Atomic Swaps define a peer to peer exchange of two digital assets, where both parties are in control of their private keys throughout the whole execution of the swap.

The atomicity of the swap is achieved through using [HTLC](#htlc)s as a programmable escrow.
Both parties require to have the same knowledge of all parameters for the HTLCs on both ledgers before they can start.
Both parties then have the same functions available within the [HTLC](#htlc)s and can decide to move forward or wait to take their money back. 
No party has access to both assets at the same time within the boundaries of the atomic swap. 

Note that the party in the cryptographic role of Alice has to redeem first, because she has the actual secret.

## HTLC

HTLC stands for Hash Time Locked Contract. An HTLC is a script or smart contract that locks a digital asset over time.
HTLCs require a ledger that provides a time lock.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vRYb97VhvfyMa3oFC8CiVagBrNmOioSJpasERtSCi6RMwf0MwxCb1yTJBUm8_ZT9OOw6r-_fBsV23GX/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    width="801"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

HTLCs typically have three steps:

1. **Fund**: Locking up the asset in the HTLC.
1. **Redeem**: Until the expiry time-stamp is reached the other party has the change to redeem the locke-up assets with the secret.
1. **Refund**: After the expiry time-stamp has passed the party that locked up the asset can take it back (refund).

In order to create HTLCs for the execution of an atomic swap, the two parties have to exchange certain parameters:

1. Ledgers, assets and amounts to be swapped.
1. Redeem and refund identity (address) of the respective party.
1. Expiry times to be used for the HTLCs.
1. Hash of the secret (To be sent from the party in the cryptographic role of Alice to the party in the cryptographic role of Bob.)

### HTLCs on different Ledgers

On Bitcoin this can be achieved by using a [Bitcoin script](https://en.bitcoin.it/wiki/Script).
Example Bitcoin HTLC is defined in in the [COMIT Bitcoin HTLC specifiction](https://github.com/comit-network/RFCs/blob/master/RFC-005-SWAP-Basic-Bitcoin.adoc): 

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
Given, that HTLCs are really simple smart contracts they can also be written in EVM assembly as defined in the [COMIT Ether HTLC specification](https://github.com/comit-network/RFCs/blob/master/RFC-007-SWAP-Basic-Ether.adoc) and [COMIT ERC20 HTLC specification](https://github.com/comit-network/RFCs/blob/master/RFC-009-SWAP-Basic-ERC20.adoc).

[Scriptless Scripts](privacy-preserving-swap.md#scriptless-scripts) enable HTLCs hidden in signatures. This allows [Privacy Preserving Swaps](privacy-preserving-swap.md).

### Close Look on HTLC Expiries

The expiries of the HTLCs have to be defined so that Alice's expiry time is further in the future than Bob's.
This is because Alice is protected by the secret, and if she choses not to reveal the secret, Bob must have the change to refund early.

Choosing the right initial expiries, and defining if is is still *safe* for a party to move forward during swap execution is not trivial.
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
