import * as CONTS from './data-contracts'
import { ApiConfig, RequestParams } from './http-client'
// import * as xcore from '@xxyy/core'
import { CryptoUtil } from '../../core/CryptoUtil'
import { Home } from './Home'
import { InitLobby } from './InitLobby'
import { Profile } from './Profile'
import { SCommon } from './SCommon'
import { Message } from './Message'
import { Activitys } from './Activitys'
import { BindMobile } from './BindMobile'
import { InviteNewuser } from './InviteNewuser'
import { Promote } from './Promote'
import { SignIn } from './SignIn'
import { Task } from './Task'
import { Redpack } from './Redpack'
import { LoseCashBack } from './LoseCashBack'
import { RouletteNew } from './RouletteNew'
import { WeeklyCard } from "./WeeklyCard";
import { Vip } from "./Vip";
import { CouponPackage } from "./CouponPackage";

import { Bonus } from './Bonus'

var config: ApiConfig<any>
var home: Home = new Home()
var initLobby: InitLobby = new InitLobby()
var profile: Profile = new Profile()
var sCommon: SCommon = new SCommon()
var message: Message = new Message()
var activitys: Activitys = new Activitys()
var bindMobile: BindMobile = new BindMobile()
var inviteNewuser: InviteNewuser = new InviteNewuser()
var promote: Promote = new Promote()
var signIn: SignIn = new SignIn()
var task: Task = new Task()
var redpack: Redpack = new Redpack()
var loseCashBack: LoseCashBack = new LoseCashBack()
var rouletteNew: RouletteNew = new RouletteNew()
var weeklyCard: WeeklyCard = new WeeklyCard();
var vip: Vip = new Vip();
var bonus: Bonus = new Bonus();
var couponPackage: CouponPackage = new CouponPackage();

function init(
    baseUrl: string,
    baseParams: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'> = {},
    getJwtTokenFunc: () => string | null,
    uuid,
    accessKey
) {
    config = {
        baseUrl: baseUrl,
        baseApiParams: baseParams,
        securityWorker: (data: any, body: unknown) => {
            var params: RequestParams = {}
            var _token = getJwtTokenFunc()
            body = body || null
            var sign = accessKey
                ? uuid +
                '|' +
                CryptoUtil.hmacSHA256(JSON.stringify(body), accessKey)
                : null
            var _secure = (_token != null && _token != undefined) || accessKey
            if (_secure) {
                params.secure = true
                params.headers = {
                    Authorization: `Bearer ${_token}`,
                    'tinyfx-sign': sign,
                }
            }
            return params
        },
    }

    home = new Home(config)
    initLobby = new InitLobby(config)
    profile = new Profile(config)
    sCommon = new SCommon(config)
    message = new Message(config)
    activitys = new Activitys(config)
    bindMobile = new BindMobile(config)
    inviteNewuser = new InviteNewuser(config)
    promote = new Promote(config)
    signIn = new SignIn(config)
    task = new Task(config)
    redpack = new Redpack(config)
    loseCashBack = new LoseCashBack(config)
    rouletteNew = new RouletteNew(config)
    weeklyCard = new WeeklyCard(config)
    vip = new Vip(config)
    bonus = new Bonus(config)
    couponPackage = new CouponPackage(config)
}

export const api = {
    get home() {
        return home
    },
    get initLobby() {
        return initLobby
    },
    get profile() {
        return profile
    },
    get sCommon() {
        return sCommon
    },
    get message() {
        return message
    },
    get activitys() {
        return activitys
    },
    get bindMobile() {
        return bindMobile
    },
    get inviteNewuser() {
        return inviteNewuser
    },
    get promote() {
        return promote
    },
    get signIn() {
        return signIn
    },
    get task() {
        return task
    },
    get redpack() {
        return redpack
    },
    get loseCashBack() {
        return loseCashBack
    },
    get rouletteNew() {
        return rouletteNew
    },
    get weeklyCard() { return weeklyCard; },
    get vip() { return vip; },
    get bonus() { return bonus; },
    get couponPackage() { return couponPackage; },
    CONTS,
    init,
}
