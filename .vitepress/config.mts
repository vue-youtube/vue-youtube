import { defineConfig } from 'vitepress';

import sidebar from './sidebar';
import nav from './nav';

export default defineConfig({
  lang: 'en-US',
  title: 'VueYoutube',
  description: 'Integrate the YouTube Iframe Player into your Vue 2/3 app.',
  srcDir: './docs',
  base: '/docs/',
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
  },
  sitemap: {
    hostname: 'https://vue-youtube.github.io/docs/'
  },
  // mpa: true,
  head: [['link', { rel: 'icon', type: 'image/x-icon', href: '/docs/favicon.ico' }]],
  lastUpdated: true,
  cleanUrls: true,
});
