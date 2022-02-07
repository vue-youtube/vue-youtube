import type { PlayerFactory } from './types';

export type RegisterFunction = (data: RegisterFunctionReturn) => void;
export type RegisterFunctionReturn = {
  factory: PlayerFactory;
  id: string;
};

export default class Manager {
  private static _instance: Manager;

  private _factory!: PlayerFactory;
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

    (window as any).onYouTubeIframeAPIReady = () => {
      this._factory = (window as any).YT as PlayerFactory;
    };
  }

  public static get(): Manager {
    if (!Manager._instance)
      Manager._instance = new Manager();

    return Manager._instance;
  }

  public register(target: HTMLElement, callback: RegisterFunction) {
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