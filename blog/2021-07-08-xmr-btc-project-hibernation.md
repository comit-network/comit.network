---
title: "XMR-BTC swaps: A great success (to be continued)"
author: daniel
author_url: https://github.com/da-kami
author_image_url: https://avatars1.githubusercontent.com/u/5557790
tags: [monero,bitcoin,atomic,swap]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Waves" src={useBaseUrl('blog/assets/images/2021-03/hiring.png')} />

Some more bla

<!--truncate-->

## A little bit of history

Last year in (June?) we set out to bring atomic swaps to Monero.
The basis for this was h4sh3d's protocol, initially described here (TODO LINK).

Pretty much a year has passed since then and looking back now, I have to say it has been a great success!

On October 6th 2020, after the successful finalization of the XMR-BTC swap PoC Lucas published our first [blogpost](https://comit.network/blog/2020/10/06/monero-bitcoin) explaining XMR-BTC swaps.
At it's core the protocol described in the initial blogpost is still the same. It is a slightly adopted version or [h4sh3d's swap protocol]()

Our vision was to offer a somewhat usable tool that allows people to trade the XMR/BTC pair.
Whilst that sounds simple initially, we set ourselves some challenges:

1. The trading needs to be trustless, hence the need for an atomic-swap protocol.
2. Trading involves buying AND selling.
3. Trading involves matching up a taker with a maker.

We have come a long way...

## Where are we now

Apart from selling XMR our tool is now feature-complete. With the last release we have added automated maker discovery.



Now we have:

ASB that...

CLI that ...

Auto discovery

And we wanted to have: XMR moves first, but -> Thomas blogpost

## What's next

We achieved what we wanted, and will stop here until we can go on with `XMR moves first`.

If anybody wants to take this further we are happy to assist.
We are happy to steer the project with design decisions. 



We found it very interesting to look into the possibilities designing products for XMR-BTC swaps, but at the end of the day we are a research lab and don't focus on building end-user products.

The next big feature we see going into the codebase is `XMR moves first`.
Until this becomes possible we are not planning to invest an awful lot of time into maintenance. 

We are planning to keep an eye on the repository and will give critical bugs attention, but we will not include new features for the time being.

When it comes to minor feature requests there is only one thing to say:
Contribute! We would love to see more contributions to the codebase and will keep maintaining it.
We are happy to assist with helping to design new features - open an [issue]() or start a [discussion]().
