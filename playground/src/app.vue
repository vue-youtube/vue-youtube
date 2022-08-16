<template>
  <div ref="yt" />
  <button @click="toggleMute">
    Toggle volume
  </button>
</template>

<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const yt = ref();

const { toggleMute } = usePlayer(videoId, yt, {
  playerVars: {
    autoplay: 1,
    mute: 1,
  },
});
</script>