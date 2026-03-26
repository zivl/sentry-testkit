// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')
const lightTheme = themes.github
const darkTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sentry-Testkit',
  tagline: 'Testing your reports made easy',
  url: 'https://zivl.github.io/',
  baseUrl: '/sentry-testkit/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zivl', // Usually your GitHub org/user name.
  projectName: 'sentry-testkit', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zivl/sentry-testkit/blob/master/website/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'monthly',
        },
        googleAnalytics: {
          trackingID: 'UA-186083338-2',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'sentry-testkit',
        logo: {
          alt: 'sentry-testkit',
          src: 'img/logo/logo_only.png',
        },
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'api/README',
            position: 'left',
            label: 'API Reference',
          },
          {
            to: 'help',
            docId: 'help',
            position: 'right',
            label: 'Help',
          },
          {
            href: 'https://github.com/zivl/sentry-testkit',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
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
                to: '/docs/getting-started',
              },
              {
                label: 'API Reference',
                to: '/docs/api',
              },
              {
                label: 'Migration Guides',
                to: '/docs/category/migration',
              },
              {
                label: 'Raven-Testkit (Legacy Support)',
                to: '/docs/raven-testkit-legacy',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github Issues',
                href: 'https://github.com/zivl/sentry-testkit/issues',
              },
              {
                label: 'Stack Overflow',
                href:
                  'https://stackoverflow.com/questions/tagged/sentry-testkit',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/_zivlevy',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub repo',
                href: 'https://github.com/zivl/sentry-testkit',
              },
              {
                label: 'Help',
                to: '/help',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} sentry-testkit. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
      algolia: {
        appId: 'L7GY2W3YC6',
        apiKey: 'aa3a74bf7f3516d815614bd43753a7cb',
        indexName: 'sentry-testkit',
        contextualSearch: true,

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
}

module.exports = config
