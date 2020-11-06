---
title: "Fail⬅️⬅️⬅️⬅️Learning faster"
author: franck
author_url: https://github.com/d4nte
author_image_url: https://avatars1.githubusercontent.com/u/300805
tags: [bitcoin,dai,atomic swap,ambrosia]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Ambrosia

We recently released [ambrosia](./2020-10-12-ambrosia-alpha-release.md), a GUI allowing BTC to DAI peer-to-peer and non-custodial trading powered by COMIT.
This release marked our change of focus from providing tools to developer to directly targeting end users. 

We spent the last weeks demonstrating this MVP to several users, we had interesting feedback and conversation with various user profiles, from trader to hodler.

<!--truncate-->

At this point of time, we felt that BTC&lt;&gt;DAI dex trading may not be what users are currently after and hence decided to drop the project.

While the development efforts which lead to this MVP did not lead to a successful product, time was not wasted.
We made major learnings that will allow us to move faster, for example, our blockchain monitoring solution was not up to scratch for a mainnet environment.
You can find more details of our learnings in the [closing notes](https://lists.comit.network/pipermail/comit-dev/2020-October/000017.html).

# wBTC&lt;&gt;BTC

Several users have expressed interest in a wrapped Bitcoin to Bitcoin atomic swap trading platform.
The drive behind it is two folds: avoid the option problem and create an open market for ERC20 wrapped BTC.
Depositing and withdrawing wrapped Bitcoin can have some restrictions depending on the provider: fees, KYC, high confirmation requirements.

Because of the demand, we forked Ambrosia to provide a wBTC&lt;&gt;BTC version.
We chose wBTC because it is simply the most popular wrapped Bitcoin token.

The fork is available at [bitcoin-unwrap/comit-rs](https://github.com/bitcoin-unwrap/comit-rs) & [bitcoin-unwrap/ambrosia](https://github.com/bitcoin-unwrap/ambrosia)

You can become a maker by running `nectar` or try out as a taker using `ambrosia`.
As usual, you are welcome to reach us if you need assistance to setup it up.

# Moving forward

We have spent a lot of time on the Ethereum&lt;&gt;Bitcoin atomic swap ecosystem since we started in 2018.
While our focus changed within this domain, from providing a dev tool kit to building end user products, we feel it is time to focus on new technologies.

We are currently very excited to look further into Monero and start looking into Liquid.
We are also increasing our communication to foster collaboration with other open source projects, more on that in a follow-up post.


Cheers,
The COMIT team

---

Feel free to reach us:

- Direct Email: [hello@comit.network](mailto:hello@comit.network)
- Dev Mailing list: [comit-dev@lists.comit.network](https://lists.comit.network/mailman/listinfo/comit-dev)
- General Matrix chat: [#comit:matrix.org](https://matrix.to/#/!HYBOPcopXgKbEnEELc:matrix.org?via=matrix.org&via=privacytools.io)
- Dev Matrix chat: [#comit-dev:matrix.org](https://matrix.to/#/!eDtJfYgJutkmKTvbOH:matrix.org?via=matrix.org)
- Monero Matrix chat [#comit-monero:matrix.org](https://matrix.to/#/!QqYPpVbtwYxRItuYiA:matrix.org?via=matrix.org)
- Twitter: [@comit_network](https://twitter.com/comit_network)
