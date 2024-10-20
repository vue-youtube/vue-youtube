# Component

## Usage

First, install the `@vue-youtube/component` package:

```shell
pnpm install @vue-youtube/component
```
---

::: tip Hint
Make sure you registered the player manager in your `main.ts` file. See [here](./manager.md) for more information.
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

<ClientOnly>
  <YoutubeIframe video-id="dQw4w9WgXcQ" :height="400" />
</ClientOnly>

## Event Callbacks

The Component provides multiple hooks to handle events.

```vue
<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';

const onReady = (event) => {
  console.log(event);
}
</script>

<template>
  <youtube-iframe video-id="dQw4w9WgXcQ" @ready="onReady" />
</template>
```

### Supported Hooks

| Hook     | Details                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `@ready` | This event fires whenever a player has finished loading and is ready to begin receiving API calls. *See [Reference](https://developers.google.com/youtube/iframe_api_reference#onReady)* |
| `@state-change` or `@stateChange` | This event fires whenever the player's state changes. The data property of the event object that the API passes to your event listener function will specify an integer that corresponds to the new player state. *See [Reference](https://developers.google.com/youtube/iframe_api_reference#onStateChange)* |
| `@playback-quality-change` or `@playbackQualityChange` | This event fires whenever the video playback quality changes. It might signal a change in the viewer's playback environment. *See [Reference](https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange)* |
| `@playback-rate-change` or `@playbackRateChange` | This event fires whenever the video playback rate changes. *See [Reference](https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange)* |
| `@api-change` or `@apiChange` | This event fires if an error occurs in the player. The API will pass an event object to the event listener function. *See [Reference](https://developers.google.com/youtube/iframe_api_reference#onError)* |
| `@error` | This event fires if an error occurs in the player. The API will pass an event object to the event listener function.  *See [Reference](https://developers.google.com/youtube/iframe_api_reference#onError)* |

## Configuration

```vue
<template>
  <youtube-iframe
    :video-id="YOUTUBE_VIDEO_ID"
    :player-vars="YOUTUBE_PLAYER_PARAMS"
    :cookie="TRUE / FALSE"
    :width="WIDTH"
    :height="HEIGHT"
  />
</template>
```

### Supported Options

| Option                          | Details                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| `:player-vars` or `:playerVars` | Customize the player behavior, see [here](https://developers.google.com/youtube/player_parameters#Parameters) for reference. |
| `:cookie`                       | When this option is `true` the host `https://www.youtube.com` is used, otherwise `https://www.youtube-nocookie.com`|
| `:width`                        | Set the width of the YouTube player. Number and string supported. |
| `:height`                       | Set the height of the YouTube player. Number and string supported. |

## Examples

### Dynamically change the Video ID

The `video-id` prop is reactive. If the video ID changes the new video will automatically start playing.

```vue
<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');

// Change video ID after 10 seconds (10000 ms)
setTimeout(() => {
  videoId.value = 'aqz-KE-bpKQ';
}, 10 * 1000);
</script>

<template>
  <youtube-iframe :video-id="videoId" />
</template>
```

### Play / pause the Video

You can toggle the video between playing / paused with the `togglePlay` helper function. You don't need to keep track of
the player state.

See [here](./helpers#toggleplay-function) for more information on the `togglePlay` function.

```vue
<script setup lang="ts">
import { YoutubeIframe } from '@vue-youtube/component';
import { ref } from 'vue';

const player = ref();

const togglePlay = () => player.value?.togglePlay();
</script>

<template>
  <youtube-iframe video-id="dQw4w9WgXcQ" ref="player" />
  <button @click="togglePlay">Pause / Unpause</button>
</template>
```
