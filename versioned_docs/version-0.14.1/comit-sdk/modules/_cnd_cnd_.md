---
id: "_cnd_cnd_"
title: "cnd/cnd"
sidebar_label: "cnd/cnd"
---

## Index

### Classes

* [Cnd](../classes/_cnd_cnd_.cnd.md)

### Interfaces

* [AlphaHalightAdditionalRequestBody](../interfaces/_cnd_cnd_.alphahalightadditionalrequestbody.md)
* [AlphaHanAdditionalRequestBody](../interfaces/_cnd_cnd_.alphahanadditionalrequestbody.md)
* [AlphaHerc20AdditionalRequestBody](../interfaces/_cnd_cnd_.alphaherc20additionalrequestbody.md)
* [Asset](../interfaces/_cnd_cnd_.asset.md)
* [BetaHalightAdditionalRequestBody](../interfaces/_cnd_cnd_.betahalightadditionalrequestbody.md)
* [BetaHanAdditionalRequestBody](../interfaces/_cnd_cnd_.betahanadditionalrequestbody.md)
* [BetaHerc20AdditionalRequestBody](../interfaces/_cnd_cnd_.betaherc20additionalrequestbody.md)
* [BitcoinBroadcastSignedTransactionPayload](../interfaces/_cnd_cnd_.bitcoinbroadcastsignedtransactionpayload.md)
* [BitcoinSendAmountToAddressPayload](../interfaces/_cnd_cnd_.bitcoinsendamounttoaddresspayload.md)
* [CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md)
* [EthereumCallContractPayload](../interfaces/_cnd_cnd_.ethereumcallcontractpayload.md)
* [EthereumDeployContractPayload](../interfaces/_cnd_cnd_.ethereumdeploycontractpayload.md)
* [GetInfo](../interfaces/_cnd_cnd_.getinfo.md)
* [Ledger](../interfaces/_cnd_cnd_.ledger.md)
* [LndAddHoldInvoicePayload](../interfaces/_cnd_cnd_.lndaddholdinvoicepayload.md)
* [LndSendPaymentPayload](../interfaces/_cnd_cnd_.lndsendpaymentpayload.md)
* [LndSettleInvoicePayload](../interfaces/_cnd_cnd_.lndsettleinvoicepayload.md)
* [Peer](../interfaces/_cnd_cnd_.peer.md)
* [SwapDetails](../interfaces/_cnd_cnd_.swapdetails.md)
* [SwapProperties](../interfaces/_cnd_cnd_.swapproperties.md)
* [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md)
* [SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md)

### Type aliases

* [HalightLightningBitcoinHanEthereumEtherRequestBody](_cnd_cnd_.md#halightlightningbitcoinhanethereumetherrequestbody)
* [HalightLightningBitcoinHerc20EthereumErc20RequestBody](_cnd_cnd_.md#halightlightningbitcoinherc20ethereumerc20requestbody)
* [HanEthereumEtherHalightLightningBitcoinRequestBody](_cnd_cnd_.md#hanethereumetherhalightlightningbitcoinrequestbody)
* [Herc20EthereumErc20HalightLightningBitcoinRequestBody](_cnd_cnd_.md#herc20ethereumerc20halightlightningbitcoinrequestbody)
* [LedgerAction](_cnd_cnd_.md#ledgeraction)

### Functions

* [ledgerIsEthereum](_cnd_cnd_.md#ledgerisethereum)

## Type aliases

###  HalightLightningBitcoinHanEthereumEtherRequestBody

Ƭ **HalightLightningBitcoinHanEthereumEtherRequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md) & [AlphaHalightAdditionalRequestBody](../interfaces/_cnd_cnd_.alphahalightadditionalrequestbody.md) & [BetaHanAdditionalRequestBody](../interfaces/_cnd_cnd_.betahanadditionalrequestbody.md)*

*Defined in [src/cnd/cnd.ts:94](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L94)*

___

###  HalightLightningBitcoinHerc20EthereumErc20RequestBody

Ƭ **HalightLightningBitcoinHerc20EthereumErc20RequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md) & [AlphaHalightAdditionalRequestBody](../interfaces/_cnd_cnd_.alphahalightadditionalrequestbody.md) & [BetaHerc20AdditionalRequestBody](../interfaces/_cnd_cnd_.betaherc20additionalrequestbody.md)*

*Defined in [src/cnd/cnd.ts:97](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L97)*

___

###  HanEthereumEtherHalightLightningBitcoinRequestBody

Ƭ **HanEthereumEtherHalightLightningBitcoinRequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md) & [AlphaHanAdditionalRequestBody](../interfaces/_cnd_cnd_.alphahanadditionalrequestbody.md) & [BetaHalightAdditionalRequestBody](../interfaces/_cnd_cnd_.betahalightadditionalrequestbody.md)*

*Defined in [src/cnd/cnd.ts:88](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L88)*

___

###  Herc20EthereumErc20HalightLightningBitcoinRequestBody

Ƭ **Herc20EthereumErc20HalightLightningBitcoinRequestBody**: *[CoreRequestBody](../interfaces/_cnd_cnd_.corerequestbody.md) & [AlphaHerc20AdditionalRequestBody](../interfaces/_cnd_cnd_.alphaherc20additionalrequestbody.md) & [BetaHalightAdditionalRequestBody](../interfaces/_cnd_cnd_.betahalightadditionalrequestbody.md)*

*Defined in [src/cnd/cnd.ts:91](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L91)*

___

###  LedgerAction

Ƭ **LedgerAction**: *object | object | object | object | object | object | object | object*

*Defined in [src/cnd/cnd.ts:153](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L153)*

## Functions

###  ledgerIsEthereum

▸ **ledgerIsEthereum**(`ledger`: [Ledger](../interfaces/_cnd_cnd_.ledger.md)): *boolean*

*Defined in [src/cnd/cnd.ts:19](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`ledger` | [Ledger](../interfaces/_cnd_cnd_.ledger.md) |

**Returns:** *boolean*
