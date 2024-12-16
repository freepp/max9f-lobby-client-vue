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
    InviteUserDtoPagerList,
    InviteUserIpo,
    PromoteCollectRecordDtoPagerList,
    PromoteCollectRecordIpo,
    PromoteCommDetailDtoPagerList,
    PromoteCommDetailIpo,
    PromoteCommDtoPagerList,
    PromoteCommIpo,
    PromoteCommProportionsDto,
    PromoteCommProportionsIpo,
    PromotePerformanceDtoPagerList,
    PromotePerformanceIpo,
    PromoterCollectIpo,
    PromoteUserDto,
    PromoteVipLevelDto,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Promote<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Promote
     * @name VipLevel
     * @summary 等级列表
     * @request POST:/api/Promote/VipLevel
     * @secure
     */
    vipLevel = (params: RequestParams = {}) =>
        this.request<PromoteVipLevelDto[], any>({
            path: `/api/Promote/VipLevel`,
            method: 'POST',
            secure: true,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Promote
     * @name UserInfo
     * @summary 当前用户信息
     * @request POST:/api/Promote/UserInfo
     * @secure
     */
    userInfo = (params: RequestParams = {}) =>
        this.request<PromoteUserDto, any>({
            path: `/api/Promote/UserInfo`,
            method: 'POST',
            secure: true,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Promote
     * @name InvitedUsers
     * @summary 被邀请用户列表
     * @request POST:/api/Promote/InvitedUsers
     * @secure
     */
    invitedUsers = (data: InviteUserIpo, params: RequestParams = {}) =>
        this.request<InviteUserDtoPagerList, any>({
            path: `/api/Promote/InvitedUsers`,
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
     * @tags Promote
     * @name Commission
     * @summary 我的佣金
     * @request POST:/api/Promote/Commission
     * @secure
     */
    commission = (data: PromoteCommIpo, params: RequestParams = {}) =>
        this.request<PromoteCommDtoPagerList, any>({
            path: `/api/Promote/Commission`,
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
     * @tags Promote
     * @name CommissionDetail
     * @summary 佣金明细
     * @request POST:/api/Promote/CommissionDetail
     * @secure
     */
    commissionDetail = (data: PromoteCommDetailIpo, params: RequestParams = {}) =>
        this.request<PromoteCommDetailDtoPagerList, any>({
            path: `/api/Promote/CommissionDetail`,
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
     * @tags Promote
     * @name Performance
     * @summary 我的业绩
     * @request POST:/api/Promote/Performance
     * @secure
     */
    performance = (data: PromotePerformanceIpo, params: RequestParams = {}) =>
        this.request<PromotePerformanceDtoPagerList, any>({
            path: `/api/Promote/Performance`,
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
     * @tags Promote
     * @name CommProportions
     * @summary 返佣比例
     * @request POST:/api/Promote/CommProportions
     * @secure
     */
    commProportions = (data: PromoteCommProportionsIpo, params: RequestParams = {}) =>
        this.request<PromoteCommProportionsDto, any>({
            path: `/api/Promote/CommProportions`,
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
     * @tags Promote
     * @name Collect
     * @summary 领取接口
     * @request POST:/api/Promote/Collect
     * @secure
     */
    collect = (data: PromoterCollectIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Promote/Collect`,
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
     * @tags Promote
     * @name CollectRecord
     * @summary 领取记录
     * @request POST:/api/Promote/CollectRecord
     * @secure
     */
    collectRecord = (data: PromoteCollectRecordIpo, params: RequestParams = {}) =>
        this.request<PromoteCollectRecordDtoPagerList, any>({
            path: `/api/Promote/CollectRecord`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
