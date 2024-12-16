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

import { BalanceDto, LoadDto, LoadIpo, LobbyAppUrlDto, LobbyAppUrlIpo, LobbyBaseIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class InitLobby<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags InitLobby
     * @name Load
     * @summary 大厅load
     * @request POST:/api/InitLobby/Load
     * @secure
     */
    load = (data: LoadIpo, params: RequestParams = {}) =>
        this.request<LoadDto, any>({
            path: `/api/InitLobby/Load`,
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
     * @tags InitLobby
     * @name GetAppUrl
     * @summary 获取应用url
     * @request POST:/api/InitLobby/GetAppUrl
     * @secure
     */
    getAppUrl = (data: LobbyAppUrlIpo, params: RequestParams = {}) =>
        this.request<LobbyAppUrlDto, any>({
            path: `/api/InitLobby/GetAppUrl`,
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
     * @tags InitLobby
     * @name GetBalance
     * @summary 获取用户余额
     * @request POST:/api/InitLobby/GetBalance
     * @secure
     */
    getBalance = (data: LobbyBaseIpo, params: RequestParams = {}) =>
        this.request<BalanceDto, any>({
            path: `/api/InitLobby/GetBalance`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
