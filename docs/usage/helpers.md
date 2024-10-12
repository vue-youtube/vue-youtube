---
prev: false
next: false
---

# Helper Functions

`usePlayer` provides multiple `toggle*` helper functions.

## togglePlay

The `togglePlay` function pauses / unpauses the video.

```vue
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const player = ref();

const { togglePlay } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="togglePlay">Pause / Unpause</button>
</template>
```

## toggleMute

The `toggleMute` function mutes / unmutes the player.

```vue
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const player = ref();

const { toggleMute } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="toggleMute">Mute / Unmute</button>
</template>
```

## toggleLoop

The `toggleLoop` function toggles playlist looping on / off.

```vue
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const player = ref();

const { toggleLoop } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="toggleLoop">Loop / No loop</button>
</template>
```

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#setLoop)*

## toggleShuffle

The `toggleShuffle` function toggles playlist shuffling on / off.

```vue
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const player = ref();

const { toggleShuffle } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="toggleShuffle">Shuffle / No shuffle</button>
</template>
```

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#setShuffle)*