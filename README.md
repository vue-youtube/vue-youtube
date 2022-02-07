# VueYoutube

This plugin makes it easy to integrate the YouTube Iframe Player into your Vue 2/3 app.

## 🧪 Upcoming version 1.0.7

🎉 Version `1.0.7` is currently in progress. Planned features for the upcoming release are:

- [x] Add support for new events, see [here](https://developers.google.com/youtube/iframe_api_reference#Events)
- [x] Switch to Vite toolchain
- [x] Vue 2 support via `vue-demi` [#4](https://github.com/Techassi/vue-youtube-iframe/issues/4)
- [ ] [WIP] Maybe remove `types/youtube` dependency by defining own types
- [ ] [WIP] Add composable functions
- [ ] [WIP] Video ID reactivity, see [#3](https://github.com/Techassi/vue-youtube-iframe/issues/3)
- [ ] Write migration and new usage guide

## Usage

### Installation

```shell
npm install @vue-youtube/core --save
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
  import { ref } from 'vue'

  const player = ref();

  const { onReady } = usePlayer('dQw4w9WgXcQ', player, {
    width: 1920,
    height: 1080,
  });

  onReady((event) => {
    console.log('Ready!')
  });
</script>

<template>
  <div ref="player"></div>
</template>
```

### Component usage

`component.vue`

```vue
<script setup lang="ts">
  import { YoutubeIframe } from '@vue-youtube/component';
</script>

<template>
  <youtube-iframe video-id="dQw4w9WgXcQ" id="player" />
</template>
```