import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { YoutubeIframe } from '@vue-youtube/component';
import { createManager } from '@vue-youtube/core';

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(createManager({
      deferLoading: {
        enabled: true,
        autoLoad: true
      }
    })).component('YoutubeIframe', YoutubeIframe)
  }
} satisfies Theme
