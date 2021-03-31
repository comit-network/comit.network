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

## Trustless Collateralized Loans


Collateralized borrowing is very popular in the Defi world as well as in traditional finance. Various assets are used as collateral ranging from real estate, cars or shares in traditional finance to different crypto assets in the blockchain space. 

Collateralized loans are relatively simple: a borrower needs to stake a certain amount to receive a loan in a different asset. The amount the borrower has to come up with is determined by the loan's LTV ratio (Loan To Value). 

This means, you can access the fiat value of your crypto assets without having to sell them. 
Well known service provider are [Blockfi](https://blockfi.com) and [Hodlhodl]([)https://lend.hodlhodl.com/). While Blockfi is a fully custodial service Hodlhodl goes towards peer to peer lending but still involves the platform as an actor the multi-sig who gets involved in the case of a dispute. 

We found out that true trustless peer to peer loans are indeed possible using transaction covenants (see above).

The idea is as following: 
A lender puts up loan offers somewhere on the Internet which includes the amount they are willing to lend, the required collateral amount and interest rate which the borrower has to pay.

In our case, the lender offers L-USDT-based loans and asks for L-BTC as a collateral. 

### Explain the covenants script

Once agreed on the the terms (collateral amount, principal amount, interest rate and loan term), the two parties collaboratively create a transaction with 2 inputs: 

- The borrower contributes his collateral, e.g. BTC; 
- The lender contributes the loan principal, e.g. USDT;

and two outputs: 

- The BTC will go to a collateral contract;
- The USDT will to an addressed controlled by the borrower;

<img alt="Collateralized Loans" src={useBaseUrl('blog/assets/images/2021-03/collateralized_loans.png')} />

The collateral contract enforces the loan terms, i.e. it enforces that the borrower can receive back his collateral only if he pays back the principal amount including interest rates to the lender. 

The collateral contract also enforces that the lender can obtain ownership over the collateral if the principal was not paid back by the end of the term. 


### Implementation

The actual implementation of the covenants script can be found [here: TODO]().

While at first seemingly super complex, the script is actually quite simple. 
It consists out of two main parts: 

```
if loan_terms_fulfilled()
	pay collateral back to borrower
else if loan_term_expired()
	pay collateral to lender
```

To check if the loan terms are fulfilled we make use of `OP_CAT`, `OP_CHECKSIGFROMSTACK` and `OP_CHECKSIG`: 

- `OP_CHECKSIG` takes a `public key` and a `signature` as inputs along with a signature `hash type`. A double SHA-256 hash of the transaction data is computed and then verified against the `signature`. 
- `OP_CHECKSIGFROMSTACK` takes three inputs: a `signature`, the `message` and a `public key`. 
The op code performs a single Sha256 hash of the `message` and then verifies the `signature` of the hashed `message` data with the `signature` and the provided `public key`.
- `OP_CAT` takes two inputs and concatenates them.

The trick to achieve the covenants script is using the fact that a successful `OP_CHECKSIG` operation means that the public key and the signature together commit to the transaction data. 
If now the same public key and signature are also used successfully in the `OP_CHECKSIGFROMSTACK` operation, then the messaged passed into `OP_CHECKSIGFROMSTACK` must be the same as the transaction data. 

With this in mind we require the user to provide the whole transaction data on the `witness stack` of the transaction. 
Using a set of `OP_CAT` operations we construct the transaction data, perform a single Sha256 operation pass the resulting hash together with the signature and the public key to the `OP_CHECKSIGFROMSTACK` operation. 
The loan term can be reduced to one simple fact: the lender wants to receive back the money he gave out to the borrower. 
This part of the transaction data is not part of the `witness stack` as it would mean a spender could arbitrarily change it. 
This part of the transaction data is included in the `script` itself and put into the right position of the remaining transaction data. 

The fun part of this implementation was doing all of this using confidential amounts and values for the assets. 
This way, an uninvolved party cannot tell what was happening on-chain. 


## Outlook

The interested reader might have noticed that the implemented trustless loan lacks one important part of a borrower/lending contract: the liquidation part. 
As of now, the borrower does not risk being liquidated if the value of his assets drops and the LTV ratio reaches the critical threshold. 

In our future work we want to cover exactly this and combine our _simple_ covenants script with an DLC so that a price feed from an oracle ensures that the LTV ratio is kept up. 

As the immediate next step we plan to integrate the protocol into our browser extension (Waves)[https://github.com/comit-network/waves] so that it can actually be used. 

We are super excited about this, because it means we can have finally truely trustless borrowing and lending for our precious Bitcoin.

Cheers,
Lucas, Philipp and the rest of the COMIT Team

--> You like what you read? We are hiring!!! Drop us an email and tell us why you think you are a great fit: (job at coblox.tech)[job@coblox.tech].
--> You want to learn more and stay up to date? Join our matrix channel (comit-liquid)[https://matrix.to/#/#comit-liquid:matrix.org?via=matrix.org&via=matrix.lrn.fm].
