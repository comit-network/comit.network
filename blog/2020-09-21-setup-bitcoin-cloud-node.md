---
title:  "Setting up a ☁️ Bitcoin Full Node"
author: daniel
author_url: https://github.com/da-kami
author_image_url: https://avatars1.githubusercontent.com/u/5557790
tags: [bitcoin, full-node, setup, cloud, google-compute-engine]
---

> [Just do it!](https://www.youtube.com/watch?v=rziG2gn-eQ0)
>
> Shia LaBeouf

In 2020 it is still hard to find quality instructions on how to run a bitcoin full node in the cloud.
In this tutorial we want to share how it can be done in a somewhat time- and money-efficient way. 

The tutorial steps you through the setup and some of our considerations how to achieve the initial sync in a reasonably fast way without depending pre-synced environments.
We are offering recommendations, not guarantees. There is always potential to optimise - feel free to submit an [improvement PR](https://github.com/comit-network/comit.network/tree/master/blog/2020-09-21-setup-bitcoin-cloud-node.md) for the post 🤓

<!--truncate-->

## Google Cloud Setup bitcoind

For this tutorial we assume basic understanding of the Google Cloud platform. If you never used it before, but have e.g. AWS experience it should be easy to follow.
If you don't have cloud platform experience at all you might have to consult the [Google Cloud documentation](https://cloud.google.com/compute/docs) on the way.

### Setup Recommendations

Instance recommendations: 

- Use a `e2-standard-4 (4 vCPUs, 16 GB memory)` instance for installation and initial sync. **This machine will only be used for the first 12-24 hours with costs less than 4 AUD in total.**
- Use a `e2-small` instance (at least 2GB RAM) for running the node AFTER the initial sync. This costs about 33 AUD per month given 24/7 uptime.

Why do we recommend this?

We want to be economical, but we cannot wait forever. Syncing with a node < 8GB RAM takes significant time, we are talking weeks here not days. Running the strong machine for 12ish hours is actually cheaper than running a small machine for 1.5+ weeks.
For more details on machine costs feel free to play with Google's [pricing calculator](https://cloud.google.com/products/calculator).

More tutorial specs & quirks:

- We use `Debian` for our machine. Feel free to use a different distribution, but be aware that you might have to adapt tutorial-steps on the way.
- We use an `additional HDD` that we attach to the instance instead of upping the instance's SSD because it is slightly cheaper.

Notes on costs:

Total cost point is about 33 AUD per month for the e2-small instance + 500 GB HDD when running 24/7.
To give this a try for a month you should calculate with about 40 AUD of costs, assuming that you only run the e2-standard machine for the first 12-24h and then run an e2 machine.
We feel these costs are not really a big deal for the sake of trying something awesome, but you should be aware that there are costs. 

Instead of doing the setup yourself you can opt for using a pre-configured, pre-synced image provided on [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/details/techlatest-public/bitcoin-fullnode).
We opt for doing the setup ourselves to be in full control of what is going on.

### Initial Google Instance Setup

We refer to Bitcoin Core as bitcoind, as in bitcoin daemon, throughout this tutorial.

#### Instance setup

1. Create a `e2-standard-4 (4 vCPUs, 16 GB memory)` instance, provision it with `Debian`.
2. [Add a 500 GB harddisk to the instance](https://cloud.google.com/compute/docs/disks/add-persistent-disk#create_disk) (you can do this during instance setup at the bottom or later).
3. [Configure a static external IP address for the instance](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#assign_new_instance).

#### Configure the Google Cloud firewall

In this step we expose the port 8333 in the Google Cloud firewall so that the instance is publicly accessible on the layer-1 port.

You will have to configure a `New Firewall` within the Network -> Firewall settings of the Google Comupte Engine. 

1. In your instance detail view you should see `Network interfaces`, click on the `default` link under `Network`.
2. Chose `Firewall` in the left hand menu
3. Click `Create Firewall` on the top
4. Define whatever name
5. Change `Targets` to `All instances in the network` (or see Google Cloud docu)
6. Set `Source IP ranges` to `0.0.0.0/0` (or see Google Cloud docu)
7. Specify port under `tsc` to `8333`
8. Click `Create`

The rule will automatically be applied to your instance (due to 5.).

Note: Setting up an [`ingress`](https://cloud.google.com/vpc/docs/firewalls#direction_of_the_rule) (incoming from source to target) rule is all you need.

### Getting bitcoind installed

In this tutorial we are building bitcoind from source.
This can be changed to e.g. download the binary or use [script](https://bitnodes.io/install-full-node.sh) like the one provided by [bitnodes.io](https://bitnodes.io/#join-the-network).

This tutorial is based on the latest [UNIX build instructions](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md) for `v0.20.1` of the docs in the bitcoin repo.

#### Prerequisites:

Make sure `git` is installed:

```shell script
sudo apt-get install git
```

Building bitcoind can take quite some time so we recommend running it [using `screen`](https://www.interserver.net/tips/kb/using-screen-to-attach-and-detach-console-sessions/):

```shell script
sudo apt-get install screen
```

Detach from screen with: `ctrl` + `a` + `d`

Re-attach to screen with: `screen -r` 

Recommended: Run a screen session with command `screen` then go on. 

#### Install Dependencies

Install dependencies:

```shell script
sudo apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libevent-dev libboost-system-dev libboost-filesystem-dev libboost-test-dev libboost-thread-dev
```

We need the wallet so we also have to configure Berkely DB.
The latest Debian package manager does not link to the Berkley DB version that bitcoind requires, thus we opted for [building Berkley DB from scratch](https://github.com/bitcoin/bitcoin/blob/master/doc/build-unix.md#berkeley-db):

```shell script
./contrib/install_db4.sh `pwd`
```

#### Build and install bitcoind

Clone repo and checkout latest tag, in our case `v0.20.1`:
```shell script
git clone https://github.com/bitcoin/bitcoin.git && cd bitcoin && git checkout v0.20.1
```

Run `autogen` script:

```shell script
./autogen.sh`
```

Run `./configure` script with options:

```shell script
export BDB_PREFIX=`pwd`/db4
./configure --disable-tests --disable-bench --with-gui=no --disable-gui-tests BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include"
```

Build bitcoind:

```shell script
make
```

Install bitcoind:

```shell script
sudo make install
```

### Mounting the harddisk as data dir for bitcoind

For details you can check the [documentation](https://cloud.google.com/compute/docs/disks/add-persistent-disk).

We mount the disk to the [default bitcoind data dir](https://github.com/bitcoin/bitcoin/blob/master/doc/init.md) `/var/lib/bitcoind`.

List disks:

```
sudo lsblk
```

Your disk should be named `/dev/sdb` in the list. If not change the following commands accordingly.

Init disk:

```
sudo mkfs.ext4 -m 0 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/sdb
```

Mount disk into bitcoind datadir (add to `fstab` so it is automatically done upon system startup):

```
echo UUID=`sudo blkid -s UUID -o value /dev/sdb` /var/lib/bitcoind ext4 discard,defaults,nofail 0 2 | sudo tee -a /etc/fstab
```

### Starting bitcoind

As per the [init instructions](https://github.com/bitcoin/bitcoin/blob/master/doc/init.md) for adding bitcoind as service started at instance startup.

Navigate to `contrib/init` dir within the bitcoin repo, you'll find the `bitcoind.service` file there.

Copy said file to register the default configuration of the bitcoin service with systemd:

```
sudo cp bitcoind.service /lib/systemd/system
```

Enable the service in systemctl:

```
sudo systemctl enable bitcoind
```

Bitcoind is now configured to start automatially at startup of the machine.

You can either restart the machine or just initially start the service manually:

```
sudo systemctl start bitcoind
```

The initial block sync will start automatically.

If you are syncing with a slow machine, and your sync seems to be stuck free to add some additional nodes to the configuration, you can find some on [bitnodes.io](https://bitnodes.io). Some nodes have block download limits that can cause this behavior.

Example how to add this to the `bitcoin.conf` in `/etc/bitcoin/bitcoin.conf` (as per the `bitcoin.service` definition):

```
addnode=34.220.102.44:8333
addnode=...
```

You can find more configuration options in the [official example config](https://github.com/bitcoin/bitcoin/blob/master/share/examples/bitcoin.conf).

#### Configuring bitcoin-cli to pick up the right config file

In the current setup the bitcoin-cli is not able to determine the data-dir correctly.
The service file we copied earlier specifies the bitcoin config to be expected in the `/etc/bitcoin` directory and the datadir as `/var/lib/bitcoind`.
However, bitcoin-cli by defaults expects the config in the bitcoin user's `home/.bitcoin` directory and cannot pickup the correct data-dir.

First we have to ensure that the configuration file `/etc/bitcoin/bitcoin.conf` exists and specifies the data-dir:

```shell script
datadir=/var/lib/bitcoind
```

In order to let bitcoin-cli pick up the correct config file we can create a symlink for convenience.
Make sure you are in the bitcoin user's home directory:

```shell script
ln -s /etc/bitcoin/bitcoin.conf .bitcoin/bitcoin.conf
```

Note: You can also opt for modifying the `bitcoin.service` file if you prefer that.

### Validate your setup

Once the bitcoind server is configured you can use [bitnodes.io](https://bitnodes.io/#join-the-network) to check if your node is available.
Enter your external IP and port 8333.

You should see a green `xxx.xxx.xxx.xxx:8333 /Satoshi:0.yy.y` where `yy.y` is the version of the node you are running.

To see the current sync status:

```
bitcoin-cli getblockchaininfo
```

Should output:

```json
{
  "chain": "main",
  "blocks": 504098,
  "headers": 649370,
  "bestblockhash": "000000000000000000384bff3b141eb615c5d4e3143af99211dbe74d3720bab5",
  "difficulty": 2227847638503.628,
  "mediantime": 1515880570,
  "verificationprogress": 0.5158736258855465, 
  ...
}
```

In above example we are at `51.58736258855465%` sync.

### ⚠️ Don't forget! ⚠️ 

**Don't forget to shutdown the Google Cloud instance after the initial sync, re-configure to an e2-small and then start it again!**

If you let the e2.standard machine run for longer you will have significant costs!

### Cleanup

If you want to trash everything, make sure to remove:

1. The Google Cloud instance
2. The Google Cloud harddisk(s) 
3. The static IP configuration
4. Potentially remove firewall (should not cause costs though)
