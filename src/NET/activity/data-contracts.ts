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

export interface ClientBaseIpo {
    /** OperatorId */
    operatorId?: string | null
    /** AppId */
    appId?: string | null
    /** 国家主键 */
    countryId?: string | null
    /** 货币类型 */
    currencyId?: string | null
    /** 用户主键 */
    userId?: string | null
}

export interface CuponRequestIpo {
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
     * Desc:兑换码内容
     * Default:
     * Nullable:False
     * @minLength 1
     */
    cuponID: string
}

export interface CuponResponseDto {
    /** 用户编码 */
    userId?: string | null
    /**
     * Desc:兑换码内容
     * Default:
     * Nullable:False
     */
    cuponID?: string | null
    /**
     * Desc:0-Cash 1-Bonus
     * Default:0
     * Nullable:False
     * @format int32
     */
    isBonus?: number
    /**
     * Desc:直接发放金额
     * Default:0
     * Nullable:False
     * @format double
     */
    directAmount?: number
    /**
     * Desc:间接发放金额
     * Default:
     * Nullable:True
     * @format double
     */
    indirectAmount?: number
    /**
     * Desc:奖励中直接发放的比例
     * Default:
     * Nullable:True
     * @format double
     */
    directRate?: number | null
    /**
     * Desc:延迟发放天数
     * Default:
     * Nullable:True
     * @format int32
     */
    indirectDay?: number | null
    /**
     * Desc:奖励中直接发放的比例
     * Default:
     * Nullable:True
     * @format double
     */
    randomAmount?: number
}

export interface LobbyBaseIpo {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
}

/** 下载App返奖 */
export interface PreApkTaskRewardRequest {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    /** 记录Id */
    detailId?: string | null
    /** 设备Id */
    deviceId?: string | null
}

export interface RebateDotConfigRequest {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    /** @format int32 */
    activityId?: number
}

export interface RebateDotConfigResponse {
    /**
     * 主键
     * 【主键 int】
     * @format int32
     */
    configID?: number
    /**
     * 运营商编码
     * 【字段 varchar(50)】
     */
    operatorID?: string | null
    /**
     * 货币类型
     * 【字段 varchar(20)】
     */
    currencyID?: string | null
    /**
     * 国家编码ISO 3166-1三位字母
     * 【字段 varchar(5)】
     */
    countryID?: string | null
    /**
     * 最小打码量
     * 【字段 bigint】
     * @format int64
     */
    betMinAmount?: number
    /**
     * 最大打码量
     * 【字段 bigint】
     * @format int64
     */
    betMaxAmount?: number
    /**
     * 赠金额度
     * 【字段 bigint】
     * @format int64
     */
    rebateAmount?: number
    /**
     * 赠金提现所需要的流水倍数
     * 【字段 float(10,2)】
     * @format float
     */
    flowMultip?: number
    /**
     * 记录创建时间
     * 【字段 datetime】
     * @format date-time
     */
    recDate?: string
    /**
     * 等级
     * 【字段 int】
     * @format int32
     */
    level?: number | null
}

export interface RebateDotDto {
    /**
     * 活动奖励记录id
     * 【主键 varchar(36)】
     */
    detailID?: string | null
    /**
     * 用户编码
     * 【字段 varchar(36)】
     */
    userID?: string | null
    /**
     * 记录天
     * 【字段 date】
     * @format date-time
     */
    dayID?: string | null
    /**
     * 运营商编码
     * 【字段 varchar(50)】
     */
    operatorID?: string | null
    /**
     * 返点类型0默认值，1返点，2返水
     * 【字段 int】
     * @format int32
     */
    rebateType?: number
    /**
     * 返点金额
     * 【字段 bigint】
     * @format int64
     */
    rebateAmount?: number
    /** @format double */
    rebateAmount3?: number
    /** @format double */
    betMinAmount?: number
    /**
     * 等级
     * 【字段 int】
     * @format int32
     */
    level?: number
    /**
     * 用户领取状态，0-未领取1-已领取
     * 【字段 int】
     * @format int32
     */
    receiveStatus?: number
    /**
     * 记录时间
     * 【字段 datetime】
     * @format date-time
     */
    recDate?: string
    /**
     * 完成度
     * @format int32
     */
    percent?: number
    /**
     * 当前总下注额
     * @format double
     */
    totalBetAmount?: number
    /**
     * 当前下注额
     * @format double
     */
    currentBetAmount?: number
    /**
     * 需要完成下注额
     * @format double
     */
    needBetAmount?: number
}

export interface RebateDotRequet {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    /**
     * 获取返点日期
     * @format date-time
     */
    rebateDateUtc?: string | null
    /**
     * 频度，0:未知，1:每日，2:每周，3:每月
     * @format int32
     */
    frequency?: number
}

