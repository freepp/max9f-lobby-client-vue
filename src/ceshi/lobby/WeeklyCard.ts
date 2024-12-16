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
    WeeklyCardBraPayDto,
    WeeklyCardBraPayIpo,
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
     * @name WeeklyCardLoadCreate
     * @summary 周卡加载
     * @request POST:/api/WeeklyCard/Load
     * @secure
     */
    weeklyCardLoadCreate = (data: WeeklyCardLoadIpo, params: RequestParams = {}) =>
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
     * @name WeeklyCardExecuteCreate
     * @summary 领取
     * @request POST:/api/WeeklyCard/Execute
     * @secure
     */
    weeklyCardExecuteCreate = (data: WeeklyCardExecuteIpo, params: RequestParams = {}) =>
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
     * @name WeeklyCardBraDepositCreate
     * @summary 购买周卡
     * @request POST:/api/WeeklyCard/BraDeposit
     * @secure
     */
    weeklyCardBraDepositCreate = (data: WeeklyCardBraPayIpo, params: RequestParams = {}) =>
        this.request<WeeklyCardBraPayDto, any>({
            path: `/api/WeeklyCard/BraDeposit`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
