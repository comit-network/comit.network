---
id: "_swap_.walleterror"
title: "WalletError"
sidebar_label: "WalletError"
---

## Hierarchy

* [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error)

  ↳ **WalletError**

## Index

### Constructors

* [constructor](_swap_.walleterror.md#constructor)

### Properties

* [attemptedAction](_swap_.walleterror.md#attemptedaction)
* [callParams](_swap_.walleterror.md#callparams)
* [message](_swap_.walleterror.md#message)
* [name](_swap_.walleterror.md#name)
* [source](_swap_.walleterror.md#source)
* [stack](_swap_.walleterror.md#optional-stack)
* [Error](_swap_.walleterror.md#static-error)

## Constructors

###  constructor

\+ **new WalletError**(`attemptedAction`: string, `source`: [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error), `callParams`: any): *[WalletError](_swap_.walleterror.md)*

*Defined in [src/swap.ts:10](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/swap.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`attemptedAction` | string |
`source` | [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error) |
`callParams` | any |

**Returns:** *[WalletError](_swap_.walleterror.md)*

## Properties

###  attemptedAction

• **attemptedAction**: *string*

*Defined in [src/swap.ts:12](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/swap.ts#L12)*

___

###  callParams

• **callParams**: *any*

*Defined in [src/swap.ts:14](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/swap.ts#L14)*

___

###  message

• **message**: *string*

*Inherited from [Problem](_cnd_axios_rfc7807_middleware_.problem.md).[message](_cnd_axios_rfc7807_middleware_.problem.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [Problem](_cnd_axios_rfc7807_middleware_.problem.md).[name](_cnd_axios_rfc7807_middleware_.problem.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

###  source

• **source**: *[Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error)*

*Defined in [src/swap.ts:13](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/swap.ts#L13)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [Problem](_cnd_axios_rfc7807_middleware_.problem.md).[stack](_cnd_axios_rfc7807_middleware_.problem.md#optional-stack)*

*Overrides [Problem](_cnd_axios_rfc7807_middleware_.problem.md).[stack](_cnd_axios_rfc7807_middleware_.problem.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
