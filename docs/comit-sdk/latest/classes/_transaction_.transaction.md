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

### Properties

* [id](_transaction_.transaction.md#id)

### Methods

* [status](_transaction_.transaction.md#status)

## Constructors

###  constructor

\+ **new Transaction**(`wallet`: object, `id`: string): *[Transaction](_transaction_.transaction.md)*

*Defined in [src/transaction.ts:25](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L25)*

**Parameters:**

▪ **wallet**: *object*

Name | Type |
------ | ------ |
`ethereum?` | [EthereumWallet](_wallet_ethereum_.ethereumwallet.md) |

▪ **id**: *string*

**Returns:** *[Transaction](_transaction_.transaction.md)*

## Properties

###  id

• **id**: *string*

*Defined in [src/transaction.ts:28](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L28)*

## Methods

###  status

▸ **status**(`confirmations?`: undefined | number): *Promise‹[TransactionStatus](../enums/_transaction_.transactionstatus.md)›*

*Defined in [src/transaction.ts:36](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L36)*

**`throws`** Ethereum: If the Receipt cannot be retrieved despite the transaction being mined.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`confirmations?` | undefined &#124; number | Optional number of confirmations to wait for before returning. |

**Returns:** *Promise‹[TransactionStatus](../enums/_transaction_.transactionstatus.md)›*

The transaction status by asking the blockchain.
