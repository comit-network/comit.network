---
id: write-a-comit-app-taker-take-order
title: Taker - Taker Order
sidebar_label: Taker - Take Order
---

This section is part of the typescript tutorial for creating your first COMIT-app, that builds two simple command-line application using the COMIT protocol to execute a Bitcoin to Ethereum atomic swap locally on your machine.

This section of the tutorial focuses on the taker side.

At this stage the taker already has fetched an order and can now decide to take it. Taking the order will start swap execution.

## Taker takes the order

The taker can now take the order:

```typescript
const swap = await order.take();
```

When taking an order several things will be triggered in the background:

* The maker is notified that the order has been taken through the maker's order HTTP service.
* The taker's cnd node will trigger a swap request to the maker. The maker is still listening for incoming swaps as [described earlier](03-2-maker-publishes-order.md#maker-publishes-the-order).
* When sending a swap request to the maker, the taker cnd will initialise the swap on the taker's side. 

The taker gets an instance of a [`Swap`](../../comit-sdk/classes/_swap_.swap.md) back which will be used for executing the swap.

In the next section we are moving towards the execution of the swap.

Let's log some information on the taken order before moving on to the execution of the swap:

```typescript
console.log(
        `Took the following order: %s:%s for a rate of %d:%d`,
        order.rawOrder.ask.asset,
        order.rawOrder.bid.asset,
        order.rawOrder.ask.nominalAmount,
        order.rawOrder.bid.nominalAmount
    );
```

The maker's order is stored as `rawOrder` inside the `Order` class of the taker.

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

    const swap = await order.take();

    console.log(
        `Took the following order: %s:%s for a rate of %d:%d`,
        order.rawOrder.ask.asset,
        order.rawOrder.bid.asset,
        order.rawOrder.ask.nominalAmount,
        order.rawOrder.bid.nominalAmount
    );

    process.exit();
})();
```

Note, that in order to properly retrieve an order at the taker side, the maker application has to run at this stage!
If your maker app is not running you can start it with `yarn maker`.

Ensure that your maker app is running and then start the taker app with `yarn taker` - it should print:
```
yarn run v1.22.0
$ ts-node ./src/taker.ts
COMIT Taker app
[Taker] Bitcoin balance: 10, Ether balance: 1000
Rate offered:  0.02
Took the following order: ether:bitcoin for a rate of 50:1
✨  Done in 2.78s.
```

Once you run the taker app, the **maker app** will terminate as well:
```
yarn run v1.22.0
$ ts-node ./src/maker.ts
COMIT Maker app
[Maker] Bitcoin balance: 10, Ether balance: 1000
Maker's Negotiation Service is listening on localhost:2318.
Waiting for someone to take my order at: http://127.0.0.1:2318
✨  Done in 11.01s.
```

This is, because the maker was waiting for the incoming swap request on cnd and has received it from the taker.
When the taker was taking the order he sent a swap request.
The maker's cnd node registered that and the maker app terminated when it noticed it.
Since the logic for "waiting on incoming swaps" on the maker side is rather simple (it always choses the first one) the maker app will just terminate when started again (because there is already a swap in the cnd queue).


It is important to understand, that the swap actually still exists in the maker cnd and the taker cnd!
The two cnd nodes were started as part of the dev-environemnt and don't know about the taker and the maker app.
So, both the maker's cnd node and the taker's cnd node are still waiting for the swap to be executed.

Given our simple program logic, this is a problem now, because we are not detecting that there is a swap already in progress.
The maker will always pick the first swap, while the taker will (once running through taking an order again) be on a different swap.

> Note by Daniel: How should we solve this? The example is a bit incomplete here... 
> Should we add matching logic, so it does not pick "the first" swap in the list?
> Should we just let the tutorial user restart the environment?
> Should we combine the "Taker takes order" section with the execution for the Taker? (probably the easiest, but I feel the separation between negotiation and execution is not that nice then.)
