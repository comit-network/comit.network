---
id: "_wallet_bitcoin_.inmemorybitcoinwallet"
title: "InMemoryBitcoinWallet"
sidebar_label: "InMemoryBitcoinWallet"
---

Dummy Bitcoin wallet based on [bcoin](https://github.com/bcoin-org/bcoin).

This is to be used for demos, examples and dev environment only. No safeguards are applied, no data is written on
the disk.
This is not to be used for mainnet, instead, implement your own [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)

## Hierarchy

* **InMemoryBitcoinWallet**

## Implements

* [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)

## Index

### Methods

* [broadcastTransaction](_wallet_bitcoin_.inmemorybitcoinwallet.md#broadcasttransaction)
* [close](_wallet_bitcoin_.inmemorybitcoinwallet.md#close)
* [getAddress](_wallet_bitcoin_.inmemorybitcoinwallet.md#getaddress)
* [getBalance](_wallet_bitcoin_.inmemorybitcoinwallet.md#getbalance)
* [getFee](_wallet_bitcoin_.inmemorybitcoinwallet.md#getfee)
* [sendToAddress](_wallet_bitcoin_.inmemorybitcoinwallet.md#sendtoaddress)
* [newInstance](_wallet_bitcoin_.inmemorybitcoinwallet.md#static-newinstance)

## Methods

###  broadcastTransaction

▸ **broadcastTransaction**(`transactionHex`: string, `network`: string): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)*

*Defined in [src/wallet/bitcoin.ts:153](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`transactionHex` | string |
`network` | string |

**Returns:** *Promise‹string›*

___

###  close

▸ **close**(): *Promise‹void›*

*Defined in [src/wallet/bitcoin.ts:171](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L171)*

**Returns:** *Promise‹void›*

___

###  getAddress

▸ **getAddress**(): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)*

*Defined in [src/wallet/bitcoin.ts:127](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L127)*

**Returns:** *Promise‹string›*

___

###  getBalance

▸ **getBalance**(): *Promise‹number›*

*Implementation of [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)*

*Defined in [src/wallet/bitcoin.ts:120](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L120)*

**Returns:** *Promise‹number›*

___

###  getFee

▸ **getFee**(): *string*

*Implementation of [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)*

*Defined in [src/wallet/bitcoin.ts:166](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L166)*

**Returns:** *string*

___

###  sendToAddress

▸ **sendToAddress**(`address`: string, `satoshis`: number, `network`: string): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)*

*Defined in [src/wallet/bitcoin.ts:132](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`satoshis` | number |
`network` | string |

**Returns:** *Promise‹string›*

___

### `Static` newInstance

▸ **newInstance**(`network`: string, `peerUri`: string, `hdKey`: string): *Promise‹[InMemoryBitcoinWallet](_wallet_bitcoin_.inmemorybitcoinwallet.md)›*

*Defined in [src/wallet/bitcoin.ts:37](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`network` | string |
`peerUri` | string |
`hdKey` | string |

**Returns:** *Promise‹[InMemoryBitcoinWallet](_wallet_bitcoin_.inmemorybitcoinwallet.md)›*
