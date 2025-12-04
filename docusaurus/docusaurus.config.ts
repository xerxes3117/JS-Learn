import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Learning',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Learning',
      logo: {
        alt: 'Learning Logo',
        src: 'img/logo.svg',
      },
      items: [
				{
					type: 'dropdown',
					label: 'Tools',
					position: 'right',
					items: [
						{
							href: 'https://www.jsv9000.app/',
							label: 'JavaScript Visualizer',
						},
					],
				},
				{to: '/todo', label: 'Todo', position: 'right'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Tutorials',
        },
				{
					type: 'docSidebar',
					sidebarId: 'javascriptSidebar',
					position: 'left',
					label: 'Javascript',
				},
        {to: '/blog', label: 'Interview Experiences', position: 'left'},
      ],
    },
    algolia: {
      // DocSearch API keys
      appId: 'PS676PR25D',
      
      // Public API key: it is safe to commit it
      apiKey: 'dbd86d2e42e8d9b4672d418d9a6cff34',
      
      indexName: 'JS learn Crawler',
      
      // Optional: see docsearch documentation
      contextualSearch: true,
      
      // Optional: Algolia search parameters
      searchParameters: {},
      
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

	plugins: [
		'./src/plugins/algolia-verification.ts',
	],

	themes: [
		'@docusaurus/theme-live-codeblock', 
		'@docusaurus/theme-mermaid'
	],

	markdown: {
		mermaid: true,
	},
};

export default config;
