The `comit-scripts` package helps you run a development environment to build a COMIT App.

When creating an application with create-comit-app (`yarn create comit-app my-app`) it is part of the setup.

Let's install it from the template folder to play with it.

The example  `package.json` of create-comit-app template includes the `start-env` command of `comit-scripts`:

```
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "main": "index.js",
  "scripts": {
    "start": "node ./src/index.js",
    "start-env": "comit-scripts start-env",
    "force-clean-env": "comit-scripts force-clean-env"
  },
  "dependencies": {
    "comit-sdk": "^0.10.0"
  },
  "devDependencies": {
    "comit-scripts": "^0.8.3"
  }
}
```

When running `start-env` the development environemnt is started:

```
yarn run start-env
```
```
yarn run v1.21.1
$ comit-scripts start-env
Creating Docker network (create-comit-app)...✓
Starting Ethereum node...✓
Starting Bitcoin node...✓
Starting two cnds...✓
Writing configuration in env file...✓
🎉 Environment is ready, time to create a COMIT app!
✓
```

The second command `force-clean-env` can be used if the environment unexpectedly crashed and some containers were not removed.
Usually you will not need this command, as [Shutdown](#shutdown) will properly clean up the containers.

#### `Creating Docker network (create-comit-app)...✓`

Creates a docker network to allow several docker containers to communicate with each others. The network is named `create-comit-app`.

#### `Starting Ethereum node...✓`

- Starts a parity node in a docker container,
- Deploys an ERC20 token contract
- Creates two accounts,
- Funds each account with 1000 Ethers and 100 ERC20 tokens.

#### `Starting Bitcoin node...✓`

- Starts a bitcoind node in a docker container,
- Creates two HD wallet,
- Funds each wallet with 10 Bitcoin,
- Mines a new block every second.

#### `Starting two cnds...✓`

Starts 2 cnd (COMIT Network Daemon) in docker containers.

---

Let's take a break and check out what containers are now running:

```
docker ps
```
```
CONTAINER ID        IMAGE                             ... NAMES
207bdd00d103        comitnetwork/cnd:0.4.0            ... cnd_1
e72b5910e530        comitnetwork/cnd:0.4.0            ... cnd_0
7c9855e6f3c0        coblox/bitcoin-core:0.17.0        ... bitcoin
66a52568666d        coblox/parity-poa:v2.5.9-stable   ... ethereum
```
Indeed we have bitcoind, parity and 2 cnds running.

#### `Writing configuration in env file...✓`

Writes useful information to `~/.create-comit-app/env`.

Let's have a look at this `env` file in more details:

```
cat ~/.create-comit-app/env
```
```  
BITCOIN_HD_KEY_0=tprv8ZgxMBicQKsPf8tkuTQ3eftSjgnE17mEaoNbDz8r7N9TQd...
BITCOIN_HD_KEY_1=tprv8ZgxMBicQKsPfCW2nYxkfxMnb49PyTYFCF7sdkHdNWBgm8...
BITCOIN_P2P_URI=127.0.0.1:58233
ERC20_CONTRACT_ADDRESS=0x62d69f6867a0a084c6d313943dc22023bc263691
ETHEREUM_KEY_0=77914ef506f41277bd62c9296143c68bbb8006d7c66619af42a626aced947654
ETHEREUM_KEY_1=f8ce18c1bf5c586ef2f89ed04d0296c49bf915483d2866decddd487dc83488c9
ETHEREUM_NODE_HTTP_URL=http://127.0.0.1:58176
HTTP_URL_CND_0=http://127.0.0.1:58248
HTTP_URL_CND_1=http://127.0.0.1:58249
```

We have here the private keys of the funded accounts on Ethereum and Bitcoin and the endpoint to the various services.
This can be used to be imported in my-app so that you can test it with funded accounts.

### Two cnds?

You may have noticed that you are getting 2 Bitcoin wallet, 2 Ethereum accounts and 2 cnd instances out of `start-env`.
This is simply due to the fact that one cannot do an atomic swap by themselves!

Atomic swap are inherently peer-to-peer.
One can only sell Bitcoin for Ether if someone else buys Bitcoin For Ether.
As you need two parties to do a swap, `start-env` gives you an environment for both parties.

### Shutdown

To stop the environment, just hit `CTRL+C` and wait few seconds:

```
yarn run start-env
```
```
yarn run v1.21.1
$ comit-scripts start-env
Creating Docker network (create-comit-app)...✓
Starting Ethereum node...✓
Starting Bitcoin node...✓
Starting two cnds...✓
Writing configuration in env file...✓
🎉 Environment is ready, time to create a COMIT app!
✓
^C🧹 Cleaning up...
✓
```
