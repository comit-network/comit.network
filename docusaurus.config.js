module.exports = {
  title: 'COMIT Developer Hub',
  tagline: 'C( )MIT is an open protocol facilitating trustless cross-blockchain applications',
  url: 'https://comit-network.netlify.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'coblox', // Usually your GitHub org/user name.
  projectName: 'comit-network', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'COMIT Developer Hub',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {to: 'docs/getting-started/doc1', label: 'Docs', position: 'left'},
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
              label: 'Style Guide',
              to: 'docs/getting-started/doc1',
            },
            {
              label: 'Contributing',
              to: 'docs/contributing/guide',
            },
          ],
        },
        {
          title: 'Community',
          "items": [
            {
              "label": "Slack",
              "href": "https://coblox-comit.slack.com"
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coblox`,
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
