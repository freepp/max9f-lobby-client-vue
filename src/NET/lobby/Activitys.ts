/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
    CategoryMoreDto,
    GetRebateListDto,
    RebateDotConfigDto,
    RebateDotConfigIpo,
    RebateDotRequet,
    RebateWaterRequest,
    RebateWaterResponse,
    RegpayDetailsDto,
    RegpayDetailsIpo,
    RegpayGamesIpo,
    RegpayReceiveBonusDto,
    RegpayReceiveBonusIpo,
    RegpayUserDto,
    RegpayUserIpo,
    RouletteDto,
    RouletteGamesDto,
    RouletteGamesIpo,
    RouletteIpo,
    RouletteMarqueeDto,
    RouletteMarqueeIpo,
    RouletteOddsBaseDto,
    RouletteOddsBaseIpo,
    RouletteUserDto,
    RouletteUserIpo,
    SigninBonusDto,
    SigninBonusIpo,
    SigninLevelDto,
    SigninLevelIpo,
    SigninListDto,
    SigninListIpo,
    TakeRebateDto,
    TakeRebateIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Activitys<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Activitys
     * @name RegpayUser
     * @summary 获取用户注册、首充活动基础数据
     * @request POST:/api/Activitys/RegpayUser
     * @secure
     */
    regpayUser = (data: RegpayUserIpo, params: RequestParams = {}) =>
        this.request<RegpayUserDto, any>({
            path: `/api/Activitys/RegpayUser`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name RegpayDetails
     * @summary 获取用户注册、首充活动奖励记录
     * @request POST:/api/Activitys/RegpayDetails
     * @secure
     */
    regpayDetails = (data: RegpayDetailsIpo, params: RequestParams = {}) =>
        this.request<RegpayDetailsDto[], any>({
            path: `/api/Activitys/RegpayDetails`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name RegpayBonus
     * @summary 注册、首充活动领取奖励
     * @request POST:/api/Activitys/RegpayBonus
     * @secure
     */
    regpayBonus = (data: RegpayReceiveBonusIpo, params: RequestParams = {}) =>
        this.request<RegpayReceiveBonusDto, any>({
            path: `/api/Activitys/RegpayBonus`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name RegpayGames
     * @summary 注册、首充活动推荐游戏
     * @request POST:/api/Activitys/RegpayGames
     * @secure
     */
    regpayGames = (data: RegpayGamesIpo, params: RequestParams = {}) =>
        this.request<CategoryMoreDto[], any>({
            path: `/api/Activitys/RegpayGames`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name Roulettes
     * @summary spin
     * @request POST:/api/Activitys/Roulettes
     * @secure
     */
    roulettes = (data: RouletteIpo, params: RequestParams = {}) =>
        this.request<RouletteDto, any>({
            path: `/api/Activitys/Roulettes`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name RouletteGames
     * @summary 幸运转盘推荐游戏
     * @request POST:/api/Activitys/RouletteGames
     * @secure
     */
    rouletteGames = (data: RouletteGamesIpo, params: RequestParams = {}) =>
        this.request<RouletteGamesDto[], any>({
            path: `/api/Activitys/RouletteGames`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name RouletteBaseData
     * @summary 幸运转盘基础数据
     * @request POST:/api/Activitys/RouletteBaseData
     * @secure
     */
    rouletteBaseData = (data: RouletteOddsBaseIpo, params: RequestParams = {}) =>
        this.request<RouletteOddsBaseDto[], any>({
            path: `/api/Activitys/RouletteBaseData`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name RouletteMarquee
     * @summary 幸运转盘中奖播报
     * @request POST:/api/Activitys/RouletteMarquee
     * @secure
     */
    rouletteMarquee = (data: RouletteMarqueeIpo, params: RequestParams = {}) =>
        this.request<RouletteMarqueeDto[], any>({
            path: `/api/Activitys/RouletteMarquee`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetRouletteUser
     * @summary 获取用户活动数据
     * @request POST:/api/Activitys/GetRouletteUser
     * @secure
     */
    getRouletteUser = (data: RouletteUserIpo, params: RequestParams = {}) =>
        this.request<RouletteUserDto, any>({
            path: `/api/Activitys/GetRouletteUser`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetSignlist
     * @summary 获取签到列表
     * @request POST:/api/Activitys/GetSignlist
     * @secure
     */
    getSignlist = (data: SigninListIpo, params: RequestParams = {}) =>
        this.request<SigninListDto, any>({
            path: `/api/Activitys/GetSignlist`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name Signin
     * @summary 签到
     * @request POST:/api/Activitys/Signin
     * @secure
     */
    signin = (data: SigninBonusIpo, params: RequestParams = {}) =>
        this.request<SigninBonusDto, any>({
            path: `/api/Activitys/Signin`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetFlowMultip
     * @summary 获取签到倍数
     * @request POST:/api/Activitys/GetFlowMultip
     * @secure
     */
    getFlowMultip = (data: SigninLevelIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Activitys/GetFlowMultip`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetSigninLevel
     * @summary 获取签到等级
     * @request POST:/api/Activitys/GetSigninLevel
     * @secure
     */
    getSigninLevel = (data: SigninLevelIpo, params: RequestParams = {}) =>
        this.request<SigninLevelDto[], any>({
            path: `/api/Activitys/GetSigninLevel`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetRebateDotList
     * @summary 获取返点列表
     * @request POST:/api/Activitys/GetRebateDotList
     * @secure
     */
    getRebateDotList = (data: RebateDotRequet, params: RequestParams = {}) =>
        this.request<GetRebateListDto, any>({
            path: `/api/Activitys/GetRebateDotList`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name TakeRebate
     * @summary 领取返点奖励
     * @request POST:/api/Activitys/TakeRebate
     * @secure
     */
    takeRebate = (data: TakeRebateIpo, params: RequestParams = {}) =>
        this.request<TakeRebateDto, any>({
            path: `/api/Activitys/TakeRebate`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetRebateWater
     * @summary 获取每日的返水
     * @request POST:/api/Activitys/GetRebateWater
     * @secure
     */
    getRebateWater = (data: RebateWaterRequest, params: RequestParams = {}) =>
        this.request<RebateWaterResponse, any>({
            path: `/api/Activitys/GetRebateWater`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Activitys
     * @name GetRebateDotConfig
     * @summary 获取返点的配置信心
     * @request POST:/api/Activitys/GetRebateDotConfig
     * @secure
     */
    getRebateDotConfig = (data: RebateDotConfigIpo, params: RequestParams = {}) =>
        this.request<RebateDotConfigDto[], any>({
            path: `/api/Activitys/GetRebateDotConfig`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
