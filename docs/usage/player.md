# Player

[player-param-reference]: https://developers.google.com/youtube/player_parameters#Parameters

The player is available in two different flavours: a composable function and a Vue component.
Depending on the flavour used, the usage slightly differs.

## Usage

::: tip Hint
Make sure you registered the player manager in your `main.ts` file. See [here](./manager.md) for
more information.
:::

:::tabs key:style
== Composable
```vue
<script setup lang="ts">
// Import the 'usePlayer' function
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

// Use a template ref to reference the target element
const player = ref();

// Call the 'usePlayer' function with the desired video ID and target ref
usePlayer('dQw4w9WgXcQ', player);
</script>

<template>
  <div ref="player" />
</template>
```
== Component
```vue
<script setup lang="ts">
// Import the 'YoutubeIframe' component
import { YoutubeIframe } from '@vue-youtube/component';
</script>

<template>
  <youtube-iframe videoId="dQw4w9WgXcQ" />
</template>
```
:::

<ClientOnly>
  <YoutubeIframe videoId="dQw4w9WgXcQ" :height="400" />
</ClientOnly>

## Event Hooks

::::tip Notice
Explicit imports in **all** following code snippets have been removed for brevity.

<!-- :::tabs key:style
== Composable
```ts
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';
```
== Component
```ts
import { YoutubeIframe } from '@vue-youtube/component';
```
::: -->
::::

The player provides multiple hooks to handle events. This section lists supported events and
describes on which condition the event triggers. Make sure to also consult the official reference.

---

**Composable Specific Feature**

When using the player via the composable, the hooks support registering one or more handlers at
once.

::: code-group
```ts [Single]
const player = ref();
const { onReady } = usePlayer('dQw4w9WgXcQ', player);

onReady((event) => {
  console.log('I will get triggered when the player is ready');
});

onReady((event) => {
  console.log('You will see this message as well!');
});
```

```ts [Multiple <Badge type="tip" text="Since 0.0.3" />]
const player = ref();
const { onReady } = usePlayer('dQw4w9WgXcQ', player);

onReady(
  (event) => {
    console.log('I will get triggered when the player is ready');
  },
  (event) => {
    console.log('You will see this message as well!');
  },
);
```
:::

---

<!--@include: ./partials/events.md-->

## Helper Functions

<!--@include: ./partials/helpers.md-->

## Configuration Options

The `usePlayer` function has a optional third parameter to provide player options. If not specified,
the default values will be used.

<!--@include: ./partials/options.md-->

## Player Instance

This library provides many utility functions to handle basic interactions with the player. However, if you need deeper
control over the player, `usePlayer` returns a shallow ref of the player instance. The instance provides full access
to all player functions like:

:::tabs key:style
== Composable
```vue
<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const player = ref();

const { instance, onReady } = usePlayer(videoId, player, {
  playerVars: {
    autoplay: 1,
    mute: 1,
  },
});

onReady(() => {
  instance.value.cueVideoById('aqz-KE-bpKQ', 0, 'hd1080');
  instance.value.getPlaybackQuality();
  instance.value.getCurrentTime();
});
</script>

<template>
  <div ref="player" />
</template>
```

== Component
```vue
<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const player = ref();

const onReady = () => {
  player.value.instance.cueVideoById('aqz-KE-bpKQ', 0, 'hd1080');
  player.value.instance.getPlaybackQuality();
  player.value.instance.getCurrentTime();
};
</script>

<template>
  <YoutubeIframe
    ref="player"
    :video-id="videoId"
    :player-vars="{
      autoplay: 1,
      mute: 1
    }"
    @ready="onReady"
  />
</template>
```
:::

::: danger Caution
Be careful when using `instance`. You could, for example, destroy the player instance. In this case, the library cannot
recover the destroyed player.
:::

## Examples

### Dynamically change the video ID

You can pass a ref as the first argument of `usePlayer`. When the content of the ref changes, the new video will
automatically start playing.

```vue
<script setup lang="ts">
import { usePlayer, PlayerState } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const player = ref();

const { onStateChange } = usePlayer(videoId, player);

// Change video ID after 10 seconds (10000 ms)
setTimeout(() => {
  videoId.value = 'aqz-KE-bpKQ';
}, 10 * 1000);

// Log the video ID when the video starts to play
onStateChange((event) => {
  if (event.data == PlayerState.PLAYING) {
    console.log("I'm playing", videoId.value)
  }
});
</script>

<template>
  <div ref="player" />
  <button @click="togglePlay">Pause / Unpause</button>
</template>
```

### Play / pause the video

You can toggle the video between playing / paused with the `togglePlay` helper function. You don't need to keep track of
the player state.

See [here](./helpers#toggleplay-function) for more information on the `togglePlay` function.

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
