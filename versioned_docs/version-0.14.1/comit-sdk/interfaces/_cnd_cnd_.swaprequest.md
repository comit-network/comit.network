---
id: "_cnd_cnd_.swaprequest"
title: "SwapRequest"
sidebar_label: "SwapRequest"
---

The parameters that the two parties have agreed on for swap execution.

The swap request is sent by the party in the role of Alice to initiate a swap with Bob.

## Hierarchy

* **SwapRequest**

## Index

### Properties

* [alpha_asset](_cnd_cnd_.swaprequest.md#alpha_asset)
* [alpha_expiry](_cnd_cnd_.swaprequest.md#optional-alpha_expiry)
* [alpha_ledger](_cnd_cnd_.swaprequest.md#alpha_ledger)
* [alpha_ledger_refund_identity](_cnd_cnd_.swaprequest.md#optional-alpha_ledger_refund_identity)
* [beta_asset](_cnd_cnd_.swaprequest.md#beta_asset)
* [beta_expiry](_cnd_cnd_.swaprequest.md#optional-beta_expiry)
* [beta_ledger](_cnd_cnd_.swaprequest.md#beta_ledger)
* [beta_ledger_redeem_identity](_cnd_cnd_.swaprequest.md#optional-beta_ledger_redeem_identity)
* [peer](_cnd_cnd_.swaprequest.md#peer)

## Properties

###  alpha_asset

• **alpha_asset**: *[Asset](_cnd_cnd_.asset.md)*

*Defined in [src/cnd/cnd.ts:41](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L41)*

___

### `Optional` alpha_expiry

• **alpha_expiry**? : *undefined | number*

*Defined in [src/cnd/cnd.ts:44](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L44)*

___

###  alpha_ledger

• **alpha_ledger**: *[Ledger](_cnd_cnd_.ledger.md)*

*Defined in [src/cnd/cnd.ts:40](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L40)*

___

### `Optional` alpha_ledger_refund_identity

• **alpha_ledger_refund_identity**? : *undefined | string*

*Defined in [src/cnd/cnd.ts:46](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L46)*

___

###  beta_asset

• **beta_asset**: *[Asset](_cnd_cnd_.asset.md)*

*Defined in [src/cnd/cnd.ts:43](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L43)*

___

### `Optional` beta_expiry

• **beta_expiry**? : *undefined | number*

*Defined in [src/cnd/cnd.ts:45](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L45)*

___

###  beta_ledger

• **beta_ledger**: *[Ledger](_cnd_cnd_.ledger.md)*

*Defined in [src/cnd/cnd.ts:42](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L42)*

___

### `Optional` beta_ledger_redeem_identity

• **beta_ledger_redeem_identity**? : *undefined | string*

*Defined in [src/cnd/cnd.ts:47](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L47)*

___

###  peer

• **peer**: *[Peer](_cnd_cnd_.peer.md)*

*Defined in [src/cnd/cnd.ts:48](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L48)*
