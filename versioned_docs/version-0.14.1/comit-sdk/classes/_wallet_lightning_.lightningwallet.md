---
id: "_wallet_lightning_.lightningwallet"
title: "LightningWallet"
sidebar_label: "LightningWallet"
---

## Hierarchy

* **LightningWallet**

## Index

### Methods

* [addHoldInvoice](_wallet_lightning_.lightningwallet.md#addholdinvoice)
* [addInvoice](_wallet_lightning_.lightningwallet.md#addinvoice)
* [assertLndDetails](_wallet_lightning_.lightningwallet.md#assertlnddetails)
* [confirmedChannelBalance](_wallet_lightning_.lightningwallet.md#confirmedchannelbalance)
* [confirmedWalletBalance](_wallet_lightning_.lightningwallet.md#confirmedwalletbalance)
* [getInfo](_wallet_lightning_.lightningwallet.md#getinfo)
* [getPubkey](_wallet_lightning_.lightningwallet.md#getpubkey)
* [lookupInvoice](_wallet_lightning_.lightningwallet.md#lookupinvoice)
* [newAddress](_wallet_lightning_.lightningwallet.md#newaddress)
* [openChannel](_wallet_lightning_.lightningwallet.md#openchannel)
* [sendPayment](_wallet_lightning_.lightningwallet.md#sendpayment)
* [sendPaymentWithRequest](_wallet_lightning_.lightningwallet.md#sendpaymentwithrequest)
* [settleInvoice](_wallet_lightning_.lightningwallet.md#settleinvoice)
* [newInstance](_wallet_lightning_.lightningwallet.md#static-newinstance)

## Methods

###  addHoldInvoice

▸ **addHoldInvoice**(`satAmount`: string, `secretHash`: string, `expiry`: number, `cltvExpiry`: number): *Promise‹string›*

*Defined in [src/wallet/lightning.ts:48](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`satAmount` | string |
`secretHash` | string |
`expiry` | number |
`cltvExpiry` | number |

**Returns:** *Promise‹string›*

___

###  addInvoice

▸ **addInvoice**(`satAmount`: string): *Promise‹object›*

*Defined in [src/wallet/lightning.ts:124](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`satAmount` | string |

**Returns:** *Promise‹object›*

___

###  assertLndDetails

▸ **assertLndDetails**(`selfPublicKey`: string, `chain`: string, `network`: string): *Promise‹void›*

*Defined in [src/wallet/lightning.ts:146](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L146)*

Asserts that the available lnd instance is the same than the one connected to cnd.

**`throws`** Error if the lnd instance details mismatch

**Parameters:**

Name | Type |
------ | ------ |
`selfPublicKey` | string |
`chain` | string |
`network` | string |

**Returns:** *Promise‹void›*

___

###  confirmedChannelBalance

▸ **confirmedChannelBalance**(): *Promise‹string›*

*Defined in [src/wallet/lightning.ts:75](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L75)*

**Returns:** *Promise‹string›*

___

###  confirmedWalletBalance

▸ **confirmedWalletBalance**(): *Promise‹string›*

*Defined in [src/wallet/lightning.ts:79](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L79)*

**Returns:** *Promise‹string›*

___

###  getInfo

▸ **getInfo**(): *Promise‹GetInfoResponse›*

*Defined in [src/wallet/lightning.ts:87](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L87)*

**Returns:** *Promise‹GetInfoResponse›*

___

###  getPubkey

▸ **getPubkey**(): *Promise‹string›*

*Defined in [src/wallet/lightning.ts:83](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L83)*

**Returns:** *Promise‹string›*

___

###  lookupInvoice

▸ **lookupInvoice**(`secretHash`: string): *Promise‹Invoice›*

*Defined in [src/wallet/lightning.ts:118](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`secretHash` | string |

**Returns:** *Promise‹Invoice›*

___

###  newAddress

▸ **newAddress**(`type`: AddressType): *Promise‹string›*

*Defined in [src/wallet/lightning.ts:71](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | AddressType |

**Returns:** *Promise‹string›*

___

###  openChannel

▸ **openChannel**(`toPubkey`: string, `satAmount`: number): *Promise‹[Outpoint](../interfaces/_wallet_lightning_.outpoint.md)›*

*Defined in [src/wallet/lightning.ts:91](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`toPubkey` | string |
`satAmount` | number |

**Returns:** *Promise‹[Outpoint](../interfaces/_wallet_lightning_.outpoint.md)›*

___

###  sendPayment

▸ **sendPayment**(`publicKey`: string, `satAmount`: string, `secretHash`: string, `finalCltvDelta`: number): *Promise‹SendResponse›*

*Defined in [src/wallet/lightning.ts:31](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L31)*

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

*Defined in [src/wallet/lightning.ts:112](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`paymentRequest` | string |

**Returns:** *Promise‹SendResponse›*

___

###  settleInvoice

▸ **settleInvoice**(`secret`: string): *Promise‹void›*

*Defined in [src/wallet/lightning.ts:66](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`secret` | string |

**Returns:** *Promise‹void›*

___

### `Static` newInstance

▸ **newInstance**(`certPath`: string | false, `macaroonPath`: string, `lndRpcSocket`: string, `lndP2pSocket`: string): *Promise‹[LightningWallet](_wallet_lightning_.lightningwallet.md)›*

*Defined in [src/wallet/lightning.ts:12](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/wallet/lightning.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`certPath` | string &#124; false |
`macaroonPath` | string |
`lndRpcSocket` | string |
`lndP2pSocket` | string |

**Returns:** *Promise‹[LightningWallet](_wallet_lightning_.lightningwallet.md)›*
