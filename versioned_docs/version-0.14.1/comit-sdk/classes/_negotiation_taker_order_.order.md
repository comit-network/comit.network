---
id: "_negotiation_taker_order_.order"
title: "Order"
sidebar_label: "Order"
---

Handles an order for the taker. It has helper functions to facilitate the handler of an
order by a taker. This should only be instantiated via [getOrder](_negotiation_taker_taker_negotiator_.takernegotiator.md#getorder) and should not be constructed from
scratch.

## Hierarchy

* **Order**

## Index

### Constructors

* [constructor](_negotiation_taker_order_.order.md#constructor)

### Properties

* [criteria](_negotiation_taker_order_.order.md#criteria)
* [rawOrder](_negotiation_taker_order_.order.md#raworder)
* [takeOrder](_negotiation_taker_order_.order.md#takeorder)

### Methods

* [getOfferedRate](_negotiation_taker_order_.order.md#getofferedrate)
* [isValid](_negotiation_taker_order_.order.md#isvalid)
* [matches](_negotiation_taker_order_.order.md#matches)
* [take](_negotiation_taker_order_.order.md#take)

## Constructors

###  constructor

\+ **new Order**(`rawOrder`: RawOrder, `criteria`: [MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md), `takeOrder`: function): *[Order](_negotiation_taker_order_.order.md)*

*Defined in [src/negotiation/taker/order.ts:33](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L33)*

**Note: This should not be used, `Order` should be created by using [getOrder](_negotiation_taker_taker_negotiator_.takernegotiator.md#getorder)

**Parameters:**

▪ **rawOrder**: *RawOrder*

The parameters of the order, as received from the maker.

▪ **criteria**: *[MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md)*

The criteria used to filter/retrieve this order.

▪ **takeOrder**: *function*

Function passed from the [TakerNegotiator](_negotiation_taker_taker_negotiator_.takernegotiator.md) to coordinate calls to `cnd` and the maker to effectively
take the order and start the atomic swap execution.

▸ (`rawOrder`: RawOrder): *Promise‹[Swap](_swap_.swap.md) | undefined›*

**Parameters:**

Name | Type |
------ | ------ |
`rawOrder` | RawOrder |

**Returns:** *[Order](_negotiation_taker_order_.order.md)*

## Properties

###  criteria

• **criteria**: *[MatchingCriteria](../interfaces/_negotiation_taker_order_.matchingcriteria.md)*

*Defined in [src/negotiation/taker/order.ts:43](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L43)*

The criteria used to filter/retrieve this order.

___

###  rawOrder

• **rawOrder**: *RawOrder*

*Defined in [src/negotiation/taker/order.ts:42](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L42)*

The parameters of the order, as received from the maker.

___

###  takeOrder

• **takeOrder**: *function*

*Defined in [src/negotiation/taker/order.ts:44](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L44)*

Function passed from the [TakerNegotiator](_negotiation_taker_taker_negotiator_.takernegotiator.md) to coordinate calls to `cnd` and the maker to effectively
take the order and start the atomic swap execution.

#### Type declaration:

▸ (`rawOrder`: RawOrder): *Promise‹[Swap](_swap_.swap.md) | undefined›*

**Parameters:**

Name | Type |
------ | ------ |
`rawOrder` | RawOrder |

## Methods

###  getOfferedRate

▸ **getOfferedRate**(): *BigNumber*

*Defined in [src/negotiation/taker/order.ts:79](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L79)*

Returned the rate of the order offered by the maker.

**Returns:** *BigNumber*

___

###  isValid

▸ **isValid**(): *boolean*

*Defined in [src/negotiation/taker/order.ts:62](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L62)*

Check that the order is valid and safe. Ensure that all properties are set and that the expiries
are safe. It does not check whether the ledgers/assets are correct, this is done with [matches](_negotiation_taker_order_.order.md#matches).

**Returns:** *boolean*

___

###  matches

▸ **matches**(): *boolean*

*Defined in [src/negotiation/taker/order.ts:50](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L50)*

**`description:`** Return whether an order matches the passed criteria.

**Returns:** *boolean*

___

###  take

▸ **take**(): *Promise‹[Swap](_swap_.swap.md) | undefined›*

*Defined in [src/negotiation/taker/order.ts:70](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/negotiation/taker/order.ts#L70)*

Initiates the swap execution and tells the maker that we are taking this order.
Does nothing if the order is invalid or does not match the passed criteria.

**Returns:** *Promise‹[Swap](_swap_.swap.md) | undefined›*
