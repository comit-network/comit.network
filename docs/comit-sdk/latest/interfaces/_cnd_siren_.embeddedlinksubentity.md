---
id: "_cnd_siren_.embeddedlinksubentity"
title: "EmbeddedLinkSubEntity"
sidebar_label: "EmbeddedLinkSubEntity"
---

## Hierarchy

* **EmbeddedLinkSubEntity**

## Indexable

* \[ **k**: *string*\]: any

## Index

### Properties

* [class](_cnd_siren_.embeddedlinksubentity.md#optional-class)
* [href](_cnd_siren_.embeddedlinksubentity.md#href)
* [rel](_cnd_siren_.embeddedlinksubentity.md#rel)
* [title](_cnd_siren_.embeddedlinksubentity.md#optional-title)
* [type](_cnd_siren_.embeddedlinksubentity.md#optional-type)

## Properties

### `Optional` class

• **class**? : *string[]*

*Defined in [src/cnd/siren.ts:134](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L134)*

Describes the nature of an entity's content based on the current representation. Possible values are implementation-dependent and should be documented.

___

###  href

• **href**: *string*

*Defined in [src/cnd/siren.ts:142](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L142)*

The URI of the linked sub-entity.

___

###  rel

• **rel**: *[[RelValue](../modules/_cnd_siren_.md#relvalue), string]*

*Defined in [src/cnd/siren.ts:138](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L138)*

Defines the relationship of the sub-entity to its parent, per Web Linking (RFC5899).

___

### `Optional` title

• **title**? : *undefined | string*

*Defined in [src/cnd/siren.ts:147](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L147)*

Descriptive text about the entity.

___

### `Optional` type

• **type**? : *[MediaType](../modules/_cnd_siren_.md#mediatype)*

*Defined in [src/cnd/siren.ts:143](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L143)*
