import { defineConfig } from 'vitepress';
import wasm from 'vite-plugin-wasm';
import container from 'markdown-it-container';
import { renderSandbox } from 'vitepress-plugin-sandpack';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    build: {
      target: 'ES2022',
    },
    plugins: [wasm()],
  },
  lang: 'en-US',
  title: 'BlockSuite',
  description: 'The Block-Based Collaborative Framework',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Playground',
        link: 'https://blocksuite-toeverything.vercel.app/starter/?init',
      },
      { text: 'Docs', link: '/blocksuite-overview' },
      // { text: 'API', link: '' },
      {
        text: 'Releases',
        link: 'https://github.com/toeverything/blocksuite/releases',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'BlockSuite Overview', link: '/blocksuite-overview' }],
      },
      {
        text: 'Using Prebuilt Editor',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Workspaces and Pages', link: '/workspaces-and-pages' },
          { text: 'Flavoured Blocks', link: '/flavoured-blocks' },
          { text: 'Handling Events', link: '/handling-events' },
          {
            text: 'Attaching Editor',
            link: '/attaching-editor',
          },
          { text: 'Data Persistence', link: '/data-persistence' },
        ],
      },
      {
        text: 'BlockSuite Fundamentals',
        items: [
          {
            text: 'Unidirectional Data Flow',
            link: '/unidirectional-data-flow',
          },
          { text: 'Modeling Editor State', link: '/editor-state' },
          {
            text: 'The <code>block-std</code> Library',
            items: [
              { text: 'Overview', link: '/block-std-overview' },
              { text: 'Block Schema', link: '/block-schema' },
              { text: 'Render Blocks', link: '/render-blocks' },
            ],
          },
        ],
      },
      {
        text: '🚧 API Reference',
        items: [],
      },
      {
        text: 'Packages',
        items: [
          { text: '🚧 <code>@blocksuite/store</code>', link: '' },
          { text: '🚧 <code>@blocksuite/block-std</code>', link: '' },
          { text: '🚧 <code>@blocksuite/lit</code>', link: '' },
          { text: '🚧 <code>@blocksuite/virgo</code>', link: '' },
        ],
      },
      {
        text: 'Developing BlockSuite',
        items: [
          {
            text: 'Building Packages',
            link: 'https://github.com/toeverything/blocksuite/blob/master/BUILDING.md',
          },
          {
            text: 'Running Tests',
            link: 'https://github.com/toeverything/blocksuite/blob/master/BUILDING.md#testing',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toeverything/blocksuite' },
      { icon: 'twitter', link: 'https://twitter.com/AffineDev' },
    ],

    footer: {
      copyright: 'Copyright © 2022-present Toeverything',
    },

    search: {
      provider: 'local',
    },
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'https://raw.githubusercontent.com/toeverything/blocksuite/master/assets/logo.svg',
      },
    ],
  ],
  markdown: {
    config(md) {
      md.use(container, 'code-sandbox', {
        render(tokens, idx) {
          return renderSandbox(tokens, idx, 'code-sandbox');
        },
      });
    },
  },
});
