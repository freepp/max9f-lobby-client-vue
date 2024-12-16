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
    Execute100013Dto,
    Execute100013Ipo,
    InviteConfigDto,
    InviteConfigIpo,
    InviteDetailsDto,
    InviteDetailsIpo,
    InviteUser100013LoadDto,
    InviteUser100013LoadIpo,
    InviteUser102001LoadIpo,
    InviteUser102001LoadDto,
    InviteUser102001ReciveDto,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class InviteNewuser<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags InviteNewuser
     * @name Details
     * @summary 好友邀请分享-奖励明细
     * @request POST:/api/InviteNewuser/Details
     * @secure
     */
    details = (data: InviteDetailsIpo, params: RequestParams = {}) =>
        this.request<InviteDetailsDto[], any>({
            path: `/api/InviteNewuser/Details`,
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
     * @tags InviteNewuser
     * @name About
     * @summary 好友邀请分享-活动详情
     * @request POST:/api/InviteNewuser/About
     * @secure
     */
    about = (data: InviteConfigIpo, params: RequestParams = {}) =>
        this.request<InviteConfigDto, any>({
            path: `/api/InviteNewuser/About`,
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
     * @tags InviteNewuser
     * @name Load
     * @summary 加载活动数据
     * @request POST:/api/InviteNewuser/Load
     * @secure
     */
    load = (data: InviteUser100013LoadIpo, params: RequestParams = {}) =>
        this.request<InviteUser100013LoadDto, any>({
            path: `/api/InviteNewuser/Load`,
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
     * @tags InviteNewuser
     * @name Execute
     * @summary 领取奖励
     * @request POST:/api/InviteNewuser/Execute
     * @secure
     */
    execute = (data: Execute100013Ipo, params: RequestParams = {}) =>
        this.request<Execute100013Dto, any>({
            path: `/api/InviteNewuser/Execute`,
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
     * @tags InviteNewuser
     * @name LoadData
     * @summary 加载活动数据
     * @request POST:/api/InviteNewuser/LoadData
     * @secure
     */
    loadData = (data: InviteUser102001LoadIpo, params: RequestParams = {}) =>
      this.request<InviteUser102001LoadDto, any>({
          path: `/api/InviteNewuser/LoadData`,
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
     * @tags InviteNewuser
     * @name LoadData
     * @summary 邀请好友活动领奖记录
     * @request POST:/api/InviteNewuser/GetRewardRecord
     * @secure
     */
    getRewardRecord = (data: InviteUser102001LoadIpo, params: RequestParams = {}) =>
      this.request<InviteUser102001ReciveDto, any>({
          path: `/api/InviteNewuser/GetRewardRecord`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
      })
}
