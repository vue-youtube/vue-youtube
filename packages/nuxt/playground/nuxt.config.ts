import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  alias: {
    '@vue-youtube/component': fileURLToPath(new URL('../../component', import.meta.url)),
    '@vue-youtube/core': fileURLToPath(new URL('../../core', import.meta.url)),
  },
});