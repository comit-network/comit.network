---
id: comit-protocol-stack
title: COMIT protocol stack
sidebar_label: COMIT protocol stack
---

⚠️ Disclaimer: This part of the documentation is still under construction!

This documentation section provides an introduction to the COMIT protocol stack.
Concepts specific to the COMIT protocol as well as the protocol design are explained here.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vTT1qo6e8itnm76HFFCiM0zs2jBBgQ7hvwSqM91FgCePh9TyoO6gGkRhWgZXxBRIQDcjMZ2B7NZifr8/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    width="801"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

This slide shows the motivation of the COMIT protocol that is to create a truly trustless peer to peer protocol for digital assets.

## Comit Network Daemon (cnd)

The [COMIT network daemon (cnd)](https://github.com/comit-network/comit-rs/) is the reference implementation of the COMIT protocol written in Rust.

## Protocols in COMIT

A protocol can be roughly defined as the order and semantics of actions.

Within COMIT, we have two kinds of protocols:

1. Cryptographic protocols
1. Communication protocols

A cryptographic protocol within COMIT defines the order and semantics of interactions with ledgers.
At the moment, COMIT specializes in cryptographic protocols that facilitate atomic swaps.

A communication protocol within COMIT defines how two COMIT nodes interact with each other.
Those (libp2p-based) protocols facilitate the exchange of information for the purpose of then following a cryptographic protocol.

### COMIT Cryptographic Protocols

The COMIT cryptographic protocols define protocols for executing an atomic swaps.
For the negotiation phase please refer to the [negotiation protocol section](#comit-negotiation-protocols).

The COMIT protocol distinguishes between ledgers and assets.
When referring to a ledger we use a an uppercase first letter (e.g. Bitcoin, Ethereum), when referring to an asset we use a lowercase first letter (e.g. bitcoin, ether).

COMIT currently defines the following atomic swap protocols:

* HAN - **H**TLCs for **A**ssets that are **N**ative to the ledger
* HErc20 - **H**TLCs for the **Erc20** asset
* HALight - **H**TLCs for **A**ssets on the **Light**ning ledger

Besides these protocols there is a protocol for [privacy preserving swaps](../core-concepts/privacy-preserving-swap.md) in [development](https://github.com/comit-network/grin-btc-poc). 

#### HAN

HAN stands for **H**TLCs for **A**ssets that are **N**ative to the ledger.

The HAN protocol currently supports the following assets:

* HAN for bitcoin on Bitcoin
* HAN for ether on Ethereum

#### HErc20

**H**TLCs for the **Erc20** asset

The HErc20 protocol supports the following asset:

* [Erc20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) tokens on Ethereum

#### HALight

**H**TLCs for **A**ssets on the **Light**ning ledger

The HALight protocol is currently still in development, the first supported asset will be bitcoin on the Lightning network.

### COMIT Communication Protocols

The communication protocols of COMIT are used to exchange information between parties prior to the execution of a [swap](../core-concepts/atomic-swap-htlc.md).

The communication protocols in [cnd](#comit-network-daemon-cnd) are based on [libp2p](https://libp2p.io/).

### COMIT Negotiation Protocols

Currently the [COMIT network daemon (cnd)](https://github.com/comit-network/comit-rs/) does not support [negotiation](../core-concepts/negotiation.md) protocols.
However, the [Javascript SDK](../comit-sdk/index.md) includes a simple server-client negotiation protocol that shows how negotiation and execution can be combined in an application.

Note that you don't have to use the negotiation classes provided by the [Javascript SDK](../comit-sdk/index.md) when building an application on top of COMIT. 
Your application can introduce its own negotiation protocol instead. 
