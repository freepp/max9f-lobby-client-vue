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

/**
 * sc_banner.position
 * @format int32
 */
export enum BannerPositionEnum {
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
    Value6 = 6,
    Value7 = 7,
    Value8 = 8,
    Value9 = 9,
}

/**
 * sc_banner.BannerType
 * @format int32
 */
export enum BannerTypeEnum {
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
}

export interface BaseIpo {
    /** @minLength 1 */
    userId: string
    /** @minLength 1 */
    operatorId: string
    /** @minLength 1 */
    countryId: string
    /** @minLength 1 */
    currencyId: string
    /** @minLength 1 */
    langId: string
    /** @minLength 1 */
    appId: string
}

export interface DetailMessageRequest {
    /** @minLength 1 */
    userId: string
    /** @minLength 1 */
    operatorId: string
    /** @minLength 1 */
    countryId: string
    /** @minLength 1 */
    currencyId: string
    /** @minLength 1 */
    langId: string
    /** @minLength 1 */
    appId: string
    messageId?: string | null
}

export interface InviteUserDto {
    userId?: string | null
    userName?: string | null
    mobile?: string | null
    /** @format date-time */
    promoteTime?: string
}

export interface InviteUserDtoPagerList {
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
    /** @format int64 */
    total?: number
    /** @format int32 */
    pageCount?: number
    rows?: InviteUserDto[] | null
}

export interface InviteUserIpo {
    /** @format date-time */
    startTime?: string | null
    /** @format date-time */
    endTime?: string | null
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
}

export interface LatestMessageDto {
    messageId?: string | null
    senderId?: string | null
    /** @format int32 */
    displayTag?: number
    templateID?: string | null
    title?: string | null
    content?: string | null
    /** @format int32 */
    status?: number
    recDate?: string | null
    /** @format int32 */
    amountType?: number
    /** @format double */
    rewardAmount?: number
    sourceId?: string | null
    /** @format int32 */
    receiveStatus?: number
}

export interface LatestMessageRequest {
    /** @minLength 1 */
    userId: string
    /** @minLength 1 */
    operatorId: string
    /** @minLength 1 */
    countryId: string
    /** @minLength 1 */
    currencyId: string
    /** @minLength 1 */
    langId: string
    /** @minLength 1 */
    appId: string
    /**
     * 页码，默认20
     * @format int32
     */
    pageSize?: number
    /**
     * 分页，第一页以1开始
     * @format int32
     */
    pageIndex?: number
    /**
     * 邮件类型0系统消息1最新动态2奖励邮件3私信
     * @format int32
     */
    type?: number
}

export interface LatestMessageResponse {
    maps?: ReadingTagMapDto[] | null
    messages?: LatestMessageDto[] | null
}

export interface PromoteCollectRecordDto {
    /** @format double */
    collectedComm?: number
    /** @format int32 */
    contributionNum?: number
    /** @format date-time */
    recDate?: string
}

export interface PromoteCollectRecordDtoPagerList {
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
    /** @format int64 */
    total?: number
    /** @format int32 */
    pageCount?: number
    rows?: PromoteCollectRecordDto[] | null
}

export interface PromoteCollectRecordIpo {
    /** @format date-time */
    startTime?: string | null
    /** @format date-time */
    endTime?: string | null
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
}

export interface PromoteCommDetailDto {
    userName?: string | null
    mobile?: string | null
    /** @format int32 */
    promoterType?: number
    /** @format double */
    perf?: number
    /** @format double */
    comm?: number
}

export interface PromoteCommDetailDtoPagerList {
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
    /** @format int64 */
    total?: number
    /** @format int32 */
    pageCount?: number
    rows?: PromoteCommDetailDto[] | null
}

export interface PromoteCommDetailIpo {
    /** @format date-time */
    startTime?: string | null
    /** @format date-time */
    endTime?: string | null
    /** @format int32 */
    promoterType?: number | null
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
}

export interface PromoteCommDto {
    /** @format date-time */
    dayID?: string
    userID?: string | null
    /** @format int32 */
    promoterType?: number
    /** @format double */
    perf?: number
    /** @format int32 */
    contributors?: number
    /** @format double */
    comm?: number
}

export interface PromoteCommDtoPagerList {
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
    /** @format int64 */
    total?: number
    /** @format int32 */
    pageCount?: number
    rows?: PromoteCommDto[] | null
}

export interface PromoteCommIpo {
    /** @format date-time */
    startTime?: string | null
    /** @format date-time */
    endTime?: string | null
    /** @format int32 */
    promoterType?: number | null
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
}

export interface PromoteCommProportionsDto {
    config?: PromoteConfigDto
    commProportions?: PromoteCommProportionsIpoDto[] | null
}

export interface PromoteCommProportionsIpo {
    /** @format int32 */
    promoterType?: number
}

export interface PromoteCommProportionsIpoDto {
    operatorID?: string | null
    /** @format int32 */
    commLevel?: number
    /** @format double */
    betAmount?: number
    /** @format double */
    comm?: number
}

export interface PromoteConfigDto {
    hasBonusPerf?: boolean
    /** @format double */
    commMinDeposit?: number
    /** @format double */
    commMinPerf?: number
}

export interface PromotePerformanceDto {
    userID?: string | null
    /** @format date-time */
    promoteTime?: string
    directUserName?: string | null
    mobile?: string | null
    /** @format int32 */
    directNum?: number
    /** @format double */
    perf?: number
    /** @format double */
    contributionComm?: number
}

