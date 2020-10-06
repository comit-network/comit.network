---
title: "COMIT goes Testnet"
author: philipp
author_url: https://github.com/bonomat
author_image_url: https://avatars2.githubusercontent.com/u/224613
tags: [announcement, testnet]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

> Life is life  
> when we all give the power  
> we all give the best  
> every minute of an hour  
> don't think about a rest  
>
> — *[Opus](https://www.youtube.com/watch?v=rQSmfR1_SVE)*

After months of hard work we are proud to present a live testnet version of COMIT. 
The description below gives you step-by-step guide of how to setup the COMIT Node daemon (cnd) on your machine and do a first swap against Bobtimus: an automated swapping bot on our side. 
He currently supports Bitcoin and Ether but will be extended in the future.

<!--truncate-->

## Phase 1: Setup
In order to achieve an atomic swap between Bitcoin and Ethereum on testnet you need the following components running:

1. A COMIT Node currently consists of two parts:
    * `cnd`: The COMIT Node daemon (cnd) that implements the COMIT protocol.
    * `btsieve`:  A blockchain client monitoring tool that allows the cnd to connect to the Ethereum and Bitcoin client.
2. An Ethereum `parity` client connected to the `ropsten` testnet.
3. A Bitcoin `bitcoind` client connected to `testnet3`.

### Download cnd (COMIT Node daemon) and btsieve:

Have a look at the readme in our [repository](https://github.com/comit-network/comit-rs/blob/master/README.md) for an up-to-date description (this blog post might get outdated). 
If your [build environment](https://github.com/comit-network/comit-rs/blob/master/README.md#setup-build-environment) is already setup, all you need to do is follow the steps under [build & run](https://github.com/comit-network/comit-rs/blob/master/README.md#build--run):

1. Clone the comit-rs repository.
```bash 
git clone git@github.com:comit-network/comit-rs.git  
cd comit-rs && cargo build
```
2. Put a [default](https://github.com/comit-network/comit-rs/blob/master/btsieve/config/btsieve.toml) config file into `~/.config/comit/btsieve.toml` or pass `--config <config_file>`.
3. Start a bitcoin testnet node (port to be set according to btsieve configuration). 
We provide a command for running bitcoind in a docker container in the [appendix](#bitcoind-in-a-docker-container).
4. Start an ethereum ropsten node (port to be set according to btsieve configuration). 
We provide a command for running parity in a docker container in the [appendix](#parity-in-a-docker-container).
5. Startup btsieve: 
```bash
target/debug/btsieve
```
6. Startup cnd: 
```
target/debug/cnd
```
If the `[web_gui]` section is specified in the configuration the current release of the user interface [comit-i](https://github.com/comit-network/comit-i) will be served by cnd once it has started up (defaults to [http://localhost:8080](http://localhost:8080)).
7. Congratulations, your cnd should be up and running. 
Take a break and grab a coffee or a beer, the blockchains will take some time to sync. 
8. Post your selfie on twitter: #connectalltheblockchains.


### Get test coins 
In order to swap assets you first need some coins, so if you don't have testnet coins yet we recommend using a coin faucet to get some. 

#### Ethereum:
We recommend using Metamask for the sake of this demo as we have built-in support for Metamask in comit-i. 
However, if you are an advanced user, using web3 and a cli works perfectly fine as well.

1. Install Metamask: [https://metamask.io/](https://metamask.io/)
2. Get ropsten Ether from [https://faucet.metamask.io/](https://faucet.metamask.io/)

#### Testnet Bitcoin

For the sake of this demo, we recommend using bitcoind-cli. 
A helpful collection of API documentation can be found [here](https://bitcoincore.org/en/doc/) but the needed commands are rather limited.

1. To simplify further commands if you are using the Docker image, you can create a shell command alias:
```bash
alias btc-cli='docker exec bitcoind bitcoin-cli -testnet'
```
2. Get a new address using bitcoin-cli:
```bash
btc-cli getnewaddress
```
3. Get testnet bitcoin from an online faucet, e.g. [https://testnet-faucet.mempool.co/](https://testnet-faucet.mempool.co/)



## Phase 2: ???

<iframe width="560" height="315" src="https://www.youtube.com/embed/rQSmfR1_SVE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Phase 3: Profit
Now that you have all the components running and you have some tests coins we can actually do a swap! Fortunately cnd includes a user interface called `comit-i` that we can now use to do a swap against our automated swapping bot. 

### How to use comit-i

1. Open comit-i in the browser: [http//localhost:8080](http//localhost:8080)
2. Register protocol handler for COMIT links (tested on Chrome: Version 75.0.3770.142):
<img alt="comit-i: register handler for COMIT links" src={useBaseUrl('blog/assets/images/2019-07/comiti_install_handler.png')} />;
3. Check on Twitter for the latest offer from [@COMITBobtimus](https://twitter.com/COMITBobtimus) and click on a COMIT link. Your browser should automatically forward to the link landing page. 
Depending on what currency you are swapping, you will need to provide additional addresses. 
In the case of the screenshot, the swap is between Ether and Bitcoin, i.e. you will **give (sell)** Bitcoin and will **receive (buy)** Ether.
When done, click on **Send**.
<img alt="comit-i: link-landing page" src={useBaseUrl('/blog//assets/images/2019-07/comit_link_landing.png')} />;
4. You will be redirected to the overview of pending swaps showing you your request:
<img alt="comit-i: pending" src={useBaseUrl('/blog/assets/images/2019-07/comiti_pending.png')} />;
5. You can click on the swap to get more details.
As soon as **Bobtimus** has accepted the request you can move forward with the **funding action**.
In our example, you will need to fund the **[Bitcoin HTLC](./2019-07-11-a-closer-look-on-bitcoin.md)**.
Go ahead and fund it with your favorite wallet or use `btc-cli sendtoaddress <address> <amount>` if you are running bitcoind in a docker container as described above.
<img alt="comit-i: fund" src={useBaseUrl('/blog/assets/images/2019-07/comiti_fund.png')} />;
6. Now you will need to wait until your transaction has been included in the Bitcoin blockchain. As soon as this happened, Bobtimus will follow up with funding the **Ether HTLC**.  
<img alt="comit-i: funded" src={useBaseUrl('/blog/assets/images/2019-07/comiti_both_funded.png')} />;
7. In the next step, you will need to redeem the **Ether HTLC**.
For that, click on the **redeem** button and you will be shown a dialog which allows you to send a transaction to the **Ether HTLC** with your secret.
As soon as your transaction has been confirmed, you will receive your Ether.
For you, there is no further action to be done.
<img alt="comit-i: redeem ether" src={useBaseUrl('/blog/assets/images/2019-07/comiti_redeem_eth.png')} />;
8. By redeeming the **Ether HTLC** you revealed your secret.
Bobtimus is able to now take his Bitcoin from the **Bitcoin HTLC**.
As soon as he has redeemed his part, i.e. he redeemed the **Bitcoin HTLC**, you will see the following: 
<img alt="comit-i: both redeemed" src={useBaseUrl('/blog/assets/images/2019-07/comiti_both_redeemed.png')} />;

Congratulations on that, feel free to play around with it and tell us how it goes in the comment section below or on twitter at: [@comit_network](https://twitter.com/comit_network).

Happy swapping,  

[Philipp](https://twitter.com/bonomat) & the whole CoBloX Team

## Appendix

### Bitcoind in a docker container

```bash
    docker run \
    --name bitcoind \
    --rm \
    -p 18332:18332 \
    -p 28332:28332 \
    coblox/bitcoin-core:0.17.0 \
    -testnet \
    -server \
    -printtoconsole \
    -rpcbind=0.0.0.0:18332 \
    -rpcauth=bitcoin:cb77f0957de88ff388cf817ddbc7273$$9eaa166ace0d94a29c6eceb831a42458e93faeb79f895a7ee4ce03f4343f8f55 \
    -rpcallowip=0.0.0.0/0 \
    -debug=1 \
    -zmqpubrawblock=tcp://*:28332 \
    -acceptnonstdtxn=0
```

### Parity in a docker container

You can follow the instructions from [wiki.parity.io](https://wiki.parity.io/Docker#configure-parity-ethereum) or use the command belwo:
We assume you want to persist the blockchain data so that you don't have to resync between container restarts:  
```bash
mkdir -p ~/.local/share/io.parity.ethereum/docker/
touch ~/.local/share/io.parity.ethereum/docker/config.toml
echo "[parity]
chain = "ropsten"
[rpc]
interface = "all"
jsonrpc-interface = "all"
cors = ["all"]" > ~/.local/share/io.parity.ethereum/docker/config.toml
```  

Start parity:     
```bash
docker run \
  --name parity \
  --rm \
  -p 8545:8545 \
  -d \
  -v ~/.local/share/io.parity.ethereum/docker/:/home/parity/.local/share/io.parity.ethereum/ \
  parity/parity:v2.5.0 \
  --base-path /home/parity/.local/share/io.parity.ethereum 
``` 

Verify that your parity node responds with: 
```bash
{"jsonrpc":"2.0","result":"3","id":67}
``` 
```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' -H "Content-Type: application/json" localhost:8545
```
