---
title: "Borrowing without a middleman"
author: philipp
author_url: https://github.com/bonomat
author_image_url: https://avatars2.githubusercontent.com/u/224613
tags: [borrowing,lending,liquid,defi]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Waves" src={useBaseUrl('blog/assets/images/2021-03/loans.png')} />

## Introduction

DeFi is taking the world by storm.
At the time of writing, there are more than 3.9M ETH worth of wrapped ERC20 tokens locked up as collateral in [MakerDAO's](https://makerdao.com/en/) smart contracts.
A newer product such as [MIMO](https://mimo.capital) has seen over 15M€ being invested in it over the past few days.

Because of DeFi's prominence on Ethereum, it would seem like Bitcoin is destined to miss out.
Wrapping your bitcoin in an ERC20 token on Ethereum to access DeFi products is a possibility, but it doesn't appeal to everyone.

True DeFi for Bitcoin is starting to become a necessity.

## Trustless Collateralized Loans

Inspired by traditional finance, collateralized loans have become very popular in the DeFi world.
They are relatively simple: a borrower needs to stake a certain amount of one asset to receive a loan in a different asset.
The amount the borrower has to put up is determined by the loan's Loan-to-Value (LTV) ratio.
For conventional loans, assets such as real estate, cars or shares can be used as collateral; DeFi loans are backed by cryptocurrencies instead.

The point of these DeFi loans is to give the borrower access to the fiat value of their crypto assets without having to sell them; the lender gets some interest in return.
[Blockfi](https://blockfi.com) and [Hodl Hodl](https://lend.hodlhodl.com/) are well-known service providers in the DeFi borrowing space.
While Blockfi is a fully custodial service, Hodl Hodl aims for peer-to-peer lending, but the platform remains part of the multi-signature smart contract to resolve any disputes.

It turns out that true trustless peer-to-peer loans are indeed possible using transaction covenants on Liquid.

### Transaction covenants

When you broadcast a Bitcoin transaction, the network ensures that certain consensus rules are enforced e.g. that your transaction doesn't create (or destroy) money.

The network also verifies that you have met the spending conditions of all the transaction inputs.
For standard payments this just means looking for a valid signature on the stack.
If instead you're redeeming a HTLC, the preimage of a particular hash would be required.

These spending conditions are determined by a script that accompanies the UTXO to be spent.
The ability to express spending conditions for a UTXO which _restrict the overall form of the transaction they're included in_ is what is known as a covenant.

Covenant scripts are not possible on Bitcoin (yet), but they can be used on Liquid, which is as close as it gets to real Bitcoin.

### Liquid loans

Our current version of loans on Liquid looks like this:

A lender publishes loan offers somewhere on the internet.
One such offer would include: the `principal amount` they are willing to lend; the required `collateral amount` a borrower would need to contribute; the `interest` which the borrower would need to pay in the event of reclaiming the collateral; how long the principal can be borrowed for, or `loan term`.
As an example, the lender could offer L-USDt-based loans, asking for L-BTC as collateral.

After a borrower accepts the loan offer, the two parties collaboratively create the `loan transaction`.
This transaction consists of 2 inputs

- the borrower's collateral, in L-BTC;
- the lender's principal, in L-USDt;

and 2 outputs

- the `collateral contract` where the collateral L-BTC will be locked up;
- an address controlled by the borrower, where the principal ends up.

<img alt="Collateralized Loans" src={useBaseUrl('blog/assets/images/2021-03/collateralized_loans.svg')} />

After publishing the `loan transaction`, the borrower has L-USDt to spend and the collateral remains in the `collateral_contract`.
This contract enforces the conditions of the loan.
It ensures that the borrower can reclaim the collateral if and only if he pays back the `principal amount` plus `interest` to the lender.
Additionally, it guarantees that the lender can gain ownership of the collateral if the the borrower hasn't paid back the loan by the end of the `loan term`.

These constraints are expressed using Liquid's scripting language, which is an extension of Bitcoin Script.

### Implementation

Our implementation of the `collateral contract`, together with the loan protocol, can be found in this soon-to-be-merged [PR](https://github.com/comit-network/waves/pull/153).

While the script may seem very complex, the logic is actually quite simple.
It is split in two branches:

```
if loan_terms_fulfilled()
    pay collateral back to borrower
else if loan_term_expired()
    pay collateral to lender
```

The second branch simply allows the _lender_ to spend the `collateral contract` if enough time has passed since the `loan transaction` was mined.

The first branch is substantially more verbose, primarily because it represents a transaction covenant.
Instead of explaining this branch step by step, we'll try to convey the general idea.
Spending the `collateral contract` using this branch requires the _borrower_ to include almost all the transaction data in the corresponding witness stack, alongside a valid `signature`.
The only transaction element that is omitted is the `principal repayment output`, which is instead hard-coded in the `collateral contract`.
The `principal repayment output` is the transaction output which pays the `principal amount` plus `interest` to the lender.
By rearranging the stack and concatenating all the transaction elements (including the `principal repayment output`) using `OP_CAT`[^1], a correctly `serialized transaction` is constructed.
Using `OP_CHECKSIGFROMSTACK`[^2], we verify that the `signature` from the witness stack is valid for the `serialized transaction` with respect to the borrower's public key.

It may seem that this is enough to prove that the borrower has constructed a transaction which includes the `loan repayment output`, but we are not there yet.
The missing step is to show that the reconstructed `serialized transaction` is actually equivalent to the published transaction.
Using `OP_CHECKSIG`[^3] with the _same_ `signature` and the borrower's public key, we can verify that the `signature` is both valid for the published transaction and the reconstructed `serialized transaction`.
Since signature's are specific to a single message, this demonstrates that both transactions are one and the same.

What made implementing this particularly interesting and challenging was using confidential transaction outputs.
Using them, an uninvolved party cannot even tell that a loan has been issued.

## Outlook

The interested reader may have noticed that the implementation described above lacks one important part of a borrower-lender contract: the ability to liquidate the loan.
As implemented, the borrower does not risk being liquidated if the value of the collateral drops and the LTV ratio reaches the critical threshold.

In our future work, we would like to explore exactly this and combine our _simple_ covenant script with a DLC to allow the lender to liquidate the loan if the price (coming from an oracle) warrants it.

As the immediate next step we plan to integrate the protocol into our browser extension [Waves](https://github.com/comit-network/waves) so that it can actually be used. We are super excited about this, because we're inching closer to having truly trustless borrowing and lending for our precious Bitcoin.

Cheers,
Lucas, Philipp and the rest of the COMIT Team.

PS Does the work we do sound enticing? We are hiring! Drop us an email at [job at coblox.tech](mailto:job@coblox.tech) and tell us why you think you are a great fit.

PPS Do you want to learn more and stay up to date? Join our matrix channel:  [comit-liquid](https://matrix.to/#/#comit-liquid:matrix.org?via=matrix.org&via=matrix.lrn.fm).

[^1]: `OP_CAT` takes the two elements at the top of the stack and concatenates them.
[^2]: `OP_CHECKSIGFROMSTACK` takes three inputs: a signature, a message, and a public key. The opcode performs a single SHA-256 hash of the message and then checks that the signature is valid for the hashed message and the provided public key.
[^3]: `OP_CHECKSIG` takes two inputs: a public key; and a signature concatenated with the signature hash type. A double SHA-256 hash of the transaction data is computed and then verified against the signature and the public key.
