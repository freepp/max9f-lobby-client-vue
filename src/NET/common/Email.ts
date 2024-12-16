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
    BaseIpo,
    DetailMessageRequest,
    LatestMessageDto,
    LatestMessageRequest,
    LatestMessageResponse,
    ReadMessageRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Email<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Email
     * @name EmailGetLatestMessageCreate
     * @summary 获取最新的消息列表
     * @request POST:/api/Email/GetLatestMessage
     * @secure
     */
    emailGetLatestMessageCreate = (data: LatestMessageRequest, params: RequestParams = {}) =>
        this.request<LatestMessageResponse, any>({
            path: `/api/Email/GetLatestMessage`,
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
     * @tags Email
     * @name EmailReadMessageCreate
     * @summary 读取邮件信息
     * @request POST:/api/Email/ReadMessage
     * @secure
     */
    emailReadMessageCreate = (data: ReadMessageRequest, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Email/ReadMessage`,
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
     * @tags Email
     * @name EmailTakeRewardCreate
     * @summary 领取奖励
     * @request POST:/api/Email/TakeReward
     * @secure
     */
    emailTakeRewardCreate = (data: DetailMessageRequest, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Email/TakeReward`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
     * No description
     *
     * @tags Email
     * @name EmailDeleteMessageCreate
     * @summary 删除邮件信息
     * @request POST:/api/Email/DeleteMessage
     * @secure
     */
    emailDeleteMessageCreate = (data: ReadMessageRequest, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Email/DeleteMessage`,
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
     * @tags Email
     * @name EmailDetailMessageCreate
     * @summary 获取邮件详情
     * @request POST:/api/Email/DetailMessage
     * @secure
     */
    emailDetailMessageCreate = (data: DetailMessageRequest, params: RequestParams = {}) =>
        this.request<LatestMessageDto, any>({
            path: `/api/Email/DetailMessage`,
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
     * @tags Email
     * @name EmailLatestMessageCountCreate
     * @summary 获取最新的消息数量
     * @request POST:/api/Email/LatestMessageCount
     * @secure
     */
    emailLatestMessageCountCreate = (data: BaseIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Email/LatestMessageCount`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
