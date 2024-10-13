import { defineConfig } from 'vitepress';
import { resolve } from 'node:path';

import sidebar from './sidebar';
import nav from './nav';

export default defineConfig({
  lang: 'en-US',
  title: 'VueYoutube',
  description: 'Integrate the YouTube Iframe Player into your Vue 2/3 app.',
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,
    editLink: {
      pattern: 'https://github.com/vue-youtube/vue-youtube/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/vue-youtube/docs',
      },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the <a href="https://github.com/vue-youtube/vue-youtube/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2020-present <a href="https://github.com/Techassi">Techassi</a>'
    },
    outline: [2, 3]
  },
  base: '/vue-youtube/',
  sitemap: {
    hostname: 'https://vue-youtube.github.io/docs/'
  },
  vite: {
    resolve: {
      alias: {
        '@vue-youtube/component': resolve('../packages/component/src/index.ts'),
        '@vue-youtube/shared': resolve('../packages/shared/src/index.ts'),
        '@vue-youtube/core': resolve('../packages/core/src/index.ts'),
      },
    },
  },
  // mpa: true,
  head: [['link', { rel: 'icon', type: 'image/x-icon', href: '/docs/favicon.ico' }]],
  lastUpdated: true,
  cleanUrls: true,
});
