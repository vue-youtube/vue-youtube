/* eslint-disable @typescript-eslint/no-explicit-any */
export type RegisterFunction = (data: RegisterFunctionReturn) => void;
export type RegisterFunctionReturn = { factory: any; id: string };

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default class Manager {
  private static _instance: Manager;

  private _promise!: Promise<void>;
  private _factory!: any;
  private _uid!: number;

  private constructor() {
    this._uid = 0;
    this._insertScript();
  }

  private _insertScript() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';

    const firstTag = document.querySelectorAll('script')[0];
    firstTag.parentNode?.insertBefore(tag, firstTag);

    let resolver: { (): void; (value: void | PromiseLike<void>): void };
    this._promise = new Promise<void>((resolve) => {
      resolver = resolve;
    });

    const registerFactory = () => {
      this._factory = window.YT;
      resolver();
    };
    registerFactory.bind(this);

    window.onYouTubeIframeAPIReady = registerFactory;
  }

  public static get(): Manager {
    if (!Manager._instance)
      Manager._instance = new Manager();

    return Manager._instance;
  }

  public async register(target: HTMLElement, callback: RegisterFunction) {
    await this._promise;

    let targetId = '';
    if (target.id) {
      targetId = target.id;
    }
    else {
      this._uid++;
      targetId = `vue-youtube-${this._uid}`;
    }

    callback({
      factory: this._factory,
      id: targetId,
    });
  }
}