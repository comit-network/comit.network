---
id: "_negotiation_execution_params_"
title: "negotiation/execution_params"
sidebar_label: "negotiation/execution_params"
---

## Index

### Enumerations

* [NetworkType](../enums/_negotiation_execution_params_.networktype.md)

### Interfaces

* [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)
* [LedgerParams](../interfaces/_negotiation_execution_params_.ledgerparams.md)

### Variables

* [moment](_negotiation_execution_params_.md#moment)

### Functions

* [defaultLedgerParams](_negotiation_execution_params_.md#defaultledgerparams)
* [getNetworkType](_negotiation_execution_params_.md#getnetworktype)
* [isValidExecutionParams](_negotiation_execution_params_.md#isvalidexecutionparams)

## Variables

###  moment

• **moment**: *[moment](_negotiation_execution_params_.md#moment)*

*Defined in [src/negotiation/execution_params.ts:1](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/execution_params.ts#L1)*

## Functions

###  defaultLedgerParams

▸ **defaultLedgerParams**(): *[LedgerParams](../interfaces/_negotiation_execution_params_.ledgerparams.md)*

*Defined in [src/negotiation/execution_params.ts:15](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/execution_params.ts#L15)*

**Returns:** *[LedgerParams](../interfaces/_negotiation_execution_params_.ledgerparams.md)*

___

###  getNetworkType

▸ **getNetworkType**(`ledgerParams`: [LedgerParams](../interfaces/_negotiation_execution_params_.ledgerparams.md)): *[NetworkType](../enums/_negotiation_execution_params_.networktype.md)*

*Defined in [src/negotiation/execution_params.ts:65](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/execution_params.ts#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`ledgerParams` | [LedgerParams](../interfaces/_negotiation_execution_params_.ledgerparams.md) |

**Returns:** *[NetworkType](../enums/_negotiation_execution_params_.networktype.md)*

___

###  isValidExecutionParams

▸ **isValidExecutionParams**(`executionParams?`: [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md)): *boolean*

*Defined in [src/negotiation/execution_params.ts:26](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/negotiation/execution_params.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`executionParams?` | [ExecutionParams](../interfaces/_negotiation_execution_params_.executionparams.md) |

**Returns:** *boolean*
