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
     * @name InviteNewuserDetailsCreate
     * @summary 好友邀请分享-奖励明细
     * @request POST:/api/InviteNewuser/Details
     * @secure
     */
    inviteNewuserDetailsCreate = (data: InviteDetailsIpo, params: RequestParams = {}) =>
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
     * @name InviteNewuserAboutCreate
     * @summary 好友邀请分享-活动详情
     * @request POST:/api/InviteNewuser/About
     * @secure
     */
    inviteNewuserAboutCreate = (data: InviteConfigIpo, params: RequestParams = {}) =>
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
     * @name InviteNewuserLoadCreate
     * @summary 加载活动数据
     * @request POST:/api/InviteNewuser/Load
     * @secure
     */
    inviteNewuserLoadCreate = (data: InviteUser100013LoadIpo, params: RequestParams = {}) =>
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
     * @name InviteNewuserExecuteCreate
     * @summary 领取奖励
     * @request POST:/api/InviteNewuser/Execute
     * @secure
     */
    inviteNewuserExecuteCreate = (data: Execute100013Ipo, params: RequestParams = {}) =>
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
     * @name InviteNewuserLoadDataCreate
     * @summary 加载活动数据
     * @request POST:/api/InviteNewuser/LoadData
     * @secure
     */
    inviteNewuserLoadDataCreate = (data: InviteUser102001LoadIpo, params: RequestParams = {}) =>
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
     * @name InviteNewuserGetRewardRecordCreate
     * @summary 加载活动数据
     * @request POST:/api/InviteNewuser/GetRewardRecord
     * @secure
     */
    inviteNewuserGetRewardRecordCreate = (data: InviteUser102001LoadIpo, params: RequestParams = {}) =>
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
