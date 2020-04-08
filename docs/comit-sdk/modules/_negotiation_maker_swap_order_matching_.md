---
id: "_negotiation_maker_swap_order_matching_"
title: "negotiation/maker/swap_order_matching"
sidebar_label: "negotiation/maker/swap_order_matching"
---

## Index

### Functions

* [areAmountsEqual](_negotiation_maker_swap_order_matching_.md#areamountsequal)
* [assetsMatch](_negotiation_maker_swap_order_matching_.md#assetsmatch)
* [match](_negotiation_maker_swap_order_matching_.md#match)

## Functions

###  areAmountsEqual

▸ **areAmountsEqual**(`asset`: string, `unitAmount`: string, `nominalAmount`: string, `token?`: [Token](../interfaces/_tokens_tokens_.token.md)): *boolean*

*Defined in [src/negotiation/maker/swap_order_matching.ts:57](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/maker/swap_order_matching.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`asset` | string |
`unitAmount` | string |
`nominalAmount` | string |
`token?` | [Token](../interfaces/_tokens_tokens_.token.md) |

**Returns:** *boolean*

___

###  assetsMatch

▸ **assetsMatch**(`orderAsset`: [OrderAsset](../interfaces/_negotiation_order_.orderasset.md), `swapAsset`: [Asset](../interfaces/_cnd_cnd_.asset.md), `swapLedger`: [Ledger](../interfaces/_cnd_cnd_.ledger.md)): *boolean*

*Defined in [src/negotiation/maker/swap_order_matching.ts:22](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/maker/swap_order_matching.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`orderAsset` | [OrderAsset](../interfaces/_negotiation_order_.orderasset.md) |
`swapAsset` | [Asset](../interfaces/_cnd_cnd_.asset.md) |
`swapLedger` | [Ledger](../interfaces/_cnd_cnd_.ledger.md) |

**Returns:** *boolean*

___

###  match

▸ **match**(`order`: [Order](../interfaces/_negotiation_order_.order.md), `props`: [SwapProperties](../interfaces/_cnd_cnd_.swapproperties.md)): *boolean*

*Defined in [src/negotiation/maker/swap_order_matching.ts:13](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/maker/swap_order_matching.ts#L13)*

Check that a given swap matches the agreed conditions of an accepted order.
See: [MakerNegotiator](../classes/_negotiation_maker_maker_negotiator_.makernegotiator.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/_negotiation_order_.order.md) | The order to check against the swap. |
`props` | [SwapProperties](../interfaces/_cnd_cnd_.swapproperties.md) | The properties of the the swap to check against the order.  |

**Returns:** *boolean*
