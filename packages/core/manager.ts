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

export interface ManagerState {
  backlog: Map<string, RegisterFunction>;
  players: Map<string, RegisterFunction>;
  counter: number;
  factory: any;
}

export interface Manager {
  install(app: App): void;
  register(target: HTMLElement, cb: RegisterFunction): void;

  state: ManagerState;

  _insert(): void;
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
 * @see https://vue-youtube.github.io/docs/usage/manager.html
 * @returns Manager
 */
export const createManager = () => {
  const state: ManagerState = {
    backlog: new Map<string, RegisterFunction>(),
    players: new Map<string, RegisterFunction>(),
    factory: undefined,
    counter: 1,
  };

  const manager: Manager = {
    install(app) {
      app.provide(PROVIDE_KEY, manager);
      this._insert();
    },

    register(target, cb) {
      const targetId = target.id ? target.id : `vue-youtube-${this.state.counter++}`;

      const fn = this.state.players.get(targetId);
      if (fn !== undefined) {
        fn({
          factory: this.state.factory,
          id: targetId,
        });
        return;
      }

      if (this.state.factory !== undefined) {
        cb({
          factory: this.state.factory,
          id: targetId,
        });
        return;
      }

      this.state.backlog.set(targetId, cb);
    },

    _insert() {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';

      const firstTag = document.querySelectorAll('script')[0];
      firstTag.parentNode?.insertBefore(tag, firstTag);

      window.onYouTubeIframeAPIReady = () => {
        this.state.factory = window.YT;

        for (const [id, cb] of this.state.backlog.entries()) {
          this.state.backlog.delete(id);
          this.state.players.set(id, cb);
          cb({
            factory: this.state.factory,
            id,
          });
        }
      };
    },

    state,
  };

  return manager;
};