import { createManager } from '@vue-youtube/core';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const manager = createManager();
  nuxtApp.vueApp.use(manager);

  if (process.server)
    nuxtApp.payload.vueYouTube = manager.state;
  else if (nuxtApp.payload && nuxtApp.payload.vueYouTube)
    manager.state = nuxtApp.payload.vueYouTube;
});
