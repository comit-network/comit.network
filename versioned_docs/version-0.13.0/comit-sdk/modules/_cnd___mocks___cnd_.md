---
id: "_cnd___mocks___cnd_"
title: "cnd/__mocks__/cnd"
sidebar_label: "cnd/__mocks__/cnd"
---

## Index

### Variables

* [Cnd](_cnd___mocks___cnd_.md#const-cnd)
* [mockFetch](_cnd___mocks___cnd_.md#const-mockfetch)
* [mockPostSwap](_cnd___mocks___cnd_.md#const-mockpostswap)

## Variables

### `Const` Cnd

• **Cnd**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  return {
    postSwap: mockPostSwap,
    fetch: mockFetch
  };
})

*Defined in [cnd/__mocks__/cnd.ts:14](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/__mocks__/cnd.ts#L14)*

___

### `Const` mockFetch

• **mockFetch**: *Mock‹any, any›* = jest.fn().mockImplementation(async () => {
  return Promise.resolve({
    data: {
      properties: { id: "123456" },
      links: [{ rel: "self", href: "/mock/self/href" }]
    }
  });
})

*Defined in [cnd/__mocks__/cnd.ts:5](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/__mocks__/cnd.ts#L5)*

___

### `Const` mockPostSwap

• **mockPostSwap**: *Mock‹any, any›* = jest.fn().mockImplementation(async () => {
  return Promise.resolve("/mock/swap/location");
})

*Defined in [cnd/__mocks__/cnd.ts:1](https://github.com/comit-network/comit-js-sdk/blob/701099a/src/cnd/__mocks__/cnd.ts#L1)*
