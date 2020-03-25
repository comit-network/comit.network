const sdkSidebar = require('./sdkSidebar.json')

/**
 * Sidebar configuration.
 */

module.exports = {
  main: {
    'Getting Started': ['getting-started/create-comit-app', 'getting-started/comit-infrastructure',
      {
        "type": "category",
        "label": "Your first COMIT-app",
        "items": [
          'tutorials/write-your-first-comit-app/write-a-comit-app-setup',
          'tutorials/write-your-first-comit-app/write-a-comit-app-actor-initialisation',
          'tutorials/write-your-first-comit-app/write-a-comit-app-maker-order-create',
          'tutorials/write-your-first-comit-app/write-a-comit-app-maker-order-publish',
          'tutorials/write-your-first-comit-app/write-a-comit-app-taker-request-order',
          'tutorials/write-your-first-comit-app/write-a-comit-app-taker-take-order',
          'tutorials/write-your-first-comit-app/write-a-comit-app-taker-execution',
          'tutorials/write-your-first-comit-app/write-a-comit-app-maker-execution'
        ]
      }
    ],
    'COMIT Protocol': ['comit-protocol/comit-protocol-stack', 'comit-protocol/comit-projects'],
    'Core Concepts': ['core-concepts/atomic-swap-htlc', 'core-concepts/instant-swap', 'core-concepts/privacy-preserving-swap', 'core-concepts/negotiation'],
    'Tutorials': [],
    'COMIT Javascript SDK': sdkSidebar,
  },
};

