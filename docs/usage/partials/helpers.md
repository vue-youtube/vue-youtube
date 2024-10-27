### togglePlay

Pauses / unpauses the video.

:::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { togglePlay } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="togglePlay">Pause / Unpause</button>
</template>
```

== Component
```vue
<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    ref="player"
  />
  <button @click="$refs.player.togglePlay">
    Pause / Unpause
  </button>
</template>
```
:::

### toggleMute

Mutes / unmutes the player.

:::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { toggleMute } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="toggleMute">Mute / Unmute</button>
</template>
```

== Component
```vue
<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    ref="player"
  />
  <button @click="$refs.player.toggleMute">
    Mute / Unmute
  </button>
</template>
```
:::

### toggleLoop

Toggles playlist looping on / off, see [reference](https://developers.google.com/youtube/iframe_api_reference#setLoop).

:::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { toggleLoop } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="toggleLoop">Loop / No loop</button>
</template>
```

== Component
```vue
<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    ref="player"
  />
  <button @click="$refs.player.toggleLoop">
    Loop / No Loop
  </button>
</template>
```
:::

### toggleShuffle

Toggles playlist shuffling on / off, see [reference](https://developers.google.com/youtube/iframe_api_reference#setShuffle).

:::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { toggleShuffle } = usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
  <button @click="toggleShuffle">
    Shuffle / No shuffle
  </button>
</template>
```

== Component
```vue
<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    ref="player"
  />
  <button @click="$refs.player.toggleShuffle">
    Shuffle / No Shuffle
  </button>
</template>
```
:::
