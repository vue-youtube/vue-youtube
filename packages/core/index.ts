import { onMounted, onUnmounted, shallowRef, ref, unref, watch } from 'vue-demi';
import { HOST_COOKIE, HOST_NO_COOKIE, unrefElement, PlayerState } from '@vue-youtube/shared';

import type {
  PlaybackQualityChangeCallback,
  PlaybackRateChangeCallback,
  PlayerStateChangeCallback,
  PlayerEventCallback,
  APIChangeCallback,
  MaybeElementRef,
  ErrorCallback,
  ReadyCallback,
  PlayerOptions,
  PlayerVars,
  MaybeRef,
  AnyEvent,
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
 * @see https://vue-youtube.github.io/docs/usage/composable
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
  const playbackQualityChangeCallback = new Array<PlaybackQualityChangeCallback>();
  const playbackRateChangeCallback = new Array<PlaybackRateChangeCallback>();
  const playerStateChangeCallback = new Array<PlayerStateChangeCallback>();
  const apiChangeCallback = new Array<APIChangeCallback>();
  const errorCallback = new Array<ErrorCallback>();
  const readyCallback = new Array<ReadyCallback>();

  // Refs
  const instance = shallowRef<Player>();
  const videoId = ref(newVideoId);
  const shuffle = ref(false);
  const loop = ref(false);

  // Callback functions

  const triggerCallbacks = <T extends AnyEvent>(event: T, cbs: Array<PlayerEventCallback<T>>) => {
    for (const cb of cbs)
      cb(event);
  };

  /**
   * Register callback function(s) which get executed when the playback quality changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable#onplaybackqualitychange
   * @param cb One ore more playback quality change callbacks
   */
  const onPlaybackQualityChange = (...cb: Array<PlaybackQualityChangeCallback>) => {
    playbackQualityChangeCallback.push(...cb);
  };

  /**
   * Register callback function(s) which get executed when the playback rate changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable#onplaybackratechange
   * @param cb One ore more playback rate change callbacks
   */
  const onPlaybackRateChange = (...cb: Array<PlaybackRateChangeCallback>) => {
    playbackRateChangeCallback.push(...cb);
  };

  /**
   * Register callback function(s) which get executed when the player state changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable#onstatechange
   * @param cb One ore more player state change callbacks
   */
  const onStateChange = (...cb: Array<PlayerStateChangeCallback>) => {
    playerStateChangeCallback.push(...cb);
  };

  /**
   * Register callback function(s) which get executed when the API changes
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable#onapichange
   * @param cb One ore more API change callbacks
   */
  const onApiChange = (...cb: Array<APIChangeCallback>) => {
    apiChangeCallback.push(...cb);
  };

  /**
   * Register callback function(s) which get executed when an error is encountered
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable#onerror
   * @param cb One ore more error callbacks
   */
  const onError = (...cb: Array<ErrorCallback>) => {
    errorCallback.push(...cb);
  };

  /**
   * Register a callback function which gets executed when the player is ready
   * 
   * @see https://vue-youtube.github.io/docs/usage/composable#onready
   * @param cb One ore more ready callbacks
   */
  const onReady = (...cb: Array<ReadyCallback>) => {
    readyCallback.push(...cb);
  };

  // Toggle functions

  /**
   * Play / pause the video
   * 
   * @see https://vue-youtube.github.io/docs/usage/helpers#toggleplay
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
   * @see https://vue-youtube.github.io/docs/usage/helpers#togglemute
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
   * @see https://vue-youtube.github.io/docs/usage/helpers#toggleshuffle
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
   * @see https://vue-youtube.github.io/docs/usage/helpers#toggleloop
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

    manager.register(target, ({ factory, id }) => {
      target.id = id;
      instance.value = new factory.Player(id, {
        videoId: unref(videoId),
        playerVars,
        height,
        width,
        host,
        events: {
          onPlaybackQualityChange: (event) => {
            triggerCallbacks(event, playbackQualityChangeCallback);
          },
          onPlaybackRateChange: (event) => {
            triggerCallbacks(event, playbackRateChangeCallback);
          },
          onStateChange: (event) => {
            triggerCallbacks(event, playerStateChangeCallback);
          },
          onApiChange: (event) => {
            triggerCallbacks(event, apiChangeCallback);
          },
          onError: (event) => {
            triggerCallbacks(event, errorCallback);
          },
          onReady: (event) => {
            triggerCallbacks(event, readyCallback);
          },
        },
      } as PlayerOptions) as Player;
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