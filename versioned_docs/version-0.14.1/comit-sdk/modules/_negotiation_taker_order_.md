---
id: "_negotiation_taker_order_"
title: "negotiation/taker/order"
sidebar_label: "negotiation/taker/order"
---

## Index

### References

* [TakerOrder](_negotiation_taker_order_.md#takerorder)

### Classes

* [Order](../classes/_negotiation_taker_order_.order.md)

### Interfaces

* [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md)
* [MatchingCriteriaAsset](../interfaces/_negotiation_taker_order_.matchingcriteriaasset.md)

### Functions

* [assetMatches](_negotiation_taker_order_.md#assetmatches)
* [assetOrderToSwap](_negotiation_taker_order_.md#assetordertoswap)
* [matchingCriteriaToTradingPair](_negotiation_taker_order_.md#matchingcriteriatotradingpair)
* [orderRate](_negotiation_taker_order_.md#orderrate)
* [rateMatches](_negotiation_taker_order_.md#ratematches)

## References

###  TakerOrder

• **TakerOrder**:

## Functions

###  assetMatches

▸ **assetMatches**(`criteriaAsset`: [MatchingCriteriaAsset](../interfaces/_negotiation_taker_order_.matchingcriteriaasset.md), `orderAsset`: [OrderAsset](../interfaces/_negotiation_order_.orderasset.md)): *boolean*

*Defined in [src/negotiation/taker/order.ts:108](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`criteriaAsset` | [MatchingCriteriaAsset](../interfaces/_negotiation_taker_order_.matchingcriteriaasset.md) |
`orderAsset` | [OrderAsset](../interfaces/_negotiation_order_.orderasset.md) |

**Returns:** *boolean*

___

###  assetOrderToSwap

▸ **assetOrderToSwap**(`orderAsset`: [OrderAsset](../interfaces/_negotiation_order_.orderasset.md)): *[Asset](../interfaces/_cnd_cnd_.asset.md) | undefined*

*Defined in [src/negotiation/taker/order.ts:132](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`orderAsset` | [OrderAsset](../interfaces/_negotiation_order_.orderasset.md) |

**Returns:** *[Asset](../interfaces/_cnd_cnd_.asset.md) | undefined*

___

###  matchingCriteriaToTradingPair

▸ **matchingCriteriaToTradingPair**(`matchingCriteria`: [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md)): *string*

*Defined in [src/negotiation/taker/order.ts:163](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`matchingCriteria` | [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md) |

**Returns:** *string*

___

###  orderRate

▸ **orderRate**(`rawOrder`: RawOrder): *BigNumber*

*Defined in [src/negotiation/taker/order.ts:101](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`rawOrder` | RawOrder |

**Returns:** *BigNumber*

___

###  rateMatches

▸ **rateMatches**(`criteria`: [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md), `rawOrder`: RawOrder): *boolean*

*Defined in [src/negotiation/taker/order.ts:89](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L89)*

This is only exported for test purposes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`criteria` | [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md) | - |
`rawOrder` | RawOrder |   |

**Returns:** *boolean*
