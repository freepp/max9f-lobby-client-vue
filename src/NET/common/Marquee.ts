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

import { SCMarqueeDto, SCMarqueeIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Marquee<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Marquee
     * @name MarqueeMarqueeCreate
     * @summary Marquee
     * @request POST:/api/Marquee/Marquee
     * @secure
     */
    marqueeMarqueeCreate = (data: SCMarqueeIpo, params: RequestParams = {}) =>
        this.request<SCMarqueeDto[], any>({
            path: `/api/Marquee/Marquee`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
