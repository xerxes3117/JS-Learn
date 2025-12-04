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
      // The application ID provided by Algolia
      appId: 'TS2RUOYNW4',
      
      // Public API key: it is safe to commit it
      apiKey: '26425012f7e5e84a9b34ec8f446ee017',
      
      indexName: 'js-learning-docs',
      
      // Optional: see docsearch documentation
      contextualSearch: true,
      
      // Optional: Algolia search parameters - make search more precise
      searchParameters: {
        typoTolerance: false, // Disable typo tolerance for exact matches
        removeWordsIfNoResults: 'none', // Don't remove words if no results
        exactOnSingleWordQuery: 'word', // Exact match for single word queries
      },
      
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

	themes: [
		'@docusaurus/theme-live-codeblock', 
		'@docusaurus/theme-mermaid'
	],

	markdown: {
		mermaid: true,
	},
};

export default config;
