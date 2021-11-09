---
title: "Hermes goes ItchySats"
author: daniel
author_url: https://github.com/da-kami
author_image_url: https://avatars1.githubusercontent.com/u/5557790
tags: [bitcoin,defi,cfds]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Hermes" src={useBaseUrl('blog/assets/images/2021-11/hermes-goes-itchysats.png')} />

In this blogpost we introduce you to our latest project: Hermes, CFD trading using [DLCs](https://bitcoinops.org/en/topics/discreet-log-contracts/) on Bitcoin.
Other than project baru we decided to build on Bitcoin directly rather than building on the Liquid sidechain.
We are teaming up with [ItchySats](https://www.itchysats.network/) for CFD trading directly on Bitcoin and support them with DLC research.

<!--truncate-->

## DeFi - yet again

DeFi - short for decentralised finance - can mean many things.
In the Ethereum world, DeFi is all about smart contracts with governance tokens, yield farming, AMM pools, collateralised loans and lots of other stuff.
Ethereum's smart contract model makes building these things reasonable easy and the pace of innovation is quite incredible.

In the Bitcoin world, many consider Bitcoin to be the original DeFi.
Bitcoin means [many things](https://medium.com/@nic__carter/visions-of-bitcoin-4b7b7cbcd24c) to many different people.
If we think about it as a financial asset, it makes sense to build financial products on top of it.
We think Bitcoin is the world's best collateral - time to leverage it!

Of course, while doing so, we don't want to compromise Bitcoin's core values: decentralised, censorship-resistant and permissionless.

## DeFi on Bitcoin

Bitcoin is constantly evolving.
As you would expect from a system that governs [billions of dollars](https://coinmarketcap.com/), it moves at a fairly slow rate.

While working on project baru, our Bitcoin loan solution on the Liquid sidechain, the ItchySats team approached us with one question:

> Is there any derivative that we *can* build directly on present day Bitcoin?

Yes there is! We can actually achieve CFD (Contract For Difference) trading.
Using DLCs and an Oracle we are able to use the world's best collateral directly on layer 1!

The way we approached CFD trading is similar to [BitMEX' perpetual swaps](https://www.bitmex.com/app/perpetualContractsGuide) - but without a middle man.
Instead of having to trust a platform you trust the protocol on chain.
Due to the decentralized, non-custodial setup there is no account needed.
You stay in control of your keys at any time.

## Project Hermes - goes ItchySats

The COMIT team loves a challenge. When ItchySats approached us with the idea to build a non-custodial CFD solution we were more than excited. 
The Liquid platform is interesting and powerful, but building directly on Bitcoin is more in line with our long term goals. 

That's why we stopped project baru for the time being and started project [hermes](https://github.com/comit-network/hermes).
Roughly two month later we have an MVP ready on testnet.
Non-custodial CFD trading on Bitcoin is becoming a reality.

The last two months were an amazing journey - we tackled "the math" in complex payout curves, we integrated with a first publicly available independent oracle and created a first user interface for CFD trading. 
And on top of that we learned from our previous projects and advanced our architecture into an actor based system.
Not bad for 8 weeks of work.

The COMIT team will keep maintaining the DLC code in project [maia](https://github.com/comit-network/maia), ItchySats will be working on getting Bitcoin CFDs to you.
[Time to hand over the hermes project over to ItchySats.](https://github.com/itchysats/itchysats)

Stay tuned and happy sta-/hacking,

Daniel