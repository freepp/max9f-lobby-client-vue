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

import { Roulette101001LoadDto, Roulette101001LoadIpo, RouletteRaffleDto, RouletteRaffleIpo } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class RouletteNew<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags RouletteNew
     * @name Load
     * @summary 加载轮盘
     * @request POST:/api/RouletteNew/Load
     * @secure
     */
    load = (data: Roulette101001LoadIpo, params: RequestParams = {}) =>
        this.request<Roulette101001LoadDto, any>({
            path: `/api/RouletteNew/Load`,
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
     * @tags RouletteNew
     * @name Raffle
     * @summary 抽奖
     * @request POST:/api/RouletteNew/Raffle
     * @secure
     */
    raffle = (data: RouletteRaffleIpo, params: RequestParams = {}) =>
        this.request<RouletteRaffleDto, any>({
            path: `/api/RouletteNew/Raffle`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
