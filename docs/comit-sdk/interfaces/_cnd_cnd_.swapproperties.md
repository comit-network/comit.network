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

*Defined in [cnd/cnd.ts:110](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L110)*

The peer-id of the counterparty of this swap.

___

###  id

• **id**: *string*

*Defined in [cnd/cnd.ts:106](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L106)*

The id of the swap.

___

###  parameters

• **parameters**: *object*

*Defined in [cnd/cnd.ts:126](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L126)*

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

*Defined in [cnd/cnd.ts:118](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L118)*

The cryptographic protocol that is employed in this swap.

___

###  role

• **role**: *"Alice" | "Bob"*

*Defined in [cnd/cnd.ts:114](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L114)*

The role in which you are participating in this swap.

___

### `Optional` state

• **state**? : *undefined | object*

*Defined in [cnd/cnd.ts:136](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L136)*

The detailed state of the swap.

___

###  status

• **status**: *"IN_PROGRESS" | "SWAPPED" | "NOT_SWAPPED" | "INTERNAL_FAILURE"*

*Defined in [cnd/cnd.ts:122](https://github.com/comit-network/comit-js-sdk/blob/d75521e/src/cnd/cnd.ts#L122)*

The status this swap is currently in.
