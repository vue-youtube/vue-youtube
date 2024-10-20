---
prev: false
---

# Manager

The player manager needs to be registered with `app.use()` in the `main.ts` file.

```ts
import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';

import app from './app.vue';

createApp(app).use(createManager()).mount('#app');
```

::: details Show Type Declarations
```ts
export declare const createManager: (options?: ManagerOptions) => Manager;
export interface Manager {
    register(target: HTMLElement, cb: RegisterFunction): void;
    install(app: App): void;
    state: ManagerState;
    _insert(): void;
}
export interface ManagerState {
    backlog: Map<string, RegisterFunction>;
    players: Map<string, RegisterFunction>;
    counter: number;
    factory: any;
}
export declare type RegisterFunction = (data: RegisterFunctionReturn) => void;
export declare type RegisterFunctionReturn = {
    factory: any;
    id: string;
};
```
:::

The manager has multiple responsibilities:

- Insert the YouTube Iframe API scripts
- Make the player factory available to the component and composable functions
- Keep track of registered player instances

## Options

### `deferLoading` <Badge type="tip" text="Since 0.0.5" />

When `deferLoading` is enabled, the manager will not load and insert required scripts into the page automatically upon
page load.

```ts{7-10}
import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';

import app from './app.vue';

const manager = createManager({
  deferLoading: {
    enabled: true,
    autoLoad: true,
  },
});

createApp(app).use(manager).mount('#app');
```

::: details Show Type Declarations
```ts
export declare const createManager: (options?: ManagerOptions) => Manager;
export interface ManagerOptions {
    deferLoading?: DeferLoadingOption;
}
export interface DeferLoadingOption {
    autoLoad?: boolean;
    enabled: boolean;
}
```
:::

#### Implicit loading

The manager will implicitly load the required scripts `autoLoad` is set to `true`. This is useful when only a limited
number of pages use the player. The scripts will only be loaded when the user visits these pages. This mechanism reduces
initially requested content and thus load times.

#### Explicit loading

If you for example want to load the scripts when the user consents to do so (via a cookie consent banner), you can use
`injectManager()` to get access to the manager instance. The manager can then be loaded using `Manager.load()`.

```vue
<template>
  <div class="my-cookie-consent-banner">
    <button @click="consent">
      Accept Cookies
    </button>
  </div>
</template>

<script setup lang="ts">
import { injectManager } from '@vue-youtube/core';

const manager = injectManager();

const consent = () => {
  // Accepts other cookies
  acceptCookies();

  // Loads the manager and enables video playback for all players
  manager.load();
}
</script>
```
