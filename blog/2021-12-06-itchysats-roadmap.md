---
title: "ItchySats - Roadmap to the most awesome Bitcoin DEX"
author: scratchy
author_url: https://github.com/scratchscratchscratchy
author_image_url: https://avatars.githubusercontent.com/u/88706813?v=4
tags: [bitcoin,defi,cfds,dex,roadmap]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## The Vision: Reach for the moon? We reach for the stars!

<img alt="FlyMeToTheMoon" src={useBaseUrl('blog/assets/images/2021-12/FlyMeToTheMoon.png')} />

We are building the first fully non-custodial, peer to peer Bitcoin DEX. - A "fully non-custodial, peer to peer Bitcoin DEX" - What does that mean?

1. **Non-custodial**: No platform, no middle man - just you and your keys.
2. **Peer to peer**: Trading partners are connected directly, no centralized instance.
3. **Secured on chain**: Your positions are securely locked up on the Bitcoin blockchain.
4. **No counterparty risk**: The protocol ensures your trading partner is fully backed - the margins are locked on chain for the duration of the CFD.
5. **Accountless**: Start it up and trade. No account needed.

<!--truncate-->

ItchySats enables you to grow your Bitcoin without needing to swap into another currency.
By this we mean:

On ItchySats you trade [CFDs - contracts for difference](https://www.investopedia.com/articles/stocks/09/trade-a-cfd.asp).
When trading CFDs you use an underlying asset as collateral - that's Bitcoin on ItchySats - to trade against an asset that can be valued in Bitcoin, but without actually holding said asset.
One very simple example is the BTC/USD price.
On ItchySats you can take a position against the BTC/USD price.
If you think that the price will appreciate you take a long position.
If you think that the price will depreciate you take a short position.

<img alt="Cfd101" src={useBaseUrl('blog/assets/images/2021-12/CFD_101.svg')} />

### Don't trust, verify!

Proving that a product is non-custodial and peer to peer is not super easy because it might not be immediately visible.
There is only one thing we can do: Make it verifyable.
ItchySats' code is open source, available on [GitHub](github.com/itchysats/itchysats).
The CFD protocol used by ItchySats is maintained by the COMIT team on [GitHub](https://github.com/comit-network/maia).

Currently, opening and closing positions happens on Layer-1, i.e. the Bitcoin blockchain.
You can verify all transactions on chain.
Essentially, that makes your complete history verifyable on the blockchain.
We are working on protocols where you don't have to go on chain to close a position and can keep your funds in a channel, in order to use them for future positions.

Our current independent oracle is [Olivia](https://outcome.observer/h00.ooo/x/BitMEX/BXBT) an [open source oracle](https://github.com/LLFourn/olivia) run by Bitcoin community members.
A multi-oracle setup for enhanced security is in the making.

Building trust in software requires time.
This blogpost is an introduction to the protocol and an outlook of what is to come.
This is a first step towards building trust.
If you have questions or want to dive deeper: Contact us on [Telegram](https://t.me/joinchat/ULycH50PLV1jOTI0) or [Matrix](https://matrix.to/#/!OSErkwZgvuIhcizfaI:matrix.org?via=matrix.org).

## The Roadmap: From here to the moon... to the stars!

We are [about to](https://github.com/getumbrel/umbrel/pull/1149) release the ItchySats mainnet beta on [Umbrel](https://getumbrel.com/).

The mainnet beta allows you to:

1. Open a long position as the taker against a fixed maker.
2. The protocol is completely non-custodial, the setup is on chain.
3. Positions are closed after 7 days unless closed by the taker earlier (perpetual positions are in the making).

What assets can you trade?
Our mainnet beta allows you to open a CFD on the BTC/USD price.
But we are planning to allow you to trade pretty much anything that has a value against Bitcoin.

Without further ado, here is our roadmap:

<img alt="ItchySatsRoadmap" src={useBaseUrl('blog/assets/images/2021-12/itchysats_roadmap.svg')} />

We are currently working on these features, which you can expect in upcoming updates:

1. Perpetual CFDs: Allow you to keep the CFD position open for as long as you want. Your positions "roll over" after a fixed interval.
2. Enable short positions: At the moment the taker can only go long - this will enable going long or short.

Once we implement these features we will have reached the milestone **Mainnet Stable**, completing a first stable product.
After Mainnet Stable we will focus on making the solution **awesome**. The following chapters outline what we have planned.

### Fly me to the moon

In this stage we will focus on opening the market for multiple makers and making CFD positions transferable.
This involves being able to trade CFDs in limit orders and trading open positions in a decentralized orderbook.

Once we reach the moon milestone you can expect multiple makers (and potentially maker pools) which will help scaling ItchySats' liquidity.

### Reach for the stars

In this stage we will focus on oracles: We will partner with multiple oracle providers to make the solution more secure and scalable.
Additionally, more trading pairs are to be agreed upon with oracle providers.

Once we reach the stars milestone you can expect an independent multi-oracle setup that allows trading multiple asset-pairs.

### Fullblown P2P DEX

This is _the_ goal. Once we reach this milestone we will have a full peer to peer Bitcoin DEX including a decentralized orderbook, maker pools and multiple oracles.
You will be able to open a CFD on pretty much anything that has a value in Bitcoin by then.

This does not mean that our journey ends here.
We have lots of ideas on how to extend, scale up and improve what will exist by then.
But once we reach this milestone we should have something pretty awesome.

## Under the Hood: Inside of our Mainnet beta

We have a series of posts in the making that will explain the CFD protocol in detail.
In this blogpost we give an overview of what happens under the hood.
Please note that some protocol details are left out in this post in order to keep the blogpost accessible.

In a nutshell there are three players involved when opening and closing a CFD on ItchySats:

1. **Maker**: Publishes offers that define the CFD parameters (price offered, min value, max value, possible leverage).
2. **Taker**: Connects to the maker to get offers and opens positions based on them.
3. **Oracle**: Periodically signs "prices" (in our case the BTC-USD price). The signed price is used to unlock the payout transaction of the CFD to distribute the funds.

While this blogposts discusses the interaction between all three players, we focus on the taker side when explaining details.

### Opening a position

Let's have a closer look at the communication between the three players when opening a position.

<img alt="OpenPosition" src={useBaseUrl('blog/assets/images/2021-12/OpenPosition.svg')} />

As a first step the maker needs to pick an oracle event, i.e. a point in time at which the oracle will attest to the BTC-USD price.
The maker picks an oracle event in the future that will sign the price, e.g. the event that will sign the BTC/USD price in 24 hours.
The oracle event defines when the CFD period ends.
The maker then creates an offer.
The offer includes the maker's price, minimum and maximum quantity, possible leverage and the oracle event to be used.

When a taker connects to a maker the taker will see the offers of the maker.
The taker can then request to open a position with the maker, taking the offer.
Unless the offer is outdated, the maker will accept the taker's request to take the offer.

What follows is a communication phase where the parties set up the CFD transactions.
This is the most complex part, because all the transactions that can later be used for payout are agreed upon by the parties upfront.
In a nutshell, you take a payout curve, define price movement intervals (i.e. discretize) and then prepare one transaction for each interval.
This results in preparing and storing (off-chain) thousands of *potential* payout transactions.
Only one of these transactions will be unlocked once the oracle signs the price.
The protocol under the hood is called DLC aka Discreet Log Contracts.
If you want to learn more about DLCs we recommend this [good summary](https://bitcoinops.org/en/topics/discreet-log-contracts/) and the [dlcspecs repository](https://github.com/discreetlogcontracts/dlcspecs).
The contract setup phase results in publishing the transaction that locks the margin of maker and taker on chain.

Long story short: You as the user - i.e. taker - only click a button on the ItchySats user interface and the ItchySays daemon handles the communication with the other party, the protocol setup involving signing and storing transactions and the publication on chain for you.
**One click is all you need to open a position!**

### Closing a position

Closing and settling a position on chain can be done in two ways.
Given that the maker is online, which is usually the case because the maker is a service provider, the taker can propose a settlement at any given time before the CFD ends.
The maker agrees to settle at the current price's payout.

<img alt="ClosePositionCollab" src={useBaseUrl('blog/assets/images/2021-12/ClosePosition_Collaboratively.svg')} />

In a scenario where taker and maker agree to close the position early, the payout transactions that are prepared during the opening of the position will not be used.
Once the new agreed payout transaction is on chain, the initial payout transactions that involve the oracle cannot be used anymore and can be discarded.
So, if taker and maker agree on closing the position early, the oracle is actually not involved in the closing process.

In case the maker does not agree, or either of the parties does not come online in time, the CFD is closed by using the signed price published by the oracle.
Both the taker and the maker can trigger this independently.

<img alt="ClosePositionNonCollab" src={useBaseUrl('blog/assets/images/2021-12/ClosePosition_NonCollaboratively.svg')} />

Upon price publication by the oracle, the signed oracle event is picked up by either the taker or maker.
The signed price defines which of the initially generated payout transactions can be unlocked.
Either party can pick the payout transaction according to the price and publish the payout transaction on chain independently.

Please note that the transaction scheme used for closing is actually more complicated than what is depicted in this blogpost.
We will go into greater detail in follow-up blogposts.
Until then, if you have any questions feel free to ask in [Telegram](https://t.me/joinchat/ULycH50PLV1jOTI0) or [Matrix](https://matrix.to/#/!OSErkwZgvuIhcizfaI:matrix.org?via=matrix.org).

Long story short: You as the user - i.e. taker - only click a button on the ItchySats user interface and the ItchySays daemon handles the communication with the other party, the protocol setup involving signing and the publication on chain for you.
**One click is all you need to close!**

### Wallet Management

For the moment, ItchySats includes a wallet.
Your ItchySats wallet is derived from a unique seed that is generated when starting the application for the first time.
The ItchySats wallet can only be controlled by you.
Note that your funds are only meant to be in your ItchySats wallet for a short period of time.

You transfer funds from cold storage into the wallet and then open a CFD with a maker.
Once the CFD is set up the funds are securely locked on chain.
Once you close the CFD and settle on chain you receive the funds back in the ItchySats wallet.
Then you can decide to open another position or transfer the funds back to your cold storage.

The application needs a hot wallet because it has to sign a large number of transactions during the CFD protocol setup.
Improving wallet integration is planned for stage 4.
We have been discussing wallet integration for quite a while, but require more user feedback to understand what is the best way forward.
For the time being you will have to fund your ItchySats wallet before being able to open a position.

---

If you want more details on the implementation or have any other question contact us on [Telegram](https://t.me/joinchat/ULycH50PLV1jOTI0) or [Matrix](https://matrix.to/#/!OSErkwZgvuIhcizfaI:matrix.org?via=matrix.org).
We are happy to explain the setup in more detail and point you to the [relevant code parts](https://github.com/itchysats/itchysats/blob/master/daemon/src/wallet.rs).

Stay tuned for the mainnet release on Umbrel - we will post again!

Happy stacking,

ItchyMax & ScratchScratchScratchy
