const versions = require('./versions.json');

module.exports = {
  title: 'COMIT Developer Hub',
  tagline: 'COMIT is an open protocol facilitating trustless cross-blockchain applications',
  url: 'https://comit.network',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'comit-network', // Usually your GitHub org/user name.
  projectName: 'comit-js-sdk', // Usually your repo name.
  themeConfig: {
    gtag: {
      trackingID: 'G-RQEDN1PVTD',
    },
    algolia: {
      apiKey: '8227df9d2316772d3462018f3968c609',
      indexName: 'comit_developer',
    },
    navbar: {
      title: 'Developer Hub',
      logo: {
        alt: 'COMIT',
        src: 'img/logo.svg',
        srcDark: 'img/logo_white.svg',
        href: 'https://comit.network'
      },
      links: [
        {
          to: 'docs/getting-started/create-comit-app', 
          label: 'Docs', 
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          to: 'versions',
          label: `Versions`,
          position: 'right',
          items: [
            {
              label: `v${versions[0]}`,
              to: `docs/getting-started/create-comit-app`,
            },
          ].concat(
            versions.slice(1).map(version => ({
              label: `v${version}`,
              to: `docs/${version}/getting-started/create-comit-app`,
            })),
          ), 
        },        
        {
          href: 'https://github.com/comit-network',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            {
              label: 'COMIT Protocol',
              to: 'docs/comit-protocol',
            },
            {
              label: 'Core Concepts',
              to: 'docs/core-concepts',
            },
          ],
        },
        {
          title: 'Community',
          "items": [
            {
              "label": "Gitter",
              "href": "https://gitter.im/comit-network/community"
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CoBloX`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/comit-network/comit.network/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} CoBloX.`,
          },
        },
      },
    ],
  ],
};
