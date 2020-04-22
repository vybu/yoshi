// TODO - this is a temp hack until teamcity-autorelease-surge would support Base Url.
const isPr =
  process.env.VCS_BRANCH_NAME &&
  !!process.env.VCS_BRANCH_NAME.replace(/\D+/g, '');

const versions = require('./versions.json');

module.exports = {
  title: 'Yoshi',
  tagline: 'A Toolkit that supports building all kinds of applications in wix',
  url: 'https://wix.github.io',
  baseUrl: isPr ? '/' : '/yoshi/',
  favicon: 'img/favicon.ico',

  // Used for publishing and more
  projectName: 'yoshi',
  organizationName: 'wix',

  themeConfig: {
    algolia: {
      apiKey: '5807169f7e8a322a659ac4145a3e5d8a',
      indexName: 'wix_yoshi',
      algoliaOptions: {
        // The search currently work for version 4 only
        // Once this is fixed in docusaurus we can use the dynamic
        // version of the page to filter the results
        facetFilters: [`version:${versions[0]}`],
      },
    },
    navbar: {
      title: 'Yoshi',
      hideOnScroll: true,
      logo: {
        alt: 'Yoshi Logo',
        src: 'img/yoshi.png',
      },
      links: [
        {
          label: 'Docs',
          position: 'left',
          items: [
            {
              label: versions[0],
              to: 'docs/welcome',
            },
            ...versions.slice(1).map(version => ({
              label: version,
              to: `docs/${version}/api/configuration/`,
            })),
          ],
        },
        {
          label: 'Flows',
          position: 'left',
          items: [
            {
              label: 'App Flow',
              to: 'docs/app-flow',
            },
            {
              label: 'Library Flow',
              to: 'docs/library-flow',
            },
            // {
            //   label: 'Editor Flow',
            //   to: 'docs/editor-flow',
            // },
            // {
            //   label: 'Business Manager Flow',
            //   to: 'docs/business-manager-flow',
            // },
            // {
            //   label: 'Monorepo Flow',
            //   to: 'docs/monorepo-flow',
            // },
            {
              label: 'Legacy Flow',
              to: 'docs/legacy-flow',
            },
          ],
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        // It would be much nicer to have the dynamic version of the page here
        // e.g. v3.x
        // This is a temporary fix
        {
          to: 'versions',
          label: `Versions`,
          position: 'right',
        },
        {
          href: 'https://github.com/wix/yoshi',
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
              label: 'Get Started',
              to: 'docs/welcome',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wix.com, Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/wix/yoshi/edit/master/website/',
          routeBasePath: 'docs',

          // Docs will show the last update time
          showLastUpdateTime: true,
          // Docs will show the last author updated the doc
          showLastUpdateAuthor: true,

          // syntax highlighting
          prism: {
            theme: require('prism-react-renderer/themes/github'),
            darkTheme: require('prism-react-renderer/themes/dracula'),
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
