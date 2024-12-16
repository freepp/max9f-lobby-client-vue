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
    PromoteUserDto,
    PromoteVipLevelDto,
    PromoterCollectIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Promote<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Promote
     * @name PromoteVipLevelCreate
     * @request POST:/api/Promote/VipLevel
     * @secure
     */
    promoteVipLevelCreate = (params: RequestParams = {}) =>
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
     * @name PromoteUserInfoCreate
     * @request POST:/api/Promote/UserInfo
     * @secure
     */
    promoteUserInfoCreate = (params: RequestParams = {}) =>
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
     * @name PromoteInvitedUsersCreate
     * @request POST:/api/Promote/InvitedUsers
     * @secure
     */
    promoteInvitedUsersCreate = (data: InviteUserIpo, params: RequestParams = {}) =>
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
     * @name PromoteCommissionCreate
     * @request POST:/api/Promote/Commission
     * @secure
     */
    promoteCommissionCreate = (data: PromoteCommIpo, params: RequestParams = {}) =>
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
     * @name PromoteCommissionDetailCreate
     * @request POST:/api/Promote/CommissionDetail
     * @secure
     */
    promoteCommissionDetailCreate = (data: PromoteCommDetailIpo, params: RequestParams = {}) =>
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
     * @name PromotePerformanceCreate
     * @request POST:/api/Promote/Performance
     * @secure
     */
    promotePerformanceCreate = (data: PromotePerformanceIpo, params: RequestParams = {}) =>
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
     * @name PromoteCommProportionsCreate
     * @request POST:/api/Promote/CommProportions
     * @secure
     */
    promoteCommProportionsCreate = (data: PromoteCommProportionsIpo, params: RequestParams = {}) =>
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
     * @name PromoteCollectCreate
     * @request POST:/api/Promote/Collect
     * @secure
     */
    promoteCollectCreate = (data: PromoterCollectIpo, params: RequestParams = {}) =>
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
     * @name PromoteCollectRecordCreate
     * @request POST:/api/Promote/CollectRecord
     * @secure
     */
    promoteCollectRecordCreate = (data: PromoteCollectRecordIpo, params: RequestParams = {}) =>
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
