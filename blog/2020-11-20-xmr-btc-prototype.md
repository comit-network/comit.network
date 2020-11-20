---
title: "XMR-BTC Atomic Swap - PoC to Prototype"
author: franck
author_url: https://github.com/d4nte
author_image_url: https://avatars1.githubusercontent.com/u/300805
tags: [monero,bitcoin,atomic-swaps,opensource,comit]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Our mission is to connect all the blockchains, without adding yet another one.
Our vision is that we believe in a censorship-resistant & non-discriminating open financial market for everyone.

Bitcoin is the major player in the decentralised financial ecosystem but has a traceability issue,
stopping it to be truly censorship-resistant & non-discriminating.
Monero is a privacy focused coin, it is fungible and non-traceable and the most used privacy coin [1](https://bitcoinexchangeguide.com/most-used-privacy-cryptocurrency-coin-monero-xmr-is-popular-in-these-five-states/).

These characteristics make XMR-BTC cross-blockchain applications a great candidate to push towards our vision.

<!-- truncate -->

We have already built a PoC that allows XMR<>BTC atomic swaps [2](https://github.com/comit-network/xmr-btc-swap/), we are now aiming to take this PoC to the next level.
This new project has two facets:

1. Ensure that the software is usable on mainnet without fund loss.
2. Understand the best usecase for Monero-Bitcoin atomic swap and define a product that fulfill said usecase. 

## The Monero Atomic Swap CCS

The Monero community recently funded a proposal to create software and library to support Bitcoin-Monero atomic swaps (project farcaster) [3](https://ccs.getmonero.org/proposals/h4sh3d-atomic-swap-implementation.html).

We are keeping a close look to this project and have already approached and discussed with the farcaster team at several occasions.
We are hoping to collaborate where we can and build a user friendly product on top of a unified solution.
In the mean time, our prototype will be built on top of our PoC.

## Where to find us

- The #comit-monero Matrix room [4](https://matrix.to/#/!QqYPpVbtwYxRItuYiA:matrix.org?via=matrix.org),
- The comit-dev mailing list [5](https://lists.comit.network/mailman/listinfo/comit-dev),
- xmr-btc-poc GitHub repo [6](https://github.com/comit-network/xmr-btc-swap/).

--- 

Find the full announcement on the comit-dev mailing list [7](https://lists.comit.network/pipermail/comit-dev/2020-November/000024.html).


## References

- [1] https://bitcoinexchangeguide.com/most-used-privacy-cryptocurrency-coin-monero-xmr-is-popular-in-these-five-states/
- [2] https://github.com/comit-network/xmr-btc-swap/
- [3] https://ccs.getmonero.org/proposals/h4sh3d-atomic-swap-implementation.html
- [4] https://matrix.to/#/!QqYPpVbtwYxRItuYiA:matrix.org?via=matrix.org
- [5] https://lists.comit.network/mailman/listinfo/comit-dev
- [6] https://github.com/comit-network/xmr-btc-swap/
- [7] https://lists.comit.network/pipermail/comit-dev/2020-November/000024.html
