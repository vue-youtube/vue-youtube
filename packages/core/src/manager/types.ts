/* eslint-disable @typescript-eslint/no-explicit-any */
export type RegisterFunction = (data: RegisterFunctionReturn) => void;
export type RegisterFunctionReturn = { factory: any; id: string };

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

export interface ManagerState {
  backlog: Map<string, RegisterFunction>;
  players: Map<string, RegisterFunction>;
  options: ManagerOptions;
  counter: number;
  factory: any;
}

export interface ManagedPlayerState {
  persistedState: PersistedPlayerState;
  callback: RegisterFunction;
}

export interface PersistedPlayerState {
  time: number;
}
