import type { Events } from './events';

export type ListType = 'search' | 'user_uploads' | 'playlist';
export type ProgressBarColor = 'red' | 'white';
export type ModestBrandingOption = 0 | 1;
export type RelatedVideosOption = 0 | 1;
export type ControlsOption = 0 | 1 | 2;
export type AutohideOption = 0 | 1 | 2;
export type CCLoadPolicyOption = 0 | 1;
export type PlaysInlineOption = 0 | 1;
export type FullscreenOption = 0 | 1;
export type KeyboardOptions = 0 | 1;
export type AutoplayOption = 0 | 1;
export type IVPolicyOption = 1 | 3;
export type ShowInfoOption = 0 | 1;
export type JSAPIOptions = 0 | 1;
export type MuteOption = 0 | 1;
export type LoopOption = 0 | 1;

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
  cc_load_policy?: CCLoadPolicyOption | undefined;
  cc_lang_pref?: string | undefined;
  color?: ProgressBarColor | undefined;
  controls?: ControlsOption | undefined;
  disablekb?: KeyboardOptions | undefined;
  enablejsapi?: JSAPIOptions | undefined;
  end?: number | undefined;
  fs?: FullscreenOption | undefined;
  hl?: string | undefined;
  iv_load_policy?: IVPolicyOption | undefined;
  list?: string | undefined;
  listType?: ListType | undefined;
  loop?: LoopOption | undefined;
  /**
   * The `modestbranding` parameter is deprecated and will have no effect. To align with YouTube's branding
   * requirements, the player now determines the appropriate branding treatment based on a combination of factors,
   * including player size, other API parameters (e.g. controls), and additional signals.
   * 
   * @see https://developers.google.com/youtube/player_parameters#august-15,-2023
   * @deprecated
   */
  modestbranding?: ModestBrandingOption | undefined;
  mute?: MuteOption | undefined;
  origin?: string | undefined;
  playlist?: string | undefined;
  playsinline?: PlaysInlineOption | undefined;
  rel?: RelatedVideosOption | undefined;
  showinfo?: ShowInfoOption | undefined;
  start?: number | undefined;
}