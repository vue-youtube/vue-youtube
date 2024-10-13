import type { PlayerVars } from '@vue-youtube/shared';

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
}

export const withConfigDefaults = (options: Partial<UsePlayerOptions>): UsePlayerOptions => {
  return {
    playerVars: options.playerVars ?? {},
    cookie: options.cookie ?? true,
    height: options.height ?? 720,
    width: options.width ?? 1280,
  };
};
