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
    BraDepositDto,
    BraDepositIpo,
    WeeklyCardExecuteDto,
    WeeklyCardExecuteIpo,
    WeeklyCardLoadDto,
    WeeklyCardLoadIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class WeeklyCard<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags WeeklyCard
     * @name Load
     * @summary 周卡加载
     * @request POST:/api/WeeklyCard/Load
     * @secure
     */
    load = (data: WeeklyCardLoadIpo, params: RequestParams = {}) =>
        this.request<WeeklyCardLoadDto, any>({
            path: `/api/WeeklyCard/Load`,
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
     * @tags WeeklyCard
     * @name Execute
     * @summary 领取
     * @request POST:/api/WeeklyCard/Execute
     * @secure
     */
    execute = (data: WeeklyCardExecuteIpo, params: RequestParams = {}) =>
        this.request<WeeklyCardExecuteDto, any>({
            path: `/api/WeeklyCard/Execute`,
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
     * @tags WeeklyCard
     * @name BraDeposit
     * @summary 购买周卡
     * @request POST:/api/WeeklyCard/BraDeposit
     * @secure
     */
    braDeposit = (data: BraDepositIpo, params: RequestParams = {}) =>
        this.request<BraDepositDto, any>({
            path: `/api/WeeklyCard/BraDeposit`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
