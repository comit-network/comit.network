---
id: "_bitcoin_wallet_.bitcoinwallet"
title: "BitcoinWallet"
sidebar_label: "BitcoinWallet"
---

Interface defining the Bitcoin wallet used in the SDK.
You can plug your own wallet by passing a custom implementation of this interface to the [ComitClient](../classes/_comit_client_.comitclient.md).

## Hierarchy

* **BitcoinWallet**

## Implemented by

* [InMemoryBitcoinWallet](../classes/_bitcoin_wallet_.inmemorybitcoinwallet.md)
* [MockBitcoinWallet](../classes/___mocks___bitcoin_wallet_.mockbitcoinwallet.md)

## Index

### Methods

* [broadcastTransaction](_bitcoin_wallet_.bitcoinwallet.md#broadcasttransaction)
* [getAddress](_bitcoin_wallet_.bitcoinwallet.md#getaddress)
* [getBalance](_bitcoin_wallet_.bitcoinwallet.md#getbalance)
* [getFee](_bitcoin_wallet_.bitcoinwallet.md#getfee)
* [sendToAddress](_bitcoin_wallet_.bitcoinwallet.md#sendtoaddress)

## Methods

###  broadcastTransaction

▸ **broadcastTransaction**(`transactionHex`: string, `network`: string): *Promise‹string›*

*Defined in [bitcoin_wallet.ts:19](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`transactionHex` | string |
`network` | string |

**Returns:** *Promise‹string›*

___

###  getAddress

▸ **getAddress**(): *Promise‹string›*

*Defined in [bitcoin_wallet.ts:9](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L9)*

**Returns:** *Promise‹string›*

___

###  getBalance

▸ **getBalance**(): *Promise‹number›*

*Defined in [bitcoin_wallet.ts:11](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L11)*

**Returns:** *Promise‹number›*

___

###  getFee

▸ **getFee**(): *string*

*Defined in [bitcoin_wallet.ts:24](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L24)*

**Returns:** *string*

___

###  sendToAddress

▸ **sendToAddress**(`address`: string, `satoshis`: number, `network`: string): *Promise‹string›*

*Defined in [bitcoin_wallet.ts:13](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/bitcoin_wallet.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`satoshis` | number |
`network` | string |

**Returns:** *Promise‹string›*
