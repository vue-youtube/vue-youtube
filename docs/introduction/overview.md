# What is VueYoutube?

Integrate the YouTube Iframe Player into your Vue 2/3 app.

## Motivation

I was writing a small Vue application in which I wanted to add an embedded YouTube video. At the time of writing Vue 3
was the new kid on the block and was only released for a short period of time (~ 1-2 months). Naturally I was on the
hunt for a Vue plugin which provided access to the YouTube Iframe API as a Component. I found many alternatives on
[npmjs.com](https://npmjs.com) but all of them were aimed at Vue 2. That's when I decided to write my own plugin /
library which was compatible with the new Vue 3 plugin API and concepts. Out of these efforts
`@techassi/vue-youtube-iframe` was born. `@vue-youtube/core` is the new and improved iteration under a new name, but
from the same author :).

## Improvements over @techassi/vue-youtube-iframe

### The Name

The name is much shorter and easier to understand & handle:

```shell
@techassi/vue-youtube-iframe
# vs
@vue-youtube/core
```

### Supports both Vue 2 and 3

`@techassi/vue-youtube-iframe` only supported Vue 3 (as this was the initial goal when I wrote the plugin). As mentioned
in issue [#4](https://github.com/Techassi/vue-youtube-iframe/issues/4) some people requested support for Vue 2 as well.
That's why I added support for both Vue 2 and 3 with the magic of [VueDemi](https://github.com/vueuse/vue-demi). This
should work instantly out-of-the-box.

### Supports both Component and Composable Usage

One of the biggest improvements is the addition of [Composables](https://vuejs.org/guide/reusability/composables.html).
This allows the creation of YouTube Iframe Players with the help of the `usePlayer` function. This aligns the plugin
with Vue 3 coding styles. A sneak peak how you can use the `usePlayer` function:

```vue
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const youtube = ref();

usePlayer('dQw4w9WgXcQ', youtube);
</script>

<template>
  <div ref="youtube" />
</template>
```

For more information see [Getting Started](./getting-started) and [Usage](/usage/composable).

### Fully typed

This plugin is completely written in TypeScript and provides strong typings. The `@types/youtube` package was dropped,
but all the player instance types are still available:

```ts
const { onReady } = usePlayer('dQw4w9WgXcQ', youtube);

onReady((event: PlayerEvent): void => {
  event.target.playVideo()
})
```

### And many smaller Changes

A few smaller but still notable changes are:

- **Video ID Reactivity:** The video ID is now fully reactive, for both Composables and Components, see here.
- **New Events:** Support for the new `onPlaybackQualityChange`, `onPlaybackRateChange` and `onApiChange`
  events was added. More information about these events can be found
  [here](https://developers.google.com/youtube/iframe_api_reference#Events).
- **New Toolchain:** The plugin now uses the modern [Vite](https://vitejs.dev/) Toolchain for both development and
  production bundling / building.
