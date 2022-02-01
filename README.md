# @vue-youtube/core

This plugin makes it easy to integrate the YouTube Iframe API into your Vue app. This plugin is Vue v2 and v3
compatible.

## 🧪 Upcoming version 1.0.7

🎉 Version `1.0.7` is currently in progress. Planned features for the upcoming release are:

- [x] Add support for new events, see [here](https://developers.google.com/youtube/iframe_api_reference#Events)
- [x] Switch to Vite toolchain
- [ ] [WIP] Vue 2 support via `vue-demi` [#4](https://github.com/Techassi/vue-youtube-iframe/issues/4)
- [ ] [WIP] Maybe remove `types/youtube` dependency by defining own types
- [ ] [WIP] Add composable functions
- [ ] Video ID reactivity, see [#3](https://github.com/Techassi/vue-youtube-iframe/issues/3)
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

`main.ts`

```ts
import { createApp } from 'vue';
import App from './App.vue';

import { createManager } from '@vue-youtube/core';

createApp(App).use(createManager()).mount('#app');
```

`component.vue`

```vue
<script setup lang="ts">
  import { YoutubeIframe } from '@vue-youtube/component';
</script>

<template>
  <youtube-iframe video-id="dQw4w9WgXcQ" />
</template>
```

### Available props

-   `:videoId / :video-id`: Specify the YT video id (e.g. `dQw4w9WgXcQ`)
-   `:playerWidth / :player-width`: Specify the player's width in pixels
-   `:playerHeight / :player-height`: Specify the player's height in pixels
-   `:noCookie / :no-cookie`: If set to `true` the host will be set to `https://www.youtube-nocookie.com`
-   `:playerParameters / :player-parameters`: Set player parameters, see [here](#available-player-parameters)

### Available player parameters

For the available player parameters see [here](https://developers.google.com/youtube/player_parameters#Parameters)

### Available Events

```
@ready, @error, @state-change
```

For detailed event information check [here](https://developers.google.com/youtube/iframe_api_reference#Events)

## Contributing / Building

Contributions and pull request are welcome!

```shell
cd vue-youtube-iframe
yarn install / npm install
yarn run build / npm run build
```
