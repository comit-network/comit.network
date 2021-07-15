---
title: "Project Baru: DeFi on Liquid"
author: thomas
author_url: https://github.com/thomaseizinger
author_image_url: https://avatars1.githubusercontent.com/u/5486389
tags: [bitcoin,defi,liquid,options,futures,loans]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- <img alt="Hibernation" src={useBaseUrl('blog/assets/images/2021-07/hibernate_bear_tx_chaining_dream.png')} /> -->

> The future is unknown but the unknown is where all the good things come from.

A former colleague.

In this blogpost, we outline our vision and how project Baru is supposed to get us there.

<!--truncate-->

## DeFi

DeFi - short for decentralised finance - can mean many things.
In the Ethereum world, DeFi is all about smart contracts with governance tokens, yield farming, AMM pools, collateralised loans and lots of other stuff.
Ethereum's smart contract model makes building these things reasonable easy and the pace of innovation is quite incredible.

In the Bitcoin world, many consider Bitcoin to be the original DeFi.
Arguably though, taking long positions is only one form of investment.
In the traditional finance world, people take short positions, sell options, bet on prices using futures or utilise CFDs (contracts for difference) to benefit from price movements without ever holding the actual asset.

Bitcoin means [many things](https://medium.com/@nic__carter/visions-of-bitcoin-4b7b7cbcd24c) to many different people.
If we think about it as a financial asset, it makes sense to build these financial products on top of it.

Of course, while doing so, we don't want to compromise Bitcoin's core values: decentralised, censorship-resistant and permission-less.

## DeFi on Bitcoin

Bitcoin is constantly evolving.
As you would expect from a system that governs [billions of dollars](https://coinmarketcap.com/), it moves at a fairly slow rate.
Unfortunately, this means that we don't have the tools (yet) to build complex contracts on Bitcoin.
In particular, encoding covenants - a core building block for tradable contracts - is not possible.

Fortunately though, Liquid offers tools to build this.
We already utilised this to build [trustless loans](2021-03-31-borrowing-without-a-middleman.md).

## Project Baru

Project Baru is our effort to continue DeFi on the Liquid platform.
Our goal is to build all sorts of trustless financial products, including options, futures and potentially even CFDs.
People will be able to take out loans, buy a future's contract and sell it to someone else, all without having to entrust their funds with a custodian.
To begin with, we will focus on loans, in particular, adding an oracle to our existing protocol to allow for liquidation and later move on to options and futures.

In case you are curious about the name: Baru is the name of a [native Australian crocodile species](https://australian.museum/learn/australia-over-time/extinct-animals/baru-darrowi/) that would hunt in fresh water pools (Liquid anyone?) by lurking underneath the water surface, waiting for prey.

## Get involved

To stay on top of what is happening, join our [room(s)](https://matrix.to/#/#comit-liquid:matrix.org) on Matrix and checkout our repositories: [`waves`](https://github.com/comit-network/waves) and [`baru`](https://github.com/comit-network/baru-lib)!
