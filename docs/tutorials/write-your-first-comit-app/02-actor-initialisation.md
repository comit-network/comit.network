---
id: write-a-comit-app-actor-initialisation
title: Actor Initialisation
sidebar_label: Actor Initialisation
---

This section is part of the typescript tutorial for creating your first COMIT-app, that builds two simple command-line application using the COMIT protocol to execute a Bitcoin to Ethereum atomic swap locally on your machine.

This section of the tutorial shows how to initialise the actors of the trade, the maker and the taker, with the pre-funded accounts of the dev-environment.

In this section we use the [`Actor`](../../comit-sdk/interfaces/_actor_.actor.md) interface of the comit-sdk to initialise the maker and taker actors.
We will use the Bitcoin and Ethereum accounts created through `start-env` for initialising the actors.

Through the actor we have access to the wallets and the [`ComitClient`](../../comit-sdk/classes/_comit_client_.comitclient.md) which is used as a wrapper for the communication with cnd.  

## Initialise the maker actor

Let's focus on the maker for the beginning.
`start-env` has provided us with two Bitcoin and two Ethereum accounts indexed with `0` and `1`.
Let's use the Bitcoin and Ethereum account indexed with `0` for the maker.

From the `index.js` file we already know how to load the environment using the `dotenv` package:

```typescript
const configPath = path.join(os.homedir(), ".create-comit-app", "env");
dotenv.config({path: configPath});
```

First we initialise the Bitcoin wallet using the `InMemoryBitcoinWallet` provided by the comit-sdk:
```typescript
    const bitcoinWallet = await InMemoryBitcoinWallet.newInstance(
        "regtest",
        process.env.BITCOIN_P2P_URI!,
        process.env[`BITCOIN_HD_KEY_${0}`]!
    );
    // Waiting for the Bitcoin wallet to read the balance
    await new Promise(r => setTimeout(r, 1000));
```

Then we initialise the `EthereumWallet` provided bt the comit-sdk:

```typescript
    const ethereumWallet = new EthereumWallet(
            process.env.ETHEREUM_NODE_HTTP_URL!,
            process.env[`ETHEREUM_KEY_${0}`]!
        );
```

Now we can use the `createActor` helper function of the comit-sdk to intialise the actor.

```typescript
let maker = await createActor(
        bitcoinWallet,
        ethereumWallet,
        process.env[`HTTP_URL_CND_${0}`]!
    );
```

Let's print the balance of the maker to see how much BTC and ETH he has before the swap:

```typescript
console.log(
        "[Maker] Bitcoin balance: %f, Ether balance: %f",
        (await maker.bitcoinWallet.getBalance()).toFixed(2),
        parseFloat(
            formatEther(await maker.ethereumWallet.getBalance())
        ).toFixed(2)
    );
```

Note that we are using the `formatEther` function from `ethers/utils` to format the ether properly.

Your `maker.ts` file should now look like this:

```typescript
import * as dotenv from "dotenv";
import * as os from "os";
import * as path from "path";
import {createActor, EthereumWallet, InMemoryBitcoinWallet} from "comit-sdk";
import { formatEther } from "ethers/utils";

(async function main() {
    console.log("COMIT Maker app");

    const configPath = path.join(os.homedir(), ".create-comit-app", "env");
    dotenv.config({path: configPath});

    const bitcoinWallet = await InMemoryBitcoinWallet.newInstance(
        "regtest",
        process.env.BITCOIN_P2P_URI!,
        process.env[`BITCOIN_HD_KEY_${0}`]!
    );
    // Waiting for the Bitcoin wallet to read the balance
    await new Promise(r => setTimeout(r, 1000));

    const ethereumWallet = new EthereumWallet(
        process.env.ETHEREUM_NODE_HTTP_URL!,
        process.env[`ETHEREUM_KEY_${0}`]!
    );

    let maker = await createActor(
        bitcoinWallet,
        ethereumWallet,
        process.env[`HTTP_URL_CND_${0}`]!
    );

    console.log(
        "[Maker] Bitcoin balance: %f, Ether balance: %f",
        (await maker.bitcoinWallet.getBalance()).toFixed(2),
        parseFloat(
            formatEther(await maker.ethereumWallet.getBalance())
        ).toFixed(2)
    );

    process.exit();
})();
```

When running `yarn run maker` you should see:

```
yarn run v1.22.0
$ ts-node ./src/maker.ts
COMIT Maker app
[Maker] Bitcoin balance: 10, Ether balance: 1000
✨  Done in 7.19s.
```

## Initialise the taker actor

For the taker we will have a similar setup as for the maker. (This could of course be pulled out into a library later.)

Similar to the maker we will load the Bitcoin and Ethereum account from the environment, initialise the wallets and create the actor using the comit-sdk's `createActor` function.
Note that we will use the Bitcoin and Ethereum account as well as the cnd instance with index `1` for the taker.

In the end our `taker.ts` file should look like this:

```typescript
import * as dotenv from "dotenv";
import * as os from "os";
import * as path from "path";
import {createActor, EthereumWallet, InMemoryBitcoinWallet} from "comit-sdk";
import { formatEther } from "ethers/utils";

(async function main() {
    console.log("COMIT Taker app");

    const configPath = path.join(os.homedir(), ".create-comit-app", "env");
    dotenv.config({path: configPath});

    const bitcoinWallet = await InMemoryBitcoinWallet.newInstance(
        "regtest",
        process.env.BITCOIN_P2P_URI!,
        process.env[`BITCOIN_HD_KEY_${1}`]!
    );
    // Waiting for the Bitcoin wallet to read the balance
    await new Promise(r => setTimeout(r, 1000));

    const ethereumWallet = new EthereumWallet(
        process.env.ETHEREUM_NODE_HTTP_URL!,
        process.env[`ETHEREUM_KEY_${1}`]!
    );

    let taker = await createActor(
        bitcoinWallet,
        ethereumWallet,
        process.env[`HTTP_URL_CND_${1}`]!
    );

    console.log(
        "[Taker] Bitcoin balance: %f, Ether balance: %f",
        (await taker.bitcoinWallet.getBalance()).toFixed(2),
        parseFloat(
            formatEther(await taker.ethereumWallet.getBalance())
        ).toFixed(2)
    );

    process.exit();
})();
```

When running `yarn run taker` we should see:

```
yarn run v1.22.0
$ ts-node ./src/taker.ts
COMIT Taker app
[Taker] Bitcoin balance: 10, Ether balance: 1000
✨  Done in 9.34s.
```
