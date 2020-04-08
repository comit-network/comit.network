---
id: "_negotiation_maker_negotiator_.negotiator"
title: "Negotiator"
sidebar_label: "Negotiator"
---

Handles the negotiation on the maker side of a trade.
Bundles functionality to create orders for a maker and make them available for the taker.

## Hierarchy

* **Negotiator**

## Index

### Constructors

* [constructor](_negotiation_maker_negotiator_.negotiator.md#constructor)

### Methods

* [addOrder](_negotiation_maker_negotiator_.negotiator.md#addorder)
* [getExecutionParams](_negotiation_maker_negotiator_.negotiator.md#getexecutionparams)
* [getOrderById](_negotiation_maker_negotiator_.negotiator.md#getorderbyid)
* [getOrderByTradingPair](_negotiation_maker_negotiator_.negotiator.md#getorderbytradingpair)
* [getUrl](_negotiation_maker_negotiator_.negotiator.md#geturl)
* [listen](_negotiation_maker_negotiator_.negotiator.md#listen)
* [takeOrder](_negotiation_maker_negotiator_.negotiator.md#takeorder)

## Constructors

###  constructor

\+ **new Negotiator**(`comitClient`: [ComitClient](_comit_client_.comitclient.md), `executionParams`: [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md), `tryParams`: [TryParams](../interfaces/_util_timeout_promise_.tryparams.md)): *[Negotiator](_negotiation_maker_negotiator_.negotiator.md)*

*Defined in [negotiation/maker/negotiator.ts:21](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L21)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`comitClient` | [ComitClient](_comit_client_.comitclient.md) | The [ComitClient](_comit_client_.comitclient.md) of the taker for swap execution. |
`executionParams` | [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md) | The [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md) of the maker for swap execution. |
`tryParams` | [TryParams](../interfaces/_util_timeout_promise_.tryparams.md) | The [TryParams](../interfaces/_util_timeout_promise_.tryparams.md) of the maker for swap execution.  |

**Returns:** *[Negotiator](_negotiation_maker_negotiator_.negotiator.md)*

## Methods

###  addOrder

▸ **addOrder**(`order`: [Order](../interfaces/_negotiation_order_.order.md)): *boolean*

*Defined in [negotiation/maker/negotiator.ts:50](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L50)*

Add an Order to the order book.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/_negotiation_order_.order.md) | The order to add.  |

**Returns:** *boolean*

True if the order parameters are valid and were successfully added to the order book, false otherwise.

___

###  getExecutionParams

▸ **getExecutionParams**(): *[ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)*

*Defined in [negotiation/maker/negotiator.ts:83](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L83)*

Get the [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md) of the maker.

**Returns:** *[ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)*

The [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md) of the maker.

___

###  getOrderById

▸ **getOrderById**(`orderId`: string): *[Order](../interfaces/_negotiation_order_.order.md) | undefined*

*Defined in [negotiation/maker/negotiator.ts:75](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L75)*

Get an [Order](../interfaces/_negotiation_order_.order.md) by [Order.id](../interfaces/_negotiation_order_.order.md#id).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orderId` | string | The [Order.id](../interfaces/_negotiation_order_.order.md#id). |

**Returns:** *[Order](../interfaces/_negotiation_order_.order.md) | undefined*

An [Order](../interfaces/_negotiation_order_.order.md) or undefined if there is no [Order](../interfaces/_negotiation_order_.order.md) for the given id.

___

###  getOrderByTradingPair

▸ **getOrderByTradingPair**(`tradingPair`: string): *[Order](../interfaces/_negotiation_order_.order.md) | undefined*

*Defined in [negotiation/maker/negotiator.ts:66](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L66)*

Get an [Order](../interfaces/_negotiation_order_.order.md) by trading pair (e.g. ethereum-ether-bitcoin-bitcoin).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tradingPair` | string | A trading pair (e.g. bitcoin-bitcoin-ethereum-erc20). |

**Returns:** *[Order](../interfaces/_negotiation_order_.order.md) | undefined*

An [Order](../interfaces/_negotiation_order_.order.md) or undefined if there is no [Order](../interfaces/_negotiation_order_.order.md) for the given trading pair.

___

###  getUrl

▸ **getUrl**(): *string | undefined*

*Defined in [negotiation/maker/negotiator.ts:109](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L109)*

**Returns:** *string | undefined*

The maker's [HttpService](_negotiation_maker_negotiator_.httpservice.md) URL.

___

###  listen

▸ **listen**(`port`: number, `hostname?`: undefined | string): *Promise‹void›*

*Defined in [negotiation/maker/negotiator.ts:118](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L118)*

Exposes the maker's [HttpService](_negotiation_maker_negotiator_.httpservice.md) on the given port and hostname.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`port` | number | The port where the [HttpService](_negotiation_maker_negotiator_.httpservice.md) should be exposed. |
`hostname?` | undefined &#124; string | Optionally a hostname can be provided as well.  |

**Returns:** *Promise‹void›*

___

###  takeOrder

▸ **takeOrder**(`swapId`: string, `order`: [Order](../interfaces/_negotiation_order_.order.md)): *Promise‹void›*

*Defined in [negotiation/maker/negotiator.ts:96](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L96)*

Take an order by accepting the swap request on the maker side.

This function uses the given swapId and order to find a matching [Swap](_swap_.swap.md) using the [ComitClient](_comit_client_.comitclient.md).
If a matching [Swap](_swap_.swap.md) can be found {@link Swap#accept} is called.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`swapId` | string | The id of a swap. |
`order` | [Order](../interfaces/_negotiation_order_.order.md) | The order corresponding to the swap.  |

**Returns:** *Promise‹void›*
