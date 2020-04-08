---
id: "_swap_.swap"
title: "Swap"
sidebar_label: "Swap"
---

A stateful class that represents a single swap.

It has all the dependencies embedded that are necessary for taking actions on the swap.

## Hierarchy

* **Swap**

## Index

### Constructors

* [constructor](_swap_.swap.md#constructor)

### Properties

* [self](_swap_.swap.md#self)

### Methods

* [accept](_swap_.swap.md#accept)
* [decline](_swap_.swap.md#decline)
* [deploy](_swap_.swap.md#deploy)
* [doLedgerAction](_swap_.swap.md#doledgeraction)
* [fetchDetails](_swap_.swap.md#fetchdetails)
* [fund](_swap_.swap.md#fund)
* [getAlphaDeployTransaction](_swap_.swap.md#getalphadeploytransaction)
* [getAlphaFundTransaction](_swap_.swap.md#getalphafundtransaction)
* [getAlphaRedeemTransaction](_swap_.swap.md#getalpharedeemtransaction)
* [getAlphaRefundTransaction](_swap_.swap.md#getalpharefundtransaction)
* [getBetaDeployTransaction](_swap_.swap.md#getbetadeploytransaction)
* [getBetaFundTransaction](_swap_.swap.md#getbetafundtransaction)
* [getBetaRedeemTransaction](_swap_.swap.md#getbetaredeemtransaction)
* [getBetaRefundTransaction](_swap_.swap.md#getbetarefundtransaction)
* [redeem](_swap_.swap.md#redeem)
* [refund](_swap_.swap.md#refund)
* [tryExecuteSirenAction](_swap_.swap.md#tryexecutesirenaction)

## Constructors

###  constructor

\+ **new Swap**(`cnd`: [Cnd](_cnd_cnd_.cnd.md), `self`: string, `wallets`: AllWallets): *[Swap](_swap_.swap.md)*

*Defined in [src/swap.ts:26](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`cnd` | [Cnd](_cnd_cnd_.cnd.md) |
`self` | string |
`wallets` | AllWallets |

**Returns:** *[Swap](_swap_.swap.md)*

## Properties

###  self

• **self**: *string*

*Defined in [src/swap.ts:30](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L30)*

## Methods

###  accept

▸ **accept**(`tryParams`: [TryParams](../interfaces/_swap_.tryparams.md)): *Promise‹void›*

*Defined in [src/swap.ts:43](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L43)*

Looks for and executes the accept action of this [Swap](_swap_.swap.md).
If the [Swap](_swap_.swap.md) is not in the right state this call will throw a timeout exception.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tryParams` | [TryParams](../interfaces/_swap_.tryparams.md) | Controls at which stage the exception is thrown. |

**Returns:** *Promise‹void›*

___

###  decline

▸ **decline**(`tryParams`: [TryParams](../interfaces/_swap_.tryparams.md)): *Promise‹void›*

*Defined in [src/swap.ts:54](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L54)*

Looks for and executes the decline action of this [Swap](_swap_.swap.md).
If the [Swap](_swap_.swap.md) is not in the right state this call will throw a timeout exception.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tryParams` | [TryParams](../interfaces/_swap_.tryparams.md) | Controls at which stage the exception is thrown. |

**Returns:** *Promise‹void›*

___

###  deploy

▸ **deploy**(`tryParams`: [TryParams](../interfaces/_swap_.tryparams.md)): *Promise‹[Transaction](_transaction_.transaction.md) | string›*

*Defined in [src/swap.ts:68](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L68)*

Looks for and executes the deploy action of this [Swap](_swap_.swap.md).
If the [Swap](_swap_.swap.md) is not in the right state this call will throw a timeout exception.

This is only valid for ERC20 swaps.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API, or [WalletError](_swap_.walleterror.md) if the blockchain wallet throws, or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tryParams` | [TryParams](../interfaces/_swap_.tryparams.md) | Controls at which stage the exception is thrown. |

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string›*

The hash of the transaction that was sent to the blockchain network.

___

###  doLedgerAction

▸ **doLedgerAction**(`ledgerAction`: [LedgerAction](../modules/_cnd_cnd_.md#ledgeraction)): *Promise‹[Transaction](_transaction_.transaction.md) | string›*

*Defined in [src/swap.ts:166](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L166)*

Low level API for executing a ledger action returned from [Cnd](_cnd_cnd_.cnd.md).

Uses the wallets given in the constructor to send transactions according to the given ledger action.

**`throws`** A [WalletError](_swap_.walleterror.md) if a wallet or blockchain action failed.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ledgerAction` | [LedgerAction](../modules/_cnd_cnd_.md#ledgeraction) | The ledger action returned from [Cnd](_cnd_cnd_.cnd.md). |

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string›*

___

###  fetchDetails

▸ **fetchDetails**(): *Promise‹[SwapDetails](../interfaces/_cnd_cnd_.swapdetails.md)›*

*Defined in [src/swap.ts:130](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L130)*

Fetch the details of a swap.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Returns:** *Promise‹[SwapDetails](../interfaces/_cnd_cnd_.swapdetails.md)›*

The details of the swap are returned by cnd REST API.

___

###  fund

▸ **fund**(`tryParams`: [TryParams](../interfaces/_swap_.tryparams.md)): *Promise‹[Transaction](_transaction_.transaction.md) | string›*

*Defined in [src/swap.ts:84](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L84)*

Looks for and executes the fund action of this [Swap](_swap_.swap.md).
If the [Swap](_swap_.swap.md) is not in the right state this call will throw a timeout exception.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API, or [WalletError](_swap_.walleterror.md) if the blockchain wallet throws, or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tryParams` | [TryParams](../interfaces/_swap_.tryparams.md) | Controls at which stage the exception is thrown. |

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string›*

The hash of the transaction that was sent to the blockchain network.

___

###  getAlphaDeployTransaction

▸ **getAlphaDeployTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:346](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L346)*

Get the Alpha deploy transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a deploy transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getAlphaFundTransaction

▸ **getAlphaFundTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:359](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L359)*

Get the Alpha Fund transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a funding transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getAlphaRedeemTransaction

▸ **getAlphaRedeemTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:370](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L370)*

Get the Alpha Redeem transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a redeem transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getAlphaRefundTransaction

▸ **getAlphaRefundTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:383](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L383)*

Get the Alpha Refund transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a refund transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getBetaDeployTransaction

▸ **getBetaDeployTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:396](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L396)*

Get the Beta deploy transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a deploy transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getBetaFundTransaction

▸ **getBetaFundTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:409](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L409)*

Get the Beta Fund transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a funding transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getBetaRedeemTransaction

▸ **getBetaRedeemTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:420](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L420)*

Get the Beta Redeem transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a redeem transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  getBetaRefundTransaction

▸ **getBetaRefundTransaction**(): *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

*Defined in [src/swap.ts:433](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L433)*

Get the Beta Refund transaction.

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string | null›*

null if cnd hasn't seen a refund transaction, otherwise, [Transaction](_transaction_.transaction.md) if supported or the transaction id as string.

___

###  redeem

▸ **redeem**(`tryParams`: [TryParams](../interfaces/_swap_.tryparams.md)): *Promise‹[Transaction](_transaction_.transaction.md) | string›*

*Defined in [src/swap.ts:100](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L100)*

Looks for and executes the redeem action of this [Swap](_swap_.swap.md).
If the [Swap](_swap_.swap.md) is not in the right state this call will throw a timeout exception.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API, or [WalletError](_swap_.walleterror.md) if the blockchain wallet throws, or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tryParams` | [TryParams](../interfaces/_swap_.tryparams.md) | Controls at which stage the exception is thrown. |

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string›*

The hash of the transaction that was sent to the blockchain network.

___

###  refund

▸ **refund**(`tryParams`: [TryParams](../interfaces/_swap_.tryparams.md)): *Promise‹[Transaction](_transaction_.transaction.md) | string›*

*Defined in [src/swap.ts:116](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L116)*

Looks for and executes the refund action of this [Swap](_swap_.swap.md).
If the [Swap](_swap_.swap.md) is not in the right state this call will throw a timeout exception.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API, or [WalletError](_swap_.walleterror.md) if the blockchain wallet throws, or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tryParams` | [TryParams](../interfaces/_swap_.tryparams.md) | Controls at which stage the exception is thrown. |

**Returns:** *Promise‹[Transaction](_transaction_.transaction.md) | string›*

The result of the refund action, a hash of the transaction that was sent to the blockchain.

___

###  tryExecuteSirenAction

▸ **tryExecuteSirenAction**<**R**>(`actionName`: string, `__namedParameters`: object): *Promise‹AxiosResponse‹R››*

*Defined in [src/swap.ts:148](https://github.com/comit-network/comit-js-sdk/blob/364611d/src/swap.ts#L148)*

Low level API for executing actions on the [Swap](_swap_.swap.md).

If you are using any of the above actions ([Swap.redeem](_swap_.swap.md#redeem), etc) you shouldn't need to use this.
This only performs an action on the CND REST API, if an action is needed on another system (e.g blockchain wallet),
then the needed information is returned by this function and needs to be processed with [doLedgerAction](_swap_.swap.md#doledgeraction).

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API, or [WalletError](_swap_.walleterror.md) if the blockchain wallet throws, or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Type parameters:**

▪ **R**

**Parameters:**

▪ **actionName**: *string*

The name of the Siren action you want to execute.

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`maxTimeoutSecs` | number |
`tryIntervalSecs` | number |

**Returns:** *Promise‹AxiosResponse‹R››*

The response from [Cnd](_cnd_cnd_.cnd.md). The actual response depends on the action you executed (hence the
type parameter).
