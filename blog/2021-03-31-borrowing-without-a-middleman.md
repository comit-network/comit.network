---
title: "Borrowing without a middleman"
author: philipp
author_url: https://github.com/bonomat
author_image_url: https://avatars2.githubusercontent.com/u/224613
tags: [borrowing,lending,liquid,defi]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

%% TODO: add nice figure
<img alt="Waves" src={useBaseUrl('blog/assets/images/2021-03/loans.png')} />

# Introduction

Defi booms on various blockchains...
borrowing and lending on ethereum is huge.. TODO adding numbers, DAI, MIMO
https://defipulse.com/maker
mimo.capital: € 15,119,843

various assets are used from eth, erc20 tokens to wrapped bitcoin or stable coins.
the idea is the same, put up a collateral and receive a loan.

But who wants to wrap their precious Bitcoin in an Erc20 token on Ethereum.

Defi for Bitcoin is needed.

## Transaction covenants 
Lucas

What is it. 
enforcing scripts

on top of consensus enforced rules, you can add more restrictions to how an output can be spent.
You can even do this recursively. Link to blockstream post.


Cannot do it on Bitcoin today. 

But use Liquid today, which is as close as it gets to real Bitcoin.

## Our solution
Philipp

### Explain collateralized loans first

Explain high-level idea of what we are doing: 
explain the protocol step by step without explaining the script. Explain the creation of the loan transaction. 
Borrower and Lender agree on rate, collateral amount, interest. 


### Explain the covenants script

how the script enforces the loan contract, i.e. pay back the collateral only if the borrower pays back the principal amount + interest. 

--> the result are confidential borrowing and lending using BTC.

### Implementation

PoC so far: https://github
Next into waves wallet 

## Outlook

One issue is no price-based liquidation,e.g price drops and LTV ratio above x%, getting liquidated.

What's next: 

- Oracles, DLC
- Pools
- Trustless stable coins


--> You like what you read? We are hiring!!!
