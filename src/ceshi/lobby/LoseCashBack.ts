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

import { LoseCashBackDto, LoseCashBackIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class LoseCashBack<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags LoseCashBack
     * @name LoseCashBackAboutCreate
     * @summary 输返活动-活动详情
     * @request POST:/api/LoseCashBack/About
     * @secure
     */
    loseCashBackAboutCreate = (data: LoseCashBackIpo, params: RequestParams = {}) =>
        this.request<LoseCashBackDto, any>({
            path: `/api/LoseCashBack/About`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
