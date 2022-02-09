import type { PlayerState, PlayerError } from './enums';
import type { VideoQuality } from './quality';
import type { Player } from './player';

export type PlaybackQualityChangeCallback = PlayerEventCallback<PlaybackQualityChangeEvent>;
export type PlaybackRateChangeCallback = PlayerEventCallback<PlaybackRateChangeEvent>;
export type PlayerStateChangeCallback = PlayerEventCallback<PlayerStateChangeEvent>;
export type APIChangeCallback = PlayerEventCallback<PlayerEvent>;
export type ReadyCallback = PlayerEventCallback<PlayerEvent>;
export type ErrorCallback = PlayerEventCallback<ErrorEvent>;

export interface Events {
  onPlaybackQualityChange?: PlaybackQualityChangeCallback | undefined;
  onPlaybackRateChange?: PlaybackRateChangeCallback | undefined;
  onStateChange?: PlayerStateChangeCallback | undefined;
  onApiChange?: APIChangeCallback | undefined;
  onReady?: ReadyCallback | undefined;
  onError?: ErrorCallback | undefined;
}

export interface PlayerEvent {
  target: Player;
}

export interface PlaybackQualityChangeEvent extends PlayerEvent {
  data: VideoQuality;
}

export interface PlaybackRateChangeEvent extends PlayerEvent {
  data: number;
}

export interface PlayerStateChangeEvent extends PlayerEvent {
  data: PlayerState;
}

export interface ErrorEvent extends PlayerEvent {
  data: PlayerError;
}

export interface PlayerEventCallback<T extends PlayerEvent> {
  (event: T): void;
}