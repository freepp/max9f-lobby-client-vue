import { App } from '../App';
import { Config } from '../Config';
import { Request } from './request';
import { Utils } from '../utils';
export class InitApp {
  private _config: Config;
  private _app: App;
  public constructor() {
    this._app = App.instance;
    this._config = Config.instance;
  }
  // #region uuid
  private static _uuidChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  /**
   * 生成uuid
   * @param len 长度
   * @param n 基数：2进制 8进制 10进制，16进制
   *  */
  public static uuid(len = 32, n = 16): string {
    let r;
    let i = this._uuidChars;
    let a = [];
    if (((n = n || i.length), len)) for (r = 0; len > r; r++) a[r] = i[0 | (Math.random() * n)];
    else {
      let s;
      for (a[8] = a[13] = a[18] = a[23] = '-', a[14] = '4', r = 0; 36 > r; r++)
        a[r] || ((s = 0 | (16 * Math.random())), (a[r] = i[r == 19 ? (3 & s) | 8 : s]));
    }
    return a.join('');
  }

    public async initLobbyApp() {
        let appid = this._config.appId;
        let uuid = InitApp.uuid();
        //let uuid = null;
        let timestamp = new Date().getTime()
        let key = this._getKey(uuid, appid);
        this._config.accessSecret = key;
        let aus = Utils.hmacSHA256(`${timestamp}${uuid}${appid}`, key)
        let json = {
        //let aus = null
            appId: appid,
            operatorId: this._config.operatorId,
            uuid: uuid,
            timestamp: timestamp,
            aus: aus,
        };

        json.operatorId = null;

        const api = new Request({
          baseUrl: this._config.xxyyUrl,
          baseApiParams: { secure: true }
        });
        const store = useUsersStore()
        let rsp = await api.initOperatorApp(json);
        if (rsp.error || !rsp.success) {
          store.isInitOperatorApp = false
          throw new Error('初始化异常initOperatorApp');
        }
        store.isInitOperatorApp = true
        var result = rsp.result;
        // 没有配置则使用服务端返回
        if (!this._config.appUrl) {
        this._config.appUrl = result.serverUrl;
        }
        // 没有配置则使用服务端返回
        if (!this._config.commonUrl) {
        this._config.commonUrl = result.serverUrl2 || this._config.appUrl;
        }
        // 没有配置则使用服务端返回
        if (!this._config.activityUrl) {
        this._config.activityUrl = result.serverUrl3 || this._config.appUrl;
        }
        this._config.providerId = result.providerId;
        this._config.operatorId = result.operatorId;
        this._config.operatorVersion = result.operatorVersion;
        this._config.countryId = result.countryId;
        this._config.currencyId = result.currencyId;
        this._config.uuid = uuid;
        this._config.isShowBonus = result.isShowBonus;
        this._config.accessKey = result.accessKey ? Utils.aesDecrypt(result.accessKey, key) : result.accessKey;
        this._setCurrentLangId(result.operatorLangs, null);
    }
      private _setCurrentLangId(operLangs: string[], langId: string) {
        // 如果服务端确定了范围，客户端必须保持一致
        if (operLangs && operLangs.length > 0) {
          let langs = [];
          for (const operLangId of operLangs) {
            this._config.languages.forEach((lang) => {
              if (lang.id == operLangId) {
                langs.push(lang);
              }
            });
          }
          this._config.languages = langs;
        }
        if (this._config.languages.length == 0)
          throw new Error('xxyy.json没有配置语言(config.languages)，或者运营商允许语言不为空但不匹配本地配置');
      }

      private _addKey = 'hNMmcYykGdCluYqe';
      private _keyIdxs = [7, 1, 4, 15, 5, 2, 0, 8, 13, 14, 9, 12, 11, 10, 6, 3];

      private _getKey(uuid: string, appId: string) {
        var str = `${uuid}${appId}`;
        var mod = str.length % 16;
        str += this._addKey.substring(0, 16 - mod);
        var max = str.length / 16;
        var ret = '';
        for (var i = 0; i < this._keyIdxs.length; i++) {
          var idx = (i % max) * 16;
          ret += str[idx + this._keyIdxs[i]];
        }
        return ret;
      }
    }
