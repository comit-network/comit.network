---
id: "_cnd_action_to_http_request_"
title: "cnd/action_to_http_request"
sidebar_label: "cnd/action_to_http_request"
---

## Index

### Type aliases

* [FieldValueResolverFn](_cnd_action_to_http_request_.md#fieldvalueresolverfn)

### Functions

* [actionToHttpRequest](_cnd_action_to_http_request_.md#actiontohttprequest)
* [failIfNotBuffer](_cnd_action_to_http_request_.md#failifnotbuffer)
* [jsonRequestTransformer](_cnd_action_to_http_request_.md#jsonrequesttransformer)
* [resolveAllFieldValues](_cnd_action_to_http_request_.md#resolveallfieldvalues)

## Type aliases

###  FieldValueResolverFn

Ƭ **FieldValueResolverFn**: *function*

*Defined in [src/cnd/action_to_http_request.ts:6](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/action_to_http_request.ts#L6)*

#### Type declaration:

▸ (`field`: [Field](../interfaces/_cnd_siren_.field.md)): *Promise‹string | undefined›*

**Parameters:**

Name | Type |
------ | ------ |
`field` | [Field](../interfaces/_cnd_siren_.field.md) |

## Functions

###  actionToHttpRequest

▸ **actionToHttpRequest**(`action`: [Action](../interfaces/_cnd_siren_.action.md), `resolver?`: [FieldValueResolverFn](_cnd_action_to_http_request_.md#fieldvalueresolverfn)): *Promise‹AxiosRequestConfig›*

*Defined in [src/cnd/action_to_http_request.ts:10](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/action_to_http_request.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](../interfaces/_cnd_siren_.action.md) |
`resolver?` | [FieldValueResolverFn](_cnd_action_to_http_request_.md#fieldvalueresolverfn) |

**Returns:** *Promise‹AxiosRequestConfig›*

___

###  failIfNotBuffer

▸ **failIfNotBuffer**(`data`: any, `headers`: any): *any*

*Defined in [src/cnd/action_to_http_request.ts:58](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/action_to_http_request.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`headers` | any |

**Returns:** *any*

___

###  jsonRequestTransformer

▸ **jsonRequestTransformer**(`data`: any, `headers`: any): *any*

*Defined in [src/cnd/action_to_http_request.ts:42](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/action_to_http_request.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`headers` | any |

**Returns:** *any*

___

###  resolveAllFieldValues

▸ **resolveAllFieldValues**(`fields`: [Field](../interfaces/_cnd_siren_.field.md)[], `resolver?`: [FieldValueResolverFn](_cnd_action_to_http_request_.md#fieldvalueresolverfn)): *Promise‹any›*

*Defined in [src/cnd/action_to_http_request.ts:68](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/action_to_http_request.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | [Field](../interfaces/_cnd_siren_.field.md)[] |
`resolver?` | [FieldValueResolverFn](_cnd_action_to_http_request_.md#fieldvalueresolverfn) |

**Returns:** *Promise‹any›*
