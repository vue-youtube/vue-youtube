<template>
  <div
    ref="player"
  />
</template>

<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const player = ref();

setTimeout(() => {
  videoId.value = 'Im_t3NX9yes';
}, 10 * 1000);

usePlayer(videoId, player, { cookie: false, playerVars: {} });
</script>