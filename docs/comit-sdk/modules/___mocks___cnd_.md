---
id: "___mocks___cnd_"
title: "__mocks__/cnd"
sidebar_label: "__mocks__/cnd"
---

## Index

### Variables

* [Cnd](___mocks___cnd_.md#const-cnd)
* [mockFetch](___mocks___cnd_.md#const-mockfetch)
* [mockPostSwap](___mocks___cnd_.md#const-mockpostswap)

## Variables

### `Const` Cnd

• **Cnd**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  return {
    postSwap: mockPostSwap,
    fetch: mockFetch
  };
})

*Defined in [__mocks__/cnd.ts:14](https://github.com/comit-network/comit-js-sdk/blob/d186ad0/src/__mocks__/cnd.ts#L14)*

___

### `Const` mockFetch

• **mockFetch**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    data: {
      properties: { id: "123456" },
      links: [{ rel: "self", href: "/mock/self/href" }]
    }
  });
})

*Defined in [__mocks__/cnd.ts:5](https://github.com/comit-network/comit-js-sdk/blob/d186ad0/src/__mocks__/cnd.ts#L5)*

___

### `Const` mockPostSwap

• **mockPostSwap**: *Mock‹any, any›* = jest.fn().mockImplementation(() => {
  return Promise.resolve("/mock/swap/location");
})

*Defined in [__mocks__/cnd.ts:1](https://github.com/comit-network/comit-js-sdk/blob/d186ad0/src/__mocks__/cnd.ts#L1)*