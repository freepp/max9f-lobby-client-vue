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
    TreasureBoxAwardRequestIpo,
    TreasureBoxAwardResponseDto,
    TreasureBoxRequestIpo,
    TreasureBoxResponseDtoPagerList,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class TreasureBox<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags TreasureBox
     * @name TreasureBoxListCreate
     * @summary 获取宝箱列表
     * @request POST:/api/TreasureBox/List
     * @secure
     */
    treasureBoxListCreate = (data: TreasureBoxRequestIpo, params: RequestParams = {}) =>
        this.request<TreasureBoxResponseDtoPagerList, any>({
            path: `/api/TreasureBox/List`,
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
     * @tags TreasureBox
     * @name TreasureBoxOpenCreate
     * @summary 打开宝箱
     * @request POST:/api/TreasureBox/Open
     * @secure
     */
    treasureBoxOpenCreate = (data: TreasureBoxAwardRequestIpo, params: RequestParams = {}) =>
        this.request<TreasureBoxAwardResponseDto, any>({
            path: `/api/TreasureBox/Open`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
