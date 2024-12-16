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

import { CuponRequestIpo, CuponResponseDto } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Cupon<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Cupon
     * @name CuponCuponValiteCreate
     * @summary 兑换验证码
     * @request POST:/api/Cupon/CuponValite
     * @secure
     */
    cuponCuponValiteCreate = (data: CuponRequestIpo, params: RequestParams = {}) =>
        this.request<CuponResponseDto, any>({
            path: `/api/Cupon/CuponValite`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
