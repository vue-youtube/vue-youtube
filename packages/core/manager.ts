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
  options: ManagerOptions;
  counter: number;
  factory: any;
}

export interface Manager {
  install(app: App): void;
  register(target: HTMLElement, cb: RegisterFunction): void;
  load(): void;

  _state: ManagerState;
  _insert(): void;
}

/**
 * Possible options which can be provided via the `createManager` function.
 * 
 * @see https://vue-youtube.github.io/docs/usage/manager#options
 */
export interface ManagerOptions {
  deferLoading?: DeferLoadingOption;
}

/**
 * When `deferLoading` is enabled, the manager will not load and insert required scripts into the page. Instead, it will
 * do so either when `Manager.load()` is called or when the `usePlayer()` composable is used and `autoLoad` is set to
 * `true`.
 * 
 * @see https://vue-youtube.github.io/docs/usage/manager#deferloading
 */
export interface DeferLoadingOption {
  autoLoad?: boolean;
  enabled: boolean;
}

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
export const createManager = (options?: ManagerOptions) => {
  const managerOptions = options || {
    deferLoading: {
      enabled: false,
      autoLoad: false,
    },
  };

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
        // not available because deferLoading is enabled.
        this._state.backlog.set(targetId, cb);

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