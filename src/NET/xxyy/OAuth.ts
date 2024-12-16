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

import { AuthUrlIpo, LoginDto, OAuthLoginIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class OAuth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags OAuth
     * @name OAuthUrl
     * @summary 获取第三方app授权登录url
     * @request POST:/api/OAuth/OAuthUrl
     * @secure
     */
    oAuthUrl = (data: AuthUrlIpo, params: RequestParams = {}) =>
        this.request<string, any>({
            path: `/api/OAuth/OAuthUrl`,
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
     * @tags OAuth
     * @name OAuthLogin
     * @summary 跳转三方返回页面执行此方法获取三方用户信息并且注册登录
     * @request POST:/api/OAuth/OAuthLogin
     * @secure
     */
    oAuthLogin = (data: OAuthLoginIpo, params: RequestParams = {}) =>
        this.request<LoginDto, any>({
            path: `/api/OAuth/OAuthLogin`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
