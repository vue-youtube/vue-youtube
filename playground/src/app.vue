<template>
  <div ref="youtube" />
</template>

<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const youtube = ref();

const { onReady } = usePlayer(videoId, youtube, {
  cookie: false,
  playerVars: {
    mute: 1,
  },
});

onReady((event) => {
  event.target.playVideo();
});
</script>