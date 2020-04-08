---
id: "_cnd_cnd_.swapproperties"
title: "SwapProperties"
sidebar_label: "SwapProperties"
---

## Hierarchy

* **SwapProperties**

## Indexable

* \[ **k**: *string*\]: any

## Index

### Properties

* [counterparty](_cnd_cnd_.swapproperties.md#counterparty)
* [id](_cnd_cnd_.swapproperties.md#id)
* [parameters](_cnd_cnd_.swapproperties.md#parameters)
* [protocol](_cnd_cnd_.swapproperties.md#protocol)
* [role](_cnd_cnd_.swapproperties.md#role)
* [state](_cnd_cnd_.swapproperties.md#optional-state)
* [status](_cnd_cnd_.swapproperties.md#status)

## Properties

###  counterparty

• **counterparty**: *string*

*Defined in [src/cnd/cnd.ts:203](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L203)*

The peer-id of the counterparty of this swap.

___

###  id

• **id**: *string*

*Defined in [src/cnd/cnd.ts:199](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L199)*

The id of the swap.

___

###  parameters

• **parameters**: *object*

*Defined in [src/cnd/cnd.ts:219](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L219)*

The parameters of this swap.

#### Type declaration:

* \[ **k**: *string*\]: any

* **alpha_asset**: *[Asset](_cnd_cnd_.asset.md)*

* **alpha_ledger**: *[Ledger](_cnd_cnd_.ledger.md)*

* **beta_asset**: *[Asset](_cnd_cnd_.asset.md)*

* **beta_ledger**: *[Ledger](_cnd_cnd_.ledger.md)*

___

###  protocol

• **protocol**: *string*

*Defined in [src/cnd/cnd.ts:211](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L211)*

The cryptographic protocol that is employed in this swap.

___

###  role

• **role**: *"Alice" | "Bob"*

*Defined in [src/cnd/cnd.ts:207](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L207)*

The role in which you are participating in this swap.

___

### `Optional` state

• **state**? : *undefined | object*

*Defined in [src/cnd/cnd.ts:229](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L229)*

The detailed state of the swap.

___

###  status

• **status**: *"IN_PROGRESS" | "SWAPPED" | "NOT_SWAPPED" | "INTERNAL_FAILURE"*

*Defined in [src/cnd/cnd.ts:215](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L215)*

The status this swap is currently in.
