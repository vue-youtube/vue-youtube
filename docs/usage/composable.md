# Composable

[player-param-reference]: https://developers.google.com/youtube/player_parameters#Parameters

## Usage

::: tip Hint
Make sure you registered the player manager in your `main.ts` file. See [here](./manager.md) for more information.
:::

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

<ClientOnly>
  <YoutubeIframe video-id="dQw4w9WgXcQ" :height="400" />
</ClientOnly>

## Event Callbacks

The composable function provides multiple hooks to handle events. **All import statements are removed for simplicity.**

### Provide multiple Callback Functions at once <Badge type="tip" text="Since 0.0.3" />

```ts
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

### Provide multiple Callback Functions separately

```ts
const player = ref();
const { onReady } = usePlayer('dQw4w9WgXcQ', player);

onReady((event) => {
  console.log('I will get triggered when the player is ready');
});

onReady((event) => {
  console.log('You will see this message as well!');
});
```

### onReady

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onReady)*

> This event fires whenever a player has finished loading and is ready to begin receiving API calls.

```ts
const player = ref();
const { onReady } = usePlayer('dQw4w9WgXcQ', player);

onReady((event) => {
  // Start playing the video when the player is ready*
  event.target.playVideo();
})
```

::: info
Automatic playback (without previous user interaction) only works when the player is muted. See how to
[mute](#configuration) the player.
:::

::: details Show Type Declarations
```ts
export function onReady: (...cb: Array<ReadyCallback>): void
export type ReadyCallback = PlayerEventCallback<PlayerEvent>
export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}
export interface PlayerEvent {
  target: Player;
}
```
:::

### onStateChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onStateChange)*

> This event fires whenever the player's state changes. The data property of the event object that the API passes to 
> your event listener function will specify an integer that corresponds to the new player state.

```ts
const player = ref();
const { onStateChange } = usePlayer('dQw4w9WgXcQ', player);

onStateChange((event) => {
  console.log(event)
})
```

::: details Show Type Declarations
```ts
export function onStateChange(...cb: Array<PlayerStateChangeCallback>): void
export type PlayerStateChangeCallback = PlayerEventCallback<
  PlayerStateChangeEvent
>
export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}
export interface PlayerStateChangeEvent extends PlayerEvent {
  data: PlayerState;
}
export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5
}
```
:::

### onPlaybackQualityChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange)*

> This event fires whenever the video playback quality changes. It might signal a change in the viewer's playback
> environment.

```ts
const player = ref();
const { onPlaybackQualityChange } = usePlayer('dQw4w9WgXcQ', player);

onPlaybackQualityChange((event) => {
  console.log(event)
})
```

::: details Show Type Declarations
```ts
export function onPlaybackQualityChange(...cb: Array<PlayerStateChangeCallback>): void
export type PlaybackQualityChangeCallback = PlayerEventCallback<
  PlaybackQualityChangeEvent
>
export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}
export interface PlaybackQualityChangeEvent extends PlayerEvent {
  data: VideoQuality;
}
export type VideoQuality = (
  VideoQualityDefault |
  VideoQualitySmall |
  VideoQualityMedium |
  VideoQualityLarge |
  VideoQualityHD720 |
  VideoQualityHD1080 |
  VideoQualityHighres
)
export type VideoQualityDefault = 'default'
export type VideoQualitySmall = 'small'
export type VideoQualityMedium = 'medium'
export type VideoQualityLarge = 'large'
export type VideoQualityHD720 = 'hd720'
export type VideoQualityHD1080 = 'hd1080'
export type VideoQualityHighres = 'highres'
```
:::

### onPlaybackRateChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange)*

> This event fires whenever the video playback rate changes.

```ts
const player = ref();
const { onPlaybackRateChange } = usePlayer('dQw4w9WgXcQ', player);

onPlaybackRateChange((event) => {
  console.log(event)
})
```

::: details Show Type Declarations
```ts
export function onPlaybackRateChange(...cb: Array<PlaybackRateChangeCallback>): void
export type PlaybackRateChangeCallback = PlayerEventCallback<
  PlaybackRateChangeEvent
>
export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}
export interface PlaybackRateChangeEvent extends PlayerEvent {
  data: number;
}
```
:::

### onApiChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onApiChange)*

> This event is fired to indicate that the player has loaded (or unloaded) a module with exposed API methods.

```ts
const player = ref();
const { onApiChange } = usePlayer('dQw4w9WgXcQ', player);

onApiChange((event) => {
  console.log(event)
})
```

::: details Show Type Declarations
```ts
export function onApiChange: (...cb: Array<APIChangeCallback>): void;
export type APIChangeCallback = PlayerEventCallback<PlayerEvent>;
export interface PlayerEventCallback<T extends PlayerEvent> {
    (event: T): void;
}
export interface PlayerEvent {
    target: Player;
}
```
:::

### onError

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onError)*

> This event fires if an error occurs in the player. The API will pass an event object to the event listener function.

```ts
const player = ref();
const { onError } = usePlayer('dQw4w9WgXcQ', player);

