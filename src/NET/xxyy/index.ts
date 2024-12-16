import * as CONTS from "./data-contracts";
import { ApiConfig, RequestParams } from "./http-client";
// import * as xcore from '@xxyy/core';

import { CryptoUtil } from '../../core/CryptoUtil'
import { Account } from "./Account";
import { OAuth } from "./OAuth";

var config: ApiConfig<any>;
var account: Account = new Account();
var oAuth: OAuth = new OAuth();

function init(baseUrl: string, baseParams: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal"> = {}, getJwtTokenFunc: () => string | null, uuid, accessKey) {
    config = {
        baseUrl: baseUrl + '/xxyy',
        baseApiParams: baseParams,
        securityWorker: (data: any, body: unknown) => {
            var params: RequestParams = {};
            var _token = getJwtTokenFunc();
            body =  body || null;
            var sign = accessKey ? uuid + '|' + CryptoUtil.hmacSHA256(JSON.stringify(body), accessKey) : null;
            var _secure = (_token != null && _token != undefined) || accessKey;
            if (_secure) {
                params.secure = true;
                params.headers = {
                    Authorization: `Bearer ${_token}`,
                    "tinyfx-sign": sign
                }
            }
            return params;
        }
    };

    account = new Account(config);
    oAuth = new OAuth(config);
}

export const api = {
    get account() { return account; },
    get oAuth() { return oAuth; },
    CONTS,
    init
};