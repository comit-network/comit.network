---
id: "_negotiation_maker_negotiator_.httpservice"
title: "HttpService"
sidebar_label: "HttpService"
---

A simple [express](http://expressjs.com/) HTTP service to allow takers to access the maker's orders.

## Hierarchy

* **HttpService**

## Index

### Constructors

* [constructor](_negotiation_maker_negotiator_.httpservice.md#constructor)

### Methods

* [getUrl](_negotiation_maker_negotiator_.httpservice.md#geturl)
* [listen](_negotiation_maker_negotiator_.httpservice.md#listen)

## Constructors

###  constructor

\+ **new HttpService**(`getOrderById`: function, `getExecutionParams`: function, `takeOrder`: function, `getOrderByTradingPair`: function): *[HttpService](_negotiation_maker_negotiator_.httpservice.md)*

*Defined in [negotiation/maker/negotiator.ts:175](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L175)*

**Parameters:**

▪ **getOrderById**: *function*

▸ (`orderId`: string): *[Order](../interfaces/_negotiation_order_.order.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`orderId` | string |

▪ **getExecutionParams**: *function*

▸ (): *[ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)*

▪ **takeOrder**: *function*

▸ (`swapId`: string, `order`: [Order](../interfaces/_negotiation_order_.order.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`swapId` | string |
`order` | [Order](../interfaces/_negotiation_order_.order.md) |

▪ **getOrderByTradingPair**: *function*

▸ (`tradingPair`: string): *[Order](../interfaces/_negotiation_order_.order.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`tradingPair` | string |

**Returns:** *[HttpService](_negotiation_maker_negotiator_.httpservice.md)*

## Methods

###  getUrl

▸ **getUrl**(): *undefined | string*

*Defined in [negotiation/maker/negotiator.ts:250](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L250)*

**Returns:** *undefined | string*

___

###  listen

▸ **listen**(`port`: number, `hostname?`: undefined | string): *Promise‹void›*

*Defined in [negotiation/maker/negotiator.ts:190](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/maker/negotiator.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`port` | number |
`hostname?` | undefined &#124; string |

**Returns:** *Promise‹void›*
