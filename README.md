# VueYoutube

This plugin easily integrates the YouTube Iframe Player into your Vue 2/3 app.

## Version 0.0.5

Version `0.0.5` adds the option to defer loading required scripts using the new option `deferLoading` when creating the
manager with `createManager`. See [here](https://vue-youtube.github.io/docs/usage/manager#deferloading) for more
information.

```shell
pnpm install @vue-youtube/core@0.0.5
```

## Upcoming changes

- Ability to pass an array of template refs to the `usePlayer` composable
- Nuxt v3 support

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

### Register the manager

```ts
import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';

import app from './app.vue';

createApp(app).use(createManager()).mount('#app');
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

To use the component, install the following packages:

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

Migrating from `@techassi/vue-youtube-iframe` should be a drop-in replacement. An in-depth migration guide can be found
[here](https://vue-youtube.github.io/docs/migration/).

## Contributing

If you want to contribute a cool new feature, open a PR, and I will gladly look into it!
