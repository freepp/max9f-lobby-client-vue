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
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Activitys<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Activitys
     * @name ActivitysRegpayUserCreate
     * @summary 获取用户注册、首充活动基础数据
     * @request POST:/api/Activitys/RegpayUser
     * @secure
     */
    activitysRegpayUserCreate = (data: RegpayUserIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRegpayDetailsCreate
     * @summary 获取用户注册、首充活动奖励记录
     * @request POST:/api/Activitys/RegpayDetails
     * @secure
     */
    activitysRegpayDetailsCreate = (data: RegpayDetailsIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRegpayBonusCreate
     * @summary 注册、首充活动领取奖励
     * @request POST:/api/Activitys/RegpayBonus
     * @secure
     */
    activitysRegpayBonusCreate = (data: RegpayReceiveBonusIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRegpayGamesCreate
     * @summary 注册、首充活动推荐游戏
     * @request POST:/api/Activitys/RegpayGames
     * @secure
     */
    activitysRegpayGamesCreate = (data: RegpayGamesIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRoulettesCreate
     * @summary spin
     * @request POST:/api/Activitys/Roulettes
     * @secure
     */
    activitysRoulettesCreate = (data: RouletteIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRouletteGamesCreate
     * @summary 幸运转盘推荐游戏
     * @request POST:/api/Activitys/RouletteGames
     * @secure
     */
    activitysRouletteGamesCreate = (data: RouletteGamesIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRouletteBaseDataCreate
     * @summary 幸运转盘基础数据
     * @request POST:/api/Activitys/RouletteBaseData
     * @secure
     */
    activitysRouletteBaseDataCreate = (data: RouletteOddsBaseIpo, params: RequestParams = {}) =>
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
     * @name ActivitysRouletteMarqueeCreate
     * @summary 幸运转盘中奖播报
     * @request POST:/api/Activitys/RouletteMarquee
     * @secure
     */
    activitysRouletteMarqueeCreate = (data: RouletteMarqueeIpo, params: RequestParams = {}) =>
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
     * @name ActivitysGetRouletteUserCreate
     * @summary 获取用户活动数据
     * @request POST:/api/Activitys/GetRouletteUser
     * @secure
     */
    activitysGetRouletteUserCreate = (data: RouletteUserIpo, params: RequestParams = {}) =>
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
     * @name ActivitysGetSignlistCreate
     * @summary 获取签到列表
     * @request POST:/api/Activitys/GetSignlist
     * @secure
     */
    activitysGetSignlistCreate = (data: SigninListIpo, params: RequestParams = {}) =>
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
     * @name ActivitysSigninCreate
     * @summary 签到
     * @request POST:/api/Activitys/Signin
     * @secure
     */
    activitysSigninCreate = (data: SigninBonusIpo, params: RequestParams = {}) =>
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
     * @name ActivitysGetFlowMultipCreate
     * @summary 获取签到倍数
     * @request POST:/api/Activitys/GetFlowMultip
     * @secure
     */
    activitysGetFlowMultipCreate = (data: SigninLevelIpo, params: RequestParams = {}) =>
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
     * @name ActivitysGetSigninLevelCreate
     * @summary 获取签到等级
     * @request POST:/api/Activitys/GetSigninLevel
     * @secure
     */
    activitysGetSigninLevelCreate = (data: SigninLevelIpo, params: RequestParams = {}) =>
        this.request<SigninLevelDto[], any>({
            path: `/api/Activitys/GetSigninLevel`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
