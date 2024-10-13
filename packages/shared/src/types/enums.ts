/**
 * @see https://developers.google.com/youtube/iframe_api_reference#onError
 */
export enum PlayerError {
  INVALID_PARAMETER = 2,
  HTML5_ERROR = 5,
  NOT_FOUND = 100,
  NOT_ALLOWED = 101,
  NOT_ALLOWED_DISGUISE = 150
}

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
