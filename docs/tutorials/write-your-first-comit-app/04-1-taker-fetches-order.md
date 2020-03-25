---
id: write-a-comit-app-taker-request-order
title: Maker - Request Order
sidebar_label: Maker - Request Order
---

This section is part of the typescript tutorial for creating your first COMIT-app, that builds two simple command-line application using the COMIT protocol to execute a Bitcoin to Ethereum atomic swap locally on your machine.

This section of the tutorial focuses on the taker side.

We will create and publish an order that a taker can then fetch from the maker's order HTTP API.

## Taker requests an Order

Similar to the maker, there is a negotiation class for the taker as well, called `TakerNegotiator`.

In order to initialise the `TakerNegotiator` we have to provide the maker's order server URL:

```typescript
const makerNegotiatorUrl = "http://localhost:2318/";
```

The maker must share this information with the taker through some channgel (e.g. Telegram group).

Knowing where to fetch order the taker can now initialise the `TakerNegotiator`.
Similar to the maker he also has to provide his `ComitClient` (initialised with the actor) for swap execution.

```typescript
const takerNegotiator = new TakerNegotiator(
    taker.comitClient,
    makerNegotiatorUrl
);
```

The taker can now request an order from the maker by defining a filter criteria.
The criteria defines what the taker would like to trade:

```typescript
const criteria = {
    buy: {
        ledger: "bitcoin",
        asset: "bitcoin",
        minNominalAmount: "1",
    },
    sell: {
        ledger: "ethereum",
        asset: "ether",
    },
    minRate: 0.001,
};
```

This is needed, because the taker might not know what the maker has to offer and if it is still available.
In a more advanced implementation such kind of functionality would be provided by an orderbook.

With the criteria the taker can now request an order from the maker:

```typescript
    const order = await takerNegotiator.getOrder(criteria);
```

Let's log the rate offered by the maker:

```typescript
console.log("Rate offered: ", order.getOfferedRate().toString());
```

## Summary

At this stage your taker application should look similar to this:

```typescript
import * as dotenv from "dotenv";
import * as os from "os";
import * as path from "path";
import {createActor, EthereumWallet, InMemoryBitcoinWallet, TakerNegotiator} from "comit-sdk";
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

    const makerNegotiatorUrl = "http://localhost:2318/";

    const takerNegotiator = new TakerNegotiator(
        taker.comitClient,
        makerNegotiatorUrl
    );

    const criteria = {
        buy: {
            ledger: "bitcoin",
            asset: "bitcoin",
            minNominalAmount: "1",
        },
        sell: {
            ledger: "ethereum",
            asset: "ether",
        },
        minRate: 0.001,
    };

    const order = await takerNegotiator.getOrder(criteria);

    console.log("Rate offered: ", order.getOfferedRate().toString());

    process.exit();
})();

```

Note, that in order to properly retrieve an order at the taker side, the maker application has to run at this stage!
Ensure that your maker app is still running and then start the taker app with `yarn taker` - it should print:


```
yarn run v1.22.0
$ ts-node ./src/taker.ts
COMIT Taker app
[Taker] Bitcoin balance: 10, Ether balance: 1000
Rate offered:  0.02
✨  Done in 6.64s.
```

Since the taker only requests the offer and prints the rate taker application terminates after that.
Let's move on to taking the order and initiating swap execution!
