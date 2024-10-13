/**
 * @see https://developers.google.com/youtube/iframe_api_reference#onStateChange
 */
export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5
}
