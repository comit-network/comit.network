---
id: write-a-comit-app-maker-execution
title: Adding the swap execution code
sidebar_label: Maker - Swap Execution
---

import Conclusion from './shared/conclusion.md'
import MakerDisclaimer from './shared/maker_disclaimer.md'
import TutorialDescription from './shared/tutorial_description.md'

<TutorialDescription />
<MakerDisclaimer />

In this section we add code for the execution of the swap on the maker side.

## Swap Execution

In the previous section we already added the code for listening for incoming swaps on the maker side.
This provides us with the comit-sdk [`Swap`](../../comit-sdk/classes/_swap_.swap.md) that helps us to execute the swap.
In this tutorial we only focus on a scenario where both parties actually redeem the swap, thus we use these two functions:

1. `fund()` for locking up our asset.
2. `redeem()` for retrieving the asset of the counterparty to our account.

The comit-sdk [`Swap`](../../comit-sdk/classes/_swap_.swap.md) helps us with the swap execution in cnd and sending transactions to the Bitcoin and Ethereum wallet.
When we call [`Swap.fund()`](../../comit-sdk/classes/_swap_.swap.md#fund) the comit-sdk starts polling the maker's cnd until the fund action is available for the swap.
The same applies to calling [`Swap.redeem()`](../../comit-sdk/classes/_swap_.swap.md#redeem).

Note that we have to provide parameters that specify the poll interval that the comit-sdk will use to query cnd for the respective action and a timeout after which we would stop trying to execute `fund` or `redeem`.
In this tutorial we just set the parameters to poll every second and time-out after 10 minutes.
When moving towards a more advanced application, these values should be aligned with the expiry times set for the swap, and further error handling would have to be implemented.

The maker defaults to the cryptographic role of Bob, meaning he has to wait for the taker (defaulting to Alice, who holds the actual secret) to fund first.
Once the taker has funded the swap, the maker can fund.
The maker's cnd node will notice the taker's fund transaction and make the fund transaction available on the maker's side.
The comit-sdk will then send the necessary fund transaction using the maker's Bitcoin wallet, returning the transaction-id.

All this functionality is packed into one simple line:

```typescript
const bitcoinTxId = await swap.fund(tryParams);
```

Once we retrieve the transaction ID, the maker's fund transaction was sent, locking up his Bitcoin for the taker side to be redeemed.
Let's log the transaction ID, so we know that funding was done:

```typescript
console.log("Funded! Bitcoin transaction ID: ", bitcoinTxId);
```

Redeeming is handled the same way:

```typescript
const ethereumTxId = await swap.redeem(tryParams);
console.log("Redeemed! Ethereum transaction ID: ", ethereumTxId);
```

Once the redeem transaction was sent, we can expect the asset locked up by the taker in the maker's wallet.
Since this swap is a regtest swap the asset will appear almost instant, and there won't be any transaction fee.

To prove that the asset was swapped, we can print the final balance of the maker's wallets after waiting shortly (to be sure that the wallet has picked up the transaction):

```typescript
// wait for two seconds to be sure the wallet has picked up the redeem transaction
await new Promise((resolve) => setTimeout(resolve, 2000));

// print balances after swapping
console.log(
    "[Maker] Bitcoin balance: %f, Ether balance: %f",
    (await maker.bitcoinWallet.getBalance()).toFixed(2),
    parseFloat(
        formatEther(await maker.ethereumWallet.getBalance())
    ).toFixed(2)
);
```

At this point the maker application is done and we move on to the taker side.

## Summary

The complete maker application:

```typescript
import * as os from "os";
import * as path from "path";
import {createActor, EthereumWallet, InMemoryBitcoinWallet, MakerNegotiator, TryParams} from "comit-sdk";
const dotenv = require("dotenv");
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

    // Publish the order so the taker can take it.
    makerNegotiator.addOrder(order);

    const link = makerNegotiator.getUrl();
    console.log(`Waiting for someone to take my order at: ${link}`);

    // Wait for a taker to accept the order and send a swap request through the comit network daemon (cnd).
    let swap;
    // This loop runs until a swap request was sent from the taker to the maker
    // and a swap is waiting to be processed on the maker's side.
    while (!swap) {
        await new Promise(r => setTimeout(r, 1000));
        // Check for incoming swaps in the comit node daemon (cnd) of the maker.
        swap = await maker.comitClient.getOngoingSwaps().then(swaps => {
            if (swaps) {
                return swaps[0];
            } else {
                return undefined;
            }
        });
    }

    const bitcoinTxId = await swap.fund(tryParams);
    console.log("Funded! Bitcoin transaction ID: ", bitcoinTxId);

    const ethereumTxId = await swap.redeem(tryParams);
    console.log("Redeemed! Ethereum transaction ID: ", ethereumTxId);

    // wait for two seconds to be sure the wallet has picked up the redeem transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // print balances after swapping
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

Running the maker application will publish the order and wait for a taker to take it so it can be executed.
With the maker application being finished we can now move on to the taker side so the maker's order is actually taken and the execution is triggered.

:::info
The maker COMIT-app is finished! Keep it running in a separate terminal, waiting for the taker to take the order and start swap execution!
:::

## Extending the maker-app

<Conclusion />

Here is come inspiration what can be done to extend the maker application:

* Implementing proper time constraints for redeem and adding the refund scenario,
* Properly handling multiple swaps with different parties,
* Adding actual market making strategies,
* Adding a more advanced (decentral) order-book,
* Changing to use external wallets rather than using the comit-sdk wallet.

Future tutorials may tackle some of these points.