export interface PromotePerformanceDtoPagerList {
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
    /** @format int64 */
    total?: number
    /** @format int32 */
    pageCount?: number
    rows?: PromotePerformanceDto[] | null
}

export interface PromotePerformanceIpo {
    /** @format date-time */
    startTime?: string | null
    /** @format date-time */
    endTime?: string | null
    account?: string | null
    /** @format int32 */
    pageIndex?: number
    /** @format int32 */
    pageSize?: number
}

export interface PromoteUserDto {
    pUrl?: string | null
    directSuperior?: string | null
    mobile?: string | null
    /** @format int32 */
    pLevel?: number
    /** @format double */
    totalComm?: number
    /** @format double */
    totalCollectComm?: number
    /** @format double */
    currentComm?: number
    /** @format double */
    lastComm?: number
    /** @format int32 */
    teamNum?: number
    /** @format int32 */
    directNum?: number
    /** @format int32 */
    otherNum?: number
    /** @format double */
    totalPerf?: number
    /** @format double */
    directPerf?: number
    /** @format double */
    otherPerf?: number
}

export interface PromoteVipLevelDto {
    operatorID?: string | null
    /** @format int32 */
    pLevel?: number
    /** @format double */
    needPerf?: number
}

export interface PromoterCollectIpo {
    appId?: string | null
}

export interface ReadMessageRequest {
    /** @minLength 1 */
    userId: string
    /** @minLength 1 */
    operatorId: string
    /** @minLength 1 */
    countryId: string
    /** @minLength 1 */
    currencyId: string
    /** @minLength 1 */
    langId: string
    /** @minLength 1 */
    appId: string
    ids?: string[] | null
}

export interface ReadingTagMapDto {
    /** @format int32 */
    displayTag?: number
    /** @format int32 */
    count?: number
}

export interface SCBannerDto {
    /** Banner编码 */
    bannerID?: string | null
    /** 标题 */
    title?: string | null
    /** 提示信息 */
    tip?: string | null
    /** 内容 */
    content?: string | null
    /** 图片链接 */
    imageUrl?: string | null
    /**
     * 链接类型
     * 1-相对地址
     * 2-绝对地址
     * 3-游戏地址
     * @format int32
     */
    linkType?: number
    /** 链接地址 */
    linkUrl?: string | null
    /** 链接参数（json串，暂无示例） */
    linkParams?: string | null
    /** 链接文字 */
    linkContent?: string | null
    /**
     * 位置
     * @format int32
     */
    position?: number
    /** 语言编码 */
    langID?: string | null
    /**
     * 10000X活动；50000XVIP
     * @format int32
     */
    code?: number
    /**
     * (目前只针对position=7生效)
     * 0-不参与规则
     * 1-每天首次显示
     * 2-每天非首次显示
     * @format int32
     */
    showDay?: number
    /**
     * banner显示间隔
     * @format int32
     */
    showInterval?: number
}

export interface SCBannerIpo {
    /**
     * 用户编码
     * @minLength 1
     */
    userId: string
    /**
     * 运营商编码
     * @minLength 1
     */
    operatorId: string
    /**
     * 国家编码
     * @minLength 1
     */
    countryId: string
    /**
     * 货币编码
     * @minLength 1
     */
    currencyId: string
    /**
     * 语言编码
     * @minLength 1
     */
    langId: string
    /**
     * 应用ID
     * @minLength 1
     */
    appId: string
    /** 位置 */
    position?: BannerPositionEnum[] | null
    /** sc_banner.BannerType */
    bannerType?: BannerTypeEnum
}

export interface SCMarqueeDto {
    messageContent?: string | null
    appId?: string | null
    appName?: string | null
    appIcon?: string | null
    isSupportBonus?: boolean
    /** @format double */
    winAmount?: number
    userNameOrMobile?: string | null
}

export interface SCMarqueeIpo {
    /**
     * 用户编码
     * @minLength 1
     */
    userId: string
    /**
     * 运营商编码
     * @minLength 1
     */
    operatorId: string
    /**
     * 国家编码
     * @minLength 1
     */
    countryId: string
    /**
     * 货币编码
     * @minLength 1
     */
    currencyId: string
    /**
     * 语言编码
     * @minLength 1
     */
    langId: string
    /**
     * 应用ID
     * @minLength 1
     */
    appId: string
    /**
     * 位置
     * @format int32
     */
    position?: number
    /**
     * 轮播类型，0:文字，1:图片
     * @format int32
     */
    marqueeType?: number
}

export interface SCNotifyDto {
    notifyId?: string | null
    /** @format int32 */
    position?: number
    /** @format int32 */
    closeInterval?: number
    /** @format int32 */
    linkKind?: number
    linkUrl?: string | null
    title?: string | null
    content?: string | null
    imageUrl?: string | null
    txts?: string[] | null
    imgs?: string[] | null
    /** @format int32 */
    notifyUsersCount?: number
    /** @format int32 */
    notifyedUsersCount?: number
    isUpdateCache?: boolean
}

export interface SCNotifyIpo {
    /** @minLength 1 */
    userId: string
    /** @minLength 1 */
    operatorId: string
    /** @minLength 1 */
    countryId: string
    /** @minLength 1 */
    currencyId: string
    /** @minLength 1 */
    langId: string
    /** @minLength 1 */
    appId: string
    /** @format int32 */
    actionAt?: number
    /** @format int32 */
    showAt?: number
}
