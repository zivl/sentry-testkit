// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sentry-Testkit',
  tagline: 'Testing your reports made easy',
  url: 'https://wix.github.io/sentry-testkit',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wix', // Usually your GitHub org/user name.
  projectName: 'sentry-testkit', // Usually your repo name.

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
            'https://github.com/wix/sentry-testkit/blob/master/website/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'sentry-teskit',
        logo: {
          alt: 'sentry-teskit',
          src: 'img/logo/logo_only.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: 'help',
            docId: 'help',
            position: 'right',
            label: 'Help',
          },
          {
            href: 'https://github.com/wix/sentry-testkit',
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
                to: '/docs/intro',
              },
              {
                label: 'API Reference',
                to: '/docs/intro',
              },
              {
                label: 'Migration from v4 to v5',
                to: '/docs/intro',
              },
              {
                label: 'Raven-Testkit (Legacy Support)',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github Issues',
                href: 'https://github.com/wix/sentry-testkit/issues',
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
                href: 'https://github.com/wix/sentry-testkit',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
