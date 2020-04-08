---
id: "_transaction_.transaction"
title: "Transaction"
sidebar_label: "Transaction"
---

A handy interface to know the status of a blockchain transaction

## Hierarchy

* **Transaction**

## Index

### Constructors

* [constructor](_transaction_.transaction.md#constructor)

### Methods

* [status](_transaction_.transaction.md#status)

## Constructors

###  constructor

\+ **new Transaction**(`wallet`: object, `transactionId`: string): *[Transaction](_transaction_.transaction.md)*

*Defined in [src/transaction.ts:21](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/transaction.ts#L21)*

**Parameters:**

▪ **wallet**: *object*

Name | Type |
------ | ------ |
`ethereum?` | [EthereumWallet](_wallet_ethereum_.ethereumwallet.md) |

▪ **transactionId**: *string*

**Returns:** *[Transaction](_transaction_.transaction.md)*

## Methods

###  status

▸ **status**(): *Promise‹[SwapTransactionStatus](../enums/_transaction_.swaptransactionstatus.md)›*

*Defined in [src/transaction.ts:30](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/transaction.ts#L30)*

**Returns:** *Promise‹[SwapTransactionStatus](../enums/_transaction_.swaptransactionstatus.md)›*

The transaction status by asking the blockchain.
