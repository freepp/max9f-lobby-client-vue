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

import { CompensationDto, CompensationIpo, CompensationRecevieDto, CompensationRecevieIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Compensation<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Compensation
     * @name CompensationLoadCreate
     * @summary 获取用户包赔信息
     * @request POST:/api/Compensation/Load
     * @secure
     */
    compensationLoadCreate = (data: CompensationIpo, params: RequestParams = {}) =>
        this.request<CompensationDto, any>({
            path: `/api/Compensation/Load`,
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
     * @tags Compensation
     * @name CompensationRecevieCreate
     * @summary 领取Bonus
     * @request POST:/api/Compensation/Recevie
     * @secure
     */
    compensationRecevieCreate = (data: CompensationRecevieIpo, params: RequestParams = {}) =>
        this.request<CompensationRecevieDto, any>({
            path: `/api/Compensation/Recevie`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
