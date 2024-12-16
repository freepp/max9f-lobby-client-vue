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
    DetailMessageRequest,
    LastMessageRequest,
    LatestMessageDto,
    LatestMessageResponse,
    LobbyBaseIpo,
    ReadMessageRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Message<
    SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Message
     * @name GetLatestMessage
     * @summary 获取最新的消息列表
     * @request POST:/api/Message/GetLatestMessage
     * @secure
     */
    getLatestMessage = (data: LastMessageRequest, params: RequestParams = {}) =>
        this.request<LatestMessageResponse, any>({
            path: `/api/Message/GetLatestMessage`,
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
     * @tags Message
     * @name ReadMessage
     * @summary 读取邮件信息
     * @request POST:/api/Message/ReadMessage
     * @secure
     */
    readMessage = (data: ReadMessageRequest, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Message/ReadMessage`,
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
     * @tags Message
     * @name TakeReward
     * @summary 领取奖励
     * @request POST:/api/Message/TakeReward
     * @secure
     */
    takeReward = (data: DetailMessageRequest, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Message/TakeReward`,
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
     * @tags Message
     * @name DeleteMessage
     * @summary 删除邮件信息
     * @request POST:/api/Message/DeleteMessage
     * @secure
     */
    deleteMessage = (data: ReadMessageRequest, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Message/DeleteMessage`,
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
     * @tags Message
     * @name DetailMessage
     * @summary 获取邮件详情
     * @request POST:/api/Message/DetailMessage
     * @secure
     */
    detailMessage = (data: DetailMessageRequest, params: RequestParams = {}) =>
        this.request<LatestMessageDto, any>({
            path: `/api/Message/DetailMessage`,
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
     * @tags Message
     * @name LatestMessageCount
     * @summary 获取最新的消息数量
     * @request POST:/api/Message/LatestMessageCount
     * @secure
     */
    latestMessageCount = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Message/LatestMessageCount`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
