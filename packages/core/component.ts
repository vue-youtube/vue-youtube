/* eslint-disable @typescript-eslint/naming-convention */
import { defineComponent, h, ref } from 'vue-demi';
import type { PropType } from 'vue-demi';
import type { PlayerVars as PlayerVariables } from './types';

import { usePlayer } from './composable';

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
      type: Object as PropType<PlayerVariables>,
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
  emits: [],
  setup(props, { slots, emit }) {
    const target = ref();
    usePlayer(props.videoId, target, {
      playerVars: props.playerVars,
      height: props.height,
      cookie: props.cookie,
      width: props.width,
    });

    return () => {
      if (slots.default)
        return h('div', { ref: target }, slots.default());
    };
  },
});