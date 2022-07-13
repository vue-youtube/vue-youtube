# VueYoutube

This plugin makes it easy to integrate the YouTube Iframe Player into your Vue 2/3 app.

## 🧪 Upcoming version 1.1.0

🎉 Version `1.1.0` is currently in progress. Planned features for the upcoming release are:

- [x] Add support for new events, see [here](https://developers.google.com/youtube/iframe_api_reference#Events)
- [x] Vue 2 support via `vue-demi` [#4](https://github.com/Techassi/vue-youtube-iframe/issues/4)
- [x] Video ID reactivity, see [#3](https://github.com/Techassi/vue-youtube-iframe/issues/3)
- [x] Switch to Vite toolchain
- [x] Add composable functions
- [x] Remove `types/youtube` dependency by defining own types
- [ ] Write migration and new usage guide

## Usage

For a detailed usage guide, check out the official [docs](https://vue-youtube.github.io/docs/).

### Installation

```shell
npm install @vue-youtube/core
```

```shell
yarn add @vue-youtube/core
```

```shell
pnpm install @vue-youtube/core
```

### Composable usage

`component.vue`

```vue
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

<template>
  <div ref="youtube" />
</template>
```

### Component usage

To use the component install the following packages:

```
npm install @vue-youtube/core @vue-youtube/component
```

`component.vue`

```vue
<script setup lang="ts">
  import { YoutubeIframe } from '@vue-youtube/component';

  const onReady = ((event) => {
    event.target.playVideo();
  })
</script>

<template>
  <youtube-iframe video-id="dQw4w9WgXcQ" @ready="onReady" />
</template>
```

## Migration

Migrating from `@techassi/vue-youtube-iframe` should be a drop-in replacement. An in-depth migration guide will follow
soon.