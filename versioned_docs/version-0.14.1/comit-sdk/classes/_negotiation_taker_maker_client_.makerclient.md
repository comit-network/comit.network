---
id: "_negotiation_taker_maker_client_.makerclient"
title: "MakerClient"
sidebar_label: "MakerClient"
---

A client for the [HttpService](_negotiation_maker_maker_negotiator_.httpservice.md) exposed by the maker.
This client is used by the taker to request and take orders from a maker.

## Hierarchy

* **MakerClient**

## Index

### Constructors

* [constructor](_negotiation_taker_maker_client_.makerclient.md#constructor)

### Methods

* [getExecutionParams](_negotiation_taker_maker_client_.makerclient.md#getexecutionparams)
* [getOrderByTradingPair](_negotiation_taker_maker_client_.makerclient.md#getorderbytradingpair)
* [takeOrder](_negotiation_taker_maker_client_.makerclient.md#takeorder)

## Constructors

###  constructor

\+ **new MakerClient**(`makerUrl`: string): *[MakerClient](_negotiation_taker_maker_client_.makerclient.md)*

*Defined in [src/negotiation/taker/maker_client.ts:9](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/maker_client.ts#L9)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`makerUrl` | string | The URL to reach the maker's [HttpService](_negotiation_maker_maker_negotiator_.httpservice.md), see [getUrl](_negotiation_maker_maker_negotiator_.makernegotiator.md#geturl)  |

**Returns:** *[MakerClient](_negotiation_taker_maker_client_.makerclient.md)*

## Methods

###  getExecutionParams

▸ **getExecutionParams**(`orderId`: string): *Promise‹[ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)›*

*Defined in [src/negotiation/taker/maker_client.ts:28](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/maker_client.ts#L28)*

Get the execution parameters of the maker for a certain [Order](../interfaces/_negotiation_order_.order.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orderId` | string | The id of an [Order](../interfaces/_negotiation_order_.order.md) as received by the maker.  |

**Returns:** *Promise‹[ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)›*

___

###  getOrderByTradingPair

▸ **getOrderByTradingPair**(`tradingPair`: string): *Promise‹[Order](../interfaces/_negotiation_order_.order.md)›*

*Defined in [src/negotiation/taker/maker_client.ts:19](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/maker_client.ts#L19)*

Get an [Order](../interfaces/_negotiation_order_.order.md) from the maker for a given trading pair (e.g. ethereum-ether-bitcoin-bitcoin).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tradingPair` | string | A trading pair (e.g. ETH-BTC).  |

**Returns:** *Promise‹[Order](../interfaces/_negotiation_order_.order.md)›*

___

###  takeOrder

▸ **takeOrder**(`orderId`: string, `swapId`: string): *Promise‹void›*

*Defined in [src/negotiation/taker/maker_client.ts:44](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/maker_client.ts#L44)*

Tells the maker that we are taking this order and what is the swap id of the swap request sent for
this order from taker cnd to maker cnd.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`orderId` | string | The id of the order that is taken. |
`swapId` | string | To facilitate matching between swap requests and orders, the taker first tells their cnd to send a swap request to the maker's cnd, then use the unique swap id, known by both cnds, to tell the maker that it is taking the order and what swap request is being use for this order. While this facilitates the order-to-swap matching logic on the maker's side, the maker still needs to double check the parameters of the swap.  |

**Returns:** *Promise‹void›*
