---
id: "_tokens_tokens_"
title: "tokens/tokens"
sidebar_label: "tokens/tokens"
---

## Index

### Interfaces

* [Token](../interfaces/_tokens_tokens_.token.md)

### Type aliases

* [Type](_tokens_tokens_.md#type)

### Functions

* [getToken](_tokens_tokens_.md#gettoken)

## Type aliases

###  Type

Ƭ **Type**: *"ERC20"*

*Defined in [src/tokens/tokens.ts:3](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/tokens/tokens.ts#L3)*

## Functions

###  getToken

▸ **getToken**(`symbol`: string): *[Token](../interfaces/_tokens_tokens_.token.md) | undefined*

*Defined in [src/tokens/tokens.ts:17](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/tokens/tokens.ts#L17)*

Returns information about an ERC20 token.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`symbol` | string | ERC20 ticker symbol.  |

**Returns:** *[Token](../interfaces/_tokens_tokens_.token.md) | undefined*

ERC20 token object.
