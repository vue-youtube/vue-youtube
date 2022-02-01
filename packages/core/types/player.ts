import type { VideoQuality } from './quality';

export interface Player {
  /**
   * cueVideoById queues a video by ID
   * @param videoId YouTube video ID
   * @param startSeconds Time in seconds from which the video should start playing
   * @param suggestedQuality Suggested video player quality
   */
  cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: VideoQuality): void;

  /**
      * Queues a video by ID.
      *
      * @param args   Settings to queue the video.
      */
  cueVideoById(arguments_: VideoByIdSettings): void;

  /**
   * loadVideoById loads a video by ID
   * @param videoId YouTube video ID
   * @param startSeconds Time in seconds from which the video should start playing
   * @param suggestedQuality Suggested video player quality
   */
  loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: VideoQuality): void;

  /**
      * Loads and plays a video by ID.
      *
      * @param args   Settings to play the video.
      */
  loadVideoById(arguments_: VideoByIdSettings): void;

  /**
   * cueVideoByUrl queues a video by URL
   * @param mediaContentUrl Fully qualified player URL
   * @param startSeconds Time in seconds from which the video should start playing
   * @param suggestedQuality Suggested video player quality
   */
  cueVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: VideoQuality): void;

  /**
      * Queues a video by media content URL.
      *
      * @param args   Settings to play the video.
      */
  cueVideoByUrl(arguments_: VideoByMediaContentUrlSettings): void;

  /**
   * loadVideoByUrl loads a video by URL
   * @param mediaContentUrl Fully qualified player URL
   * @param startSeconds Time in seconds from which the video should start playing
   * @param suggestedQuality Suggested video player quality
   */
  loadVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: VideoQuality): void;

  /**
      * Loads a video by media content URL.
      *
      * @param args   Settings to play the video.
      */
  loadVideoByUrl(arguments_: { mediaContentUrl: string; startSeconds?: number | undefined; endSeconds?: number | undefined; suggestedQuality?: VideoQuality | undefined; }): void;

  /**
   * cuePlaylist queues one ore more videos by ID
   * @param playlist Video ID(s) to play
   * @param index Start index of the playlist (default 0)
   * @param startSeconds Time in seconds from which the video should start playing
   * @param suggestedQuality Suggested video player quality
   */
  cuePlaylist(playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: VideoQuality): void;

  /**
      * Queues a playlist of videos.
      *
      * @param args   Settings to queue the playlist.
      */
  cuePlaylist(arguments_: IPlaylistSettings): void;

  /**
      * Loads a playlist of videos.
      *
      * @param playlist   Video ID(s) to play.
      * @param index   Start index of the playlist, if not 0.
      * @param startSeconds   Time from which the video should start playing.
      * @param suggestedQuality   Suggested video player quality.
      */
  loadPlaylist(playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;

  /**
      * Loads a playlist of videos.
      *
      * @param args    Settings to queue the playlist.
      */
  loadPlaylist(arguments_: IPlaylistSettings): void;

  /**
      * Plays the currently cued/loaded video.
      */
  playVideo(): void;

  /**
      * Pauses the currently playing video.
      */
  pauseVideo(): void;

  /**
      * Stops and cancels loading of the current video.
      */
  stopVideo(): void;

  /**
      * Seeks to a specified time in the video.
      *
      * @param seconds   Time, in seconds from the beginning of the video.
      * @param allowSeekAhead   Whether the player is allowed to make a new request for unbuffered data.
      */
  seekTo(seconds: number, allowSeekAhead: boolean): void;

  /**
      * Loads and plays the next video in the playlist.
      */
  nextVideo(): void;

  /**
      * Loads and plays the previous video in the playlist.
      */
  previousVideo(): void;

  /**
      * Loads and plays the specified video in the playlist.
      *
      * @param index   Index of the video to play.
      */
  playVideoAt(index: number): void;

  /**
      * Mutes the player.
      */
  mute(): void;

  /**
      * Unmutes the player.
      */
  unMute(): void;

  /**
      * @returns Whether the player is muted.
      */
  isMuted(): boolean;

  /**
      * Sets the player volume.
      *
      * @param volume   An integer between 0 and 100.
      */
  setVolume(volume: number): void;

  /**
      * @returns The player's current volume, an integer between 0 and 100.
      */
  getVolume(): number;

  /**
      * Sets the size in pixels of the <iframe> that contains the player.
      *
      * @param width   Width in pixels of the <iframe>.
      * @param height   Height in pixels of the <iframe>.
      */
  setSize(width: number, height: number): void;

  /**
      * @returns Playback rate of the currently playing video.
      */
  getPlaybackRate(): number;

  /**
      * Sets the suggested playback rate for the current video.
      *
      * @param suggestedRate   Suggested playback rate.
      */
  setPlaybackRate(suggestedRate: number): void;

  /**
      * @returns Available playback rates for the current video.
      */
  getAvailablePlaybackRates(): number[];

  /**
      * Sets whether the player should continuously play a playlist.
      *
      * @param loopPlaylists   Whether to continuously loop playlists.
      */
  setLoop(loopPlaylists: boolean): void;

  /**
      * Sets whether a playlist's videos should be shuffled.
      *
      * @param shufflePlaylist   Whether to shuffle playlist videos.
      */
  setShuffle(shufflePlaylist: boolean): void;

  /**
      * @returns A number between 0 and 1 of how much the player has buffered.
      */
  getVideoLoadedFraction(): number;

  /**
      * @returns Current player state.
      */
  getPlayerState(): PlayerState;

  /**
      * @returns Elapsed time in seconds since the video started playing.
      */
  getCurrentTime(): number;

  /**
      * @returns Actual video quality of the current video.
      */
  getPlaybackQuality(): SuggestedVideoQuality;

  /**
      * Sets the suggested video quality for the current video.
      *
      * @param suggestedQuality   Suggested video quality for the current video.
      */
  setPlaybackQuality(suggestedQuality: SuggestedVideoQuality): void;

  /**
      * @returns Quality formats in which the current video is available.
      */
  getAvailableQualityLevels(): SuggestedVideoQuality[];

  /**
      * @returns Duration in seconds of the currently playing video.
      */
  getDuration(): number;

  /**
      * @returns YouTube.com URL for the currently loaded/playing video.
      */
  getVideoUrl(): string;

  /**
      * @returns The spherical video config object, with information about the viewport
      * headings and zoom level.
      */
  getSphericalProperties(): SphericalProperties;

  /**
      * Sets the spherical video config object. The call will be No-Op for non-360
      * videos, and will change the view port according to the input for 360
      * videos.
      */
  setSphericalProperties(option: SphericalProperties): void;

  /**
      * @returns Embed code for the currently loaded/playing video.
      */
  getVideoEmbedCode(): string;

  /**
      * @returns Video IDs in the playlist as they are currently ordered.
      */
  getPlaylist(): string[];

  /**
      * @returns Index of the playlist video that is currently playing.
      */
  getPlaylistIndex(): number;

  /**
      * Adds an event listener for the specified event.
      *
      * @param eventName   Name of the event.
      * @param listener   Handler for the event.
      */
  addEventListener<TEvent extends PlayerEvent>(eventName: keyof Events, listener: (event: TEvent) => void): void;

  /**
      * Remove an event listener for the specified event.
      *
      * @param eventName   Name of the event.
      * @param listener   Handler for the event.
      */
  removeEventListener<TEvent extends PlayerEvent>(eventName: keyof Events, listener: (event: TEvent) => void): void;

  /**
      * @returns The DOM node for the embedded <iframe>.
      */
  getIframe(): HTMLIFrameElement;

  /**
      * Removes the <iframe> containing the player.
      */
  destroy(): void;
}