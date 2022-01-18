---
title: "ItchySats is on Umbrel!"
author: scratchy
author_url: https://github.com/scratchscratchscratchy
author_image_url: https://avatars.githubusercontent.com/u/88706813?v=4
tags: [bitcoin,defi,cfds,dex,mainnet,umbrel]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="ItchySatsUmbrel" src={useBaseUrl('blog/assets/images/2022-01/ItchySatsUmbrel.png')} />

With the Umbrel `0.4.11` release ItchySats is a available in the Umbrel app-store!

If you already have Umbrel you find ItchySats in the Umbrel app-store at: 

**👉 [http://umbrel.local/app-store/itchysats](http://umbrel.local/app-store/itchysats) 👈**

If you don't have Umbrel you can get it [here](https://getumbrel.com/).

If you want to use ItchySats *without* Umbrel you can read up on how to install it using docker or as binary [here](https://itchysats.medium.com/itchysats-is-mainnet-open-a-cfd-position-now-non-custodial-peer-to-peer-accountless-4116dcab3081).
We are working on bundling the ItchySats daemon and the UI into a one-click desktop application, but recommend using ItchySats on Umbrel to be encourage using your own Bitcoin node.

<!--truncate-->

## ItchySats on Umbrel

Here are the steps to get open a CFD position in the ItchySats app:

1. Install the ItchySats app on Umbrel
2. Open the ItchySats app and sign in with the credentials that are displayed for the ItchySats app in the Umbrel app-store
3. Transfer funds into the ItchySats wallet. The wallet is derived from the Umbrel app-seed.
4. Open a `Buy Long` position

<br></br>
<img alt="ItchySatsUmbrelOpenPosition" src={useBaseUrl('blog/assets/images/2022-01/OpenPositionUmbrel.gif')} />
<br></br>
<br></br>

ItchySats uses Umbrel's app authentication feature. The sign-in credentials are uniquely derived on a per-installation, per-app basis. Once you installed the ItchySats app, you use the credentials that are displayed when installing the app in the Umbrel app-store to access ItchySats.
ItchySats uses Umbrel's app-seed feature, so your ItchySats wallet is secured and backed up by your Umbrel seedwords. No additional backup needed.

The current ItchySats beta on Umbrel includes:

- Opening long positions.
- Positions are open for a maximum of seven days until settled by the Oracle.

As explained in our [roadmap](https://itchysats.medium.com/itchysats-roadmap-to-the-most-awesome-bitcoin-dex-464a42bf4881) blogpost, once your position is open you can settle at any point. So, if the price appreciated to your liking, you can close the position which will trigger settlement with the maker. 
If you don't a close position within seven days the Oracle's pice attestation will be used for settlement.

## Umbrel Installation and ItchySats

If you chose to install Umbrel you will have to wait until the Bitcoin blockchain is fully synced until you can use ItchySats on Umbrel.
ItchySats depends on Electrum for blockchain monitoring, transaction broadcasting and wallet management. Umbrel ships with an `electrs` container for Electrum. Once the Bitcoin blockchain was synced completely `electrs` will build an additional index.
Once that is done ItchySats will be able to start up and connect to electrs. If `electrs` is not fully synced, the ItchySats will be unable to start, because it cannot establish a connection to the the `electrs` RPC server.

## What's next

With ItchySats on Umbrel we are one step closer to have a full-blown non-custodial trading solution on Bitcoin. We are working hard to get more feature to you.
You can expect these updates soon:

- Perpetual CFDs that are not limited to 7 days
- Being able to open short positions

Once these basic features are out we will focus on:

- Shipping the application as desktop bundle with integrated long running background tasks.
- Automated limit open and close of position.

After that we will start working on making ItchySats the ultimate Bitcoin DEX by focussing on scaling, trading with multiple makers, a decentralized orderbook and multiple oracles and asset pairs. 

Make sure to read what's on our [roadmap](https://itchysats.medium.com/itchysats-roadmap-to-the-most-awesome-bitcoin-dex-464a42bf4881) for details.

---

If you have questions you can reach us on [Twitter](https://twitter.com/itchysats), [Telegram](https://t.me/joinchat/ULycH50PLV1jOTI0), [Matrix](https://matrix.to/#/!OSErkwZgvuIhcizfaI:matrix.org?via=matrix.org) and [GitHub](https://github.com/itchysats/itchysats).

Happy scratching,

ItchyMax & ScratchScratchScratchy
