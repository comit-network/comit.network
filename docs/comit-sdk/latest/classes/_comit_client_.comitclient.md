---
id: "_comit_client_.comitclient"
title: "ComitClient"
sidebar_label: "ComitClient"
---

The ComitClient class is a one-stop shop interface for interacting with [Swap](_swap_.swap.md)s of [Cnd](_cnd_cnd_.cnd.md).

It bundles all the necessary dependencies ([BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md), [EthereumWallet](_wallet_ethereum_.ethereumwallet.md), [Cnd](_cnd_cnd_.cnd.md)) to
provide you with instances of [Swap](_swap_.swap.md)s.

## Hierarchy

* **ComitClient**

## Index

### Constructors

* [constructor](_comit_client_.comitclient.md#constructor)

### Methods

* [getDoneSwaps](_comit_client_.comitclient.md#getdoneswaps)
* [getNewSwaps](_comit_client_.comitclient.md#getnewswaps)
* [getOngoingSwaps](_comit_client_.comitclient.md#getongoingswaps)
* [getPeerId](_comit_client_.comitclient.md#getpeerid)
* [getPeerListenAddresses](_comit_client_.comitclient.md#getpeerlistenaddresses)
* [retrieveSwapById](_comit_client_.comitclient.md#retrieveswapbyid)
* [sendSwap](_comit_client_.comitclient.md#sendswap)
* [withBitcoinWallet](_comit_client_.comitclient.md#withbitcoinwallet)
* [withEthereumWallet](_comit_client_.comitclient.md#withethereumwallet)

## Constructors

###  constructor

\+ **new ComitClient**(`cnd`: [Cnd](_cnd_cnd_.cnd.md)): *[ComitClient](_comit_client_.comitclient.md)*

*Defined in [src/comit_client.ts:15](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`cnd` | [Cnd](_cnd_cnd_.cnd.md) |

**Returns:** *[ComitClient](_comit_client_.comitclient.md)*

## Methods

###  getDoneSwaps

▸ **getDoneSwaps**(): *Promise‹[Swap](_swap_.swap.md)[]›*

*Defined in [src/comit_client.ts:105](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L105)*

**Returns:** *Promise‹[Swap](_swap_.swap.md)[]›*

___

###  getNewSwaps

▸ **getNewSwaps**(): *Promise‹[Swap](_swap_.swap.md)[]›*

*Defined in [src/comit_client.ts:82](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L82)*

**Returns:** *Promise‹[Swap](_swap_.swap.md)[]›*

___

###  getOngoingSwaps

▸ **getOngoingSwaps**(): *Promise‹[Swap](_swap_.swap.md)[]›*

*Defined in [src/comit_client.ts:96](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L96)*

**Returns:** *Promise‹[Swap](_swap_.swap.md)[]›*

___

###  getPeerId

▸ **getPeerId**(): *Promise‹string›*

*Defined in [src/comit_client.ts:119](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L119)*

**Returns:** *Promise‹string›*

___

###  getPeerListenAddresses

▸ **getPeerListenAddresses**(): *Promise‹string[]›*

*Defined in [src/comit_client.ts:123](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L123)*

**Returns:** *Promise‹string[]›*

___

###  retrieveSwapById

▸ **retrieveSwapById**(`swapId`: string): *Promise‹[Swap](_swap_.swap.md) | undefined›*

*Defined in [src/comit_client.ts:127](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`swapId` | string |

**Returns:** *Promise‹[Swap](_swap_.swap.md) | undefined›*

___

###  sendSwap

▸ **sendSwap**(`swapRequest`: [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md)): *Promise‹[Swap](_swap_.swap.md)›*

*Defined in [src/comit_client.ts:47](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L47)*

Send a [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md) to [Cnd](_cnd_cnd_.cnd.md) to create a [Swap](_swap_.swap.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`swapRequest` | [SwapRequest](../interfaces/_cnd_cnd_.swaprequest.md) |   |

**Returns:** *Promise‹[Swap](_swap_.swap.md)›*

___

###  withBitcoinWallet

▸ **withBitcoinWallet**(`bitcoinWallet`: [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md)): *[ComitClient](_comit_client_.comitclient.md)*

*Defined in [src/comit_client.ts:26](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L26)*

Sets a [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md) in the ComitClient.

If you are planning to use this instance to handle swaps involving Bitcoin, you should set this.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bitcoinWallet` | [BitcoinWallet](../interfaces/_wallet_bitcoin_.bitcoinwallet.md) | The wallet that should be used to handle Bitcoin related actions of swaps.  |

**Returns:** *[ComitClient](_comit_client_.comitclient.md)*

___

###  withEthereumWallet

▸ **withEthereumWallet**(`ethereumWallet`: [EthereumWallet](_wallet_ethereum_.ethereumwallet.md)): *[ComitClient](_comit_client_.comitclient.md)*

*Defined in [src/comit_client.ts:38](https://github.com/comit-network/comit-js-sdk/blob/cef77e4/src/comit_client.ts#L38)*

Sets a [EthereumWallet](_wallet_ethereum_.ethereumwallet.md) in the ComitClient.

If you are planning to use this instance to handle swaps involving Ethereum, you should set this.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ethereumWallet` | [EthereumWallet](_wallet_ethereum_.ethereumwallet.md) | The wallet that should be used to handle Ethereum related actions of swaps.  |

**Returns:** *[ComitClient](_comit_client_.comitclient.md)*
