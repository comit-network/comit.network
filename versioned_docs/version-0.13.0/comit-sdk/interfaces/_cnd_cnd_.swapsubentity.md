---
id: "_cnd_cnd_.swapsubentity"
title: "SwapSubEntity"
sidebar_label: "SwapSubEntity"
---

## Hierarchy

* [Entity](_cnd_siren_.entity.md) & object

  ↳ **SwapSubEntity**

## Indexable

* \[ **k**: *string*\]: any

## Index

### Properties

* [actions](_cnd_cnd_.swapsubentity.md#optional-actions)
* [class](_cnd_cnd_.swapsubentity.md#optional-class)
* [entities](_cnd_cnd_.swapsubentity.md#optional-entities)
* [links](_cnd_cnd_.swapsubentity.md#optional-links)
* [properties](_cnd_cnd_.swapsubentity.md#optional-properties)
* [rel](_cnd_cnd_.swapsubentity.md#rel)
* [title](_cnd_cnd_.swapsubentity.md#optional-title)

## Properties

### `Optional` actions

• **actions**? : *[Action](_cnd_siren_.action.md)[]*

*Inherited from [Entity](_cnd_siren_.entity.md).[actions](_cnd_siren_.entity.md#optional-actions)*

*Defined in [cnd/siren.ts:123](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L123)*

A collection of actions; actions show available behaviors an entity exposes.

___

### `Optional` class

• **class**? : *string[]*

*Inherited from [Entity](_cnd_siren_.entity.md).[class](_cnd_siren_.entity.md#optional-class)*

*Defined in [cnd/siren.ts:105](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L105)*

Describes the nature of an entity's content based on the current representation. Possible values are implementation-dependent and should be documented.

___

### `Optional` entities

• **entities**? : *[SubEntity](../modules/_cnd_siren_.md#subentity)[]*

*Inherited from [Entity](_cnd_siren_.entity.md).[entities](_cnd_siren_.entity.md#optional-entities)*

*Defined in [cnd/siren.ts:119](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L119)*

A collection of related sub-entities. If a sub-entity contains an href value, it should be treated as an embedded link. Clients may choose to optimistically load embedded links. If no href value exists, the sub-entity is an embedded entity representation that contains all the characteristics of a typical entity. One difference is that a sub-entity MUST contain a rel attribute to describe its relationship to the parent entity.

___

### `Optional` links

• **links**? : *[Link](_cnd_siren_.link.md)[]*

*Inherited from [Entity](_cnd_siren_.entity.md).[links](_cnd_siren_.entity.md#optional-links)*

*Defined in [cnd/siren.ts:127](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L127)*

A collection of items that describe navigational links, distinct from entity relationships. Link items should contain a `rel` attribute to describe the relationship and an `href` attribute to point to the target URI. Entities should include a link `rel` to `self`.

___

### `Optional` properties

• **properties**? : *[SwapProperties](_cnd_cnd_.swapproperties.md)*

*Overrides [Entity](_cnd_siren_.entity.md).[properties](_cnd_siren_.entity.md#optional-properties)*

*Defined in [cnd/cnd.ts:129](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L129)*

___

###  rel

• **rel**: *[[RelValue](../modules/_cnd_siren_.md#relvalue), string]*

*Inherited from __type.rel*

*Defined in [cnd/siren.ts:94](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L94)*

Defines the relationship of the sub-entity to its parent, per Web Linking (RFC5899).

___

### `Optional` title

• **title**? : *undefined | string*

*Inherited from [Entity](_cnd_siren_.entity.md).[title](_cnd_siren_.entity.md#optional-title)*

*Defined in [cnd/siren.ts:109](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L109)*

Descriptive text about the entity.
