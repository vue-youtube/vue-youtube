import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    configKey: 'vueYoutube',
    name: 'vue-youtube',
  },
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin.client'));
  },
});
