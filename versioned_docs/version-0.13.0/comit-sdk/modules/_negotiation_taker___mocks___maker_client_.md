---
id: "_negotiation_taker___mocks___maker_client_"
title: "negotiation/taker/__mocks__/maker_client"
sidebar_label: "negotiation/taker/__mocks__/maker_client"
---

## Index

### Variables

* [MakerClient](_negotiation_taker___mocks___maker_client_.md#const-makerclient)
* [mockGetExecutionParams](_negotiation_taker___mocks___maker_client_.md#const-mockgetexecutionparams)
* [mockGetOrderByTradingPair](_negotiation_taker___mocks___maker_client_.md#const-mockgetorderbytradingpair)
* [mockTakeOrder](_negotiation_taker___mocks___maker_client_.md#const-mocktakeorder)

## Variables

### `Const` MakerClient

• **MakerClient**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  return {
    getOrderByTradingPair: mockGetOrderByTradingPair,
    getExecutionParams: mockGetExecutionParams,
    takeOrder: mockTakeOrder
  };
})

*Defined in [negotiation/taker/__mocks__/maker_client.ts:38](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/taker/__mocks__/maker_client.ts#L38)*

___

### `Const` mockGetExecutionParams

• **mockGetExecutionParams**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  return {
    peer: {
      peer_id: "12345",
      address_hint: "/ip4/0.0.0.0"
    },
    alpha_expiry: 123456780,
    beta_expiry: 123456700,
    ledgers: { bitcoin: { network: "regtest" }, ethereum: { chain_id: 17 } }
  };
})

*Defined in [negotiation/taker/__mocks__/maker_client.ts:22](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/taker/__mocks__/maker_client.ts#L22)*

___

### `Const` mockGetOrderByTradingPair

• **mockGetOrderByTradingPair**: *Mock‹any, any›* = jest
  .fn()
  .mockImplementation((tradingPair: string) => {
    const words = tradingPair.split("-");

    return {
      id: "123",
      validUntil: 1234567890,
      ask: {
        ledger: words[0],
        asset: words[1],
        nominalAmount: "123"
      },
      bid: {
        ledger: words[2],
        asset: words[3],
        nominalAmount: "4567890"
      }
    };
  })

*Defined in [negotiation/taker/__mocks__/maker_client.ts:1](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/taker/__mocks__/maker_client.ts#L1)*

___

### `Const` mockTakeOrder

• **mockTakeOrder**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  // The mocked function returns Promise of type void
})

*Defined in [negotiation/taker/__mocks__/maker_client.ts:34](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/negotiation/taker/__mocks__/maker_client.ts#L34)*
