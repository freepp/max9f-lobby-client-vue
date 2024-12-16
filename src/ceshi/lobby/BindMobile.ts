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

import { BindMobileDto, BindMobileIpo, LobbyBaseIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class BindMobile<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags BindMobile
     * @name BindMobileBindCreate
     * @summary 绑定手机领取奖励
     * @request POST:/api/BindMobile/Bind
     * @secure
     */
    bindMobileBindCreate = (data: BindMobileIpo, params: RequestParams = {}) =>
        this.request<BindMobileDto, any>({
            path: `/api/BindMobile/Bind`,
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
     * @tags BindMobile
     * @name BindMobileTestActivityEngineCreate
     * @summary 测试大厅首页小助手
     * @request POST:/api/BindMobile/TestActivityEngine
     * @secure
     */
    bindMobileTestActivityEngineCreate = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<string, any>({
            path: `/api/BindMobile/TestActivityEngine`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
