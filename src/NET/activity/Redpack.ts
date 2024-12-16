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
     * @name RedpackPackInfoCreate
     * @summary 红包信息
     * @request POST:/api/Redpack/PackInfo
     * @secure
     */
    redpackPackInfoCreate = (params: RequestParams = {}) =>
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
     * @name RedpackRaffleCreate
     * @summary 开始抽奖
     * @request POST:/api/Redpack/Raffle
     * @secure
     */
    redpackRaffleCreate = (data: ClientBaseIpo, params: RequestParams = {}) =>
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
     * @name RedpackWithdrawCreate
     * @summary 提现
     * @request POST:/api/Redpack/Withdraw
     * @secure
     */
    redpackWithdrawCreate = (data: ClientBaseIpo, params: RequestParams = {}) =>
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
     * @name RedpackTaskRecordCreate
     * @summary 抽奖任务完成记录 - 当前红包的任务完成记录
     * @request POST:/api/Redpack/TaskRecord
     * @secure
     */
    redpackTaskRecordCreate = (params: RequestParams = {}) =>
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
     * @name RedpackRedpackRecordCreate
     * @summary 获取红包的记录
     * @request POST:/api/Redpack/RedpackRecord
     * @secure
     */
    redpackRedpackRecordCreate = (params: RequestParams = {}) =>
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
     * @name RedpackDownAppCreate
     * @summary 下载客户端
     * @request POST:/api/Redpack/DownApp
     * @secure
     */
    redpackDownAppCreate = (params: RequestParams = {}) =>
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
     * @name RedpackShareCreate
     * @summary 分享
     * @request POST:/api/Redpack/Share
     * @secure
     */
    redpackShareCreate = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Redpack/Share`,
            method: 'POST',
            secure: true,
            ...params,
        })
}
