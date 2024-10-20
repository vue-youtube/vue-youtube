---
next: false
---

# Getting Started

This section will help you getting `@vue-youtube/core` up and running quickly.

## Installation

First install the required packages via your preferred package manager. `pnpm` is recommended.

::: code-group

```shell [pnpm]
pnpm add @vue-youtube/core
```

```shell [yarn]
yarn add @vue-youtube/core
```

```shell [npm]
npm add @vue-youtube/core
```

:::

## Usage

### Register the manager

The player manager needs to be registered with `app.use()` in the `main.ts` file.

```ts
import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';

import app from './app.vue';

createApp(app).use(createManager()).mount('#app');
```

### Composable

The most basic usage as a Composable is as easy as:

```vue
<script setup lang="ts">
// Import the 'usePlayer' function
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

// Use a template ref to reference the target element
const youtube = ref();

// Call the 'usePlayer' function with the desired video ID and target ref
usePlayer('dQw4w9WgXcQ', youtube);
</script>

<template>
  <div ref="youtube" />
</template>
```

### Component

To use the Component you need to install the additional package:

::: code-group

```shell [pnpm]
pnpm add @vue-youtube/component
```

```shell [yarn]
yarn add @vue-youtube/component
```

```shell [npm]
npm add @vue-youtube/component
```

:::

```vue
<script setup lang="ts">
// Import the 'YoutubeIframe' component
import { YoutubeIframe } from '@vue-youtube/component';
</script>

<template>
  <youtube-iframe video-id="dQw4w9WgXcQ" />
</template>
```