export interface RebateDotResponse {
    /**
     * 总的奖励数
     * @format double
     */
    totalReward?: number
    dotList?: RebateDotDto[] | null
}

export interface RebateWaterRequest {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    /**
     * 统计时间，UTC格式
     * @format date-time
     */
    rebateDateUtc?: string | null
    /**
     * 频度，0:未知，1:每日，2:每周，3:每月
     * @format int32
     */
    frequency?: number
}

export interface RebateWaterResponse {
    /** @format double */
    totalBetAmount?: number
    /** @format double */
    rebateAmount?: number
    /** @format date-time */
    rewardTime?: string
    searchKey?: string | null
}

export interface ReceiveRewardCenterIpo {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    /** 奖励ID */
    rewardId?: string | null
}

export interface ReceiveTaskRewardRequest {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    detailId?: string | null
}

export interface ReceiveTaskRewardResponse {
    success?: boolean
    /** @format int32 */
    code?: number
    message?: string | null
}

/** 红包返回对象 */
export interface RedpackRaffleDto {
    /**
     * 抽奖金额
     * @format double
     */
    amount?: number
    /**
     * 当前获奖金额
     * @format double
     */
    prizeAmount?: number
    /**
     * 奖金总额
     * @format double
     */
    packAmount?: number
    /**
     * 剩余抽奖次数
     * @format int32
     */
    remainingNum?: number
    /**
     * 红包Flag
     * @format int32
     */
    packFlag?: number
}

/** 奖励日历明细返回对象 */
export interface RewardCalendarDetailDto {
    /**
     * 今天总的可领取金额，除以10000以后的金额
     * @format double
     */
    totalRewardAmount?: number
    /** 历史日历数据 */
    lines?: RewardCalendarLineDto[] | null
}

/** 奖励日历返回对象 */
export interface RewardCalendarDto {
    /**
     * 今天+以后总的可领取金额，除以10000以后的金额
     * @format double
     */
    totalRewardAmount?: number
    /** 历史日历数据 */
    histories?: RewardCalendarItemDto[] | null
    /** 今日+以后日历数据 */
    futures?: RewardCalendarItemDto[] | null
}

/** 奖励日历请求参数 */
export interface RewardCalendarIpo {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    /** 日历ID */
    calendarId?: string | null
}

/** 奖励日历某一天项对象 */
export interface RewardCalendarItemDto {
    /** 日历ID */
    calendarId?: string | null
    /**
     * 日期
     * @format date-time
     */
    dayId?: string
    /**
     * 奖励金额，除以10000以后的金额
     * @format double
     */
    rewardAmount?: number
    /**
     * 状态，0-待领取 1-可领取 2-已领取 3-已过期(历史日历中的数据状态)
     * @format int32
     */
    status?: number
}

/** 奖励日历明细行对象 */
export interface RewardCalendarLineDto {
    /** 延迟奖金来源 */
    source?: string | null
    /**
     * 延迟奖金金额
     * @format double
     */
    rewardAmount?: number
}

/** 奖励中心分组返回对象 */
export interface RewardGroupDto {
    /** 组ID */
    groupId?: string | null
    /** 组标题 */
    groupTitle?: string | null
    /** 组内各个活动明细数据 */
    items?: RewardItemDto[] | null
}

/** 奖励中心组中某一项明细返回对象 */
export interface RewardItemDto {
    /** 奖励ID */
    rewardId?: string | null
    /** 组ID */
    groupId?: string | null
    /**
     * 频度 0-非循环类 1-每日 2-每周 3-每月
     * @format int32
     */
    frequency?: number
    /** 组标题 */
    groupTitle?: string | null
    /**
     * 活动ID
     * @format int32
     */
    itemId?: number
    /** 图标地址 */
    iconUrl?: string | null
    /** 活动标题 */
    title?: string | null
    /** 内容模板 */
    template?: string | null
    /** 提示标题 */
    tipTitle?: string | null
    /** 提示内容 */
    tipContent?: string | null
    /** 提示链接地址 */
    tipUrl?: string | null
    /**
     * 行为类型，1-API接口，2-链接地址
     * @format int32
     */
    actionType?: number
    /** 链接地址 */
    linkUrl?: string | null
    /** 领奖ID */
    detailId?: string | null
    /**
     * 当前活动状态
     * @format int32
     */
    status?: number
    /**
     * 奖励金额，除以10000后的金额
     * @format double
     */
    rewardAmount?: number
    /** 按钮名称 */
    buttonName?: string | null
}

export interface SigninDto {
    status?: boolean
    /** @format double */
    rewardAmount?: number
    statusDesc?: string | null
    serverTime?: string | null
    utcTime?: string | null
    localTime?: string | null
    signinCycleStartDate?: string | null
    signinCycleEndDate?: string | null
}

