import type { VideoQuality } from './quality';
import type { PlayerState } from './states';
import type { Player } from './player';

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

export interface APIChangeEvent extends PlayerEvent {
  data: PlayerState; // TODO (Techassi): Change this
}

export interface ErrorEvent extends PlayerEvent {
  data: PlayerError;
}