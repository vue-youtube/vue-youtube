import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineNuxtModule, addPlugin } from '@nuxt/kit';

export interface ModuleOptions {
  addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-youtube',
    configKey: 'vueYouTube',
  },
  defaults: {
    addPlugin: true,
  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const runtimeDirectory = fileURLToPath(new URL('runtime', import.meta.url));
      nuxt.options.build.transpile.push(runtimeDirectory);
      addPlugin(resolve(runtimeDirectory, 'plugin'));
    }
  },
});
