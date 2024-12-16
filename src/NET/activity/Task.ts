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
    LobbyBaseIpo,
    PreApkTaskRewardRequest,
    ReceiveTaskRewardRequest,
    ReceiveTaskRewardResponse,
    TaskDetailResponse,
    TaskTipsResponse,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Task<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Task
     * @name TaskGetTaskListCreate
     * @summary 获取任务列表
     * @request POST:/api/Task/GetTaskList
     * @secure
     */
    taskGetTaskListCreate = (data: LobbyBaseIpo, params: RequestParams = {}) =>
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
     * @name TaskGetTaskTipsCreate
     * @summary 获取任务Tips
     * @request POST:/api/Task/GetTaskTips
     * @secure
     */
    taskGetTaskTipsCreate = (data: LobbyBaseIpo, params: RequestParams = {}) =>
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
     * @name TaskGetDrawableAmountCreate
     * @summary 获取提取金额
     * @request POST:/api/Task/GetDrawableAmount
     * @secure
     */
    taskGetDrawableAmountCreate = (data: LobbyBaseIpo, params: RequestParams = {}) =>
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
     * @name TaskReceiveRewardCreate
     * @summary 获取奖励
     * @request POST:/api/Task/ReceiveReward
     * @secure
     */
    taskReceiveRewardCreate = (data: ReceiveTaskRewardRequest, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Task/ReceiveReward`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
     * No description
     *
     * @tags Task
     * @name TaskPreApkTaskCreate
     * @summary 下载APK任务，领取奖励前，预处理
     * @request POST:/api/Task/PreApkTask
     * @secure
     */
    taskPreApkTaskCreate = (data: PreApkTaskRewardRequest, params: RequestParams = {}) =>
        this.request<ReceiveTaskRewardResponse, any>({
            path: `/api/Task/PreApkTask`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
