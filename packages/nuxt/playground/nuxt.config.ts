import { fileURLToPath } from 'node:url';
import { defineNuxtConfig } from 'nuxt';
import vueYouTubeModule from '../src/module';

export default defineNuxtConfig({
  alias: {
    '@vue-youtube/shared': fileURLToPath(new URL('../../shared/index.ts', import.meta.url)),
    '@vue-youtube/core': fileURLToPath(new URL('../../core/index.ts', import.meta.url)),
  },
  modules: [vueYouTubeModule],
  vueYouTube: {
    addPlugin: true,
  },
});