onError((event) => {
  console.log(event)
})
```

::: details Show Type Declarations
```ts
export function onError(...cb: Array<ErrorCallback>): void
export type ErrorCallback = PlayerEventCallback<ErrorEvent>
export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}
export interface ErrorEvent extends PlayerEvent {
  data: PlayerError;
}
export enum PlayerError {
  INVALID_PARAMETER = 2,
  HTML5_ERROR = 5,
  NOT_FOUND = 100,
  NOT_ALLOWED = 101,
  NOT_ALLOWED_DISGUISE = 150
}
```
:::

## Player Instance

This library provides many utility functions to handle basic interactions with the player. However, if you need deeper
control over the player, `usePlayer` returns a shallow ref of the player instance. The instance provides full access
to all player functions like:

```vue
<template>
  <div ref="yt" />
</template>

<script setup lang="ts">
import { usePlayer } from '@vue-youtube/core';
import { ref } from 'vue';

const videoId = ref('dQw4w9WgXcQ');
const yt = ref();

const { instance } = usePlayer(videoId, yt, {
  playerVars: {
    autoplay: 1,
    mute: 1,
  },
});

instance.value?.cueVideoById('aqz-KE-bpKQ', 0, 'hd1080');
instance.value?.getPlaybackQuality();
instance.value?.getCurrentTime();
</script>
```

::: danger Caution
Be careful when using `instance`. You could, for example, destroy the player instance. In this case, the library cannot
recover the destroyed player.
:::

## Configuration

The `usePlayer` function has a optional third parameter to provide player options. The values prefixed with `//` are the
default values.

```ts
const player = ref();
usePlayer('dQw4w9WgXcQ', player, {
  playerVars: {}, // {}
  cookie: false,  // true
  width: 1920,    // 1280
  height: 1080,   // 720
});
```

### Supported Options

| Option       | Details                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `playerVars` | Customize the player behavior, see [hereplayer-param-reference][player-param-reference] for reference.              |
| `cookie`     | When this option is `true` the host `https://www.youtube.com` is used, otherwise `https://www.youtube-nocookie.com` |
| `width`      | Set the width of the YouTube player. Number and string supported.                                                   |
| `height`     | Set the height of the YouTube player. Number and string supported.                                                  |

::: details Show Type Declarations
```ts
export function usePlayer(
  newVideoId: MaybeRef<string>, 
  element: MaybeElementRef, 
  options: Options = {}
) : {
  instance: ShallowRef<Player | undefined>;
  togglePlay: () => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  onPlaybackQualityChange: (...cb: Array<PlaybackQualityChangeCallback>) => void;
  onPlaybackRateChange: (...cb: Array<PlaybackRateChangeCallback>) => void;
  onStateChange: (...cb: Array<PlayerStateChangeCallback>) => void;
  onApiChange: (...cb: Array<APIChangeCallback>) => void;
  onError: (...cb: Array<ErrorCallback>) => void;
  onReady: (...cb: Array<ReadyCallback>) => void;
}
export interface Options {
  height?: number | string;
  width?: number | string;
  playerVars?: PlayerVars;
  cookie?: boolean;
}
export interface PlayerVars {
  autohide?: AutohideOption | undefined;
  autoplay?: AutoplayOption | undefined;
  cc_load_policy?: CCLoadPolicyOption | undefined;
  cc_lang_pref?: string | undefined;
  color?: ProgressBarColor | undefined;
  controls?: ControlsOption | undefined;
  disablekb?: KeyboardOptions | undefined;
  enablejsapi?: JSAPIOptions | undefined;
  end?: number | undefined;
  fs?: FullscreenOption | undefined;
  hl?: string | undefined;
  iv_load_policy?: IVPolicyOption | undefined;
  list?: string | undefined;
  listType?: ListType | undefined;
  loop?: LoopOption | undefined;
  modestbranding?: ModestBrandingOption | undefined;
  mute?: MuteOption | undefined;
  origin?: string | undefined;
  playlist?: string | undefined;
  playsinline?: PlaysInlineOption | undefined;
  rel?: RelatedVideosOption | undefined;
  showinfo?: ShowInfoOption | undefined;
  start?: number | undefined;
}
```
:::

### `playerVars` Reference <Badge type="warning" text="New" />

::: info Info
This section will soon feature a full reference. See [#7](https://github.com/vue-youtube/docs/issues/7) for more
information on implementation progress.
:::

It is important to look up the official YouTube [player parameter reference][player-param-reference]. Some parameters
might oppose unexpected requirements on the provided value. Invalid values might render the player inoperable.

Such an example is the `start` parameter which is typed as a `number` in TS. In JavaScript (and thus also in Typescript)
a `number` can be any *kind* of number, like integer or float. The parameter however expects integer values, otherwise
the player won't start playing the video.

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