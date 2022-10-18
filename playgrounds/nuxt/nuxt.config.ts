import { fileURLToPath } from 'node:url';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    '@vue-youtube/component': fileURLToPath(new URL('../../packages/component/index.ts', import.meta.url)),
    '@vue-youtube/shared': fileURLToPath(new URL('../../packages/shared/index.ts', import.meta.url)),
    '@vue-youtube/nuxt': fileURLToPath(new URL('../../packages/nuxt/src/module.ts', import.meta.url)),
    '@vue-youtube/core': fileURLToPath(new URL('../../packages/core/index.ts', import.meta.url)),
  },
  modules: ['@vue-youtube/nuxt'],
});
