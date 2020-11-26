
---
title: "Project Waves: Swapping Sats on Liquid"
author: philipp
author_url: https://github.com/bonomat
author_image_url: https://avatars2.githubusercontent.com/u/224613
tags: [dev-update,liquid,elementsproject]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Waves" src={useBaseUrl('blog/assets/images/2020-11/btc_waves.png')} />

> "You can't stop the waves, but you can learn to surf.", Jon Kabat-Zinn

COMIT's vision is to have an open financial system - truly inclusive, censorship resistant and non-discriminatory. 
And we believe that #Bitcoin is the most promising platform for such an open financial system due to its decentralization and its censorship resistance. 

Ultimately we would love to see such an open financial system to be built on top of Bitcoin, however, as of today, Bitcoin lacks privacy and only supports a single asset (BTC).

As mentioned in [Project Droplet](https://medium.com/comit-network/project-droplet-atomic-swaps-on-liquid-4c5ac045ad3c), we believe that Liquid can be a temporary platform allowing us to build a financial ecosystem around Bitcoin. 
We see the possibility to build products such as lending and borrowing, prediction markets (option/futures) and even saving products. 
All of these share a basic building block: trading.

## Swapping Sats on Liquid

In the following weeks we will focus on that building block and build an atomic swap solution for Liquid to allow traders to trustless buy or sell L-BTC to L-USDT on Liquid. 
In the first version we will focus on a single maker approach, i.e. there is one Liquidity Provider (LP) you have to connect to who will offer you a rate. 
You can then trade against them. 
Think of SideShiftAi, just completely trustless. 

In a follow-up version we will evolve this tool to a peer-to-peer trading solution which allows you to connect to multiple LP at the same time and even create your own orders. 

We created a simple mock-up and would love to hear your feedback: [Figma Mockup](https://www.figma.com/proto/MxcADlWgz6Z8XdwXwFuzVU/BTC%2FUSDT?node-id=199%3A363&scaling=scale-down). 

<img alt="Mock" src={useBaseUrl('blog/assets/images/2020-11/mock.png')} />

If you want to hear more, feel free to reach out to us: 

* Twitter: https://twitter.com/comit_network
* Matrix: https://matrix.to/#/!VXJqVoUrHanVlQFVEU:matrix.org?via=matrix.org

Cheers,
Philipp, Lucas and Thomas (and the rest of COMIT)

## References

* Image: https://pixabay.com/photos/wave-surfer-sport-sea-surf-water-1246560/
* Mockup: https://www.figma.com/proto/MxcADlWgz6Z8XdwXwFuzVU/BTC%2FUSDT?node-id=199%3A363&scaling=scale-down