module.exports = {
  title: 'COMIT Developer Hub',
  tagline: 'COMIT is an open protocol facilitating trustless cross-blockchain applications',
  url: 'https://comit-network.netlify.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'coblox', // Usually your GitHub org/user name.
  projectName: 'comit-network', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Developer Hub',
      logo: {
        alt: 'COMIT',
        src: 'img/logo_white-rect.svg',
      },
      links: [
        {to: 'docs/getting-started/create-comit-app', label: 'Docs', position: 'left'},
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
            'https://github.com/coblox/comit.network/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
