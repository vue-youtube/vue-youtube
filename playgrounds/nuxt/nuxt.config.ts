import { fileURLToPath } from 'node:url';
import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    '@vue-youtube/component': fileURLToPath(new URL('../../packages/component/index.ts', import.meta.url)),
    '@vue-youtube/shared': fileURLToPath(new URL('../../packages/shared/index.ts', import.meta.url)),
    '@vue-youtube/core': fileURLToPath(new URL('../../packages/core/index.ts', import.meta.url)),
  },
});
