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
    ActivityDto,
    ActivityIpo,
    CategoryDetailDto,
    CategoryDetailIpo,
    CategoryFirstLevelGameIpo,
    CategoryListDto,
    CategoryListIpo,
    CategoryMoreDto,
    CategoryMoreIpo,
    CategoryMyGameIpo,
    FavoriteIpo,
    KeywordsDto,
    KeywordsIpo,
    PayAmountConfigDto,
    PayAmountConfigIpo,
    QueryInputIpo,
    QueryKeywordIpo,
    SyncDto,
    SyncIpo,
    VipConfigDto,
    VipConfigIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Home<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Home
     * @name CategoryList
     * @summary 取一级分类列表（不包含MyGame|for you）
     * @request POST:/api/Home/CategoryList
     * @secure
     */
    categoryList = (data: CategoryListIpo, params: RequestParams = {}) =>
        this.request<CategoryListDto[], any>({
            path: `/api/Home/CategoryList`,
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
     * @tags Home
     * @name CategoryDetail
     * @summary 获取一级分类的游戏列表
     * @request POST:/api/Home/CategoryDetail
     * @secure
     */
    categoryDetail = (data: CategoryDetailIpo, params: RequestParams = {}) =>
        this.request<CategoryDetailDto[], any>({
            path: `/api/Home/CategoryDetail`,
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
     * @tags Home
     * @name CategoryMore
     * @summary 获取二级分类的游戏列表(分页,返回count=0表示结束分页)
     * @request POST:/api/Home/CategoryMore
     * @secure
     */
    categoryMore = (data: CategoryMoreIpo, params: RequestParams = {}) =>
        this.request<CategoryMoreDto[], any>({
            path: `/api/Home/CategoryMore`,
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
     * @tags Home
     * @name FirstCategoryGames
     * @summary 获取一级分类游戏列表
     * @request POST:/api/Home/FirstCategoryGames
     * @secure
     */
    firstCategoryGames = (data: CategoryFirstLevelGameIpo, params: RequestParams = {}) =>
        this.request<CategoryMoreDto[], any>({
            path: `/api/Home/FirstCategoryGames`,
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
     * @tags Home
     * @name CategoryMyGame
     * @summary 获取一级分类中MyGame的游戏列表
     * @request POST:/api/Home/CategoryMyGame
     * @secure
     */
    categoryMyGame = (data: CategoryMyGameIpo, params: RequestParams = {}) =>
        this.request<CategoryMoreDto[], any>({
            path: `/api/Home/CategoryMyGame`,
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
     * @tags Home
     * @name Keywords
     * @summary 获取关键字列表
     * @request POST:/api/Home/Keywords
     * @secure
     */
    keywords = (data: KeywordsIpo, params: RequestParams = {}) =>
        this.request<KeywordsDto[], any>({
            path: `/api/Home/Keywords`,
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
     * @tags Home
     * @name QueryKeyword
     * @summary 查询关键字获取游戏列表
     * @request POST:/api/Home/QueryKeyword
     * @secure
     */
    queryKeyword = (data: QueryKeywordIpo, params: RequestParams = {}) =>
        this.request<CategoryMoreDto[], any>({
            path: `/api/Home/QueryKeyword`,
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
     * @tags Home
     * @name QueryInput
     * @summary 查询用户输入获取游戏类表
     * @request POST:/api/Home/QueryInput
     * @secure
     */
    queryInput = (data: QueryInputIpo, params: RequestParams = {}) =>
        this.request<CategoryMoreDto[], any>({
            path: `/api/Home/QueryInput`,
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
     * @tags Home
     * @name Favorite
     * @summary 用户收藏或取消收藏游戏
     * @request POST:/api/Home/Favorite
     * @secure
     */
    favorite = (data: FavoriteIpo, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Home/Favorite`,
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
     * @tags Home
     * @name GetActivitys
     * @summary 获取活动中心数据
     * @request POST:/api/Home/GetActivitys
     * @secure
     */
    getActivitys = (data: ActivityIpo, params: RequestParams = {}) =>
        this.request<ActivityDto[], any>({
            path: `/api/Home/GetActivitys`,
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
     * @tags Home
     * @name GetPayAmounts
     * @summary 获取当前充值渠道可用充值金额
     * @request POST:/api/Home/GetPayAmounts
     * @secure
     */
    getPayAmounts = (data: PayAmountConfigIpo, params: RequestParams = {}) =>
        this.request<PayAmountConfigDto, any>({
            path: `/api/Home/GetPayAmounts`,
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
     * @tags Home
     * @name GetPayBonus
     * @summary 获取当前充值金额需要赠送的bonus
     * @request POST:/api/Home/GetPayBonus
     * @secure
     */
    getPayBonus = (data: PayAmountConfigIpo, params: RequestParams = {}) =>
        this.request<number, any>({
            path: `/api/Home/GetPayBonus`,
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
     * @tags Home
     * @name GetVipConfig
     * @summary 获取vip等级数据
     * @request POST:/api/Home/GetVipConfig
     * @secure
     */
    getVipConfig = (data: VipConfigIpo, params: RequestParams = {}) =>
        this.request<VipConfigDto[], any>({
            path: `/api/Home/GetVipConfig`,
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
     * @tags Home
     * @name Sync
     * @summary 同步用户数据接口
     * @request POST:/api/Home/Sync
     * @secure
     */
    sync = (data: SyncIpo, params: RequestParams = {}) =>
        this.request<SyncDto, any>({
            path: `/api/Home/Sync`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
