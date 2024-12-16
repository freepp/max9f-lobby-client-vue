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

import { ClientBaseIpo, RedpackRaffleDto, TaskRecordDto, WithdrawRecordDto } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Redpack<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Redpack
     * @name PackInfo
     * @summary 红包信息
     * @request POST:/api/Redpack/PackInfo
     * @secure
     */
    packInfo = (params: RequestParams = {}) =>
        this.request<RedpackRaffleDto, any>({
            path: `/api/Redpack/PackInfo`,
            method: 'POST',
            secure: true,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Redpack
     * @name Raffle
     * @summary 开始抽奖
     * @request POST:/api/Redpack/Raffle
     * @secure
     */
    raffle = (data: ClientBaseIpo, params: RequestParams = {}) =>
        this.request<RedpackRaffleDto, any>({
            path: `/api/Redpack/Raffle`,
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
     * @tags Redpack
     * @name Withdraw
     * @summary 提现
     * @request POST:/api/Redpack/Withdraw
     * @secure
     */
    withdraw = (data: ClientBaseIpo, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Redpack/Withdraw`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
     * No description
     *
     * @tags Redpack
     * @name TaskRecord
     * @summary 抽奖任务完成记录 - 当前红包的任务完成记录
     * @request POST:/api/Redpack/TaskRecord
     * @secure
     */
    taskRecord = (params: RequestParams = {}) =>
        this.request<TaskRecordDto[], any>({
            path: `/api/Redpack/TaskRecord`,
            method: 'POST',
            secure: true,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Redpack
     * @name RedpackRecord
     * @summary 获取红包的记录
     * @request POST:/api/Redpack/RedpackRecord
     * @secure
     */
    redpackRecord = (params: RequestParams = {}) =>
        this.request<WithdrawRecordDto[], any>({
            path: `/api/Redpack/RedpackRecord`,
            method: 'POST',
            secure: true,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Redpack
     * @name DownApp
     * @summary 下载客户端
     * @request POST:/api/Redpack/DownApp
     * @secure
     */
    downApp = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Redpack/DownApp`,
            method: 'POST',
            secure: true,
            ...params,
        })
    /**
     * No description
     *
     * @tags Redpack
     * @name Share
     * @summary 分享
     * @request POST:/api/Redpack/Share
     * @secure
     */
    share = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Redpack/Share`,
            method: 'POST',
            secure: true,
            ...params,
        })
    /**
     * No description
     *
     * @tags Redpack
     * @name Test
     * @request GET:/api/Redpack/Test
     * @secure
     */
    test = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Redpack/Test`,
            method: 'GET',
            secure: true,
            ...params,
        })
}
