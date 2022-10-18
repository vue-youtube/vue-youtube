import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: '@vue-youtube/nuxt',
    configKey: 'vueYoutube',
  },
  async setup() {
    const resolver = createResolver(import.meta.url);

    // nuxt.options.build.transpile.push(resolver.resolve('./runtime'));
    addPlugin(resolver.resolve('./runtime/plugin.client'));
  },
});
