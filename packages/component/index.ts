/* eslint-disable @typescript-eslint/naming-convention */
import { defineComponent, h, ref, toRefs } from 'vue-demi';
import { usePlayer } from '@vue-youtube/core';

import type { PlayerVars } from '@vue-youtube/shared';
import type { PropType } from 'vue-demi';

export const YoutubeIframe = defineComponent({
  name: 'YoutubeIframe',
  props: {
    width: {
      type: [String, Number] as PropType<string | number>,
      default: 1280,
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: 720,
    },
    playerVars: {
      type: Object as PropType<PlayerVars>,
      default: () => ({
        autoplay: 0,
        time: 0,
        mute: 0,
      }),
    },
    videoId: {
      type: String as PropType<string>,
      default: '',
    },
    cookie: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: [
    'playback-quality-change',
    'playback-rate-change',
    'state-change',
    'api-change',
    'error',
    'ready',
  ],
  setup(props, { emit, expose }) {
    const { videoId } = toRefs(props);
    const target = ref();

    const {
      instance,
      togglePlay,
      toggleMute,
      onPlaybackQualityChange,
      onPlaybackRateChange,
      onStateChange,
      onApiChange,
      onError,
      onReady,
    } = usePlayer(videoId, target, {
      playerVars: props.playerVars,
      height: props.height,
      cookie: props.cookie,
      width: props.width,
    });

    onPlaybackQualityChange((event) => {
      emit('playback-quality-change', event);
    });

    onPlaybackRateChange((event) => {
      emit('playback-rate-change', event);
    });

    onStateChange((event) => {
      emit('state-change', event);
    });

    onApiChange((event) => {
      emit('api-change', event);
    });

    onError((event) => {
      emit('error', event);
    });

    onReady((event) => {
      emit('ready', event);
    });

    expose({
      instance,
      togglePlay,
      toggleMute,
    });

    return () => {
      return h('div', { ref: target });
    };
  },
});

export * from '@vue-youtube/shared';