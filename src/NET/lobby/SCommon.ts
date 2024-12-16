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

import { SCBannerDto, SCBannerIpo, SCMarqueeDto, SCMarqueeIpo, SCNotifyDto, SCNotifyIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class SCommon<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags SCommon
     * @name Banner
     * @summary Banner
     * @request POST:/api/SCommon/Banner
     * @secure
     */
    banner = (data: SCBannerIpo, params: RequestParams = {}) =>
        this.request<Record<string, SCBannerDto[]>, any>({
            path: `/api/SCommon/Banner`,
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
     * @tags SCommon
     * @name Marquee
     * @summary Marquee
     * @request POST:/api/SCommon/Marquee
     * @secure
     */
    marquee = (data: SCMarqueeIpo, params: RequestParams = {}) =>
        this.request<SCMarqueeDto[], any>({
            path: `/api/SCommon/Marquee`,
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
     * @tags SCommon
     * @name Notify
     * @summary Notify
     * @request POST:/api/SCommon/Notify
     * @secure
     */
    notify = (data: SCNotifyIpo, params: RequestParams = {}) =>
        this.request<SCNotifyDto[], any>({
            path: `/api/SCommon/Notify`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
