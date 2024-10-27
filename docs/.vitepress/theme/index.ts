import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import DefaultTheme from 'vitepress/theme'

import type { Theme } from 'vitepress'

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
    enhanceAppWithTabs(app)
  }
} satisfies Theme
