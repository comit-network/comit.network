---
id: "_cnd_cnd_.cnd"
title: "Cnd"
sidebar_label: "Cnd"
---

Facilitates access to the [COMIT network daemon (cnd)](@link https://github.com/comit-network/comit-rs) REST API.

## Hierarchy

* **Cnd**

## Index

### Constructors

* [constructor](_cnd_cnd_.cnd.md#constructor)

### Methods

* [createHalightLightningBitcoinHanEthereumEther](_cnd_cnd_.cnd.md#createhalightlightningbitcoinhanethereumether)
* [createHalightLightningBitcoinHerc20EthereumErc20](_cnd_cnd_.cnd.md#createhalightlightningbitcoinherc20ethereumerc20)
* [createHanEthereumEtherHalightLightningBitcoin](_cnd_cnd_.cnd.md#createhanethereumetherhalightlightningbitcoin)
* [createHerc20EthereumErc20HalightLightningBitcoin](_cnd_cnd_.cnd.md#createherc20ethereumerc20halightlightningbitcoin)
* [executeSirenAction](_cnd_cnd_.cnd.md#executesirenaction)
* [fetch](_cnd_cnd_.cnd.md#fetch)
* [getPeerId](_cnd_cnd_.cnd.md#getpeerid)
* [getPeerListenAddresses](_cnd_cnd_.cnd.md#getpeerlistenaddresses)
* [getSwaps](_cnd_cnd_.cnd.md#getswaps)
* [postSwap](_cnd_cnd_.cnd.md#postswap)

## Constructors

###  constructor

\+ **new Cnd**(`cndUrl`: string): *[Cnd](_cnd_cnd_.cnd.md)*

*Defined in [cnd/cnd.ts:241](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L241)*

**Parameters:**

Name | Type |
------ | ------ |
`cndUrl` | string |

**Returns:** *[Cnd](_cnd_cnd_.cnd.md)*

## Methods

###  createHalightLightningBitcoinHanEthereumEther

▸ **createHalightLightningBitcoinHanEthereumEther**(`body?`: any): *Promise‹string›*

*Defined in [cnd/cnd.ts:347](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L347)*

Post a swap request on the lightning REST API route of cnd `/swaps/halight/lightning/bitcoin/han/ethereum/ether`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body?` | any | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  createHalightLightningBitcoinHerc20EthereumErc20

▸ **createHalightLightningBitcoinHerc20EthereumErc20**(`body?`: any): *Promise‹string›*

*Defined in [cnd/cnd.ts:367](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L367)*

Post a swap request on the lightning REST API route of cnd `/swaps/halight/lightning/bitcoin/herc20/ethereum/erc20`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body?` | any | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  createHanEthereumEtherHalightLightningBitcoin

▸ **createHanEthereumEtherHalightLightningBitcoin**(`body?`: any): *Promise‹string›*

*Defined in [cnd/cnd.ts:307](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L307)*

Post a swap request on the lightning REST API route of cnd `/swaps/han/ethereum/ether/halight/lightning/bitcoin`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body?` | any | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  createHerc20EthereumErc20HalightLightningBitcoin

▸ **createHerc20EthereumErc20HalightLightningBitcoin**(`body?`: any): *Promise‹string›*

*Defined in [cnd/cnd.ts:327](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L327)*

Post a swap request on the lightning REST API route of cnd `/swaps/herc20/ethereum/erc20/halight/lightning/bitcoin`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body?` | any | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  executeSirenAction

▸ **executeSirenAction**(`action`: [Action](../interfaces/_cnd_siren_.action.md), `resolver?`: [FieldValueResolverFn](../modules/_cnd_action_to_http_request_.md#fieldvalueresolverfn)): *Promise‹AxiosResponse›*

*Defined in [cnd/cnd.ts:290](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L290)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](../interfaces/_cnd_siren_.action.md) |
`resolver?` | [FieldValueResolverFn](../modules/_cnd_action_to_http_request_.md#fieldvalueresolverfn) |

**Returns:** *Promise‹AxiosResponse›*

___

###  fetch

▸ **fetch**<**T**>(`path`: string): *AxiosPromise‹T›*

*Defined in [cnd/cnd.ts:282](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L282)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *AxiosPromise‹T›*

___

###  getPeerId

▸ **getPeerId**(): *Promise‹string›*

*Defined in [cnd/cnd.ts:247](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L247)*

**Returns:** *Promise‹string›*

___

###  getPeerListenAddresses

▸ **getPeerListenAddresses**(): *Promise‹string[]›*

*Defined in [cnd/cnd.ts:255](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L255)*

**Returns:** *Promise‹string[]›*

___

###  getSwaps

▸ **getSwaps**(): *Promise‹[SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md)[]›*

*Defined in [cnd/cnd.ts:276](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L276)*

**Returns:** *Promise‹[SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md)[]›*

___

###  postSwap

▸ **postSwap**(`swap`: [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md)): *Promise‹string›*

*Defined in [cnd/cnd.ts:263](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/cnd.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`swap` | [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md) |

**Returns:** *Promise‹string›*
