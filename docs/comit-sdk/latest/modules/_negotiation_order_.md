---
id: "_negotiation_order_"
title: "negotiation/order"
sidebar_label: "negotiation/order"
---

## Index

### Interfaces

* [Order](../interfaces/_negotiation_order_.order.md)
* [OrderAsset](../interfaces/_negotiation_order_.orderasset.md)

### Variables

* [BITCOIN_DECIMALS](_negotiation_order_.md#const-bitcoin_decimals)
* [ETHER_DECIMALS](_negotiation_order_.md#const-ether_decimals)

### Functions

* [fromNominal](_negotiation_order_.md#fromnominal)
* [isNative](_negotiation_order_.md#isnative)
* [isOrderValid](_negotiation_order_.md#isordervalid)
* [toTradingPair](_negotiation_order_.md#totradingpair)

## Variables

### `Const` BITCOIN_DECIMALS

• **BITCOIN_DECIMALS**: *8* = 8

*Defined in [src/negotiation/order.ts:85](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/order.ts#L85)*

___

### `Const` ETHER_DECIMALS

• **ETHER_DECIMALS**: *18* = 18

*Defined in [src/negotiation/order.ts:86](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/order.ts#L86)*

## Functions

###  fromNominal

▸ **fromNominal**(`asset`: string, `nominalAmount`: string, `token?`: [Token](../interfaces/_tokens_tokens_.token.md)): *BigNumber | undefined*

*Defined in [src/negotiation/order.ts:96](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/order.ts#L96)*

Convert from nominal amount to underlying base unit of an asset, e.g. convert Ether to Wei.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`asset` | string | Name of the asset as string (e.g. "ether". |
`nominalAmount` | string | The nominal amount (e.g. ether amount). |
`token?` | [Token](../interfaces/_tokens_tokens_.token.md) | Optional parameter for converting ERC20 tokens according to defined [Token.decimals](../interfaces/_tokens_tokens_.token.md#decimals). |

**Returns:** *BigNumber | undefined*

The base unit amount of the asset (e.g. amount in wei).

___

###  isNative

▸ **isNative**(`__namedParameters`: object): *boolean*

*Defined in [src/negotiation/order.ts:78](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/order.ts#L78)*

Helper function to check if an asset is native (e.g. ether is on Ethereum but erc20 is not).
according to the given asset and ledger string.

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Description |
------ | ------ | ------ |
`asset` | string | - |
`ledger` | string |   |

**Returns:** *boolean*

___

###  isOrderValid

▸ **isOrderValid**(`order`: [Order](../interfaces/_negotiation_order_.order.md)): *boolean*

*Defined in [src/negotiation/order.ts:34](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/order.ts#L34)*

Validates that all fields of an [Order](../interfaces/_negotiation_order_.order.md) are set correctly.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/_negotiation_order_.order.md) | The [Order](../interfaces/_negotiation_order_.order.md) to be validated. |

**Returns:** *boolean*

True if all fields of the [Order](../interfaces/_negotiation_order_.order.md) are set correctl, false otherwise.

___

###  toTradingPair

▸ **toTradingPair**(`order`: [Order](../interfaces/_negotiation_order_.order.md)): *string*

*Defined in [src/negotiation/order.ts:60](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/order.ts#L60)*

Convert the bid and ask [OrderAsset](../interfaces/_negotiation_order_.orderasset.md) to the trading-pair string, e.g. ethereum-ether-bitcoin-bitcoin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/_negotiation_order_.order.md) |   |

**Returns:** *string*
