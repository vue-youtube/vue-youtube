/* eslint-disable @typescript-eslint/no-explicit-any */
import type { App } from 'vue';
import { inject } from 'vue';

import { PROVIDE_KEY } from '@vue-youtube/shared';
import type { ManagerOptions, ManagerState, RegisterFunction } from './types';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export interface Manager {
  install(app: App): void;
  register(target: HTMLElement, cb: RegisterFunction): void;
  load(): void;

  _enqueue(targetId: string, cb: RegisterFunction): void;
  _insert(): void;

  _state: ManagerState;
}

export const withDefaultManagerOptions = (options: Partial<ManagerOptions>): ManagerOptions => {
  return {
    deferLoading: options.deferLoading ?? { enabled: false, autoLoad: false },
  };
};

export const injectManager = () => {
  const manager = inject<Manager>(PROVIDE_KEY);

  if (!manager)
    throw new Error('You may forget to apply app.use(manager). See https://vue-youtube.github.io/docs/usage/manager.html for more information');

  return manager;
};

/**
 * Create a YouTube Iframe player manager. The manager provides a `install` method which gets called
 * by Vue's `app.use()`.
 *
 * @see https://vue-youtube.github.io/docs/usage/manager
 * @returns Manager
 */
export const createManager = (options: Partial<ManagerOptions> = {}) => {
  const managerOptions = withDefaultManagerOptions(options);

  const state: ManagerState = {
    backlog: new Map<string, RegisterFunction>(),
    players: new Map<string, RegisterFunction>(),
    options: managerOptions,
    factory: undefined,
    counter: 1,
  };

  const manager: Manager = {
    install(app) {
      app.provide(PROVIDE_KEY, manager);

      // Only immediately insert the scripts when deferLoading is disabled
      if (!this._state.options.deferLoading?.enabled)
        this._insert();
    },

    register(target, cb) {
      const targetId = target.id || `vue-youtube-${this._state.counter++}`;

      const fn = this._state.players.get(targetId);
      if (fn !== undefined) {
        fn({
          factory: this._state.factory,
          id: targetId,
        });
        return;
      }

      if (this._state.factory === undefined) {
        // This will add the registration to the backlog for when the factory is
        // not available because deferLoading is enabled or the player script was
        // not inserted yet.
        this._enqueue(targetId, cb);

        // Only auto insert if the following conditions are met:
        //
        // 1. The factory is undefined
        // 2. deferLoading is enabled
        // 3. autoLoad is enabled
        if (this._state.options.deferLoading?.enabled && this._state.options.deferLoading.autoLoad)
          this._insert();
      } else {
        cb({
          factory: this._state.factory,
          id: targetId,
        });
      }
    },

    load() {
      // Just return when the scripts were already loaded and the factory isn't
      // undefined
      if (this._state.factory !== undefined)
        return;

      this._insert();
    },

    _enqueue(targetId, cb) {
      this._state.backlog.set(targetId, cb);
    },

    _insert() {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';

      const firstTag = document.querySelectorAll('script')[0];
      firstTag.parentNode?.insertBefore(tag, firstTag);

      window.onYouTubeIframeAPIReady = () => {
        this._state.factory = window.YT;

        for (const [id, cb] of this._state.backlog.entries()) {
          this._state.backlog.delete(id);
          this._state.players.set(id, cb);
          cb({
            factory: this._state.factory,
            id,
          });
        }
      };
    },

    _state: state,
  };

  return manager;
};
