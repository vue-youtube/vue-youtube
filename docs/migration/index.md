---
prev: false
---

# Migration Guide

This guide helps to migrate from `@techassi/vue-youtube-iframe` (version 1.0.6) to `vue-youtube`.

## Remove old dependencies

First remove the old `@techassi/vue-youtube-iframe` dependency with the package manager of your choice:

::: code-group

```shell [pnpm]
pnpm remove @techassi/vue-youtube-iframe
```

```shell [yarn]
yarn remove @techassi/vue-youtube-iframe
```

```shell [npm]
npm uninstall @techassi/vue-youtube-iframe
```

:::

## Add new dependencies

Depending ony how you want to use VueYoutube you need to add the following dependencies:

- `@vue-youtube/core` is needed for both composable and component usage
- `@vue-youtube/component` is additionally needed when using the component

For a drop-in replacement of `@techassi/vue-youtube-iframe` you need both packages:

::: code-group

```shell [pnpm]
pnpm add @vue-youtube/core @vue-youtube/component
```

```shell [yarn]
yarn add @vue-youtube/core @vue-youtube/component
```

```shell [npm]
npm add @vue-youtube/core @vue-youtube/component
```

:::

## Updating the code

### Changes in the `main.{ts,js}` file

```ts{4,6}
import { createApp } from 'vue';
import app from './app.vue';

import YoutubeIframe from '@techassi/vue-youtube-iframe';

createApp(app).use(YoutubeIframe).mount('#app');
```

**Change to**

```ts{1,5}
import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';
import app from './app.vue';

createApp(app).use(createManager()).mount('#app');
```

### Changes in `YourComponent.vue` file

If you want to keep using the Component you don't have to change your code. Just make sure to import the Component.

```vue
<script setup lang="ts">
// Import the 'YoutubeIframe' component
import { YoutubeIframe } from '@vue-youtube/component';
</script>

<template>
    <youtube-iframe :video-id="YT_VIDEO_ID"></youtube-iframe>
</template>
```

Please do keep in mind that the events have changed. See [here](../usage/component.md#event-callbacks) for all available
events.

---

If you want to switch to Composables, update your code.

```vue
<script setup lang="ts">
// Import the 'usePlayer' function
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

// Use a template ref to reference the target element
const player = ref();

// Call the 'usePlayer' function with the desired video ID and target ref
usePlayer('YT_VIDEO_ID', player);
</script>

<template>
  <div ref="player" />
</template>
```

See [here](../usage/composable.md) for more information on how to use Composables.