### onReady

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onReady)*

> This event fires whenever a player has finished loading and is ready to begin receiving API calls.

::::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { onReady } = usePlayer('dQw4w9WgXcQ', player);

onReady((event) => {
  // Start playing the video when the player is ready*
  event.target.playVideo();
})
</script>

<template>
  <div ref="player" />
</template>
```

:::details Show Type Declarations
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

== Component
```vue
<script setup lang="ts">
const onReady = (event) => {
  // Start playing the video when the player is ready*
  event.target.playVideo();
}
</script>

<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    @ready="onReady"
  />
</template>
```
::::

:::warning Note
Automatic playback (without previous user interaction) only works when the player is muted. It is
also possible to use the `autoplay` player parameter to start playing when the player is ready. See
how to [mute](./options.md#playervars) the player.
:::

### onStateChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onStateChange)*

> This event fires whenever the player's state changes. The data property of the event object that the API passes to
> your event listener function will specify an integer that corresponds to the new player state.

::::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { onStateChange } = usePlayer('dQw4w9WgXcQ', player);

onStateChange((event) => {
  console.log(event);
})
</script>

<template>
  <div ref="player" />
</template>
```

:::details Show Type Declarations
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
export interface PlayerEvent {
    target: Player;
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

== Component
```vue
<script setup lang="ts">
const onStateChange = (event) => {
  console.log(event);
}
</script>

<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    @stateChange="onStateChange"
  />
</template>
```
::::

### onPlaybackQualityChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange)*

> This event fires whenever the video playback quality changes. It might signal a change in the viewer's playback
> environment.

::::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { onPlaybackQualityChange } = usePlayer('dQw4w9WgXcQ', player);

onPlaybackQualityChange((event) => {
  console.log(event)
})
</script>

<template>
  <div ref="player" />
</template>
```

:::details Show Type Declarations
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
export interface PlayerEvent {
    target: Player;
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

== Component
```vue
<script setup lang="ts">
const onPlaybackQualityChange = (event) => {
  console.log(event);
}
</script>

<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    @playbackQualityChange="onPlaybackQualityChange"
  />
</template>
```
::::

### onPlaybackRateChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange)*

> This event fires whenever the video playback rate changes.

::::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { onPlaybackRateChange } = usePlayer('dQw4w9WgXcQ', player);

onPlaybackRateChange((event) => {
  console.log(event)
})
</script>

<template>
  <div ref="player" />
</template>
```

:::details Show Type Declarations
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
export interface PlayerEvent {
    target: Player;
}
```
:::

== Component
```vue
<script setup lang="ts">
const onPlaybackRateChange = (event) => {
  console.log(event);
}
</script>

<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    @playbackRateChange="onPlaybackRateChange"
  />
</template>
```
::::

### onApiChange

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onApiChange)*

> This event is fired to indicate that the player has loaded (or unloaded) a module with exposed API
> methods.

::::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { onApiChange } = usePlayer('dQw4w9WgXcQ', player);

onApiChange((event) => {
  console.log(event)
})
</script>

<template>
  <div ref="player" />
</template>
```

:::details Show Type Declarations
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

== Component
```vue
<script setup lang="ts">
const onApiChange = (event) => {
  console.log(event);
}
</script>

<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    @apiChange="onApiChange"
  />
</template>
```
::::

### onError

*See [Reference](https://developers.google.com/youtube/iframe_api_reference#onError)*

> This event fires if an error occurs in the player. The API will pass an event object to the event
> listener function.

::::tabs key:style
== Composable
```vue
<script setup lang="ts">
const player = ref();
const { onError } = usePlayer('dQw4w9WgXcQ', player);

onError((event) => {
  console.error(event)
})
</script>

<template>
  <div ref="player" />
</template>
```

:::details Show Type Declarations
```ts
export function onError(...cb: Array<ErrorCallback>): void
export type ErrorCallback = PlayerEventCallback<ErrorEvent>
export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}
export interface ErrorEvent extends PlayerEvent {
  data: PlayerError;
}
export interface PlayerEvent {
    target: Player;
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

== Component
```vue
<script setup lang="ts">
const onError = (event) => {
  console.error(event);
}
</script>

<template>
  <YoutubeIframe
    videoId="dQw4w9WgXcQ"
    @error="onError"
  />
</template>
```
::::
