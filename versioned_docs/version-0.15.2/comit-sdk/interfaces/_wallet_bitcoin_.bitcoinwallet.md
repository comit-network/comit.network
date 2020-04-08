---
id: "_wallet_bitcoin_.bitcoinwallet"
title: "BitcoinWallet"
sidebar_label: "BitcoinWallet"
---

Interface defining the Bitcoin wallet functionalities needed by the SDK to execute a swap involving Bitcoin.
It is expected from a COMIT App developer to write their own class that would implement this interface.
Depending on the use case and platform, such class could interact with a hardware wallet API, display QR codes,
take input via text fields, etc.

## Hierarchy

* **BitcoinWallet**

## Implemented by

* [InMemoryBitcoinWallet](../classes/_wallet_bitcoin_.inmemorybitcoinwallet.md)

## Index

### Methods

* [broadcastTransaction](_wallet_bitcoin_.bitcoinwallet.md#broadcasttransaction)
* [getAddress](_wallet_bitcoin_.bitcoinwallet.md#getaddress)
* [getBalance](_wallet_bitcoin_.bitcoinwallet.md#getbalance)
* [getFee](_wallet_bitcoin_.bitcoinwallet.md#getfee)
* [sendToAddress](_wallet_bitcoin_.bitcoinwallet.md#sendtoaddress)

## Methods

###  broadcastTransaction

▸ **broadcastTransaction**(`transactionHex`: string, `network`: string): *Promise‹string›*

*Defined in [src/wallet/bitcoin.ts:21](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`transactionHex` | string |
`network` | string |

**Returns:** *Promise‹string›*

___

###  getAddress

▸ **getAddress**(): *Promise‹string›*

*Defined in [src/wallet/bitcoin.ts:11](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L11)*

**Returns:** *Promise‹string›*

___

###  getBalance

▸ **getBalance**(): *Promise‹number›*

*Defined in [src/wallet/bitcoin.ts:13](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L13)*

**Returns:** *Promise‹number›*

___

###  getFee

▸ **getFee**(): *string*

*Defined in [src/wallet/bitcoin.ts:26](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L26)*

**Returns:** *string*

___

###  sendToAddress

▸ **sendToAddress**(`address`: string, `satoshis`: number, `network`: string): *Promise‹string›*

*Defined in [src/wallet/bitcoin.ts:15](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/bitcoin.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`satoshis` | number |
`network` | string |

**Returns:** *Promise‹string›*
