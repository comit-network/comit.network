---
id: "___mocks___bitcoin_wallet_.mockbitcoinwallet"
title: "MockBitcoinWallet"
sidebar_label: "MockBitcoinWallet"
---

## Hierarchy

* **MockBitcoinWallet**

## Implements

* [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)

## Index

### Methods

* [broadcastTransaction](___mocks___bitcoin_wallet_.mockbitcoinwallet.md#broadcasttransaction)
* [getAddress](___mocks___bitcoin_wallet_.mockbitcoinwallet.md#getaddress)
* [getBalance](___mocks___bitcoin_wallet_.mockbitcoinwallet.md#getbalance)
* [getFee](___mocks___bitcoin_wallet_.mockbitcoinwallet.md#getfee)
* [sendToAddress](___mocks___bitcoin_wallet_.mockbitcoinwallet.md#sendtoaddress)

## Methods

###  broadcastTransaction

▸ **broadcastTransaction**(`transactionHex`: string, `network`: string): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [__mocks__/bitcoin_wallet.ts:4](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/__mocks__/bitcoin_wallet.ts#L4)*

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

*Defined in [__mocks__/bitcoin_wallet.ts:13](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/__mocks__/bitcoin_wallet.ts#L13)*

**Returns:** *Promise‹string›*

___

###  getBalance

▸ **getBalance**(): *Promise‹number›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [__mocks__/bitcoin_wallet.ts:17](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/__mocks__/bitcoin_wallet.ts#L17)*

**Returns:** *Promise‹number›*

___

###  getFee

▸ **getFee**(): *string*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [__mocks__/bitcoin_wallet.ts:21](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/__mocks__/bitcoin_wallet.ts#L21)*

**Returns:** *string*

___

###  sendToAddress

▸ **sendToAddress**(`address`: string, `satoshis`: number, `network`: string): *Promise‹string›*

*Implementation of [BitcoinWallet](../interfaces/_bitcoin_wallet_.bitcoinwallet.md)*

*Defined in [__mocks__/bitcoin_wallet.ts:26](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/__mocks__/bitcoin_wallet.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`satoshis` | number |
`network` | string |

**Returns:** *Promise‹string›*
