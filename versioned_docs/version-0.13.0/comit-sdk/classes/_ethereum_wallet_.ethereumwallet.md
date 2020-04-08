---
id: "_ethereum_wallet_.ethereumwallet"
title: "EthereumWallet"
sidebar_label: "EthereumWallet"
---

Simple Ethereum wallet based on [ethers.js](https://github.com/ethers-io/ethers.js/).

## Hierarchy

* **EthereumWallet**

## Index

### Constructors

* [constructor](_ethereum_wallet_.ethereumwallet.md#constructor)

### Methods

* [callContract](_ethereum_wallet_.ethereumwallet.md#callcontract)
* [deployContract](_ethereum_wallet_.ethereumwallet.md#deploycontract)
* [getAccount](_ethereum_wallet_.ethereumwallet.md#getaccount)
* [getBalance](_ethereum_wallet_.ethereumwallet.md#getbalance)
* [getErc20Balance](_ethereum_wallet_.ethereumwallet.md#geterc20balance)

## Constructors

###  constructor

\+ **new EthereumWallet**(`jsonRpcUrl`: string, `key?`: SigningKey | HDNode | Arrayish): *[EthereumWallet](_ethereum_wallet_.ethereumwallet.md)*

*Defined in [ethereum_wallet.ts:17](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/ethereum_wallet.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`jsonRpcUrl` | string |
`key?` | SigningKey &#124; HDNode &#124; Arrayish |

**Returns:** *[EthereumWallet](_ethereum_wallet_.ethereumwallet.md)*

## Methods

###  callContract

▸ **callContract**(`data`: string, `contractAddress`: string, `gasLimit`: string): *Promise‹string›*

*Defined in [ethereum_wallet.ts:72](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/ethereum_wallet.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |
`contractAddress` | string |
`gasLimit` | string |

**Returns:** *Promise‹string›*

___

###  deployContract

▸ **deployContract**(`data`: string, `amount`: BigNumber, `gasLimit`: string): *Promise‹string›*

*Defined in [ethereum_wallet.ts:58](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/ethereum_wallet.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |
`amount` | BigNumber |
`gasLimit` | string |

**Returns:** *Promise‹string›*

___

###  getAccount

▸ **getAccount**(): *string*

*Defined in [ethereum_wallet.ts:26](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/ethereum_wallet.ts#L26)*

**Returns:** *string*

___

###  getBalance

▸ **getBalance**(): *Promise‹BigNumberEthers›*

*Defined in [ethereum_wallet.ts:30](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/ethereum_wallet.ts#L30)*

**Returns:** *Promise‹BigNumberEthers›*

___

###  getErc20Balance

▸ **getErc20Balance**(`contractAddress`: string, `decimals?`: undefined | number): *Promise‹BigNumber›*

*Defined in [ethereum_wallet.ts:34](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/ethereum_wallet.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`contractAddress` | string |
`decimals?` | undefined &#124; number |

**Returns:** *Promise‹BigNumber›*
