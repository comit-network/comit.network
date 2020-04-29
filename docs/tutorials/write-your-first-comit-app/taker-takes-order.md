---
id: write-a-comit-app-taker-take-order
title: Taking the order and swap execution
sidebar_label: Taker - Swap Execution
---

import Conclusion from './shared/conclusion.md'
import MakerRunningDisclaimer from './shared/maker_running_disclaimer.md'
import TakerDisclaimer from './shared/taker_disclaimer.md'
import TutorialDescription from './shared/tutorial_description.md'

<TutorialDescription />
<TakerDisclaimer />
<MakerRunningDisclaimer />

In this section we take the order triggering the swap execution.

## Taker takes the order

In the previous section we have retrieved an order that was handed to the taker as [`TakerOrder`](../../comit-sdk/classes/_negotiation_taker_order_.order.md).

The taker can not take the order:

```typescript
const swap = await order.take();
```

When taking an order several things will be handled by the comit-sdk:

* The maker is notified that the order has been taken through the maker's order HTTP service.
* The taker's cnd node will trigger a swap request to the maker. The maker is still listening for incoming swaps as [described earlier](docs/tutorials/write-your-first-comit-app/maker-publishes-order.md#maker-publishes-the-order).
* When sending a swap request to the maker, the taker cnd will initialise the swap on the taker's side. 

The taker gets an instance of a [`Swap`](../../comit-sdk/classes/_swap_.swap.md) back which will be used for executing the swap.

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

The maker's [Order](../../comit-sdk/interfaces/_negotiation_order_.order.md) is stored as `rawOrder` inside the [`TakerOrder`](../../comit-sdk/classes/_negotiation_taker_order_.order.md) class of the taker.

## Taker Swap Execution

As for the maker, the taker application will also use the comit-sdk to handle `fund` and `redeem` of the swap.

The taker also has to specify the polling interval to be used by the comit-sdk to check if an action for a certain swap is already available in cnd; as well as a timeout:

```typescript
const tryParams = { maxTimeoutSecs: 1000, tryIntervalSecs: 0.1 };
```

The code for handling the fund and redeem transaction is the same as for the maker.
But, the taker funds ether and redeems bitcoin, thus the taker will receive an Ethereum transaction ID from the comit-sdk:

```typescript
const ethereumTxId = await swap.fund(tryParams);
console.log("Funded! Ethereum transaction ID: ", ethereumTxId);
```

Note that the taker's fund transaction will actually be the first transaction that will be available (on the taker cnd), because the taker is in the role of Alice and has to fund first.
Meanwhile, on the maker side, the fund action will only become available (in the maker's cnd) once the taker's fund transaction (sent by the taker's comit-sdk using the taker's wallet) was observed.
The same accounts for redeeming.
The relatively complex ping-pong between taker and maker is handled by the comit-sdk.

Redeeming will yield a Bitcoin transaction id for the taker:

```typescript
const bitcoinTxId = await swap.redeem(tryParams);
console.log("Redeemed! Bitcoin transaction ID: ", bitcoinTxId);
```

As for the maker we want to print the final balance after the successful swap.
Additionally we also add wait for two seconds to be sure the transaction was observed by the wallet, so the balance is printed correctly:

```typescript
// wait for two seconds to be sure the wallet has picked up the redeem transaction
await (new Promise((resolve) => setTimeout(resolve, 2000)));

// print balances after swapping
console.log(
    "[Taker] Bitcoin balance: %f, Ether balance: %f",
    (await taker.bitcoinWallet.getBalance()).toFixed(2),
    parseFloat(
        formatEther(await taker.ethereumWallet.getBalance())
    ).toFixed(2)
);
```

At this point the taker application is done as well. Let's swap!

## Summary

The complete taker application:

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

    const takerNegotiator = new TakerNegotiator(
        taker.comitClient,
        "http://localhost:2318/"
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

    const tryParams = { maxTimeoutSecs: 1000, tryIntervalSecs: 0.1 };
    const ethereumTxId = await swap.fund(tryParams);
    console.log("Funded! Ethereum transaction ID: ", ethereumTxId);

    const bitcoinTxId = await swap.redeem(tryParams);
    console.log("Redeemed! Bitcoin transaction ID: ", bitcoinTxId);

    // wait for two seconds to be sure the wallet has picked up the redeem transaction
    await (new Promise((resolve) => setTimeout(resolve, 2000)));

    // print balances after swapping
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

Make sure: 
* The environment is running! (you can trigger is with: `yarn start-env`)
* The maker application is running! (you can start it with: `yarn maker`)

When running the taker application with `yarn taker` you should see output like this for the **taker**:

```
yarn run v1.22.0
$ ts-node ./src/taker.ts
COMIT Taker app
[Taker] Bitcoin balance: 10, Ether balance: 1000
Rate offered:  0.02
Funded! Ethereum transaction ID:  Transaction {
  wallet: { ethereum: EthereumWallet { wallet: [Wallet] } },
  id: '0x2b05aeb77d6870a4334760f7c9e2065a1b450c9c84346629715cf447149f1f91'
}
Redeemed! Bitcoin transaction ID:  17b2d8e1dce294d1858239d56544394bb385603c14e5e14c5dad43bd4a2183b9
[Taker] Bitcoin balance: 11, Ether balance: 950
✨  Done in 15.37s.
```

Since the taker now triggers the swap execution, the maker application will also finish after swap execution. 
You should see output like this for the **maker**:

```
yarn run v1.22.0
$ ts-node ./src/maker.ts
COMIT Maker app
[Maker] Bitcoin balance: 10, Ether balance: 1000
Maker's Negotiation Service is listening on localhost:2318.
Waiting for someone to take my order at: http://127.0.0.1:2318
Funded! Bitcoin transaction ID:  bce1057b305c3c3c3c01e82f2ebc03cc6df0a118e8e1ded047ce407bed1bd93c
Redeemed! Ethereum transaction ID:  Transaction {
  wallet: { ethereum: EthereumWallet { wallet: [Wallet] } },
  id: '0x3773341055015a56d6105c8cceca9878ba79f41b2d9a2d25d46d0174dae41caa'
}
[Maker] Bitcoin balance: 9, Ether balance: 1050
✨  Done in 20.30s.
```

:::tip
This tutorial is a slightly simplified version of the `btc_eth` example that can be found in the `examples` folder of the project you created with create-comit-app.
If you have trouble with the code you wrote you can also have a look at the example as a complete reference.
:::

## Extending this tutorial

<Conclusion />

Furthermore, there are various features that can be improved or added, e.g. adding a (decentral) order-book.

Future tutorials may introduce more advanced topics. 
