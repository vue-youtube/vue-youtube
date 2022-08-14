import { onMounted, onUnmounted, shallowRef, ref, unref, watch } from 'vue-demi';
import { HOST_COOKIE, HOST_NO_COOKIE, unrefElement, PlayerState } from '@vue-youtube/shared';

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

import { injectManager } from './manager';

export interface Options {
  height?: number | string;
  width?: number | string;
  playerVars?: PlayerVars;
  cookie?: boolean;
}

/**
 * Initialize a reactive YouTube player
 * 
 * @see https://vue-youtube.github.io/docs/usage/composable.html
 * @param newVideoId Video ID as a string or a ref
 * @param element Template ref to the target element
 * @param options Player options
 */
export const usePlayer = (newVideoId: MaybeRef<string>, element: MaybeElementRef, options: Options = {}) => {
  // Options
  const {
    playerVars = {},
    cookie = true,
    width = 1280,
    height = 720,
  } = options;

  const host = cookie ? HOST_COOKIE : HOST_NO_COOKIE;
  const manager = injectManager();

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
  const shuffle = ref(false);
  const loop = ref(false);

  // Callback functions

  /**
   * Register a callback function which gets executed when the playback quality changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable.html#onplaybackqualitychange
   * @param cb PlaybackQualityChangeCallback
   */
  const onPlaybackQualityChange = (cb: PlaybackQualityChangeCallback) => {
    playbackQualityChangeCallback = cb;
  };

  /**
   * Register a callback function which gets executed when the playback rate changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable.html#onplaybackratechange
   * @param cb PlaybackRateChangeCallback
   */
  const onPlaybackRateChange = (cb: PlaybackRateChangeCallback) => {
    playbackRateChangeCallback = cb;
  };

  /**
   * Register a callback function which gets executed when the player state changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable.html#onstatechange
   * @param cb PlayerStateChangeCallback
   */
  const onStateChange = (cb: PlayerStateChangeCallback) => {
    playerStateChangeCallback = cb;
  };

  /**
   * Register a callback function which gets executed when the API changes
   * 
   * @param cb APIChangeCallback
   */
  const onApiChange = (cb: APIChangeCallback) => {
    apiChangeCallback = cb;
  };

  /**
   * Register a callback function which gets executed when an error is encountered
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable.html#onerror
   * @param cb ErrorCallback
   */
  const onError = (cb: ErrorCallback) => {
    errorCallback = cb;
  };

  /**
   * Register a callback function which gets executed when the player is ready
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable.html#onready
   * @param cb ReadyCallback
   */
  const onReady = (cb: ReadyCallback) => {
    readyCallback = cb;
  };

  // Toggle functions

  /**
   * Play / pause the video
   * 
   * @see https://vue-youtube.github.io/docs/usage/helpers.html#toggleplay
   */
  const togglePlay = () => {
    const state = instance.value?.getPlayerState();
    if (state && state === PlayerState.PLAYING) {
      instance.value?.pauseVideo();
      return;
    }
    instance.value?.playVideo();
  };

  /**
   * Mute / unmute the player
   * 
   * @see https://vue-youtube.github.io/docs/usage/helpers.html#togglemute
   */
  const toggleMute = () => {
    if (instance.value?.isMuted()) {
      instance.value.unMute();
      return;
    }
    instance.value?.mute();
  };

  /**
   * Toggle playlist shuffling
   * 
   * @see https://vue-youtube.github.io/docs/usage/helpers.html#toggleshuffle
   */
  const toggleShuffle = () => {
    if (shuffle.value) {
      instance.value?.setShuffle(false);
      shuffle.value = false;
      return;
    }

    instance.value?.setShuffle(true);
    shuffle.value = true;
  };

  /**
   * Toggle playlist looping.
   * 
   * @see https://vue-youtube.github.io/docs/usage/helpers.html#toggleloop
   */
  const toggleLoop = () => {
    if (loop.value) {
      instance.value?.setLoop(false);
      loop.value = false;
      return;
    }

    instance.value?.setLoop(true);
    loop.value = true;
  };

  // Watchers
  const stop = watch(videoId, (newVideoId) => {
    instance.value?.loadVideoById(newVideoId);
  });

  onMounted(() => {
    const target = unrefElement(element);

    if (!target)
      return;

    manager.registerPlayer(target, ({ factory, id }) => {
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
    toggleLoop,
    toggleShuffle,
    onPlaybackQualityChange,
    onPlaybackRateChange,
    onStateChange,
    onApiChange,
    onError,
    onReady,
  };
};

export type UsePlayerReturn = ReturnType<typeof usePlayer>;
export * from '@vue-youtube/shared';
export * from './manager';