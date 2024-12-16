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
    LobbyBaseIpo,
    ReceiveRewardCenterIpo,
    RewardCalendarDetailDto,
    RewardCalendarDto,
    RewardCalendarIpo,
    RewardGroupDto,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class RewardCenter<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags RewardCenter
     * @name RewardCenterGetRewardListCreate
     * @summary 获取奖励中心接口
     * @request POST:/api/RewardCenter/GetRewardList
     * @secure
     */
    rewardCenterGetRewardListCreate = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<RewardGroupDto[], any>({
            path: `/api/RewardCenter/GetRewardList`,
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
     * @tags RewardCenter
     * @name RewardCenterGetCalendarCreate
     * @summary 获取奖励日历接口
     * @request POST:/api/RewardCenter/GetCalendar
     * @secure
     */
    rewardCenterGetCalendarCreate = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<RewardCalendarDto, any>({
            path: `/api/RewardCenter/GetCalendar`,
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
     * @tags RewardCenter
     * @name RewardCenterReceiveCalendarRewardCreate
     * @summary 日历领奖领奖接口
     * @request POST:/api/RewardCenter/ReceiveCalendarReward
     * @secure
     */
    rewardCenterReceiveCalendarRewardCreate = (data: RewardCalendarIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/RewardCenter/ReceiveCalendarReward`,
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
     * @tags RewardCenter
     * @name RewardCenterGetCalendarDetailCreate
     * @summary 获取奖励日历明细
     * @request POST:/api/RewardCenter/GetCalendarDetail
     * @secure
     */
    rewardCenterGetCalendarDetailCreate = (data: RewardCalendarIpo, params: RequestParams = {}) =>
        this.request<RewardCalendarDetailDto, any>({
            path: `/api/RewardCenter/GetCalendarDetail`,
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
     * @tags RewardCenter
     * @name RewardCenterReceiveRewardCreate
     * @summary 领取返奖宝箱直发奖励
     * @request POST:/api/RewardCenter/ReceiveReward
     * @secure
     */
    rewardCenterReceiveRewardCreate = (data: ReceiveRewardCenterIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/RewardCenter/ReceiveReward`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
