---
id: write-a-comit-app-taker-take-order
title: Taker - Taker Order
sidebar_label: Taker - Take Order
---

This section is part of the typescript tutorial for creating your first COMIT-app, that builds two simple command-line application using the COMIT protocol to execute a Bitcoin to Ethereum atomic swap locally on your machine.

## Taker takes the order

If the taker once to commence and take the requested order, he simple takes it:

```typescript
const swap = await order.take();
```

This gives the taker an instance of the `Swap` class of the comit-sdk.
