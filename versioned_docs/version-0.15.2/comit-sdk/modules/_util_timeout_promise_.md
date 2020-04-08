---
id: "_util_timeout_promise_"
title: "util/timeout_promise"
sidebar_label: "util/timeout_promise"
---

## Index

### Interfaces

* [TryParams](../interfaces/_util_timeout_promise_.tryparams.md)

### Functions

* [sleep](_util_timeout_promise_.md#sleep)
* [timeoutPromise](_util_timeout_promise_.md#timeoutpromise)

## Functions

###  sleep

▸ **sleep**(`ms`: number): *Promise‹void›*

*Defined in [src/util/timeout_promise.ts:28](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/util/timeout_promise.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |

**Returns:** *Promise‹void›*

___

###  timeoutPromise

▸ **timeoutPromise**<**T**>(`ms`: number, `promise`: Promise‹T›): *Promise‹T›*

*Defined in [src/util/timeout_promise.ts:9](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/util/timeout_promise.ts#L9)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`ms` | number |
`promise` | Promise‹T› |

**Returns:** *Promise‹T›*
