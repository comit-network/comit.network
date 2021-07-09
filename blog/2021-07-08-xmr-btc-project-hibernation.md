---
title: "XMR-BTC swaps: A great success (to be continued)"
author: daniel
author_url: https://github.com/da-kami
author_image_url: https://avatars1.githubusercontent.com/u/5557790
tags: [monero,bitcoin,atomic,swap]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Hibernation" src={useBaseUrl('blog/assets/images/2021-07/hibernate_bear_tx_chaining_dream.png')} />

Where we started and what the latest release has to offer!

<!--truncate-->

## A little bit of history

In June 2020 we set out to bring atomic swaps to Monero.
The basis for this was h4sh3d's protocol, initially presented at [36C3](https://www.youtube.com/watch?v=G-v6hDnzpds&ab_channel=MoneroCommunityWorkgroup).

Pretty much a year has passed since then and looking back now, we have to say it has been a great success!

On October 6th 2020, after the successful finalisation of the XMR-BTC swap PoC Lucas published our first [blogpost](https://comit.network/blog/2020/10/06/monero-bitcoin) explaining XMR-BTC swaps.
At it's core the protocol described in the initial blogpost is still the same.

Our vision was to offer a somewhat usable tool that allows people to trade the XMR/BTC pair.
Whilst that sounds simple initially, we set ourselves some challenges:

1. The trading needs to be trustless, hence the need for an atomic-swap protocol.
2. Trading involves buying AND selling.
3. Trading involves matching up a taker with a maker.

## Where are we now

With the latest release [(0.8.0)](https://github.com/comit-network/xmr-btc-swap/releases/tag/0.8.0), our tool is now feature complete!
The release adds the long awaited functionality of automated maker discovery.

Running the simple command of:

```
swap --testnet list-sellers --rendezvous-point /dnsaddr/rendezvous.coblox.tech/p2p/12D3KooWQUt9DkNZxEn2R5ymJzWj15MpG6mTW84kyd8vDaRZi46o
```

will get you a list of sellers (market makers) that are willing to sell XMR for BTC.
Here is what this looks like in action:

[![asciicast](https://asciinema.org/a/KQZmzBqehqcnjKRJSOyT9mqaz.svg)](https://asciinema.org/a/KQZmzBqehqcnjKRJSOyT9mqaz)

The way this works under the hood is that the CLI connects to a rendezvous-point, configurable via `--rendezvous-point`.
The protocol in use here is the [libp2p rendezvous protocol](https://github.com/libp2p/specs/tree/master/rendezvous).
While still in its infancy, it is serving us well to deliver a working version of maker discovery.
Once connected to the rendezvous point, the CLI requests a list of _registrations_ for a predetermined namespace.
An ASB provider can [configure](https://github.com/comit-network/xmr-btc-swap/tree/master/docs/asb#asb-discovery) their instance to automatically publish such a registration on startup.

But wait, did we say the tool is feature-complete?
Not quite unfortunately.

We would really like to offer buying AND selling for the user but this is blocked by transaction chaining / pre-signing landing in Monero.
You can learn more on that topic in [this](/blog/2021/07/02/transaction-presigning) blogpost.

In summary, we have pretty much delivered exactly what we wanted:

A somewhat usable tool that allows users to trustlessly trade the XMR/BTC pair.

## What's next

We are still very keen on offering the missing feature of selling XMR for BTC. 
We are hoping to pick that feature up once transaction chaining becomes possible on Monero. 

Additionally, we also had some ideas on what _could_ be built on top of or with our tool:

- Swaps completely in the browser:
  Rust is a great language for targeting WASM.
  Compiling everything to WASM would enable swaps completely within the browser, no download necessary.
  The major obstacle here is our dependency on `monero-wallet-rpc` which we currently start transparently in the background.
  This will either need to be replaced by something like [monero-javascript](https://github.com/monero-ecosystem/monero-javascript) or a pure Rust implementation of a Monero wallet.
  Both approaches are not exactly a weekend project but well within reach for anyone that knows their way around Rust.
- A GUI for the swap CLI:
  At the moment, all that is offered to the user is a CLI.
  Whilst sufficient for expert users and to showcase that it works, a proper GUI would be a lot more user-friendly.
  Fortunately, the CLI is completely non-interactive.
  If anyone wants to build a GUI, the recommended way would be to start the CLI for the user in the background and process the logs delivered on stderr.
  An adventurous developer could also try to build a GUI directly in Rust and integrate on a library level.
- A mobile app.
  We have very little experience in our team when it comes to writing mobile apps which is why we didn't focus on this at all.
  For all we know, Rust can target Android as well as iOS which means there should be a way of getting this onto mobile!

This list is by no means exhaustive, and we would love for others to jump onto some of these ideas.
Whilst we will not be pushing any of those forward ourselves, we are more than happy to assist by participating and steering [discussions](https://github.com/comit-network/xmr-btc-swap/discussions) and reviewing pull requests.

As always, jump into our channels if you want to get in touch: [#comit-monero:matrix.org](https://matrix.to/#/#comit-monero:matrix.org).

Happy swapping!
