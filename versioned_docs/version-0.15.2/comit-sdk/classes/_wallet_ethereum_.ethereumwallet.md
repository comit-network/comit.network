---
id: "_wallet_ethereum_.ethereumwallet"
title: "EthereumWallet"
sidebar_label: "EthereumWallet"
---

Simple Ethereum wallet based on [ethers.js](https://github.com/ethers-io/ethers.js/).

## Hierarchy

* **EthereumWallet**

## Index

### Constructors

* [constructor](_wallet_ethereum_.ethereumwallet.md#constructor)

### Methods

* [callContract](_wallet_ethereum_.ethereumwallet.md#callcontract)
* [deployContract](_wallet_ethereum_.ethereumwallet.md#deploycontract)
* [getAccount](_wallet_ethereum_.ethereumwallet.md#getaccount)
* [getBalance](_wallet_ethereum_.ethereumwallet.md#getbalance)
* [getErc20Balance](_wallet_ethereum_.ethereumwallet.md#geterc20balance)
* [getTransaction](_wallet_ethereum_.ethereumwallet.md#gettransaction)
* [getTransactionReceipt](_wallet_ethereum_.ethereumwallet.md#gettransactionreceipt)

## Constructors

###  constructor

\+ **new EthereumWallet**(`jsonRpcUrl`: string, `key?`: SigningKey | HDNode | Arrayish): *[EthereumWallet](_wallet_ethereum_.ethereumwallet.md)*

*Defined in [src/wallet/ethereum.ts:21](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`jsonRpcUrl` | string |
`key?` | SigningKey &#124; HDNode &#124; Arrayish |

**Returns:** *[EthereumWallet](_wallet_ethereum_.ethereumwallet.md)*

## Methods

###  callContract

▸ **callContract**(`data`: string, `contractAddress`: string, `gasLimit`: string): *Promise‹string›*

*Defined in [src/wallet/ethereum.ts:76](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L76)*

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

*Defined in [src/wallet/ethereum.ts:62](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L62)*

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

*Defined in [src/wallet/ethereum.ts:30](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L30)*

**Returns:** *string*

___

###  getBalance

▸ **getBalance**(): *Promise‹BigNumberEthers›*

*Defined in [src/wallet/ethereum.ts:34](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L34)*

**Returns:** *Promise‹BigNumberEthers›*

___

###  getErc20Balance

▸ **getErc20Balance**(`contractAddress`: string, `decimals?`: undefined | number): *Promise‹BigNumber›*

*Defined in [src/wallet/ethereum.ts:38](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`contractAddress` | string |
`decimals?` | undefined &#124; number |

**Returns:** *Promise‹BigNumber›*

___

###  getTransaction

▸ **getTransaction**(`transactionId`: string): *Promise‹TransactionResponse›*

*Defined in [src/wallet/ethereum.ts:95](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`transactionId` | string |

**Returns:** *Promise‹TransactionResponse›*

___

###  getTransactionReceipt

▸ **getTransactionReceipt**(`transactionId`: string): *Promise‹TransactionReceipt›*

*Defined in [src/wallet/ethereum.ts:89](https://github.com/comit-network/comit-js-sdk/blob/ee6360f/src/wallet/ethereum.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`transactionId` | string |

**Returns:** *Promise‹TransactionReceipt›*
