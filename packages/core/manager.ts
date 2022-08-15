/* eslint-disable @typescript-eslint/no-explicit-any */
import type { App } from 'vue-demi';
import { inject } from 'vue-demi';

import { PROVIDE_KEY } from '@vue-youtube/shared';

export type RegisterFunction = (data: RegisterFunctionReturn) => void;
export type RegisterFunctionReturn = { factory: any; id: string };

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export interface Manager {
  install(app: App): void;
  insertScript(): void;
  registerPlayer(target: HTMLElement, cb: RegisterFunction): void;
  register(id: string, cb: RegisterFunction): void;
}

export const injectManager = () => {
  const manager = inject<Manager>(PROVIDE_KEY);

  if (!manager)
    throw new Error('You may forget to apply app.use(manager)');

  return manager;
};

/**
 * Create a YouTube Iframe player manager. The manager provides a `install` method which gets called
 * by Vue's `app.use()`.
 * 
 * @see https://vue-youtube.github.io/docs/usage/composable.html
 * @returns Manager
 */
export const createManager = () => {
  const delayedPlayers = new Map<string, RegisterFunction>();
  const players = new Map<string, RegisterFunction>();
  let factory: any;
  let counter = 0;

  const manager: Manager = {
    install(app) {
      app.config.globalProperties.$vueYutubeManager = manager;
      app.provide(PROVIDE_KEY, manager);

      this.insertScript();
    },
    insertScript() {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';

      const firstTag = document.querySelectorAll('script')[0];
      firstTag.parentNode?.insertBefore(tag, firstTag);

      window.onYouTubeIframeAPIReady = () => {
        factory = window.YT;

        for (const [id, cb] of delayedPlayers.entries()) {
          delayedPlayers.delete(id);
          players.set(id, cb);
          cb({
            factory,
            id,
          });
        }
      };
    },
    registerPlayer(target, cb) {
      let targetId = '';

      if (target.id) {
        targetId = target.id;
      }
      else {
        counter++;
        targetId = `vue-youtube-${counter}`;
      }

      const fn = players.get(targetId);
      if (fn !== undefined) {
        fn({
          id: targetId,
          factory,
        });
      }
      else {
        this.register(targetId, cb);
      }
    },
    register(id, cb) {
      if (factory !== undefined) {
        cb({
          factory,
          id,
        });
      }
      else {
        delayedPlayers.set(id, cb);
      }
    },
  };

  return manager;
};