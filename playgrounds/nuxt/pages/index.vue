<template>
  <div>
    <h1>Home page</h1>
    <section class="relative overflow-hidden">
      <div ref="youtube" />
      <div class="relative w-full h-full flex">
        <slot />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';

definePageMeta({
  pageTransition: false,
});

const props = defineProps({
  videoId: {
    type: String,
    default: 'nrjRz2Nftj0',
  },
  mute: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  opacity: {
    type: Number,
    default: 100,
  },
});

const youtube = ref();
// const manager = inject('vue-youtube');
// console.log(manager);

const { onReady } = usePlayer(
  props.videoId,
  youtube,
  {
    cookie: false,
    playerVars: {
      mute: props.mute ? 1 : 0,
      autoplay: props.autoplay ? 1 : 0,
      loop: props.loop ? 1 : 0,
      controls: 0,
      playlist: props.videoId,
    },
  },
);

// onReady((event) => {
//   event.target.playVideo();
// });
</script>