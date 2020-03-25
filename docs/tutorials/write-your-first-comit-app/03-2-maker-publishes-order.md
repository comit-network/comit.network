---
id: write-a-comit-app-maker-order-publish
title: Maker - Publish Order
sidebar_label - Maker: Publish Order
---

This section is part of the typescript tutorial for creating your first COMIT-app, that builds two simple command-line application using the COMIT protocol to execute a Bitcoin to Ethereum atomic swap locally on your machine.

This section of the tutorial focuses on the maker side.

We will create and publish an order that a taker can then fetch from the maker's order HTTP API.

## Maker creates an Order

The `MakerNegotiator` allows us to create and publish an [`Order`](../../comit-sdk/interfaces/_negotiation_order_.order.md) as defined in the comit-sdk.
Let's create an order of 50 ether for 1 bitcoin, meaning that the maker is offering 50 ether and asking for 1 bitcoin:

```typescript
// Create an order to be published.
const order = {
    id: "123",
    validUntil: moment().unix() + 300,
    ask: {
        nominalAmount: "50",
        asset: "ether",
        ledger: "ethereum",
    },
    bid: {
        nominalAmount: "1",
        asset: "bitcoin",
        ledger: "bitcoin",
    },
};
```

## Maker publishes the Order

We can now publish the order for the taker:

```typescript
// Publish the order so the taker can take it.
makerNegotiator.addOrder(order);
```

And finally we "tell" the world that we have an order available:

```typescript
const link = makerNegotiator.getUrl();
console.log(`Waiting for someone to take my order at: ${link}`);
```

Your COMIt-app could publish this link on a forum or social media so takers can connect to you.


## Waiting for a taker

When a taker takes the order created by the maker, it will trigger the swap execution right away.
The maker thus has to wait for a taker to taker the order to commence with the execution.

```typescript
// Wait for a taker to accept the order and send a swap request through the comit network daemon (cnd).
let swapHandle;
// This loop runs until a swap request was sent from the taker to the maker
// and a swap is waiting to be processed on the maker's side.
while (!swapHandle) {
    await new Promise(r => setTimeout(r, 1000));
    // Check for incoming swaps in the comit node daemon (cnd) of the maker.
    swapHandle = await maker.comitClient.getOngoingSwaps().then(swaps => {
        if (swaps) {
            return swaps[0];
        } else {
            return undefined;
        }
    });
}
```

The maker uses the `ComitClient` to wait for incoming swaps.
Once the taker takes the order he will trigger a swap request in his cnd that will be detected by the maker's cnd.

> Notes by Daniel: This is a bit confusing. I feel the names should be harmonised (swap on the taker side, swap-handle on the maker)
> Additionally: Is there any matching logic that checks if the swap matches the order on the maker side? (If so it is not obvious in the example...)
> Not sure how to make this better, but I think we should iterate on it again.

## Summary

At this stage your maker application should look similar to this:

```typescript
import * as dotenv from "dotenv";
import * as os from "os";
import * as path from "path";
import {createActor, EthereumWallet, InMemoryBitcoinWallet, MakerNegotiator} from "comit-sdk";
import { formatEther } from "ethers/utils";
import moment = require("moment");

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

    const executionParameters = {
        // Connection information for the comit network daemon.
        // The maker has to provide this to the taker for the execution phase,
        // so that the taker's comit network daemon can message the maker's comit network daemon.
        peer: {
            peer_id: maker.peerId,
            address_hint: maker.addressHint,
        },
        // The expiry time for the taker.
        alpha_expiry: moment().unix() + 7200,
        // The expiry time for the maker
        beta_expiry: moment().unix() + 3600,
        // The network the swap will be executed on.
        ledgers: {
            bitcoin: { network: "regtest" },
            ethereum: { chain_id: 17 },
        },
    };

    const tryParams = { maxTimeoutSecs: 1000, tryIntervalSecs: 0.1 };

    const makerNegotiator = new MakerNegotiator(
        maker.comitClient,
        executionParameters,
        tryParams
    );

    await makerNegotiator.listen(2318, "localhost");

    const order = {
        id: "123",
        validUntil: moment().unix() + 300,
        ask: {
            nominalAmount: "50",
            asset: "ether",
            ledger: "ethereum",
        },
        bid: {
            nominalAmount: "1",
            asset: "bitcoin",
            ledger: "bitcoin",
        },
    };

    makerNegotiator.addOrder(order);

    const link = makerNegotiator.getUrl();
    console.log(`Waiting for someone to take my order at: ${link}`);

    // Wait for a taker to accept the order and send a swap request through the comit network daemon (cnd).
    let swapHandle;
    // This loop runs until a swap request was sent from the taker to the maker
    // and a swap is waiting to be processed on the maker's side.
    while (!swapHandle) {
        await new Promise(r => setTimeout(r, 1000));
        // Check for incoming swaps in the comit node daemon (cnd) of the maker.
        swapHandle = await maker.comitClient.getOngoingSwaps().then(swaps => {
            if (swaps) {
                return swaps[0];
            } else {
                return undefined;
            }
        });
    }

    process.exit();
})();
```

When running `yarn maker` it prints:
```
yarn run v1.22.0
$ ts-node ./src/maker.ts
COMIT Maker app
[Maker] Bitcoin balance: 10, Ether balance: 1000
Maker's Negotiation Service is listening on localhost:2318.
Waiting for someone to take my order at: http://127.0.0.1:2318

```

The maker app is now waiting on the taker to initiate the swap for execution.
The order is published and a taker can come, take it and by doing so start the swap execution.

Let's keep the maker app running in this terminal and focus on the Taker side to consume the order and start swap execution!
