/* eslint-disable @typescript-eslint/naming-convention */
import type { CCLoadPolicy } from './enums';
import type { Events } from './events';

export type AutohideOption = AlwaysVisible | HideAllControls | HideProgressBar;
export type AlwaysVisible = 0;
export type HideAllControls = 1;
export type HideProgressBar = 2;

export type AutoplayOption = Autoplay | NoAutoplay;
export type NoAutoplay = 0;
export type Autoplay = 1;

export type MuteOption = NotMuted | Muted;
export type NotMuted = 0;
export type Muted = 1;

export type ProgressBarColor = 'red' | 'white';

/* eslint-disable unicorn/prevent-abbreviations */
export interface PlayerOptions {
  width?: string | number | undefined;
  height?: string | number | undefined;
  videoId?: string | undefined;
  playerVars?: PlayerVars | undefined;
  events?: Events | undefined;
  host?: string | undefined;
}

export interface PlayerVars {
  autohide?: AutohideOption | undefined;
  autoplay?: AutoplayOption | undefined;
  cc_load_policy?: CCLoadPolicy | undefined;
  cc_lang_pref?: string | undefined;
  color?: ProgressBarColor | undefined;
  start?: number | undefined;
  mute?: MuteOption | undefined;
}