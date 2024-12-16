export class LanguageItem {
  /** 语言编码ISO 639-1 小写 */
  public id: string;
  /** 描述 */
  public title: string;
}
/** 全局app配置 */
export class Config {
  //#region instance

  private static _instance: Config;
  public static get instance(): Config {
    if (!this._instance) {
      this._instance = new Config();
    }
    return this._instance;
  }
  private constructor() {}

  //#endregion

  //#region 基础配置

  /** 应用程序ID */
  public appId: string;
  /** 应用类型：1-大厅 2-游戏 */
  public appType: number = 2;
  /** 应用状态0-正常1-维护 */
  public appStatus: number = 0;
  /** 系统维护时间文本，如：2020-01-01 10:00:00 - 2020-01-01 12:00:00 */
  public appMaintText: string;
  /** 应用连接方式: 1-api+ticket 2-ws */
  public appLink: number = 1;
  /** 版本 */
  public version: string;
  /** app支持的语言（默认放第一个） */
  public languages: LanguageItem[] = null;
  /** 环境变量，获取configs中的子配置项 */
  public env: string = 'dev';
  /** 配置是否显示bonus */
  public isShowBonus: boolean;
  /** 用户信息 */
  public userInfo: any;

  //#endregion

  /** 平台api地址，如未设置，跳过初始化过程 */
  public xxyyUrl: string;
  public xxyyTimeout: number = 5000;
  /** 图片基础url */
  public imgBaseUrl: string;
  /** 应用服务地址，初始化后返回，本地优先 */
  public appUrl: string;
  /** 用户ID，登陆后设置，本地优先 */
  public userId: string;

  public providerId: string;
  /** 运营商ID（初始化返回，仅大厅设置，本地优先） */
  public operatorId: string = null;
  /** 运营商版本 */
  public operatorVersion: number;
  public countryId: string;
  public currencyId: string;
  public uuid: string;
  public accessKey: string;
  public accessSecret: string;

  public fromId: string; // 平台用，用户来源编码
  public lobbyUrl: string; //游戏用，大厅url，登录返回，本地优先
  public depositUrl: string; //游戏用，充值url，登录返回，本地优先
  public depositFunc: string;
  
  public commonUrl: string;
  public activityUrl: string;

  //#endregion
}
