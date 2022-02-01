/* eslint-disable unicorn/prevent-abbreviations */
import { ref, unref } from 'vue-demi';

import { hostCookie, hostNoCookie, nullCallback } from './shared';
import Manager from './manager';

import type { MaybeRef, MaybeElementRef } from './shared';
import type {
  PlaybackQualityChangeEvent,
  PlaybackRateChangeEvent,
  PlayerStateChangeEvent,
  APIChangeEvent,
  PlayerEvent,
  PlayerVars,
  ErrorEvent,
  Player,
} from './types';

export interface Options {
  height?: number | string;
  width?: number | string;
  playerVars?: PlayerVars;
  cookie?: boolean;
}

export type PlaybackQualityChangeCallback = (event: PlaybackQualityChangeEvent) => void;
export type PlaybackRateChangeCallback = (event: PlaybackRateChangeEvent) => void;
export type PlayerStateChangeCallback = (event: PlayerStateChangeEvent) => void;
export type APIChangeCallback = (event: APIChangeEvent) => void;
export type ErrorCallback = (event: ErrorEvent) => void;
export type ReadyCallback = (event: PlayerEvent) => void;

export function usePlayer(videoId: MaybeRef<string>, element: MaybeElementRef, options: Options = {}) {
  // Options
  const {
    playerVars = {},
    cookie = true,
    width = 1280,
    height = 720,
  } = options;

  const host = cookie ? hostCookie : hostNoCookie;
  const target = unref(element);

  if (target === null)
    return {};

  // Callbacks
  let playbackQualityChangeCallback: PlaybackQualityChangeCallback = nullCallback;
  let playbackRateChangeCallback: PlaybackRateChangeCallback = nullCallback;
  let playerStateChangeCallback: PlayerStateChangeCallback = nullCallback;
  let apiChangeCallback: APIChangeCallback = nullCallback;
  let errorCallback: ErrorCallback = nullCallback;
  let readyCallback: ReadyCallback = nullCallback;

  // Refs
  const player = ref<Player>();

  // Initialization
  Manager.get().register((factory) => {
    player.value = factory.Player(target, {
      width,
      height,
      playerVars,
      videoId,
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

  // Event callback functions
  const onPlaybackQualityChange = (fn: PlaybackQualityChangeCallback) => {
    playbackQualityChangeCallback = fn;
  };

  const onPlaybackRateChange = (fn: PlaybackRateChangeCallback) => {
    playbackRateChangeCallback = fn;
  };

  const onStateChange = (fn: PlayerStateChangeCallback) => {
    playerStateChangeCallback = fn;
  };

  const onApiChange = (fn: APIChangeCallback) => {
    apiChangeCallback = fn;
  };

  const onError = (fn: ErrorCallback) => {
    errorCallback = fn;
  };

  const onReady = (fn: ReadyCallback) => {
    readyCallback = fn;
  };

  // Functions
  const destroy = () => {
    if (player.value)
      player.value.destroy();
  };

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