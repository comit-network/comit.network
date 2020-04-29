---
id: create-comit-app
title: Getting Started
sidebar_label: Run a frist demo
---

import CreateComitApp from './shared/create-comit-app.md'
import ComitScripts from './shared/comit-scripts.md'

[`create-comit-app`](https://github.com/comit-network/create-comit-app/) is a project to help COMIT App developers setup an environment.
In this documentation we'll run you through:
- How to use `create-comit-app`,
- What does `create-comit-app` do and how can it be useful to you, a COMIT App dev,
- How to run one the provided example, i.e., run an atomic swap with local blockchain nodes.

While mainly written in Rust, it is actually shipped on [npmjs.com](https://npmjs.com) as two packages:
- [`create-comit-app`](https://www.npmjs.com/package/create-comit-app)
- [`comit-scripts`](https://www.npmjs.com/package/comit-scripts)

While you can build your app in JavaScript, examples and the [SDK](https://github.com/comit-network/comit-js-sdk/) are written in TypeScript,
allowing you to also build in TypeScript.

To use either packages, you need to have [`yarn`](https://yarnpkg.com/) or [`npm`](https://www.npmjs.com/get-npm) installed.
In this tutorial we will use `yarn` but it can be replaced by `npm` in any command below. 

## TL;DR - Quick Start

```
yarn create comit-app my-app
cd my-app/demos/btc_eth
yarn install
yarn run start-env
```

Once it says the `Environment is ready`, open a new terminal (keep the current terminal running):

```
cd my-app/demos/btc_eth
yarn run swap
```

Congratulations, you did a Bitcoin to Ether atomic swap!

## Long version

### create-comit-app

<CreateComitApp />
 
 Let's have a look at [comit-scripts](#comit-scripts) before [running an demo](#run-a-demo) together.

### comit-scripts

<ComitScripts />

### Run a demo

The template COMIT App comes with a number of examples and demo projects that allows you to get inspired and run atomic swap between the various supported assets.

Let's run one of those demos to see how an atomic swap execution looks like:

```
cd demos/btc_eth
yarn install
```
```
yarn install v1.21.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
✨  Done in 72.77s.
```

If `start-env` from the previous section is still running, leave it. If not, you need to start it:
```
yarn run start-env
```
```
yarn run v1.21.1
$ comit-scripts start-env
First time execution, downloading comit-scripts 0.8.3...✓
Creating Docker network (create-comit-app)...✓
Starting Ethereum node...✓
Starting Bitcoin node...✓
Starting two cnds...✓
Writing configuration in env file...✓
🎉 Environment is ready, time to create a COMIT app!
✓
```

Then, from a new terminal:
```
cd my-app/demos/btc_eth
yarn run swap
```
```
yarn run v1.21.1
$ ts-node ./src/index.ts
Maker Ethereum address:  0x04FEB54612cFA5A048c2195a1A0Fb60a47b546a4
Taker Ethereum address:  0x97b69c5348A43215dCA5e0580bFc830F1c0CF5aE
Maker Bitcoin balance: 10. Ether balance: 1000
Taker Bitcoin balance: 10. Ether balance: 1000
Swap started! Swapping 0.1 bitcoin for 5 ether
Ethereum HTLC funded! TXID:  b4b1b53ab505bb3b1bed27dcf4eca243c749851786a43e2cea0fd70d0e1f003a
Bitcoin HTLC funded! TXID:  0x43824c555b1d350ac573caecf4ad4b6536d607e19c1cd4092adacfdc6dba4f24
Bitcoin HTLC redeemed! TXID:  0x221fa7d8d89c5ae1b1804ff2db7a4ed62fe9c88f9278d6e9ba802093425be820
Ethereum HTLC redeemed! TXID:  c1f5c4abd2408d5a123848279638a84f86454a77d9e87bb5f865bfa10874ff40
Swapped!
Maker Bitcoin balance: 10. Ether balance: 995
Taker Bitcoin balance: 9.9. Ether balance: 1005
✨  Done in 19.63s.
```

Congratulations, you did a Bitcoin to Ether atomic swap!
