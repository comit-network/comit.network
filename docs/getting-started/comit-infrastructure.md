---
id: comit-infrastructure
title: Development Setup
sidebar_label: Development Setup
---

import ComitScripts from './shared/comit-scripts.md'
import CreateComitApp from './shared/create-comit-app.md'
import UnderConstruction from '../shared/under-construction.md'

This documentation section shows an overview of how to setup a COMIT-app for development.
The tools around the COMIT protocol are listed and the interaction between them is shown.

## Introduction

The COMIT project consists of several [projects on GitHub](../comit-protocol/comit-projects.md).
The reference implementation of the protocol is shipped as binary and is called [Comit Network Daemon (cnd)](../comit-protocol/comit-protocol-stack.md#comit-network-daemon-cnd).

A swap is executed between two parties. We call them a maker and a taker.
While the former one creates orders and makes them available, the latter one can take these orders and initiate the swap execution.

Each party runs its own cnd.
Typically those two instances would run separately on different machines.
For the development environment they are typically started on the same machine.
The two cnd nodes communicate via the [COMIT communication protocols](../comit-protocol/comit-protocol-stack.md#comit-communication-protocols) for exchanging swap parameters prior to executing the swap. 
Cnd offers a REST API for executing the [cryptographic protocols](../comit-protocol/comit-protocol-stack.md#comit-cryptographic-protocols).

For your local dev setup you will need the following components:

* Two cnd nodes; one for each party of the trade.
* The respective blockchain nodes for the swap. If you are swapping bitcoin for ether you need a Bitcoin and Ethereum node.
* Wallets, corresponding to the ledgers, to send transactions. If you are swapping bitcoin for ether you need a Bitcoin and Ethereum wallet.

You can use [comit-scripts](#comit-scripts) to start up a development environment based on docker containers.

The COMIT-app holds all the components together and offers an interface for swap negotiation and execution to the user.
A COMIT-app typically includes some mechanism to find trading partners and manage orders because cnd does not support [negotiation protocols](../comit-protocol/comit-protocol-stack.md#comit-negotiation-protocols) yet.


<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vSnucTvT_KdrvxWnMf2WCbEegUsr6p9U0K9tT9i-zG-5Zu2JWKNcTymqW_lDFCTvgqLD_WncUMgY0zd/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    width="100%"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

This slide shows an overview of the components and their interaction.

## Javascript Developers

In order to make COMIT more accessible for Javascript developers we offer the [comit-sdk](#comit-js-sdk) and [create-comit-app](#create-comit-app).
Create-comit-app includes the [comit-scripts](#comit-scripts) module which includes scripts that setup your development environment.

### create-comit-app

[`create-comit-app`](https://github.com/comit-network/create-comit-app/) is a project to help COMIT App developers setup an environment.

<CreateComitApp />

### comit-scripts

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vTTbg6dw_XezRW8t2h3Vlv53q3tMFqU8iCmDX3AaeJ9LUe4LZ29KZwdWZHrBmjBaGrRctrn2vScwdSU/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    width="100%"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>

<ComitScripts />

### comit-sdk

<UnderConstruction />

The comit  JavaScript software development kit  (comit-sdk) helps integrating swaps into JavaScript applications.
It wraps the communication with cnd to simplify creating and executing swaps.
It includes a simple negotiation module that can be used to create and take orders.

<iframe 
    src="https://docs.google.com/presentation/d/e/2PACX-1vSWqUv6LotbEvOKk9hQpHGNt0Z_s7rutx2IJcv-urW52UY_R3ER4Mrhx2qmlCQ1zRyzO__zwRcAyrg6/embed?start=false&loop=false&delayms=3000"
    frameborder="0"
    width="100%"
    height="480"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true">
</iframe>



