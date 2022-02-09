import { hostCookie, hostNoCookie, unrefElement } from '@vue-youtube/shared';
import { onMounted, onUnmounted, shallowRef, ref, unref, watch } from 'vue-demi';

import type {
  PlaybackQualityChangeCallback,
  PlaybackRateChangeCallback,
  PlayerStateChangeCallback,
  APIChangeCallback,
  MaybeElementRef,
  ErrorCallback,
  ReadyCallback,
  PlayerVars,
  MaybeRef,
  Player,
} from '@vue-youtube/shared';

import Manager from './manager';

export interface Options {
  height?: number | string;
  width?: number | string;
  playerVars?: PlayerVars;
  cookie?: boolean;
}

export function usePlayer(newVideoId: MaybeRef<string>, element: MaybeElementRef, options: Options = {}) {
  // Options
  const {
    playerVars = {},
    cookie = true,
    width = 1280,
    height = 720,
  } = options;

  const host = cookie ? hostCookie : hostNoCookie;

  // Callbacks
  let playbackQualityChangeCallback: PlaybackQualityChangeCallback;
  let playbackRateChangeCallback: PlaybackRateChangeCallback;
  let playerStateChangeCallback: PlayerStateChangeCallback;
  let apiChangeCallback: APIChangeCallback;
  let errorCallback: ErrorCallback;
  let readyCallback: ReadyCallback;

  // Refs
  const videoId = ref(newVideoId);
  const player = shallowRef<Player>();

  // Callback functions
  const onPlaybackQualityChange = (cb: PlaybackQualityChangeCallback) => {
    playbackQualityChangeCallback = cb;
  };

  const onPlaybackRateChange = (cb: PlaybackRateChangeCallback) => {
    playbackRateChangeCallback = cb;
  };

  const onStateChange = (cb: PlayerStateChangeCallback) => {
    playerStateChangeCallback = cb;
  };

  const onApiChange = (cb: APIChangeCallback) => {
    apiChangeCallback = cb;
  };

  const onError = (cb: ErrorCallback) => {
    errorCallback = cb;
  };

  const onReady = (cb: ReadyCallback) => {
    readyCallback = cb;
  };

  // Watchers
  const stop = watch(videoId, (newVideoId) => {
    player.value?.loadVideoById(newVideoId);
  });

  onMounted(() => {
    const target = unrefElement(element);

    if (!target)
      return;

    Manager.get().register(target, ({ factory, id }) => {
      target.id = id;
      player.value = new factory.Player(id, {
        videoId: unref(videoId),
        playerVars,
        height,
        width,
        host,
        events: {
          onPlaybackQualityChange: playbackQualityChangeCallback,
          onPlaybackRateChange: playbackRateChangeCallback,
          onStateChange: playerStateChangeCallback,
          onApiChange: apiChangeCallback,
          onError: errorCallback,
          onReady: readyCallback,
        },
      }) as Player;
    });
  });

  onUnmounted(() => {
    player.value?.destroy();
    stop();
  });

  return {
    player,
    onPlaybackQualityChange,
    onPlaybackRateChange,
    onStateChange,
    onApiChange,
    onError,
    onReady,
  };
}

export type UsePlayerReturn = ReturnType<typeof usePlayer>;
export * from '@vue-youtube/shared';