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
  BraDepositDto,
  BraDepositIpo,
  CouponPackageLoadIpo,
  CouponPackageLoadDto,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class CouponPackage<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags CouponPackage
   * @name CouponPackageBraDeposit
   * @summary 购买优惠礼包
   * @request POST:/api/CouponPackage/BraDeposit
   * @secure
   */
  couponPackageBraDeposit = (data: BraDepositIpo, params: RequestParams = {}) =>
      this.request<BraDepositDto, any>({
          path: `/api/CouponPackage/BraDeposit`,
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
   * @tags CouponPackage
   * @name CouponPackageLoad
   * @summary 礼包加载
   * @request POST:/api/CouponPackage/Load
   * @secure
   */
  couponPackageLoad = (data: CouponPackageLoadIpo, params: RequestParams = {}) =>
    this.request<CouponPackageLoadDto, any>({
        path: `/api/CouponPackage/Load`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
    })
}
