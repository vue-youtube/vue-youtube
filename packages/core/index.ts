import { onMounted, onUnmounted, shallowRef, ref, unref, watch } from 'vue-demi';
import { hostCookie, hostNoCookie, unrefElement, PlayerState } from '@vue-youtube/shared';

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

/**
 * Initialize a reactive YouTube player
 * 
 * @see https://vue-youtube.org/usage/composable.html
 * @param newVideoId Video ID as a string or a ref
 * @param element Template ref to the target element
 * @param options Player options
 */
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
  const instance = shallowRef<Player>();
  const videoId = ref(newVideoId);

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

  // Toggle functions
  const togglePlay = () => {
    const state = instance.value?.getPlayerState();
    if (state && state === PlayerState.PLAYING) {
      instance.value?.pauseVideo();
      return;
    }
    instance.value?.playVideo();
  };

  const toggleMute = () => {
    if (instance.value?.isMuted()) {
      instance.value.unMute();
      return;
    }
    instance.value?.mute();
  };

  // Watchers
  const stop = watch(videoId, (newVideoId) => {
    instance.value?.loadVideoById(newVideoId);
  });

  onMounted(() => {
    const target = unrefElement(element);

    if (!target)
      return;

    Manager.get().register(target, ({ factory, id }) => {
      target.id = id;
      instance.value = new factory.Player(id, {
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
    instance.value?.destroy();
    stop();
  });

  return {
    instance,
    togglePlay,
    toggleMute,
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