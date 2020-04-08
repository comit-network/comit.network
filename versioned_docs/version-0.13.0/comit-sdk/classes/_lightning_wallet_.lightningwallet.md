---
id: "_lightning_wallet_.lightningwallet"
title: "LightningWallet"
sidebar_label: "LightningWallet"
---

## Hierarchy

* **LightningWallet**

## Index

### Methods

* [addHoldInvoice](_lightning_wallet_.lightningwallet.md#addholdinvoice)
* [addInvoice](_lightning_wallet_.lightningwallet.md#addinvoice)
* [confirmedChannelBalance](_lightning_wallet_.lightningwallet.md#confirmedchannelbalance)
* [confirmedWalletBalance](_lightning_wallet_.lightningwallet.md#confirmedwalletbalance)
* [getInfo](_lightning_wallet_.lightningwallet.md#getinfo)
* [getPubkey](_lightning_wallet_.lightningwallet.md#getpubkey)
* [lookupInvoice](_lightning_wallet_.lightningwallet.md#lookupinvoice)
* [newAddress](_lightning_wallet_.lightningwallet.md#newaddress)
* [openChannel](_lightning_wallet_.lightningwallet.md#openchannel)
* [sendPayment](_lightning_wallet_.lightningwallet.md#sendpayment)
* [sendPaymentWithRequest](_lightning_wallet_.lightningwallet.md#sendpaymentwithrequest)
* [settleInvoice](_lightning_wallet_.lightningwallet.md#settleinvoice)
* [newInstance](_lightning_wallet_.lightningwallet.md#static-newinstance)

## Methods

###  addHoldInvoice

▸ **addHoldInvoice**(`satAmount`: string, `secretHash`: string, `expiry`: number, `memo`: string): *Promise‹string›*

*Defined in [lightning_wallet.ts:48](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`satAmount` | string |
`secretHash` | string |
`expiry` | number |
`memo` | string |

**Returns:** *Promise‹string›*

___

###  addInvoice

▸ **addInvoice**(`satAmount`: string): *Promise‹object›*

*Defined in [lightning_wallet.ts:124](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`satAmount` | string |

**Returns:** *Promise‹object›*

___

###  confirmedChannelBalance

▸ **confirmedChannelBalance**(): *Promise‹string›*

*Defined in [lightning_wallet.ts:75](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L75)*

**Returns:** *Promise‹string›*

___

###  confirmedWalletBalance

▸ **confirmedWalletBalance**(): *Promise‹string›*

*Defined in [lightning_wallet.ts:79](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L79)*

**Returns:** *Promise‹string›*

___

###  getInfo

▸ **getInfo**(): *Promise‹GetInfoResponse›*

*Defined in [lightning_wallet.ts:87](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L87)*

**Returns:** *Promise‹GetInfoResponse›*

___

###  getPubkey

▸ **getPubkey**(): *Promise‹string›*

*Defined in [lightning_wallet.ts:83](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L83)*

**Returns:** *Promise‹string›*

___

###  lookupInvoice

▸ **lookupInvoice**(`secretHash`: string): *Promise‹Invoice›*

*Defined in [lightning_wallet.ts:118](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`secretHash` | string |

**Returns:** *Promise‹Invoice›*

___

###  newAddress

▸ **newAddress**(`type`: AddressType): *Promise‹string›*

*Defined in [lightning_wallet.ts:71](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | AddressType |

**Returns:** *Promise‹string›*

___

###  openChannel

▸ **openChannel**(`toPubkey`: string, `satAmount`: number): *Promise‹[Outpoint](../interfaces/_lightning_wallet_.outpoint.md)›*

*Defined in [lightning_wallet.ts:91](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`toPubkey` | string |
`satAmount` | number |

**Returns:** *Promise‹[Outpoint](../interfaces/_lightning_wallet_.outpoint.md)›*

___

###  sendPayment

▸ **sendPayment**(`publicKey`: string, `satAmount`: string, `secretHash`: string, `finalCltvDelta`: number): *Promise‹SendResponse›*

*Defined in [lightning_wallet.ts:31](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | string |
`satAmount` | string |
`secretHash` | string |
`finalCltvDelta` | number |

**Returns:** *Promise‹SendResponse›*

___

###  sendPaymentWithRequest

▸ **sendPaymentWithRequest**(`paymentRequest`: string): *Promise‹SendResponse›*

*Defined in [lightning_wallet.ts:112](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`paymentRequest` | string |

**Returns:** *Promise‹SendResponse›*

___

###  settleInvoice

▸ **settleInvoice**(`secret`: string): *Promise‹void›*

*Defined in [lightning_wallet.ts:66](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`secret` | string |

**Returns:** *Promise‹void›*

___

### `Static` newInstance

▸ **newInstance**(`certPath`: string | false, `macaroonPath`: string, `lndRpcSocket`: string, `lndP2pSocket`: string): *Promise‹[LightningWallet](_lightning_wallet_.lightningwallet.md)›*

*Defined in [lightning_wallet.ts:12](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/lightning_wallet.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`certPath` | string &#124; false |
`macaroonPath` | string |
`lndRpcSocket` | string |
`lndP2pSocket` | string |

**Returns:** *Promise‹[LightningWallet](_lightning_wallet_.lightningwallet.md)›*
