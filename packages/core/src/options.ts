import type { PlayerVars } from '@vue-youtube/shared';

export type OnVideoIdChange = 'play' | 'cue';

/**
 * Possible options which can be provided via the `usePlayer` composable.
 *
 * @see https://vue-youtube.github.io/docs/usage/composable#configuration
 */
export interface UsePlayerOptions {
  /**
   * Set the height of the YouTube player. Number and string supported.
   *
   * @see https://vue-youtube.github.io/docs/usage/composable#configuration
   * @see https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
   */
  height: number | string;

  /**
   * Set the width of the YouTube player. Number and string supported.
   *
   * @see https://vue-youtube.github.io/docs/usage/composable#configuration
   * @see https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
   */
  width: number | string;

  /**
   * Customize the player behavior.
   *
   * @see https://developers.google.com/youtube/player_parameters#Parameters
   */
  playerVars: PlayerVars;

  /**
   * When this option is `true` the host `https://www.youtube.com` is used, otherwise `https://www.youtube-nocookie.com`
   */
  cookie: boolean;

  /**
   * When this option is `play` the player will automatically start playing when the video ID changes, defaults to `play`.
   * It is also possible to cue the video instead by setting this option to `cue`.
   */
  onVideoIdChange: OnVideoIdChange;
}

export const withDefaultPlayerOptions = (options: Partial<UsePlayerOptions>): UsePlayerOptions => {
  return {
    onVideoIdChange: options.onVideoIdChange ?? 'play',
    playerVars: options.playerVars ?? {},
    cookie: options.cookie ?? true,
    height: options.height ?? 720,
    width: options.width ?? 1280,
  };
};
