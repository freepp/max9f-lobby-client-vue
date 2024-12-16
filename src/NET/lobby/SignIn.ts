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

import { SigninNewDto, SigninNewIpo, SigninNewListDto, SigninNewListIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class SignIn<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags SignIn
     * @name Load
     * @summary 签到列表加载
     * @request POST:/api/SignIn/Load
     * @secure
     */
    load = (data: SigninNewListIpo, params: RequestParams = {}) =>
        this.request<SigninNewListDto, any>({
            path: `/api/SignIn/Load`,
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
     * @tags SignIn
     * @name Execute
     * @summary 签到
     * @request POST:/api/SignIn/Execute
     * @secure
     */
    execute = (data: SigninNewIpo, params: RequestParams = {}) =>
        this.request<SigninNewDto, any>({
            path: `/api/SignIn/Execute`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
