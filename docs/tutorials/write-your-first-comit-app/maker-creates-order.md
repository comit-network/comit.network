---
id: write-a-comit-app-maker-order-create
title: Creating a simple order service
sidebar_label: Maker - Order Service
---

import MakerDisclaimer from './shared/maker_disclaimer.md'
import TutorialDescription from './shared/tutorial_description.md'

<TutorialDescription />
<MakerDisclaimer />

In this section we use the comit-js-sdk negotiation classes to create an simple HTTP order service where the maker can publish orders. 
This tutorial does not tackle the problem of "finding a trading partner".



## Creating a simple HTTP order service

We start with the maker again (in `maker.ts`).
For the maker we use the [`MakerNegotiator`](../../comit-sdk/classes/_negotiation_maker_maker_negotiator_.makernegotiator.md) class of the comit-sdk to create a simple order HTTP-server using nodejs-express.

After the negotiation the `MakerNegotiator` will trigger the execution of the swap, hence it has to be initialised with the necessary execution information:

1. The [`ComitClient`](../../comit-sdk/classes/_comit_client_.comitclient.md) used by the maker to communicate with his cnd node for executing the swap.
2. The execution parameters of the maker provided for the taker (so they can reach an agreement on how to execute the swap):
    1. Connection information to the maker's cnd (`peerId` and `addressHint`).
    2. The `expiry` for the alpha (Ethereum) and `beta` (Bitcoin) ledger.
    3. The configuration for the repective ledger (the taker should know on e.g. which network the maker wants to execute the swap).

The `ComitClient` was already initialised through the actor initialisation in the previous section. 

Let's define the execution parameters that the maker is suggesting for his swaps:

```typescript
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
```

For calculating the expiry timestamps we use the `moment` module. You will have to add it to your `dependencies`:

```shell script
yarn add moment
```

In addition to the parameters mentioned above, the maker is also providing `TryParams` for the execution.
The swap's status is handled inside of cnd.
The comit-SDK is polling cnd for actions (e.g. fund, redeem, refund) that become available for a swap.
Once an action becomes available the action can be executed using the wallets provided in the comit-SDK.

The `TryParams` define how often the `ComitClient` will poll the swap status from cnd and a maximum timeout.
```typescript
const tryParams = { maxTimeoutSecs: 1000, tryIntervalSecs: 0.1 };
```

Now we have all the parameters for the `MakerNegotiator` assembled and can create an instance:

```typescript
const makerNegotiator = new MakerNegotiator(
    maker.comitClient,
    executionParameters,
    tryParams
);
```

Through the `MakerNegotiator` the maker is capable of creating an [`Order`](../../comit-sdk/interfaces/_negotiation_order_.order.md).
To make those orders available to the taker, the maker has to expose the `MakerNegotiator`'s [`HttpService`](../../comit-sdk/classes/_negotiation_maker_maker_negotiator_.httpservice.md):

```typescript
// Start the HTTP service used to publish orders.
// The maker's HTTP service will be served at http://localhost:2318/
await makerNegotiator.listen(2318, "localhost");
```

## Summary

At this stage you `maker.ts` file should look simliar to this:

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

    // TODO: Create and publish an order so it can be taken by the taker.

    // TODO: Execute the order by swapping the assets.

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
✨  Done in 4.43s.
```
