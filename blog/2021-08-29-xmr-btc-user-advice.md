---
title: "XMR-BTC swap 🚀🌕 - a few words of advice"
author: daniel
author_url: https://github.com/da-kami
author_image_url: https://avatars1.githubusercontent.com/u/5557790
tags: [monero,bitcoin,atomic,swap]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This blogpost is to help XMR-BTC swap CLI users with understanding the constraints around the XMR-BTC swap CLI tool so they don't run into trouble of being punished and losing Bitcoin.

<!--truncate-->

## Rationale

We love to see that XMR-BTC swaps are taking off in the community.

We have seen some users having trouble with the swap CLI tool.
We take bug reports serious and try to reproduce and fix issues reported.
In a decentralized, anonymous world it is sometimes hard to understand what happened and reproduce issues.
To avoid users running into a `punish` scenario this blogpost explains the transaction publication constraints around the CLI and ASB in more detail.

The implemented XMR-BTC swap protocol is designed in a way, that most of the "heavy lifting" of the incentive logic is on the Bitcoin side.
For a more detailed understanding of the protocol please make sure you have already had a look at [this presentation](https://youtu.be/Jj8rd4WOEy0) and [this blogpost](https://comit.network/blog/2020/10/06/monero-bitcoin) before reading this blogpost.

Currently, the CLI can only buy XMR (i.e. the CLI user holds Bitcoin initially and receives XMR through the swap).
The CLI  moves first locking up the BTC on the Bitcoin blockchain.
The ASB will see the Bitcoin lock transaction (`lock_tx`) and commences locking the XMR on the Monero blockchain.
In case the ASB does not have enough funds at that point in time, or is offline, it can happen that the CLI has to take back the Bitcoin because the ASB never locks up XMR.

Taking back the Bitcoin in case the ASB does not lock XMR is split into two transactions, `cancel_tx` and `refund_tx`.
The CLI can publish first the `cancel_tx` and then the `refund_tx` `72` blocks after the `lock_tx` inclusion block.

```
      block_height_lock     block_height_lock+72                     
      |                     |     block_height_cancel                 block_height_cancel+72
      |                     |     |                                   | 
      |                     |     |                                   |    
[...]-[lock_tx]-[...]- ... -[...]-[cancel_tx]-[refund_tx]-[...]- ... -[...]-[punish_tx]
      |                           |                                       |
      |                           |                                       |
      |<-CLI 72 blocks to redeem->|<---CLI 72 blocks to cancel+refund --->|<--ASB can punish
```

The `cancel_tx` can be published by either the CLI or the ASB.
Both parties have an incentive to publish the `cancel_tx` - the CLI to `refund` the BTC, the ASB to enforce the `refund` of the CLI.
The ASB needs the CLI's refund transaction to be able to refund the XMR locked by the ASB.
Thus, if the CLI never refunds the BTC, the ASB would never be able to take back the locked XMR.
That's why there is a `punish_tx` after `72` blocks, that can be used by the ASB to take the Bitcoin.

This means the CLI has a 12 hour time window to send the `redeem_tx`. If redeem is not possible `cancel` and `refund_tx`s.
In case the `cancel_tx` was already published by the ASB the CLI cannot publish it again, but can trigger `refund`. 
The CLI checks if the `cancel_tx` is already present before trying to publish it.

The CLI is designed to automatically publish `cancel_tx` and `refund_tx` after `block_height-lock+72` - but if the software runs in an error before`block_height-lock+72` it might not be guaranteed.
The CLI user is responsible for making sure the CLI is running for publishing the `cancel_tx` after `block_height_lock+72` and the `refund_tx` before `block_height_cancel+72`.

The ASB is a long-running daemon and if it locked up XMR for a swap, but user does neither redeem nor refund until `block_height_cancel+72` the ASB sends the `punish_tx` automatically.
Note that given the current code base the ASB will also automatically publish the `cancel_tx` unless an ASB provider prevents that (or the ASB is offline).
A CLI use should however **not** rely on the ASB provider publishing the cancel transaction, but should try to publish it after `block_height_lock+72`.

Note that the `72` blocks can be changed to a different number, but is currently enforced for both CLI and ASB in [code](https://github.com/comit-network/xmr-btc-swap/blob/529de8d5fd1c81dfa8d0d00e6b3f9994db26cd59/swap/src/env.rs#L51-L52) and validated upon protocol setup.

## Advice

* Always use the latest version of the CLI.
* Transactions can only be published if the swap CLI is running, so make sure to `resume` or manually `cancel` + `refund` in case there is an error.
* Monitor your swaps - refund becomes available after 12 hours. You then have a 12 hour time window to publish the `cancel` and `refund_tx` using the CLI.
  * If the swap CLI runs into an error in between `block_height_lock` and `block_height-lock+72` you can try the `resume` command to continue.
  * If you are past `block_height-lock+72` use the manual `cancel` and `refund` commands to publish the transactions.
  * If manual `cancel` and `refund` run into an error please open an issue and then **try again**.
    * Sometimes there are connection issues with Electrum that can be overcome by just running the same command again.
    
Don't just trust the CLI to handle your `cancel` and `refund_tx` automatically - in most scenarios this works, but it is recommended to be awake and monitor your swap between `block_height_lock+72` and `block_height_lock+144` so you can intervene in case there is a problem.

Use the CLI's help docs:

* `swap --help` shows how to use the swap tool (options, flags, subcommands)
* `swap cancel --help` shows how to use the cancel subcommand
* `swap refund --help` shows how to use the refund subcommand

If you don't remember your `swap-id` you can use `swap history` to see all your swaps.

## Reporting issues

* When [opening an issue](https://github.com/comit-network/xmr-btc-swap/issues) please describe what happened step by step. 
* Show the commands that were executed in chronological order.
* Attach logs; the CLI stores logs for each swap in the CLI's data directory (`logs` subfolder).
* Make sure to include the version of the CLI you used (you can run `swap --version`).
