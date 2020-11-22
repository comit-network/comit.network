---
title: "Project Droplet: Atomic Swaps on Liquid - Takeaways"
author: philipp
author_url: https://github.com/bonomat
author_image_url: https://avatars2.githubusercontent.com/u/224613
tags: [dev-update]
---

import useBaseUrl from '@docusaurus/useBaseUrl';



Over the last 2 weeks we looked into Blockstream's sidechain Liquid. 
We explored its confidential transaction format [[2]](https://elementsproject.org/features/confidential-transactions) and built a little PoC which enables two parties to swap atomically 2 assets on Liquid [[1]](https://blockstream.com/liquid/). 

<!--truncate-->


We did this because COMIT's vision is to have an open financial system - truly inclusive, censorship resistant and non-discriminatory. 
Such a financial system has to allow for exchange of funds between different market participants such as investors, lenders and borrowers in a trustless manner. 
Liquid seems to be a promising platform for such marketplaces as it has built-in support for different assets in a single transaction while keeping amounts, addresses and assets confidential. 
These features used in combination allow us to create trustless and private atomic swaps, trustless loans and other financial products.

Below we summarize our key findings and describe the swap protocol which we implemented in our PoC.


## Elements and Liquid

Liquid is Blockstream's sidechain to Bitcoin based on Elements [[4]](https://elementsproject.org) which is an open source blockchain originated on Bitcoin's source code but extended with additional features such as confidential transactions and the ability to issue assets.

For our PoC we used elementsd in regtest mode and hence for the rest of this blogpost we will talk about Elements. 

### Confidential transactions

One of Elements' core feature is confidential transactions [[6]](https://elementsproject.org/features/confidential-transactions): by default, all transactions in Elements are confidential. 
Same as in Bitcoin transactions are based on the UTXO model, however, the amount and the asset type being transferred are cryptographically hidden. 
Only the participants in a transaction know the real values. 
This is a huge step towards privacy and censorship resistance as no 3rd party knows what amount or asset is being transferred.

Note: transaction fees are always non-confidential.

A confidential UTXO can look like this:

```json
 {
      "value-minimum": 0.00000001,
      "value-maximum": 45035996.27370496,
      "ct-exponent": 0,
      "ct-bits": 52,
      "surjectionproof": "01000...",
      "valuecommitment": "09a9f...",
      "assetcommitment": "0ad37...",
      "commitmentnonce": "02c64...",
      "commitmentnonce_fully_valid": true,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_HASH160 24f69b6b10f3e71b69a130bcd8ffaf3a69624305 OP_EQUAL",
        "hex": "a91424f69b6b10f3e71b69a130bcd8ffaf3a6962430587",
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "XEigbcVAKLpzMoRhPXCHFRVw7Gs5FsRjQP"
        ]
      }
 }

```

#### Confidential transactions in a nutshell

To build a confidential transaction the receiver needs to create a *blinded address* which is a regular address with an additional public key attached to it. This public key is called the *blinding key*. 
The creator of the transaction uses this blinding key to hide the assets and amounts of transaction outputs.

To hide amounts and asset types Elements uses Pedersen commitments, a commitment scheme which lets you keep a piece of data secret but commit to it so that you cannot change it later. 
This may sound similar to hash functions; Pedersen commitments go one step further though and allow for an additional property: commitments can be added up, the sum of the commitment of data data is the same as the commitment of the sums data, e.g. : `C(bf_1, d_1) + C(bf_2, d_2) == C(bf_1 + bf_2, d_1 + d_2)` where `bf_1` and `bf_2` are blinding factors and `d_1` and `d_2` are data .

For hiding amounts in Elements, our Pedersen commitments are constructed using elliptic curve (EC) points.
EC public keys obey the additively homomorphic property as described above. 
With this tool we can replace the integer-based amount (8 bytes) with a 33-byte Pedersen commitment.

Pedersen commitments are not enough, we also need rangeproofs and surjection proofs to ensure that the hidden amounts are within a certain range. 
A more detailed explanation would go beyond the scope of this blog post. 
We refer the interested reader to [[8]](https://elementsproject.org/features/confidential-transactions/investigation) and our PoC in [[3]](https://github.com/comit-network/droplet).

### Native assets

Another core feature of Elements is the ability to issue assets. 
Every asset is identified by an `Asset ID` and has one (or a federation of multiple) issuer. 
A list of all currently available assets on Elements can be found here [[7]](https://blockstream.info/liquid/assets). 
In our opinion the most interesting assets on Liquid are L-BTC - a token pegged 1-to-1 to the Bitcoin mainchain - and L-USDT - a USD stable coin issued by Tether.

When transferring any asset the sender has to specify the `asset` ID she wishes to transfer. 
For a non-confidential UTXO showing the `asset` see a few lines below.

Note: Transaction fees on Liquid are always paid in L-BTC. 
However, one can use a third party such as Liquid Taxi [[5]](https://liquid.taxi/) who will pay for your transaction fees in L-BTC. 
In return you pay the service provider in a different asset.

A non-confidential UTXO stating `value` and `asset` in plain looks like this:

```json
{
      "value": 10.00000000,
      "asset": "b2e15d0d7a0c94e4e2ce0fe6e8691b9e451377f6e46e8045a86f7c4b5d4f0f23",
      "commitmentnonce": "",
      "commitmentnonce_fully_valid": false,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_HASH160 654af855ed5bb080d9597e8fe215c61a52ac3d40 OP_EQUAL",
        "hex": "a914654af855ed5bb080d9597e8fe215c61a52ac3d4087",
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "XLapuXkFSue2nhrj4eLiAB6MdA32eEmcE2"
        ]
      }
    }

```

### Swap protocol

Same as Bitcoin, Elements' transactions follow the UTXO model. 
With that in mind, we can build a true atomic swap protocol which allows for swapping two assets within a single transaction. 
If this transaction is mined, the swap was successful, if not, the swap didn't happen and no transaction fees were wasted. 
No hashlocks, timelocks, or refund transactions are needed. 

Our swap protocol assumes that the two parties have already negotiated what amounts and asset types they want to exchange. We also assume that one of the assets is L-BTC, so that the party selling it can take care of the transaction fees. 
In order to collaboratively create a valid transaction which exchanges the ownership of these 2 assets, the two parties need to share some additional information. 
This is what the protocol looks like:

#### Step 1 

Alice sends her `input` to Bob, identifying which UTXO Alice will be spending from. 
If this input is confidential, she also has to provide the input's blinding key `input_blinding_sk`. 
Importantly, this is _not_ the private key for the address she is spending from!
With this key, Bob is only able to unblind the input and see its value and asset type. 
He will need to do so in order to create the transaction outputs.

She also sends two additional addresses `address_redeem` and `address_change` to tell Bob where she wants to receive her part of the swap. 
Both these addresses are confidential and contain an additional blinding public key.

#### Step 2

After Bob has received the information from Alice, he creates the swap transaction and adds his own `input` as well as his confidential transaction outputs, corresponding to his `redeem_address` and his `change_address`. 
Using the blinding keys from the addresses, Bob is able to complete the confidential transaction, hiding both assets and amounts.

He signs his input and sends the transaction back to Alice.

#### Step 3

Alice now holds a confidential swap transaction from Bob. 
Using her private blinding key corresponding to her two outputs, she is able to verify that Bob constructed the transaction according to what they previously negotiated. 
If everything is in order, she finalizes the transaction, by signing her input and broadcasting it to the blockchain.

The swap is now complete.

The code for this protocol can be found in our PoC in [[3]](https://github.com/comit-network/droplet).

<img alt="Ambrosia" src={useBaseUrl('blog/assets/images/2020-11/BTC_USDT_atomic_swap_croped.svg')} />


# What's next

We are very happy with the outcome of the project and feel confident with Elements's confidential transaction format. With this knowledge we can now go ahead and build an experimental trading application.  

We see the browser as the most accessible platform, so we are interested in exploring how to compile our project to wasm.
One challenge we see besides compiling to wasm is around wallet management, in particular UTXO management.
For that, we could make use of GDK [[9]](https://github.com/Blockstream/gdk).
Alternatively we could integrate directly with existing solutions such as Blockstream's Green Wallet which is available for Android, iOS and Desktop. 

Either way, we are motivated to continue working with Elements and Liquid.


Cheers,
Lucas, Philipp and Thomas


### References

* [1] https://blockstream.com/liquid/
* [2] https://elementsproject.org/features/confidential-transactions
* [3] https://github.com/comit-network/droplet
* [4] https://elementsproject.org
* [5] https://liquid.taxi/
* [6] https://elementsproject.org/features/confidential-transactions
* [7] https://blockstream.info/liquid/assets
* [8] https://elementsproject.org/features/confidential-transactions/investigation
* [9] https://github.com/Blockstream/gdk
