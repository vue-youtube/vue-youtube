# Configuration Options

[player-param-reference]: https://developers.google.com/youtube/player_parameters#Parameters

## `playerVars` <Badge type="info">Default value: `{}`</Badge>

Customize the player behavior, see the official [reference][player-param-reference].

::: code-group

```ts [Composable]
usePlayer('dQw4w9WgXcQ', playerRef, {
  playerVars: {
    autoplay: 1,
    mute: 1,
  }
});
```

```vue [Component]
<YoutubeIframe
  :playerVars="{
    autoplay: 1,
    mute: 1
  }"
/>
```

:::

::: details Show Type Declarations
```ts
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

::: tip Notice
This section will soon feature a full reference. See [#7](https://github.com/vue-youtube/docs/issues/7) for more
information on implementation progress.
:::

It is important to look up the official YouTube [player parameter reference][player-param-reference]. Some parameters
might oppose unexpected requirements on the provided value. Invalid values might render the player inoperable.

Such an example is the `start` parameter which is typed as a `number` in TS. In JavaScript (and thus also in Typescript)
a `number` can be any *kind* of number, like integer or float. The parameter however expects integer values, otherwise
the player won't start playing the video.

## `cookie` <Badge type="info">Default value: `false`</Badge>

When this option is `true` the host `https://www.youtube.com` is used, otherwise
`https://www.youtube-nocookie.com` will be used.

```ts
usePlayer('dQw4w9WgXcQ', playerRef, {
  cookie: true,
});
```

## `width` and `height` <Badge type="info">Default values: `1280` / `720`</Badge>

Sets the width and height of the YouTube player. Number and string supported.

```ts
usePlayer('dQw4w9WgXcQ', playerRef, {
  width: 1920,
  height: 1080,
});
```

## `onVideoIdChange` <Badge type="info">Default value: `'play'`</Badge> <Badge type="tip" text="Planned for 0.0.7" />

Customize the player behavior when video ID changes, supports `play` and `cue`. By default `play` is
used and the player will automatically start playing the new video. Using `cue` will result in the
player queuing the video. Playback needs to be started manually.

```ts
usePlayer('dQw4w9WgXcQ', playerRef, {
  onVideoIdChange: 'cue',
});
```
