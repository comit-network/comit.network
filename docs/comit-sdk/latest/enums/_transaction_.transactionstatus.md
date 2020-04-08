---
id: "_transaction_.transactionstatus"
title: "TransactionStatus"
sidebar_label: "TransactionStatus"
---

## Index

### Enumeration members

* [Confirmed](_transaction_.transactionstatus.md#confirmed)
* [Failed](_transaction_.transactionstatus.md#failed)
* [NotFound](_transaction_.transactionstatus.md#notfound)
* [Pending](_transaction_.transactionstatus.md#pending)

## Enumeration members

###  Confirmed

• **Confirmed**:

*Defined in [src/transaction.ts:15](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L15)*

The transaction was mined.

___

###  Failed

• **Failed**:

*Defined in [src/transaction.ts:7](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L7)*

The transaction was rejected by the blockchain node.

___

###  NotFound

• **NotFound**:

*Defined in [src/transaction.ts:19](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L19)*

The transaction could not be retrieved.

___

###  Pending

• **Pending**:

*Defined in [src/transaction.ts:11](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/transaction.ts#L11)*

The transaction was not yet mined and its status is uncertain.
