---
id: "_bitcoin_wallet_.inmemorybitcoinwallet"
title: "InMemoryBitcoinWallet"
sidebar_label: "InMemoryBitcoinWallet"
---

Simple Bitcoin wallet based on [bcoin](https://github.com/bcoin-org/bcoin).

## Hierarchy

* **InMemoryBitcoinWallet**

## Implements

* [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)

## Index

### Methods

* [broadcastTransaction](_bitcoin_wallet_.inmemorybitcoinwallet.md#broadcasttransaction)
* [getAddress](_bitcoin_wallet_.inmemorybitcoinwallet.md#getaddress)
* [getBalance](_bitcoin_wallet_.inmemorybitcoinwallet.md#getbalance)
* [getFee](_bitcoin_wallet_.inmemorybitcoinwallet.md#getfee)
* [sendToAddress](_bitcoin_wallet_.inmemorybitcoinwallet.md#sendtoaddress)
* [newInstance](_bitcoin_wallet_.inmemorybitcoinwallet.md#static-newinstance)

## Methods

###  broadcastTransaction

▸ **broadcastTransaction**(`transactionHex`: string, `network`: string): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [bitcoin_wallet.ts:149](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`transactionHex` | string |
`network` | string |

**Returns:** *Promise‹string›*

___

###  getAddress

▸ **getAddress**(): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [bitcoin_wallet.ts:123](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L123)*

**Returns:** *Promise‹string›*

___

###  getBalance

▸ **getBalance**(): *Promise‹number›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [bitcoin_wallet.ts:116](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L116)*

**Returns:** *Promise‹number›*

___

###  getFee

▸ **getFee**(): *string*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [bitcoin_wallet.ts:162](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L162)*

**Returns:** *string*

___

###  sendToAddress

▸ **sendToAddress**(`address`: string, `satoshis`: number, `network`: string): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [bitcoin_wallet.ts:128](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`satoshis` | number |
`network` | string |

**Returns:** *Promise‹string›*

___

### `Static` newInstance

▸ **newInstance**(`network`: string, `peerUri`: string, `hdKey`: string): *Promise‹[InMemoryBitcoinWallet](_bitcoin_wallet_.inmemorybitcoinwallet.md)›*

*Defined in [bitcoin_wallet.ts:31](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`network` | string |
`peerUri` | string |
`hdKey` | string |

**Returns:** *Promise‹[InMemoryBitcoinWallet](_bitcoin_wallet_.inmemorybitcoinwallet.md)›*
