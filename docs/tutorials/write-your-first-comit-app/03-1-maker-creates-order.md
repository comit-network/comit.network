---
id: write-a-comit-app-maker-order-create
title: Maker - Order Interface
sidebar_label: Maker - Order Interface
---

This section is part of the typescript tutorial for creating your first COMIT-app, that builds two simple command-line application using the COMIT protocol to execute a Bitcoin to Ethereum atomic swap locally on your machine.

This section of the tutorial focuses on the maker side. 

In this section we use the comit-js-sdk's [MakerNegotiator](../comit-sdk/classes/_negotiation_maker_negotiator_.httpservice.md) to create an HTTP API for publishing orders. 
This tutorial does not tackle the problem of "finding a trading partner".

## Initialising the MakerNegotiator

We start with the maker again (in `maker.ts`).
For the maker we use the `MakerNegotiator` class of the comit-sdk to create a simple order HTTP-server using nodejs-express.

> Note by Daniel: It is quite confusing that one has to initialise the MakerNegotiator with the execution params. We should somehow change that. 
> One possibility would be to add a function "setExecutionParams" that explicitly deals with the exec-params. 
> Doing this in the constructor of the Negotiator does not feel right.

Note, that after the negotiation the `MakerNegotiator` will trigger the execution of the swap, hence it has to be initialised with the necessary execution information:

1. The [ComitClient](../comit-sdk/classes/_comit_client_.comitclient.md) used by the maker to communicate with his cnd node for executing the swap.
2. The execution parameters of the maker provided for the taker (so they can reach an agreement on how to execute the swap):
    1. Connection information to the maker's cnd (`peerId` and `addressHint`).
    2. The `expiry` for the alpha (Ethereum) and `beta` (Bitcoin) ledger.
    3. The configuration for the repective ledger (the taker should know on e.g. which network the maker wants to execute the swap).

The `ComitClient` was already initialised through the actor initialisation in the previous section. 

Let's define the execution parameters that the maker is suggesting:

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

For calculating the expiry timestamps we use the `moment` module. You will have to add it to your `dependencies` in your `package.json`:
```json
"moment": "^2.24.0",
```

> Note by Daniel: `TryParams` is confusing here. It is hard to explain why `maxTimeoutSecs` is set to 1000 here. It is generally tough to explain this...
> Especially because it is actually concerning the execution and not the negotiation. The concerns are mixed here. I feel this needs a redesign.

In addition to the parameters mentioned above, the maker is also providing `TryParams`, that define how often his `ComitClient` will poll the swap status from cnd and a maximum timeout.
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

Before we go on, let's define how the `MakerNegotiator` HTTP API shall be exposed to the taker:

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
