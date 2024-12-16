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

import {
    RebateDotConfigRequest,
    RebateDotConfigResponse,
    RebateDotRequet,
    RebateDotResponse,
    RebateWaterRequest,
    RebateWaterResponse,
    TakeRebateRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Rebate<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Rebate
     * @name RebateGetRebateDotListCreate
     * @summary 获取返点列表
     * @request POST:/api/Rebate/GetRebateDotList
     * @secure
     */
    rebateGetRebateDotListCreate = (data: RebateDotRequet, params: RequestParams = {}) =>
        this.request<RebateDotResponse, any>({
            path: `/api/Rebate/GetRebateDotList`,
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
     * @tags Rebate
     * @name RebateTakeRebateCreate
     * @summary 领取返点奖励
     * @request POST:/api/Rebate/TakeRebate
     * @secure
     */
    rebateTakeRebateCreate = (data: TakeRebateRequest, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Rebate/TakeRebate`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
     * No description
     *
     * @tags Rebate
     * @name RebateGetRebateWaterCreate
     * @summary 获取每日的返水
     * @request POST:/api/Rebate/GetRebateWater
     * @secure
     */
    rebateGetRebateWaterCreate = (data: RebateWaterRequest, params: RequestParams = {}) =>
        this.request<RebateWaterResponse, any>({
            path: `/api/Rebate/GetRebateWater`,
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
     * @tags Rebate
     * @name RebateGetRebateDotConfigCreate
     * @summary 获取返点的配置信心
     * @request POST:/api/Rebate/GetRebateDotConfig
     * @secure
     */
    rebateGetRebateDotConfigCreate = (data: RebateDotConfigRequest, params: RequestParams = {}) =>
        this.request<RebateDotConfigResponse[], any>({
            path: `/api/Rebate/GetRebateDotConfig`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