export interface SigninIpo {
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
     * @format int32
     * @min 1
     * @max 366
     */
    dateNumber?: number
}

export interface SigninLoadDto {
    isSignin?: boolean
    /** @format double */
    signinPayAmount?: number
    /** @format int32 */
    signinTimes?: number
    preSigninDate?: string | null
    isTipReset?: boolean
    missSigninDays?: string[] | null
    /** @format double */
    sumBonus?: number
    /** @format double */
    allowSumBonus?: number
    serverTime?: string | null
    utcTime?: string | null
    localTime?: string | null
    signinCycleStartDate?: string | null
    signinCycleEndDate?: string | null
    countDown?: number
    items?: UserSignDetails[] | null
}

export interface SigninLoadIpo {
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
    source?: SinginSourceEnum
}

/** @format int32 */
export enum SinginSourceEnum {
    Value0 = 0,
    Value1 = 1,
}

export interface TakeRebateRequest {
    /** 用户编码 */
    userId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 语言编码 */
    langId?: string | null
    /** 应用ID */
    appId?: string | null
    detailID?: string | null
}

/**
 * 任务类型
 * @format int32
 */
export enum TaskCategoryEnums {
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
}

export interface TaskDetailResponse {
    detailID?: string | null
    userID?: string | null
    /** @format int32 */
    itemID?: number
    /** @format double */
    rewardAmount?: number
    title?: string | null
    template?: string | null
    /** @format int32 */
    level?: number
    /** @format int32 */
    currentValue?: number
    /** @format int32 */
    actionType?: number
    actionValue?: string | null
    /** @format int32 */
    maxValue?: number
    /** @format int32 */
    sequence?: number
    /** @format int32 */
    status?: number
}

export interface TaskRecordDto {
    /** 任务类型 */
    taskCategory?: TaskCategoryEnums
    /**
     * 进度奖金
     * @format double
     */
    amount?: number
    /**
     * Bonus奖金
     * @format double
     */
    bonus?: number
    /**
     * 操作时间
     * @format date-time
     */
    recDate?: string
}

export interface TaskTipsResponse {
    /** @format int32 */
    tipsId?: number
    /** @format double */
    rewardAmount?: number
    template?: string | null
}

/** 打开宝箱请求对象 */
export interface TreasureBoxAwardRequestIpo {
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
    /** 主键 */
    id?: string | null
}

/** 打开宝箱对象 */
export interface TreasureBoxAwardResponseDto {
    /** 主键 */
    id?: string | null
    /** 宝箱名称 */
    name?: string | null
    /** 宝箱完成条件的描述 */
    remark?: string | null
    /** 图标 */
    icon?: string | null
    /**
     * 状态 0-不满足条件 1-满足条件
     * @format int32
     */
    status?: number
    /** 是否为Bonus */
    isBonus?: boolean
    /** 未完成任务跳转链接 */
    url?: string | null
    /**
     * 金额
     * @format double
     */
    amount?: number
}

/** 请求对象 */
export interface TreasureBoxRequestIpo {
    /**
     * 页码 - 初始默认1
     * @format int32
     */
    pageIndex?: number
    /**
     * 每页数量
     * @format int32
     */
    pageSize?: number
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
}

/** 宝箱对象 */
export interface TreasureBoxResponseDto {
    /** 主键 */
    id?: string | null
    /** 宝箱名称 */
    name?: string | null
    /** 宝箱备注 */
    remark?: string | null
    /** 图标 */
    icon?: string | null
    /** 奖励描述 */
    awardRemark?: string | null
    /** 是否有效宝箱 */
    isEffective?: boolean
    /**
     * 截止日期 (本地时间)
     * @format date-time
     */
    expiryDateTime?: string
}

/** 列表 */
export interface TreasureBoxResponseDtoPagerList {
    /**
     * 当前页
     * @format int32
     */
    pageIndex?: number
    /**
     * 页码
     * @format int32
     */
    pageSize?: number
    /**
     * 总数
     * @format int64
     */
    total?: number
    /**
     * 分页总数
     * @format int32
     */
    pageCount?: number
    /** 内容 */
    rows?: TreasureBoxResponseDto[] | null
}

export interface UserSignDetails {
    userId?: string | null
    isSelected?: boolean
    dayId?: string | null
    /** @format int32 */
    dateNumber?: number
    /** @format double */
    reward?: number
    /** @format int32 */
    rewardShowType?: number
    /** @format date-time */
    recDate?: string | null
    /** @format int32 */
    status?: number
    statusDesc?: string | null
}

export interface WithdrawRecordDto {
    /** 用户名 */
    userName?: string | null
    /**
     * 金额
     * @format double
     */
    amount?: number
    /**
     * 完成时间
     * @format date-time
     */
    recDate?: string
}
