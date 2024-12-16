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

import { UserVipInfoDto, UserVipInfoIpo, VipConfigDto, VipConfigIpo, VipReceiveIpo, VipUserInfoIpo, VipUserInfoDto } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Vip<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Vip
     * @name VipGetVipInfoCreate
     * @summary 获取用户vip相关信息
     * @request POST:/api/Vip/GetVipInfo
     * @secure
     */
    vipGetVipInfoCreate = (data: UserVipInfoIpo, params: RequestParams = {}) =>
        this.request<UserVipInfoDto, any>({
            path: `/api/Vip/GetVipInfo`,
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
     * @tags Vip
     * @name VipGetVipConfigCreate
     * @summary 获取vip等级数据
     * @request POST:/api/Vip/GetVipConfig
     * @secure
     */
    vipGetVipConfigCreate = (data: VipConfigIpo, params: RequestParams = {}) =>
        this.request<VipConfigDto, any>({
            path: `/api/Vip/GetVipConfig`,
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
     * @tags Vip
     * @name VipReceiveCreate
     * @summary 领取vip升级奖励
     * @request POST:/api/Vip/Receive
     * @secure
     */
    vipReceiveCreate = (data: VipReceiveIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Vip/Receive`,
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
     * @tags Vip
     * @name vipGetVipUserInfo
     * @summary 获取用户vip相关信息
     * @request POST:/api/Vip/GetVipUserInfo
     * @secure
     */
    vipGetVipUserInfo = (data: VipUserInfoIpo, params: RequestParams = {}) =>
      this.request<VipUserInfoDto, any>({
          path: `/api/Vip/GetVipUserInfo`,
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
     * @tags Vip
     * @name vipReceiveCashBackDay
     * @summary 领取日返奖励
     * @request POST:/api/Vip/ReceiveCashBackDay
     * @secure
     */
    vipReceiveCashBackDay = (data: VipUserInfoIpo, params: RequestParams = {}) =>
      this.request<number, any>({
          path: `/api/Vip/ReceiveCashBackDay`,
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
     * @tags Vip
     * @name vipGetVipUserInfo
     * @summary 领取周返奖励
     * @request POST:/api/Vip/ReceiveCashBackWeek
     * @secure
     */
    vipReceiveCashBackWeek = (data: VipUserInfoIpo, params: RequestParams = {}) =>
      this.request<number, any>({
          path: `/api/Vip/ReceiveCashBackWeek`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
      })
}
