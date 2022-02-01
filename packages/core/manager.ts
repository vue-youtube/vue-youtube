export type RegisterFunction = (factory: any, uid: string) => void;

export default class Manager {
  private static _instance: Manager;

  private _players!: Array<RegisterFunction>;
  private _factory!: any;
  private _uid!: number;

  private constructor() {
    this._players = new Array<RegisterFunction>();
    this._uid = 0;
  }

  public static get(): Manager {
    if (!Manager._instance)
      Manager._instance = new Manager();

    return Manager._instance;
  }

  public factory(factory?: any): any {
    if (factory)
      this._factory = factory;

    return this._factory;
  }

  public register(callback: RegisterFunction) {
    this._uid++;

    if (this._factory !== undefined) {
      callback(this._factory, `vue-youtube-${this._uid}`);
      return;
    }

    this._players.push(callback);
  }

  public runQueued() {
    for (const callback of this._players) {
      if (this._factory !== undefined) {
        this._uid++;
        callback(this._factory, `vue-youtube-${this._uid}`);
      }
    }

    this._players = [];
  }
}