import * as CONTS from "./data-contracts";
import { ApiConfig, RequestParams } from "./http-client";
// import * as xcore from '@xxyy/core';

import { CryptoUtil } from '../../core/CryptoUtil'
import { Banner } from "./Banner";
import { Email } from "./Email";
import { Marquee } from "./Marquee";
import { Notify } from "./Notify";
import { Promote } from "./Promote";


var config: ApiConfig<any>;
var banner: Banner = new Banner();
var email: Email = new Email();
var marquee: Marquee = new Marquee();
var notify: Notify = new Notify();
var promote: Promote = new Promote();

function init(baseUrl: string, baseParams: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal"> = {}, getJwtTokenFunc: () => string | null, uuid, accessKey) {
    config = {
        baseUrl,
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

    banner = new Banner(config);
    email = new Email(config);
    marquee = new Marquee(config);
    notify  = new Notify(config);
    promote = new Promote(config);
}

export const api = {
    get banner() { return banner; },
    get email() { return email; },
    get marquee() { return marquee; },
    get notify() { return notify; },
    get promote() { return promote; },
    CONTS,
    init
};