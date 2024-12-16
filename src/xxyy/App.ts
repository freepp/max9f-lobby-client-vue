import { Config } from './Config';
import { InitApp } from './net/InitApp';
import { Request } from './net/request';

export class App {
  // #region 属性和构造函数
  private static _instance: App;
  public static get instance(): App {
    if (!this._instance) {
      this._instance = new App();
    }
    return this._instance;
  }

  private _config: Config;
  /** 全局配置数据 */
  public get config(): Config {
    return this._config;
  }

  private constructor() {
    this._config = Config.instance;
  }
  // #endregion

  private _initApp: InitApp;

  /** 应用程序初始化 */
  public async init() {
    // 从xxyx.json初始化config
    await this._setConfigUseXxyyJson();
    this._setConfigUseUrl();
  }

  public async start() {
    // app初始化
    await this._initAppExec();
  }

  // #region Utils

  public static copyProperty(target: any, from: any, props?: string[]): void {
    if (!target || !from) {
      console.warn(target + '复制属性无效对象' + from);
      return;
    }
    if (props) {
      props.forEach((pro) => {
        target[pro] = from[pro];
      }, this);
    } else {
      Object.getOwnPropertyNames(from).forEach((key) => {
        target[key] = from[key];
      });
    }
  }
  /** 使用xxyx.json初始化config */
  private async _setConfigUseXxyyJson() {
    // 1. xxyx.json
    let path = 'xxyy.json';
    const api = new Request({
      baseUrl: '',
      baseApiParams: { secure: true }
    });
    let fetchRsp = await api.initXxyyJson();
    if (!fetchRsp.ok) {
      throw new Error('程序初始化-请求xxyy.json错误!');
    }
    const rsp = await fetchRsp.text() as any
    let json = JSON.parse(rsp);
    App.copyProperty(this._config, json);
    if (!this._config.languages || this._config.languages.length == 0) {
      throw new Error('程序初始化-xxyy.json没有配置languages!');
    }
    // 2. env => config
    var configItem = json.configs.find((item) => item.name == this._config.env);
    if (!configItem) {
      throw new Error(`程序初始化-xxyy.json中configs中不存在配置名：${this._config.env}`);
    }
    App.copyProperty(this._config, configItem);
    // 3. xxyyUrl
    let xxyyUrl = this._config.xxyyUrl;
    if (xxyyUrl && xxyyUrl[0] == '/') {
      // 线上环境
      var domain = window.location.host.split('.').slice(-2).join('.'); //含端口顶级域名
      // document.domain = domain;
      this._config.xxyyUrl = `${document.location.protocol}//api.${domain}${xxyyUrl}`;
    }
  }

  private _setConfigUseUrl() {
    let params = this._getLocalUrlParams();
    if (!params) return;
    // userId 测试用
    if (params['userId']) {
      this._config.userId = params['userId'];
    }
    // operatorId 测试用
    if (params['operatorId']) {
      // localStorage.setItem('operatorId', params['operatorId'])
	  uni.setStorageSync('operatorId', params['operatorId'])
    }
    // const localOperatorId = localStorage.getItem('operatorId')
	 const localOperatorId = uni.getStorageSync('operatorId')
    if(localOperatorId) {
      this._config.operatorId = localOperatorId
    }
  }
  private _getLocalUrlParams = () => {
    let URL = window.location.href;
    let search = URL.split('?')[1];
    const urlSearchParams: any = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  };
  /** app初始化 */
  private async _initAppExec() {
    this._initApp = new InitApp();
    await this._initApp.initLobbyApp(); // lobby
  }
  // #endregion
}
