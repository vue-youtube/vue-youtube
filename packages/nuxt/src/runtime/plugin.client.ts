import { createManager } from '@vue-youtube/core';
import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const manager = createManager();
  nuxtApp.vueApp.use(manager);
});
