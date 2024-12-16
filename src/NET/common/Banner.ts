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

import { SCBannerDto, SCBannerIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Banner<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Banner
     * @name BannerBannerCreate
     * @summary 广告管理
     * @request POST:/api/Banner/Banner
     * @secure
     */
    bannerBannerCreate = (data: SCBannerIpo, params: RequestParams = {}) =>
        this.request<Record<string, SCBannerDto[]>, any>({
            path: `/api/Banner/Banner`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
