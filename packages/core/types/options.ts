import type { Events } from './events';

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
  start?: number | undefined;
}