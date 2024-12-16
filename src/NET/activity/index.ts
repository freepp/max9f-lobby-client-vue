import * as CONTS from "./data-contracts";
import { ApiConfig, RequestParams } from "./http-client";
// import * as xcore from '@xxyy/core';
import { CryptoUtil } from '../../core/CryptoUtil'
import { Cupon } from "./Cupon";
import { Rebate } from "./Rebate";
import { Redpack } from "./Redpack";
import { RewardCenter } from "./RewardCenter";
import { Signin } from "./Signin";
import { Task } from "./Task";
import { TreasureBox } from "./TreasureBox";


var config: ApiConfig<any>;
var cupon: Cupon = new Cupon();
var rebate: Rebate = new Rebate();
var redpack: Redpack = new Redpack();
var rewardCenter: RewardCenter = new RewardCenter();
var signin: Signin = new Signin();
var task: Task = new Task();
var treasureBox: TreasureBox = new TreasureBox();

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

    cupon = new Cupon(config);
    rebate = new Rebate(config);
    redpack = new Redpack(config);
    rewardCenter  = new RewardCenter(config);
    signin = new Signin(config);
    task = new Task(config);
    treasureBox = new TreasureBox(config);
}

export const api = {
    get cupon() { return cupon; },
    get rebate() { return rebate; },
    get redpack() { return redpack; },
    get rewardCenter() { return rewardCenter; },
    get signin() { return signin; },
    get task() { return task; },
    get treasureBox() { return treasureBox; },
    CONTS,
    init
};