---
title: "Trade Bitcoin and DAI with COMIT"
author: franck
author_url: https://github.com/d4nte
author_image_url: https://avatars1.githubusercontent.com/u/300805
tags: [bitcoin,dai,atomic swap,ambrosia]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# A Change of Direction

Last year, we spent time and effort creating tools, such as [`create-comit-app` and `comit-scripts`](https://github.com/comit-network/create-comit-app/) to allow developers to build their own COMIT Apps.
We organised local meetups in Sydney and even a hackathon in Singapore.
We had a number of developers excited about the technology and possibilities that COMIT bring in but very few committed to build an app.

We now realize that before we can expect others to build successful apps with our tools, we should demonstrate what can be done with COMIT ourselves.

<!--truncate-->

# Introducing Ambrosia

<img alt="Ambrosia" src={useBaseUrl('blog/assets/images/2020-10/ambrosia.png')} />

This is why we spent the last few months working on [ambrosia](https://github.com/comit-network/ambrosia/), an UI to trade in the COMIT network.
Ambrosia allows you to trade BTC/DAI in a decentralised manner. No third party to trust, no central orderbook, no KYC.
It uses [cnd](https://github.com/comit-network/comit-rs) as backend.

The software has some rough edges, but we wanted to get it out there to have your feedback.
Here are some choices we want your input on:

## Custody

> Not your keys, not your crypto

Ambrosia never holds your crypto, instead it interfaces directly with your hardware wallet (nano ledger s only) to make transactions. 
This is a huge step up towards trustless trading compared to traditional centralized solutions where you have to deposit your funds into an exchange first. 

We believe that custody and security are important criteria to our users, hence we also assume that users are running their own [Bitcoin Core](https://github.com/bitcoin/bitcoin) node.
We also expect users to have access to an Ethereum node, thanks to the standard web3 interface, it is possible to use services such as Infura.

## Trading pair

Ambrosia supports the BTC/DAI pair as we know that Bitcoin/USD is the most popular pair.
Our input on what cryptos would be useful to you is most welcome.

## Decentralized Order Book

We have a [nectar](https://github.com/comit-network/comit-rs) instance that runs and acts as a maker.
This is for test purposes only, and we expect the community to run their own makers once the software is out of alpha.
At this stage, ambrosia can only swap with nectar.

Each application have their own copy of the decentralised order book, they build it by asking the latest offers to their peers. 

## Trying it out

The software is currently in an alpha state, bugs are known and expected.
We are using on mainnet and invite you to try it too.

We do not provide a testnet setup simply because it can be cumbersome to find working faucets or use an hardware wallet.
Also, we have noticed that the experience can differ on mainnet and testnet.

If you want to try out, we strongly recommend you have a chat with us so we can assist:

-   Email: [hello@comit.network](mailto:hello@comit.network)
-   Matrix chat: [#comit:matrix.org](https://matrix.to/#/!HYBOPcopXgKbEnEELc:matrix.org?via=matrix.org&via=privacytools.io) (e2e encryption enabled)
-   Twitter: [@comit_network](https://twitter.com/comit_network)

If you want to try it yourself, you need few components:

-   Ambrosia: [Download](https://github.com/comit-network/ambrosia/releases) or [build yourself](https://github.com/comit-network/ambrosia#ambrosia),
-   cnd: [Download](https://github.com/comit-network/comit-rs/releases) or [build yourself](https://github.com/comit-network/comit-rs/#build-binaries),
-   A [bitcoind](https://github.com/bitcoin/bitcoin) node,
-   Access to a web3 Ethereum node ([geth](https://geth.ethereum.org/), [parity](https://www.parity.io/), [infura](https://infura.io/), etc),
-   A nano ledger s.

Once ready, you can dump the default config:

```
cnd --dump-config > ./config.toml
```

Be sure to point cnd to our nectar instance:

```
[network]
peer_addresses = [ "/ip4/34.123.129.183/tcp/9940" ]
```

By default, cnd assumes that bitcoind and your Ethereum node are running locally.
For example, if you are using infura, just change the corresponding line:

```
[ethereum.geth]
node_url = "https://mainnet.infura.io/v3/<project key>"
```

Finally, start cnd using the modified config file:

```
cnd -c ./config.toml
```

Let us know what you think, happy trading!
