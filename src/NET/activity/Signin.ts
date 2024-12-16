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

import { SigninDto, SigninIpo, SigninLoadDto, SigninLoadIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Signin<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Signin
     * @name SigninLoadCreate
     * @request POST:/api/Signin/Load
     * @secure
     */
    signinLoadCreate = (data: SigninLoadIpo, params: RequestParams = {}) =>
        this.request<SigninLoadDto, any>({
            path: `/api/Signin/Load`,
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
     * @tags Signin
     * @name SigninExecuteCreate
     * @request POST:/api/Signin/Execute
     * @secure
     */
    signinExecuteCreate = (data: SigninIpo, params: RequestParams = {}) =>
        this.request<SigninDto, any>({
            path: `/api/Signin/Execute`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
