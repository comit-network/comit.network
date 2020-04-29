In this tutorial we only focus on the happy-path, meaning that we assume that we always have a `redeem` scenario, where the other party properly funds and `redeems` the funds.
For a complete solution the maker and taker applications would have to deal with `refund` scenarios as well. 
These are scenarios where the the counterparty does not fund the swap in time, and the maker would take the locked up funds back.
