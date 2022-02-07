import { onMounted, onUnmounted, ref, unref, watch } from 'vue-demi';

import { hostCookie, hostNoCookie } from './shared';
import Manager from './manager';

import type { MaybeRef, MaybeElementRef } from './shared';
import type {
  PlaybackQualityChangeCallback,
  PlaybackRateChangeCallback,
  PlayerStateChangeCallback,
  APIChangeCallback,
  ErrorCallback,
  ReadyCallback,
  PlayerVars,
  Player,
} from './types';

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
  const target = unref(element);

  // Callbacks
  let playbackQualityChangeCallback: PlaybackQualityChangeCallback;
  let playbackRateChangeCallback: PlaybackRateChangeCallback;
  let playerStateChangeCallback: PlayerStateChangeCallback;
  let apiChangeCallback: APIChangeCallback;
  let errorCallback: ErrorCallback;
  let readyCallback: ReadyCallback;

  // Refs
  const videoId = ref(newVideoId);
  const player = ref<Player>();

  // Event callback functions
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

  // Functions
  const destroy = () => {
    if (player.value)
      player.value.destroy();
  };

  // Watchers
  const stop = watch(videoId, (newVideoId) => {
    player.value?.loadVideoById(newVideoId);
  });

  onMounted(() => {
    if (!target)
      return;

    Manager.get().register(target, ({ factory, id }) => {
      target.id = id;
      player.value = factory.Player(id, {
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
    destroy();
    stop();
  });

  return {
    onPlaybackQualityChange,
    onPlaybackRateChange,
    onStateChange,
    onApiChange,
    onError,
    onReady,
    destroy,
  };
}

export type UsePlayerReturn = ReturnType<typeof usePlayer>;