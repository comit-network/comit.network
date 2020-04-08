---
id: "_cnd_cnd_"
title: "cnd/cnd"
sidebar_label: "cnd/cnd"
---

## Index

### Classes

* [Cnd](../classes/_cnd_cnd_.cnd.md)

### Interfaces

* [Asset](../interfaces/_cnd_cnd_.asset.md)
* [Bitcoin](../interfaces/_cnd_cnd_.bitcoin.md)
* [BitcoinBroadcastSignedTransactionPayload](../interfaces/_cnd_cnd_.bitcoinbroadcastsignedtransactionpayload.md)
* [BitcoinSendAmountToAddressPayload](../interfaces/_cnd_cnd_.bitcoinsendamounttoaddresspayload.md)
* [CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md)
* [Ethereum](../interfaces/_cnd_cnd_.ethereum.md)
* [EthereumCallContractPayload](../interfaces/_cnd_cnd_.ethereumcallcontractpayload.md)
* [EthereumDeployContractPayload](../interfaces/_cnd_cnd_.ethereumdeploycontractpayload.md)
* [GetInfo](../interfaces/_cnd_cnd_.getinfo.md)
* [Halight](../interfaces/_cnd_cnd_.halight.md)
* [Han](../interfaces/_cnd_cnd_.han.md)
* [Herc20](../interfaces/_cnd_cnd_.herc20.md)
* [Ledger](../interfaces/_cnd_cnd_.ledger.md)
* [LndAddHoldInvoicePayload](../interfaces/_cnd_cnd_.lndaddholdinvoicepayload.md)
* [LndSendPaymentPayload](../interfaces/_cnd_cnd_.lndsendpaymentpayload.md)
* [LndSettleInvoicePayload](../interfaces/_cnd_cnd_.lndsettleinvoicepayload.md)
* [Peer](../interfaces/_cnd_cnd_.peer.md)
* [RequestParams](../interfaces/_cnd_cnd_.requestparams.md)
* [SwapDetails](../interfaces/_cnd_cnd_.swapdetails.md)
* [SwapProperties](../interfaces/_cnd_cnd_.swapproperties.md)
* [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md)
* [SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md)

### Type aliases

* [HalightLightningBitcoinHanEthereumEtherRequestBody](_cnd_cnd_.md#halightlightningbitcoinhanethereumetherrequestbody)
* [HalightLightningBitcoinHerc20EthereumErc20RequestBody](_cnd_cnd_.md#halightlightningbitcoinherc20ethereumerc20requestbody)
* [HalightLightningBitcoinRequestParams](_cnd_cnd_.md#halightlightningbitcoinrequestparams)
* [HanEthereumEtherHalightLightningBitcoinRequestBody](_cnd_cnd_.md#hanethereumetherhalightlightningbitcoinrequestbody)
* [HanEthereumEtherRequestParams](_cnd_cnd_.md#hanethereumetherrequestparams)
* [Herc20EthereumErc20HalightLightningBitcoinRequestBody](_cnd_cnd_.md#herc20ethereumerc20halightlightningbitcoinrequestbody)
* [Herc20EthereumErc20RequestParams](_cnd_cnd_.md#herc20ethereumerc20requestparams)
* [LedgerAction](_cnd_cnd_.md#ledgeraction)

### Functions

* [ledgerIsEthereum](_cnd_cnd_.md#ledgerisethereum)

## Type aliases

###  HalightLightningBitcoinHanEthereumEtherRequestBody

Ƭ **HalightLightningBitcoinHanEthereumEtherRequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md)‹[HalightLightningBitcoinRequestParams](_cnd_cnd_.md#halightlightningbitcoinrequestparams), [HanEthereumEtherRequestParams](_cnd_cnd_.md#hanethereumetherrequestparams)›*

*Defined in [src/cnd/cnd.ts:100](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L100)*

___

###  HalightLightningBitcoinHerc20EthereumErc20RequestBody

Ƭ **HalightLightningBitcoinHerc20EthereumErc20RequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md)‹[HalightLightningBitcoinRequestParams](_cnd_cnd_.md#halightlightningbitcoinrequestparams), [Herc20EthereumErc20RequestParams](_cnd_cnd_.md#herc20ethereumerc20requestparams)›*

*Defined in [src/cnd/cnd.ts:104](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L104)*

___

###  HalightLightningBitcoinRequestParams

Ƭ **HalightLightningBitcoinRequestParams**: *[RequestParams](../interfaces/_cnd_cnd_.requestparams.md) & [Halight](../interfaces/_cnd_cnd_.halight.md) & [Bitcoin](../interfaces/_cnd_cnd_.bitcoin.md)*

*Defined in [src/cnd/cnd.ts:85](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L85)*

___

###  HanEthereumEtherHalightLightningBitcoinRequestBody

Ƭ **HanEthereumEtherHalightLightningBitcoinRequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md)‹[HanEthereumEtherRequestParams](_cnd_cnd_.md#hanethereumetherrequestparams), [HalightLightningBitcoinRequestParams](_cnd_cnd_.md#halightlightningbitcoinrequestparams)›*

*Defined in [src/cnd/cnd.ts:92](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L92)*

___

###  HanEthereumEtherRequestParams

Ƭ **HanEthereumEtherRequestParams**: *[RequestParams](../interfaces/_cnd_cnd_.requestparams.md) & [Han](../interfaces/_cnd_cnd_.han.md) & [Ethereum](../interfaces/_cnd_cnd_.ethereum.md)*

*Defined in [src/cnd/cnd.ts:84](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L84)*

___

###  Herc20EthereumErc20HalightLightningBitcoinRequestBody

Ƭ **Herc20EthereumErc20HalightLightningBitcoinRequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md)‹[Herc20EthereumErc20RequestParams](_cnd_cnd_.md#herc20ethereumerc20requestparams), [HalightLightningBitcoinRequestParams](_cnd_cnd_.md#halightlightningbitcoinrequestparams)›*

*Defined in [src/cnd/cnd.ts:96](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L96)*

___

###  Herc20EthereumErc20RequestParams

Ƭ **Herc20EthereumErc20RequestParams**: *[RequestParams](../interfaces/_cnd_cnd_.requestparams.md) & [Herc20](../interfaces/_cnd_cnd_.herc20.md) & [Ethereum](../interfaces/_cnd_cnd_.ethereum.md)*

*Defined in [src/cnd/cnd.ts:88](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L88)*

___

###  LedgerAction

Ƭ **LedgerAction**: *object | object | object | object | object | object | object | object*

*Defined in [src/cnd/cnd.ts:161](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L161)*

## Functions

###  ledgerIsEthereum

▸ **ledgerIsEthereum**(`ledger`: [Ledger](../interfaces/_cnd_cnd_.ledger.md)): *boolean*

*Defined in [src/cnd/cnd.ts:19](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/cnd/cnd.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`ledger` | [Ledger](../interfaces/_cnd_cnd_.ledger.md) |

**Returns:** *boolean*
