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

import { SCNotifyDto, SCNotifyIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Notify<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Notify
     * @name NotifyNotifyCreate
     * @request POST:/api/Notify/Notify
     * @secure
     */
    notifyNotifyCreate = (data: SCNotifyIpo, params: RequestParams = {}) =>
        this.request<SCNotifyDto[], any>({
            path: `/api/Notify/Notify`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
