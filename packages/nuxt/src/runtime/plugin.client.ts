import { createManager } from '@vue-youtube/core';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const manager = createManager();
  nuxtApp.vueApp.use(manager);
  // nuxtApp.provide('vueYoutubeManager', manager);
});
