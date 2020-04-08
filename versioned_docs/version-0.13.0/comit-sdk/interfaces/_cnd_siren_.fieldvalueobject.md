---
id: "_cnd_siren_.fieldvalueobject"
title: "FieldValueObject"
sidebar_label: "FieldValueObject"
---

Value objects represent multiple selectable field values. Use in conjunction with field `"type" = "radio"` and `"type" = "checkbox"` to express that zero, one or many out of several possible values may be sent back to the server.

## Hierarchy

* **FieldValueObject**

## Indexable

* \[ **k**: *string*\]: any

Value objects represent multiple selectable field values. Use in conjunction with field `"type" = "radio"` and `"type" = "checkbox"` to express that zero, one or many out of several possible values may be sent back to the server.

## Index

### Properties

* [selected](_cnd_siren_.fieldvalueobject.md#optional-selected)
* [title](_cnd_siren_.fieldvalueobject.md#optional-title)
* [value](_cnd_siren_.fieldvalueobject.md#value)

## Properties

### `Optional` selected

• **selected**? : *undefined | false | true*

*Defined in [cnd/siren.ts:240](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L240)*

A value object with a `"selected" = true` attribute indicates that this value should be considered preselected by the client. When missing, the default value is `false`.

___

### `Optional` title

• **title**? : *undefined | string*

*Defined in [cnd/siren.ts:232](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L232)*

Textual description of a field value.

___

###  value

• **value**: *string | number*

*Defined in [cnd/siren.ts:236](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/siren.ts#L236)*

Possible value for the field.
