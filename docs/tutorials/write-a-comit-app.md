---
id: write-a-comit-app
title: Write your first COMIT-app
sidebar_label: Write your first COMIT-app
---

// TODO: Explain what this file is about and the goal of the tutorial (3-4 Sentences).

This is a typescript tutorial for creating your first COMIT-app. 
In this tutorial we build a simple command-line application that uses the COMIT protocol to exectute an atomic swap locally on your machine between Bitcoin and Ethereum.

## The story

// TODO Describe a simple scenario that introduces the roles and what they want to do.

Alice still has some Ether lying around from the early crypto days.
Recently she took a look at Ethereum 2.0 she could not believe her eyes. (...)
Scared of the Ethereum developments she is thinking about moving some of her Ether into Bitcoin.

Bob always wanted to run his own decentralised exchange.
He is not a big fish but has quite some assets, including Bitcoin and Ether, lying around from the early days.
Since he does not have too much time, he does not invest much into his setup just yet.
For publishing his orders he just runs a simple web-server.
He has the plan to create some Telegram integration to publish orders in groups - but that is future music.
For the moment he publishes the link to his "offer server" on Twitter.
Bob's order includes a link on how to connect to his cnd node for swap execution.

Alice had some bad experience with centralised Exchanges in the past. 
By coincidence she stumbles over Bob's account on twitter where he points to the web-server with the offers.
She decides to give the trustless, decentral way a chance and take one of Bob's orders...

## Setup

// TODO: Describe the basics of the COMIT Javascript SDK 
// TODO: It should be clear that the negotiation is not P2P in the coding example below.
// TODO: It should be clear how the SDK and cnd play together.
// TODO: It should be clear that both parties need a cnd instance, bitcoind instance and partiy instance]
// TODO: Properly introduce `start env` and how to use it

### COMIT Javascript SDK

### Communication with cnd

## Implementation of negotiating a Swap

// TODO: Step the developer through implementing the negotiation server and client part.
// TODO: Use the Negotiation classes of the SDK.

### Maker creates an Order

### Maker publishes an Order

### Taker takes the Order


## Implementation of executing a Swap

// TODO: Step the developer through the implementation of the swap execution.
// TODO: Use the the ComitClient class of the SDK.
