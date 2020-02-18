---
id: "_siren_.link"
title: "Link"
sidebar_label: "Link"
---

Links represent navigational transitions.

## Hierarchy

* **Link**

## Indexable

* \[ **k**: *string*\]: any

Links represent navigational transitions.

## Index

### Properties

* [class](_siren_.link.md#optional-class)
* [href](_siren_.link.md#href)
* [rel](_siren_.link.md#rel)
* [title](_siren_.link.md#optional-title)
* [type](_siren_.link.md#optional-type)

## Properties

### `Optional` class

• **class**? : *string[]*

*Defined in [siren.ts:250](https://github.com/comit-network/comit-js-sdk/blob/638de0e/src/siren.ts#L250)*

Describes aspects of the link based on the current representation. Possible values are implementation-dependent and should be documented.

___

###  href

• **href**: *string*

*Defined in [siren.ts:262](https://github.com/comit-network/comit-js-sdk/blob/638de0e/src/siren.ts#L262)*

The URI of the linked resource.

___

###  rel

• **rel**: *[RelValue](../modules/_siren_.md#relvalue)[]*

*Defined in [siren.ts:258](https://github.com/comit-network/comit-js-sdk/blob/638de0e/src/siren.ts#L258)*

Defines the relationship of the link to its entity, per Web Linking (RFC5988).

___

### `Optional` title

• **title**? : *undefined | string*

*Defined in [siren.ts:254](https://github.com/comit-network/comit-js-sdk/blob/638de0e/src/siren.ts#L254)*

Text describing the nature of a link.

___

### `Optional` type

• **type**? : *[MediaType](../modules/_siren_.md#mediatype)*

*Defined in [siren.ts:263](https://github.com/comit-network/comit-js-sdk/blob/638de0e/src/siren.ts#L263)*