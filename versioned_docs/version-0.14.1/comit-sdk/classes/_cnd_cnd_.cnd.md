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

*Defined in [src/cnd/cnd.ts:328](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L328)*

**Parameters:**

Name | Type |
------ | ------ |
`cndUrl` | string |

**Returns:** *[Cnd](_cnd_cnd_.cnd.md)*

## Methods

###  createHalightLightningBitcoinHanEthereumEther

▸ **createHalightLightningBitcoinHanEthereumEther**(`body`: [HalightLightningBitcoinHanEthereumEtherRequestBody](../modules/_cnd_cnd_.md#halightlightningbitcoinhanethereumetherrequestbody)): *Promise‹string›*

*Defined in [src/cnd/cnd.ts:461](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L461)*

Post a swap request on the lightning REST API route of cnd `/swaps/halight/lightning/bitcoin/han/ethereum/ether`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | [HalightLightningBitcoinHanEthereumEtherRequestBody](../modules/_cnd_cnd_.md#halightlightningbitcoinhanethereumetherrequestbody) | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  createHalightLightningBitcoinHerc20EthereumErc20

▸ **createHalightLightningBitcoinHerc20EthereumErc20**(`body`: [HalightLightningBitcoinHerc20EthereumErc20RequestBody](../modules/_cnd_cnd_.md#halightlightningbitcoinherc20ethereumerc20requestbody)): *Promise‹string›*

*Defined in [src/cnd/cnd.ts:477](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L477)*

Post a swap request on the lightning REST API route of cnd `/swaps/halight/lightning/bitcoin/herc20/ethereum/erc20`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | [HalightLightningBitcoinHerc20EthereumErc20RequestBody](../modules/_cnd_cnd_.md#halightlightningbitcoinherc20ethereumerc20requestbody) | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  createHanEthereumEtherHalightLightningBitcoin

▸ **createHanEthereumEtherHalightLightningBitcoin**(`body`: [HanEthereumEtherHalightLightningBitcoinRequestBody](../modules/_cnd_cnd_.md#hanethereumetherhalightlightningbitcoinrequestbody)): *Promise‹string›*

*Defined in [src/cnd/cnd.ts:429](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L429)*

Post a swap request on the lightning REST API route of cnd `/swaps/han/ethereum/ether/halight/lightning/bitcoin`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | [HanEthereumEtherHalightLightningBitcoinRequestBody](../modules/_cnd_cnd_.md#hanethereumetherhalightlightningbitcoinrequestbody) | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  createHerc20EthereumErc20HalightLightningBitcoin

▸ **createHerc20EthereumErc20HalightLightningBitcoin**(`body`: [Herc20EthereumErc20HalightLightningBitcoinRequestBody](../modules/_cnd_cnd_.md#herc20ethereumerc20halightlightningbitcoinrequestbody)): *Promise‹string›*

*Defined in [src/cnd/cnd.ts:445](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L445)*

Post a swap request on the lightning REST API route of cnd `/swaps/herc20/ethereum/erc20/halight/lightning/bitcoin`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | [Herc20EthereumErc20HalightLightningBitcoinRequestBody](../modules/_cnd_cnd_.md#herc20ethereumerc20halightlightningbitcoinrequestbody) | The body to set in the request. The design being not yet finalised it is optional and of type `any` |

**Returns:** *Promise‹string›*

The location of the swap (href) as returned by the REST API in the location header.

___

###  executeSirenAction

▸ **executeSirenAction**(`action`: [Action](../interfaces/_cnd_siren_.action.md), `resolver?`: [FieldValueResolverFn](../modules/_cnd_action_to_http_request_.md#fieldvalueresolverfn)): *Promise‹AxiosResponse›*

*Defined in [src/cnd/cnd.ts:415](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L415)*

Proceed with an action request on the cnd REST API.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API, or [WalletError](_swap_.walleterror.md) if the blockchain wallet throws, or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`action` | [Action](../interfaces/_cnd_siren_.action.md) | The action to perform. |
`resolver?` | [FieldValueResolverFn](../modules/_cnd_action_to_http_request_.md#fieldvalueresolverfn) | A function that returns data needed to perform the action, this data is likely to be provided by a blockchain wallet or interface (e.g. wallet address). |

**Returns:** *Promise‹AxiosResponse›*

___

###  fetch

▸ **fetch**<**T**>(`path`: string): *AxiosPromise‹T›*

*Defined in [src/cnd/cnd.ts:403](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L403)*

Fetch data from the REST API.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | string | The URL to GET. |

**Returns:** *AxiosPromise‹T›*

The data returned by cnd.

___

###  getPeerId

▸ **getPeerId**(): *Promise‹string›*

*Defined in [src/cnd/cnd.ts:346](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L346)*

Get the peer id of the cnd node

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Returns:** *Promise‹string›*

Promise that resolves with the peer id of the cnd node,

___

###  getPeerListenAddresses

▸ **getPeerListenAddresses**(): *Promise‹string[]›*

*Defined in [src/cnd/cnd.ts:361](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L361)*

Get the address on which cnd is listening for peer-to-peer/COMIT messages.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Returns:** *Promise‹string[]›*

An array of multiaddresses

___

###  getSwaps

▸ **getSwaps**(): *Promise‹[SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md)[]›*

*Defined in [src/cnd/cnd.ts:389](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L389)*

List the swaps handled by this cnd instance.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Returns:** *Promise‹[SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md)[]›*

An Array of [SwapSubEntity](../interfaces/_cnd_cnd_.swapsubentity.md), which contains details of the swaps.

___

###  postSwap

▸ **postSwap**(`swap`: [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md)): *Promise‹string›*

*Defined in [src/cnd/cnd.ts:377](https://github.com/comit-network/comit-js-sdk/blob/a4cf34a/src/cnd/cnd.ts#L377)*

Sends a swap request to cnd.

**`throws`** A [Problem](_cnd_axios_rfc7807_middleware_.problem.md) from the cnd REST API or an [Error](_cnd_axios_rfc7807_middleware_.problem.md#static-error).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`swap` | [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md) | The details of the swap to initiate. |

**Returns:** *Promise‹string›*

The URL of the swap request on the cnd REST API.
