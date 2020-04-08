---
id: "_cnd_siren_.field"
title: "Field"
sidebar_label: "Field"
---

Fields represent controls inside of actions.

## Hierarchy

* **Field**

## Indexable

* \[ **k**: *string*\]: any

Fields represent controls inside of actions.

## Index

### Properties

* [name](_cnd_siren_.field.md#name)
* [title](_cnd_siren_.field.md#optional-title)
* [type](_cnd_siren_.field.md#optional-type)
* [value](_cnd_siren_.field.md#optional-value)

## Properties

###  name

• **name**: *string*

*Defined in [src/cnd/siren.ts:191](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L191)*

A name describing the control. Field names MUST be unique within the set of fields for an action. The behaviour of clients when parsing a Siren document that violates this constraint is undefined.

___

### `Optional` title

• **title**? : *undefined | string*

*Defined in [src/cnd/siren.ts:218](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L218)*

Textual annotation of a field. Clients may use this as a label.

___

### `Optional` type

• **type**? : *"hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file"*

*Defined in [src/cnd/siren.ts:195](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L195)*

The input type of the field. This is a subset of the input types specified by HTML5.

___

### `Optional` value

• **value**? : *string | number | [FieldValueObject](_cnd_siren_.fieldvalueobject.md)[]*

*Defined in [src/cnd/siren.ts:222](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/siren.ts#L222)*

A value assigned to the field.  May be a scalar value or a list of value objects.
