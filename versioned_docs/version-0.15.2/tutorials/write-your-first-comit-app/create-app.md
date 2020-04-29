---
id: write-a-comit-app-setup
title: Project Setup
sidebar_label: Project Setup
---

import TutorialDescription from './shared/tutorial_description.md'

<TutorialDescription />

This tutorial is designed for Javascript/Typescript developers that want to integrate atomic swaps into their application.

This section of the tutorial shows how to set up the project and prepare the maker and taker COMIT-apps.

## Introduction

The goal of the tutorial is to have a simple command-line application that handles the negotiation and execution of an atomic swap for both sides of a trade.

For the negotiation phase we introduce **two roles**, the **maker** and the **taker**. The maker creates orders and publishes them. The taker takes orders published by the maker.
In this tutorial our maker has Bitcoin and wants Ether. Our taker has Ether and wants Bitcoin.

This tutorial uses the comit-js-sdk's [`MakerNegotiator`](../../comit-sdk/classes/_negotiation_maker_maker_negotiator_.makernegotiator.md) and [TakerNegotiator](../../comit-sdk/classes/_negotiation_taker_taker_negotiator_.takernegotiator.md) classes for negotiating the trade. 
This tutorial does not tackle the problem of "finding a trading partner".
It is assumed that the taker already knows how to reach the "order-server" of the maker.

When it comes to the execution of the swap there are also two roles, Alice and Bob, that represent the cryptographic roles of the swap protocol. 
Alice is the role that comes up with the secret. She funds and redeems first. Bob is the role that receives the secret hash from Alice prior to swap execution.
After the negotiation the taker will default to the role of Alice. The maker will default to Bob. 
This means that Alice (the taker) has to fund on the Ethereum side and redeem Bob's (the maker) Bitcoin.
Bob funds the Bitcoin side and redeems Alice's Ether.

Let's jump right into the setup.

## Set up the project with create-comit-app

In the [previous section about comit-scripts](../../getting-started/comit-infrastructure.md#comit-scripts) we took a look at how to use comit-scripts to setup your development environment.
The same setup is used for this tutorial.

This tutorial was written using [create-comit-app version 0.9.1](https://github.com/comit-network/create-comit-app/releases/tag/create-comit-app-0.9.1).
It is recommended to use version 0.9.1 specifically.
To add create-comit-app version 0.9.1 specifically you can use this command:
```shell script
yarn add --dev --exact create-comit-app@0.9.1
```

You can then use this command to set up the project:
```shell script
yarn create-comit-app my-first-comit-app
```

Note it you just run `yarn create comit-app my-first-app` the latest version of create-comit-app will be used, which may result in a different project structure than outlined in this tutorial.

## Start the dev-environment

Navigate into the newly created `my-first-comit-app` folder and start the development environment:

```shell script
cd my-first-comit-app
yarn install && yarn start-env
```

An Ethereum `parity` and a Bitcoin `bitcoind` node as well as one `cnd` node for the maker and one `cnd` node for the taker are now started.

:::tip
Keep the development environment running in this terminal and use a different terminal for further steps!
:::

## Understand the dev-environment

The environment created through comit-scripts's `start-env` gives you pre-funded accounts that we will use in this tutorial.
All variables related to the environment are stored in the `${HOME}/.create-comit-app/env` file.

In your project folder you find an `index.js` file that is currently the entry point for running the application.
Open a new terminal and run:
```shell script
yarn start
```

This will print the environment information of the dev-environment started through `start-env`:

```
Environment configuration:
Bitcoin HD keys:
1.  tprv8ZgxMBicQKsPfARyVrLY2LGqCxi7EgzMQP5eLtQ6izLiCD52vdHMxgFc9VhFzfvur9nndNFdJnwF46nPWcEbf64bYp9pK23abbxjfPEyBNi
2.  tprv8ZgxMBicQKsPdAY3E7VwbiH9gc9GCRNAew7R6UMW1J4m1tfYXkxctDZJba88BvtFnaJQyDTZm9dxBrz2w3BmEBcTCMPnuWPG6hhntu3gEoG
Bitcoin node P2P URI:  127.0.0.1:52879
Ethereum private keys:
1.  34e64385ef7c9dfab1bb8d0015b263e4b15b76afc3535af0a9ed0584ae49024d
2.  06354eef150a1909cf1f414c5888f6d762ecbd9bca247de4ba534fd66481d36e
Ethereum node HTTP URL:  http://127.0.0.1:52369
ERC20 token contract address:  0x62d69f6867a0a084c6d313943dc22023bc263691
cnd HTTP API URLs:
1.  http://127.0.0.1:53129
2.  http://127.0.0.1:53164
```

By default `start-env` will create two accounts for both Bitcoin and Ethereum and fund them.
Initial funding is **10 BTC** and **1000 ETH**.
We will use these accounts for our maker and taker when creating the maker and taker COMIT-apps. 

Additionally `start-env` creates an ERC20 contract for swapping from/to ERC20 tokens. This is not relevant for this tutorial.

The connection information for the Bitcoin node, Ethereum node and the two cnd nodes is printed as well.

## Typescript configuration

The example generated by create-comit-app is pure Javascript, but we use Typescript in this tutorial.
Before we start coding we have to configure Typescript in order to use it in our project:

```shell script
yarn add --dev typescript ts-node
```

## Prepare Maker and Taker app

Since the goal of this tutorial is to have the maker and taker run separately, we need one file that will represent the COMIT-app of the maker and one for the taker.

Let's create two typescript files in the `src` directory:

1. `maker.ts` for the COMIT-app representing the maker
2. `taker.ts` for the COMIT-app representing the taker

Both apps will be runnable command line applications, so let's add a main function to `maker.ts`:

```typescript
(async function main() {
    console.log("COMIT Maker app");
    process.exit();
})();
```

and `taker.ts`:

```typescript
(async function main() {
    console.log("COMIT Taker app");
    process.exit();
})();
```

Additionally we add commands to run these two COMIT-apps for the respective actor in the `package.json`:

```json
"scripts": {
  ...
  "maker": "ts-node ./src/maker.ts",
  "taker": "ts-node ./src/taker.ts",
  ...
}
```

With this in place we can already run our maker app:

```shell script
yarn run maker
```

and taker app:
```shell script
yarn run taker
```

At the moment our taker and maker app merely print a line. In the next sections we will ad functionality.
We will first focus on the maker application and then on the taker application.
