---
id: write-a-comit-app-taker-request-order
title: Requesting an order
sidebar_label: Taker - Request Order
---

import TakerDisclaimer from './shared/taker_disclaimer.md'
import MakerRunningDisclaimer from './shared/maker_running_disclaimer.md'
import TutorialDescription from './shared/tutorial_description.md'

<TutorialDescription />
<TakerDisclaimer />
<MakerRunningDisclaimer />

In this section we fetch the order provided by a maker and check the rate.

## Taker requests an Order

Similar to the maker, the comit-sdk provides provides a negotiation class for the taker as well, the [`TakerNegotiator`](../../comit-sdk/classes/_negotiation_taker_taker_negotiator_.takernegotiator.md).

Knowing where to fetch order the taker can now initialise the `TakerNegotiator`.
Similar to the maker he also has to provide his [`ComitClient`](../../comit-sdk/classes/_comit_client_.comitclient.md) (initialised with the actor) for swap execution.
Additionally he has to provide the URL of the maker's order service.
The maker must share this information with the taker through some channel (e.g. Telegram group).

```typescript
const takerNegotiator = new TakerNegotiator(
    taker.comitClient,
    "http://localhost:2318/"
);
```

The taker can now request an order from the maker by defining a filter criteria.
The criteria defines what the taker would like to trade.

The taker wants to receive one bitcoin, which he is willing to sel for ether at a minimum rate of `0.001`, hence he creates his criteria accordingly:

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

Note that [`TakerOrder`](../../comit-sdk/classes/_negotiation_taker_order_.order.md) order returned by the `TakerNegotiator` is specific to the taker. It combines the maker's order, specified through the [Order interface](../../comit-sdk/interfaces/_negotiation_order_.order.md), the taker's criteria and provides a `take` function for the taker.

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

    // TODO: Execute the order by swapping the assets.

    process.exit();
})();

```

:::info
In order to properly retrieve an order at the taker side, the maker application has to run at this stage!
If your maker app is not running you can start it with `yarn maker` in a separate terminal.
:::

Ensure that your maker app is running and then start the taker app with `yarn taker` - it should print:

```
yarn run v1.22.0
$ ts-node ./src/taker.ts
COMIT Taker app
[Taker] Bitcoin balance: 10, Ether balance: 1000
Rate offered:  0.02
✨  Done in 6.64s.
```

Since the taker only requests the offer and prints the rate, the swap execution is not yet triggered.
Let's move on to the taker taking the order and triggering the swap execution!
