---
id: "_negotiation_taker_negotiator_.negotiator"
title: "Negotiator"
sidebar_label: "Negotiator"
---

Handles the negotiation on the taker side of a trade.
Bundles functionality to get orders from a maker, take them and initiate the swap execution.

## Hierarchy

* **Negotiator**

## Index

### Constructors

* [constructor](_negotiation_taker_negotiator_.negotiator.md#constructor)

### Methods

* [getOrder](_negotiation_taker_negotiator_.negotiator.md#getorder)

## Constructors

###  constructor

\+ **new Negotiator**(`comitClient`: [ComitClient](_comit_client_.comitclient.md), `makerUrl`: string): *[Negotiator](_negotiation_taker_negotiator_.negotiator.md)*

*Defined in [negotiation/taker/negotiator.ts:62](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/taker/negotiator.ts#L62)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`comitClient` | [ComitClient](_comit_client_.comitclient.md) | The [ComitClient](_comit_client_.comitclient.md) of the taker for swap execution |
`makerUrl` | string | The url where the maker provides offers according to the [MakerNegotiator](../modules/_negotiation_maker_negotiator_.md#makernegotiator)  |

**Returns:** *[Negotiator](_negotiation_taker_negotiator_.negotiator.md)*

## Methods

###  getOrder

▸ **getOrder**(`criteria`: [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md)): *Promise‹[TakerOrder](../modules/_negotiation_taker_order_.md#takerorder)›*

*Defined in [negotiation/taker/negotiator.ts:80](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/taker/negotiator.ts#L80)*

Get an order from the maker based on specified criteria. Whatever is returned from the maker is
returned here, even if it does not match the criteria or is invalid. Not all criteria are passed to the maker.
If it is indeed invalid or mismatching it will not be possible to execute the order, however it gives the
opportunity to the lib consumer to know that this maker returns invalid orders and the details of such order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`criteria` | [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md) | The criteria of the order to be requested from the maker.  |

**Returns:** *Promise‹[TakerOrder](../modules/_negotiation_taker_order_.md#takerorder)›*
