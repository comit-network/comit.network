---
id: comit-projects
title: COMIT projects
sidebar_label: COMIT projects
---

import UnderConstruction from '../shared/under-construction.md'

<UnderConstruction />

This section of the documentation provides an overview of the different projects of the COMIT protocol.
Sub-sections provide an introduction into project-specific details.

The COMIT protocol is completely open source and consists of several repositories on GitHub.
Here is a list of the most important repositories on GitHub:

* [comit-rs](https://github.com/comit-network/comit-rs): The comit-rs project is the reference implementation of the protocol written in Rust. The [comit network daemon (cnd)](comit-protocol-stack.md#comit-network-daemon-cnd) is the binary that is released by the comit-rs project.
* [comit-js-sdk](https://github.com/comit-network/comit-js-sdk): The COMIT Javascript SDK (comit-js-sdk) wraps the communication with cnd and provides an entry point for integrating atomic swaps with COMIT into Javascript & Typescript applications.
* [create-comit-app](https://github.com/comit-network/create-comit-app): The create-comit-app project includes Typescript demos and examples that show how to use the comit-js-sdk. Additionally it includes the `start-env` which spins up a development environment using docker containers. Take a look at the [Getting Started](../getting-started/create-comit-app.md) section for more information.
* [blockchain-contracts](https://github.com/comit-network/blockchain-contracts): The blockchain-contracts project contains the blockchain contract that is used for atomic swaps in comit-rs.
* [specification (RFCs)](https://github.com/comit-network/RFCs): The technical specification of the COMIT protocol. Details around each protocol are specified in detail here.

## Technical Specification Details

The documentation on this website is focusing on developers building applications on top of the COMIT protocol.
Hence, details of the technical specification of the protocol are not part of this documentation.

The technical specification of the protocol is relevant if:

* You are trying to add support for another ledger to COMIT.
* You want to understand specific security aspects of a specific protocol.
* You want to look under the hood of the reference implementation of the protocol.
* You want to implement your own COMIT node alternative.

For further details please contact the COMIT team through [Gitter](https://gitter.im/comit-network/community) or [Github](https://github.com/comit-network).
