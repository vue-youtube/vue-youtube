import { onMounted, onUnmounted, shallowRef, ref, unref, watch } from 'vue';
import { HOST_COOKIE, HOST_NO_COOKIE, unrefElement, PlayerState } from '@vue-youtube/shared';

import type { MaybeRef } from 'vue';

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
  AnyEvent,
  Player,
} from '@vue-youtube/shared';

import { withDefaultPlayerOptions, type UsePlayerOptions } from './options';
import { injectManager } from './manager';

/**
 * Initialize a reactive YouTube player
 *
 * @param videoId Video ID as a string or a ref
 * @param element Template ref to the target element
 * @param options Player options
 *
 * @see https://vue-youtube.github.io/docs/usage/composable
 */
export const usePlayer = (videoId: MaybeRef<string>, element: MaybeElementRef, options: Partial<UsePlayerOptions> = {}) => {
  const manager = injectManager();

  // Options
  const {
    onVideoIdChange,
    playerVars,
    cookie,
    height,
    width,
  } = withDefaultPlayerOptions(options);

  const host = cookie ? HOST_COOKIE : HOST_NO_COOKIE;

  // Callbacks
  const playbackQualityChangeCallback = new Array<PlaybackQualityChangeCallback>();
  const playbackRateChangeCallback = new Array<PlaybackRateChangeCallback>();
  const playerStateChangeCallback = new Array<PlayerStateChangeCallback>();
  const apiChangeCallback = new Array<APIChangeCallback>();
  const errorCallback = new Array<ErrorCallback>();
  const readyCallback = new Array<ReadyCallback>();

  // Refs
  const instanceRef = shallowRef<Player>();
  const videoIdRef = ref(videoId);
  const shuffleRef = ref(false);
  const loopRef = ref(false);

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
    const state = instanceRef.value?.getPlayerState();
    if (state && state === PlayerState.PLAYING) {
      instanceRef.value?.pauseVideo();
      return;
    }
    instanceRef.value?.playVideo();
  };

  /**
   * Mute / unmute the player
   *
   * @see https://vue-youtube.github.io/docs/usage/helpers#togglemute
   */
  const toggleMute = () => {
    if (instanceRef.value?.isMuted()) {
      instanceRef.value.unMute();
      return;
    }
    instanceRef.value?.mute();
  };

  /**
   * Toggle playlist shuffling
   *
   * @see https://vue-youtube.github.io/docs/usage/helpers#toggleshuffle
   */
  const toggleShuffle = () => {
    if (shuffleRef.value) {
      instanceRef.value?.setShuffle(false);
      shuffleRef.value = false;
      return;
    }

    instanceRef.value?.setShuffle(true);
    shuffleRef.value = true;
  };

  /**
   * Toggle playlist looping.
   *
   * @see https://vue-youtube.github.io/docs/usage/helpers#toggleloop
   */
  const toggleLoop = () => {
    if (loopRef.value) {
      instanceRef.value?.setLoop(false);
      loopRef.value = false;
      return;
    }

    instanceRef.value?.setLoop(true);
    loopRef.value = true;
  };

  // Watchers
  const stopVideoIdWatcher = watch(videoIdRef, (newVideoId) => {
    if (onVideoIdChange === 'play')
      instanceRef.value?.loadVideoById(newVideoId);
    else
      instanceRef.value?.cueVideoById(newVideoId);
  });

  onMounted(() => {
    const target = unrefElement(element);

    if (!target)
      return;

    manager.register(target, ({ factory, id }) => {
      target.id = id;
      instanceRef.value = new factory.Player(id, {
        videoId: unref(videoIdRef),
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
    instanceRef.value?.destroy();
    stopVideoIdWatcher();
  });

  return {
    instance: instanceRef,
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
export * from './options';
