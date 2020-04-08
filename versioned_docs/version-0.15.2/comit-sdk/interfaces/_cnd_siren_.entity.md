---
id: "_cnd_siren_.entity"
title: "Entity"
sidebar_label: "Entity"
---

An Entity is a URI-addressable resource that has properties and actions associated with it. It may contain sub-entities and navigational links.

## Hierarchy

* **Entity**

  ↳ [SwapDetails](_cnd_cnd_.swapdetails.md)

## Indexable

* \[ **k**: *string*\]: any

An Entity is a URI-addressable resource that has properties and actions associated with it. It may contain sub-entities and navigational links.

## Index

### Properties

* [actions](_cnd_siren_.entity.md#optional-actions)
* [class](_cnd_siren_.entity.md#optional-class)
* [entities](_cnd_siren_.entity.md#optional-entities)
* [links](_cnd_siren_.entity.md#optional-links)
* [properties](_cnd_siren_.entity.md#optional-properties)
* [title](_cnd_siren_.entity.md#optional-title)

## Properties

### `Optional` actions

• **actions**? : *[Action](_cnd_siren_.action.md)[]*

*Defined in [src/cnd/siren.ts:123](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/cnd/siren.ts#L123)*

A collection of actions; actions show available behaviors an entity exposes.

___

### `Optional` class

• **class**? : *string[]*

*Defined in [src/cnd/siren.ts:105](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/cnd/siren.ts#L105)*

Describes the nature of an entity's content based on the current representation. Possible values are implementation-dependent and should be documented.

___

### `Optional` entities

• **entities**? : *[SubEntity](../modules/_cnd_siren_.md#subentity)[]*

*Defined in [src/cnd/siren.ts:119](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/cnd/siren.ts#L119)*

A collection of related sub-entities. If a sub-entity contains an href value, it should be treated as an embedded link. Clients may choose to optimistically load embedded links. If no href value exists, the sub-entity is an embedded entity representation that contains all the characteristics of a typical entity. One difference is that a sub-entity MUST contain a rel attribute to describe its relationship to the parent entity.

___

### `Optional` links

• **links**? : *[Link](_cnd_siren_.link.md)[]*

*Defined in [src/cnd/siren.ts:127](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/cnd/siren.ts#L127)*

A collection of items that describe navigational links, distinct from entity relationships. Link items should contain a `rel` attribute to describe the relationship and an `href` attribute to point to the target URI. Entities should include a link `rel` to `self`.

___

### `Optional` properties

• **properties**? : *undefined | object*

*Defined in [src/cnd/siren.ts:113](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/cnd/siren.ts#L113)*

A set of key-value pairs that describe the state of an entity.

___

### `Optional` title

• **title**? : *undefined | string*

*Defined in [src/cnd/siren.ts:109](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/cnd/siren.ts#L109)*

Descriptive text about the entity.
