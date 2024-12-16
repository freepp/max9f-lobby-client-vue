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

import { LobbyBaseIpo, ReceiveTaskRewardRequest, TaskDetailResponse, TaskTipsResponse } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Task<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Task
     * @name GetTaskList
     * @request POST:/api/Task/GetTaskList
     * @secure
     */
    getTaskList = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<TaskDetailResponse[], any>({
            path: `/api/Task/GetTaskList`,
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
     * @tags Task
     * @name GetTaskTips
     * @request POST:/api/Task/GetTaskTips
     * @secure
     */
    getTaskTips = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<TaskTipsResponse[], any>({
            path: `/api/Task/GetTaskTips`,
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
     * @tags Task
     * @name GetDrawableAmount
     * @request POST:/api/Task/GetDrawableAmount
     * @secure
     */
    getDrawableAmount = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Task/GetDrawableAmount`,
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
     * @tags Task
     * @name ReceiveReward
     * @request POST:/api/Task/ReceiveReward
     * @secure
     */
    receiveReward = (data: ReceiveTaskRewardRequest, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Task/ReceiveReward`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
}
