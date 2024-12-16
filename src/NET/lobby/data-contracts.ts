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

export interface ActivityDto {
    /** 活动编码GUID */
    activityID?: string | null
    /**
     * 活动类型
     * @format int32
     */
    kind?: number
    /** 标题 */
    title?: string | null
    /** 活动图片集合 */
    imgs?: string[] | null
    /**
     * 类型:0-位置1-图片2-html3-文字
     * @format int32
     */
    mode?: number
    /** 内容 */
    content?: string | null
    /** 链接地址 */
    linkUrl?: string | null
    /** 活动是否有效 */
    isValid?: boolean
    /** 活动背景图 */
    img1?: string | null
    /** 活动logo */
    img2?: string | null
    /** 左侧图标 */
    img3?: string | null
    /** 右侧图标 */
    img4?: string | null
}

export interface ActivityIpo {
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
     * 当前页码
     * 默认1
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * 默认5
     * @format int32
     * @min 1
     * @max 5
     */
    pageSize?: number
}

/** 添加银行卡ipo */
export interface AddBankInfoIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /** 用户银行卡id */
    userBankID?: string | null
    /**
     * 银行编码（目前只有Spei在用）
     * @minLength 1
     */
    bankCode: string
    /**
     * 银行名称
     * @minLength 1
     */
    bankName: string
    /**
     * 用户名
     * @minLength 1
     */
    userName: string
    /** FirstName */
    firstName?: string | null
    /** LastName */
    lastName?: string | null
    /**
     * 银行卡号
     * @minLength 1
     * @pattern ^\d{16,18}$
     */
    cardNo: string
    /**
     * 过期日期
     * @pattern ^((0([1-9]))|(1(0|1|2)))(-|/)\d{4}$
     */
    expiryDate?: string | null
    /** CVV */
    cvv?: string | null
    /**
     * 添加银行卡类型
     * 1、普通添加
     * 2、充值时添加
     * @format int32
     */
    addBankType?: number
}

export interface AddBraBank {
    /** CNPJ、PHONE、EMAIL、EVP是否锁定 */
    isLockMethod?: boolean
}

export interface AmountLimit {
    /** @format double */
    minAmount?: number
    /** @format double */
    maxAmount?: number
}

/** 巴西添加银行卡ipo */
export interface BRAAddBankIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 支付渠道编码4、pandapay;5、tejeepay
     * @format int32
     */
    channels?: number
    /** 税号对应的账户名 */
    accName?: string | null
    /** 税号 */
    taxId?: string | null
    /**
     * 密钥，可能是手机号、邮箱、随机码
     * @minLength 1
     */
    key: string
    /** 巴西用户银行卡主键 */
    userBankId?: string | null
    /**
     * tejeePay method（0、CPF;1、CNPJ;2、PHONE;3、EMAIL;4、EVP）
     * @format int32
     */
    tejeePayMethod?: number
}

export interface Balance {
    /**
     * bonus余额
     * @format double
     */
    bonus?: number
    /**
     * 真金余额
     * @format double
     */
    cashBalance?: number
    /**
     * 真金余额（s_user.Cash + s_user.Bonus）
     * @format double
     */
    cash?: number
}

export interface BalanceDto {
    /**
     * bonus余额
     * @format double
     */
    bonus?: number
    /**
     * 真金余额（s_user.Cash + s_user.Bonus）
     * @format double
     */
    cash?: number
    /**
     * 可提现金额
     * @format double
     */
    withDrawM?: number
    /** @format double */
    orderM?: number
    /**
     * 提现需要完成的流水
     * @format double
     */
    requireFlowMoney?: number
    cashLimit?: AmountLimit
    payLimit?: AmountLimit
}

/** 用户银行卡列表dto */
export interface BankInfosDto {
    /** 用户银行卡id */
    userBankID?: string | null
    /**
     * 银行卡类型
     * 1-Visa
     * 2-Spei
     * @format int32
     */
    bankType?: number
    /** 银行编码（目前只有Spei在用） */
    bankCode?: string | null
    /** 银行名称 */
    bankName?: string | null
    /** 用户名 */
    userName?: string | null
    /** FirstName */
    firstName?: string | null
    /** LastName */
    lastName?: string | null
    /** 银行卡号 */
    cardNo?: string | null
    /** 过期日期 */
    expiryDate?: string | null
    /** CVV */
    cvv?: string | null
    /** 最后充值、提现使用的卡 */
    lastUsing?: boolean
}

/** @format int32 */
export enum BankOrderStatusClientEnum {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
    Value6 = 6,
}

export interface BetMessage {
    message?: string | null
    isTheaMessage?: boolean
}

/** 下注记录dto */
export interface BetRecord {
    /** 应用编码 */
    appId?: string | null
    /** 应用名称 */
    appName?: string | null
    /** 统计日 */
    date?: string | null
    /**
     * 最后更新时间
     * @format date-time
     */
    recDate?: string
    /**
     * 下注金额
     * @format double
     */
    bet?: number
    /**
     * 返奖金额
     * @format double
     */
    reward?: number
    /**
     * 下注bonus
     * @format double
     */
    betBonus?: number
    /**
     * 返奖bonus
     * @format double
     */
    winBonus?: number
    /**
     * 下注类型
     * 0-默认值，无意义
     * 1-真金下注
     * 2-bonus下注
     * 3-真金+bonus组合下注
     * @format int32
     */
    betType?: number
}

export interface BetRecordDayIpo {
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
     * 查询起始时间
     * @format date-time
     */
    startDate?: string | null
    /**
     * 截止时间
     * @format date-time
     */
    endDate?: string | null
    /**
     * 当前页码
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * @format int32
     * @min 1
     * @max 10
     */
    pageSize?: number
}

export interface BetRecordDetailIpo {
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
     * 查询起始时间
     * @format date-time
     */
    startDate?: string | null
    /**
     * 截止时间
     * @format date-time
     */
    endDate?: string | null
    /**
     * 当前页码
     * @format int32
     * @min 1
     */
    pageIndex?: number
    /**
     * 页大小
     * @format int32
     * @min 1
     */
    pageSize?: number
}

export interface BetRecordDto {
    /**
     * 下注总额
     * @format double
     */
    totalBet?: number | null
    /**
     * 返奖总额
     * @format double
     */
    totalRewardReturn?: number | null
    /** 下注记录 */
    items?: BetRecord[] | null
}

export interface BindMobile {
    /** 是否有手机号 */
    isExistsMobile?: boolean
    /** 是否显示绑定手机号送bonus弹框 */
    isTipMobile?: boolean
    /**
     * 发放bonus金额
     * @format double
     */
    bonus?: number
}

/** 绑定手机领取奖励dto */
export interface BindMobileDto {
    /**
     * 账户余额
     * @format double
     */
    balance?: number
    /**
     * 真金
     * @format double
     */
    cash?: number
    /**
     * Bonus
     * @format double
     */
    bonus?: number
}

/** 绑定手机领取奖励ipo */
export interface BindMobileIpo {
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
    /** 应用编码 */
    appId?: string | null
    /** 用户ip */
    userIp?: string | null
}

/** 巴西银行卡列表dto */
export interface BraBankQueryDto {
    userBankID?: string | null
    userId?: string | null
    bankCode?: string | null
    bankName?: string | null
    accName?: string | null
    cardNo?: string | null
    taxId?: string | null
    key?: string | null
    lastUsing?: boolean
    /** @format int32 */
    channels?: number
    /**
     * tejeePay method（0、CPF;1、CNPJ;2、PHONE;3、EMAIL;4、EVP）
     * @format int32
     */
    tejeePayMethod?: number
}

/** 巴西银行卡列表ipo */
export interface BraBankQueryIpo {
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
    /** 银行卡id */
    userBankId?: string | null
    /** 银行id集合 */
    userBankIds?: string[] | null
}

/** 巴西充值dto */
export interface BraDepositDto {
    barCode?: string | null
    qrCode?: string | null
    orderId?: string | null
}

/** 巴西充值ipo */
export interface BraDepositIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 充值金额
     * @format double
     * @pattern ^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$
     */
    amount?: number
    /**
     * 支付渠道编码4、pandapay;5、tejeepay
     * @format int32
     */
    channels?: number
    /**
     * 充值参与领取bonus状态，0不参与，1参与
     * @format int32
     */
    receiveBonus?: number
    meta?: any
}

export interface OrderResponseIpo extends BraDepositIpo {
  qrCode: string
  orderId: string
}

export interface BraUserIpo {
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
    /** 应用编码 */
    appId?: string | null
    /**
     * 税号对应的账户名
     * @minLength 1
     */
    accName: string
    /**
     * 税号
     * @minLength 1
     */
    taxId: string
}

/** 巴西提现dto */
export interface BraWithDrawDto {
    message?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 每次请求的唯一标识 */
    requestUUID?: string | null
    /** 用户编码 */
    userId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * 充值金额
     * @format double
     */
    amount?: number
    /**
     * 账户余额
     * @format int64
     */
    balance?: number
    /** 订单编码 */
    orderId?: string | null
    /** 状态 */
    status?: string | null
    /** 扩展书 */
    meta?: any
    /** 是否成功 */
    success?: boolean
    /** 是否进入提现审核 */
    isAudit?: boolean
}

/** 巴西提现ipo */
export interface BraWithDrawIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 提现金额
     * @format double
     */
    amount?: number
    userBankId?: string | null
    /**
     * 支付渠道编码4、pandapay;5、tejeepay
     * @format int32
     */
    channels?: number
    /**
     * 数据查询起始时间
     * @format date-time
     */
    startTime?: string
    /**
     * 数据查询截止时间
     * @format date-time
     */
    endTime?: string
    /**
     * 提现类型withDrawType（0:cash 1:coin）0：是之前逻辑的类型，可默认不传，1是新页面跳转过来的
     */
    withDrawType?: number
}

export interface CashConfirmData {
    /** 是否满足最低充值金额 */
    isMinPay?: boolean
    /**
     * 最低充值金额
     * @format double
     */
    minPay?: number
}

export interface CashConfirmDto {
    /**
     * 服务费
     * @format double
     */
    serviceCharge?: number
    data?: CashConfirmData
}

export interface CashLoadDto {
    addBraBank?: AddBraBank
}

export interface CashLoadIpo {
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

export interface CategoryDetailApp {
    /** 应用编码 */
    appId?: string | null
    /** 小图 */
    smallIcon?: string | null
    /** 中图 */
    middleIcon?: string | null
    /** 大图 */
    bigIcon?: string | null
    /**
     * 应用标识
     * 0、默认
     * 1、Hot
     * 2、New
     * @format int32
     */
    flag?: number
    /** 应用名称 */
    appName?: string | null
    /** 当前用户是否收藏此应用 */
    isFavorite?: boolean
    /**
     * 当前应用Jackpot奖池
     * 如果应用无Jackpot奖池则为空或null
     */
    jackpot?: string | null
    /**
     * 是否自研游戏
     * @format int32
     */
    isOwn?: number
    /** 当前游戏是否支持bonus */
    isSupportBonus?: boolean
    /**
     * s_app.Status
     * 0无效1有效2维护
     * @format int32
     */
    status?: number
    /**
     * 游戏入口效果标识 0-无 1-有
     * @format int32
     */
    effectStatus?: number
    /** 应用图片 */
    icon?: string | null
}

export interface CategoryDetailDto {
    /**
     * 分类Id
     * @format int64
     */
    categoryID?: number
    /** 分类名称 */
    categoryName?: string | null
    /**
     * 模板类型
     * 1、横向平铺
     * 2、首个大图
     * @format int32
     */
    template?: number
    /** 游戏列表 */
    apps?: CategoryDetailApp[] | null
}

/** 获取一级分类的游戏列表 */
export interface CategoryDetailIpo {
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
     * 一级分类Id
     * @format int32
     * @min 1
     * @max 2147483647
     */
    categoryID?: number
}

export interface CategoryFirstLevelGameIpo {
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
     * 当前页码
     * 默认1
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * 默认10
     * @format int32
     * @min 1
     * @max 50
     */
    pageSize?: number
    /**
     * 一级分类编码
     * @format int32
     * @min 0
     * @max 2147483647
     */
    categoryId?: number
}

export interface CategoryListDto {
    /**
     * 一级游戏分类id
     * @format int64
     */
    categoryId?: number
    /** 一级游戏分类名称 */
    categoryName?: string | null
    /**
     * 排序字段，优先级从小到大
     * @format int32
     */
    orderNum?: number
    /**
     * 顶级分类类型
     * @format int32
     */
    topLevelType?: number
}

/** 查询一级游戏分类ipo */
export interface CategoryListIpo {
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

export interface CategoryMoreDto {
    /** 应用编码 */
    appId?: string | null
    /** 小图 */
    smallIcon?: string | null
    /** 中图 */
    middleIcon?: string | null
    /** 大图 */
    bigIcon?: string | null
    /**
     * 应用标识
     * 0、默认
     * 1、Hot
     * 2、New
     * @format int32
     */
    flag?: number
    /** 应用名称 */
    appName?: string | null
    /** 当前用户是否收藏此应用 */
    isFavorite?: boolean
    /**
     * 当前应用Jackpot奖池
     * 如果应用无Jackpot奖池则为空或null
     */
    jackpot?: string | null
    /**
     * 是否自研游戏
     * @format int32
     */
    isOwn?: number
    /** 当前游戏是否支持bonus */
    isSupportBonus?: boolean
    /**
     * s_app.Status
     * 0无效1有效2维护
     * @format int32
     */
    status?: number
    /**
     * 游戏入口效果标识 0-无 1-有
     * @format int32
     */
    effectStatus?: number
}

export interface CategoryMoreIpo {
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
     * 分类Id
     * @format int32
     */
    categoryID?: number
    /**
     * 当前页码
     * 默认1
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * 默认5
     * @format int32
     * @min 1
     * @max 50
     */
    pageSize?: number
}

export interface CategoryMyGameIpo {
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
     * 当前页码
     * 默认1
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * 默认5
     * @format int32
     * @min 1
     * @max 50
     */
    pageSize?: number
}

export interface ChannelsData {
    channels?: string | null
    items?: PayAmountConfigItem[] | null
}

export interface ClientBaseIpo {
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

/** @format int32 */
export enum ClientOrderTypeEnum {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
}

export interface DepositOrWithdrawDto {
    requestUUID?: string | null
    userId?: string | null
    currencyId?: string | null
    /** @format int64 */
    amount?: number
    /** @format int64 */
    balance?: number
    orderId?: string | null
    status?: string | null
    message?: string | null
    /** 扩展书 */
    meta?: any
}

/** 充值Or提现Ipo */
export interface DepositOrWithdrawIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 渠道编号
     * @minLength 1
     */
    channel: string
    /**
     * 充值金额
     * @format double
     * @min 50
     */
    amount?: number
}

export interface DetailMessageRequest {
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
    messageId?: string | null
}

export interface Execute100013Dto {
    /** 是否领取成功 */
    isSuccess?: boolean
    /**
     * 奖金
     * @format double
     */
    bonus?: number
}

export interface Execute100013Ipo {
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
     * 奖励Id
     * @minLength 1
     */
    detailId: string
}

export interface FavoriteIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
}

/** 用户银行卡列表ipo */
export interface GetBankInfosIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /** 银行编码 */
    userBankId?: string | null
    /**
     * 排序类型
     * 0、优先最近使用的银行卡顺序，其次更新时间
     * 1、优先是否支持Spei、其次最近使用的银行卡、最后更新时间
     * @format int32
     */
    sortType?: number
}

/** 获取个人信息ipo */
export interface GetPersonIpo {
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

export interface GetRebateListDto {
    /**
     * 总的奖励数
     * @format double
     */
    totalReward?: number
    dotList?: RebateDotResponse[] | null
}

export interface HubtelChannelsIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
}

/** 浮窗 */
export interface IndexFloatingWindow {
    /** @format int32 */
    code?: number
    /** 图片地址 */
    imageUrl?: string | null
    /** 链接 */
    linkUrl?: string | null
}

/** 好友邀请分享活动详情dto */
export interface InviteConfigDto {
    /** 首存金额奖励 */
    payBonus?: InvitePayConfig[] | null
    /**
     * 首存金额流水倍率
     * @format float
     */
    payFlowMultip?: number
    /** 邀请好友数量奖励 */
    numBonus?: InviteNumConfig[] | null
    /**
     * 邀请好友数量奖励流水倍率
     * @format float
     */
    numFlowMultip?: number
    /**
     * 充值最低要求
     * @format double
     */
    numPayAmount?: number
    /**
     * 100013，有效人数判断条件之一，下注要求
     * @format double
     */
    betLimit?: number
    /**
     * 100013，奖励bonus需要的流水倍数
     * @format float
     */
    flowMultip?: number
}

/** 好友邀请分享活动详情ipo */
export interface InviteConfigIpo {
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

/** 查询获得奖励明细dto */
export interface InviteDetailsDto {
    /** 好友账号 */
    userAccount?: string | null
    /**
     * 注册日期
     * @format date-time
     */
    registDate?: string
    /**
     * 好友首存金额
     * @format double
     */
    firstPay?: number
    /**
     * 奖励金额
     * @format double
     */
    bonus?: number
    /** 月份 */
    month?: string | null
    /**
     * 有效人数
     * @format int32
     */
    validUserCount?: number
    /**
     * 发奖日期
     * @format date-time
     */
    date?: string
}

/** 查询获得奖励明细ipo */
export interface InviteDetailsIpo {
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
     * 1-首存奖励
     * 2-邀请好友数量月度奖励
     * @format int32
     */
    type?: number
    /**
     * 当前页码
     * 默认1
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * 默认10
     * @format int32
     * @min 1
     * @max 50
     */
    pageSize?: number
}

/** 邀请好友数量奖励 */
export interface InviteNumConfig {
    /**
     * 邀请数量
     * @format int32
     */
    num?: number
    /**
     * 奖励金额
     * @format double
     */
    bonus?: number
}

/** 首存金额奖励 */
export interface InvitePayConfig {
    /**
     * 首充金额
     * @format double
     */
    firstPay?: number
    /**
     * 奖励金额
     * @format double
     */
    bonus?: number
}

export interface InviteUser100013LoadDto {
    /** 运营商编码 */
    operatorId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * 总共可领取奖金
     * @format double
     */
    totalBonus?: number
    /**
     * 已领取奖金
     * @format double
     */
    totalHaveReceived?: number
    /**
     * 可领取奖金
     * @format double
     */
    totalAllowReceive?: number
    /**
     * 已邀请人数
     * @format int64
     */
    totalUser?: number
    /**
     * 已邀请有效人数
     * @format int64
     */
    totalValidUser?: number
    /** 奖励明细 */
    items?: InviteUser100013LoadItem[] | null
}

export interface InviteUser100013LoadIpo {
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

export interface InviteUser100013LoadItem {
    /** 奖励id，可能为null */
    detailId?: string | null
    /**
     * 奖金
     * @format double
     */
    bonus?: number
    /**
     * 需要邀请的有效用户数量
     * @format int32
     */
    needUsers?: number
    /**
     * 已经邀请的有效用户数量
     * @format int32
     */
    alreadyUsers?: number
    receiveStatus?: ReceiveStatus100013
    receiveStatusDesc?: string | null
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

export interface KeywordsDto {
    /**
     * 关键词分类编码
     * @format int64
     */
    kcId?: number
    /** 关键词分类名称 */
    kcName?: string | null
    /** 关键词列表 */
    keywords?: KeywordsItem[] | null
}

export interface KeywordsIpo {
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

export interface KeywordsItem {
    /**
     * 关键词编码
     * @format int64
     */
    keywordId?: number
    /** 关键词名称 */
    title?: string | null
}

export interface LastMessageRequest {
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

export interface LatestMessageResponse {
    maps?: ReadingTagMapDto[] | null
    messages?: LatestMessageDto[] | null
}

export interface LoadDto {
    /** 是否提示用户信息弹框 */
    isTipPersonalForm?: boolean
    isTipRegister?: boolean
    /** 是否绑定手机号 */
    isBindMobile?: boolean
    bindMobile?: BindMobile
    /** 活动100007 */
    register7?: Register7
    /** 用户ip */
    userIp?: string | null
    balanceInfo?: BalanceDto
    /** 用户邮件相关 */
    userMessageInfo?: UserMessage
    userVipInfo?: UserVipInfoDto
    /** 首页浮窗 */
    indexFloatingWindows?: IndexFloatingWindow[] | null
    /** 首页弹框 */
    indexPopupBox?: PopupBox[] | null
}

export interface LoadIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
}

export interface LobbyAppUrlDto {
    status?: string | null
    url?: string | null
    content?: string | null
    meta?: any
}

export interface LobbyAppUrlIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    isDemo?: boolean
    lobbyUrl?: string | null
    depositUrl?: string | null
    meta?: any
}

export interface LobbyBaseIpo {
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

export interface LoseCashBackDto {
    items?: LoseCashBackItem[] | null
}

export interface LoseCashBackIpo {
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

export interface LoseCashBackItem {
    /** @format double */
    rangeMin?: number
    /** @format double */
    rangeMax?: number
    /** @format double */
    rewardMin?: number
    /** @format double */
    rewardMax?: number
    isShowRangeMax?: boolean
    /** @format double */
    maxAmount?: number
    /** @format string */
    cashMultip?: string | null
}

export interface Order {
    orderId?: string | null
    /**
     * 状态0-初始1-处理中2-成功3-失败4-已回滚5-异常且需处理6-异常已处理
     * @format int32
     */
    status?: number
}

export interface OrderDto {
    /** 订单编号 */
    orderId?: string | null
    /** 用户 编号 */
    userId?: string | null
    /** 应用编码 */
    appId?: string | null
    /** 应用提供商编码 */
    providerId?: string | null
    /** 运营商编码 */
    operatorId?: string | null
    orderStatus?: BankOrderStatusClientEnum
    orderType?: ClientOrderTypeEnum
    /** @format int32 */
    paytypeChannel?: number
    channelName?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * 实际数量
     * @format double
     */
    amount?: number
    /**
     * 下单时间
     * @format date-time
     */
    recDate?: string
    statusDesc?: string | null
}

export interface OrderIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 订单编号
     * @minLength 1
     */
    orderId: string
    requestUUID?: string | null
    /** 扩展数据 */
    meta?: any
}

/** 充值金额dto */
export interface PayAmountConfigDto {
    /**
     * 本次充值的赠金次数，当前第几次充值
     * @format int32
     */
    frequency?: number
    /**
     * 奖励bonus的最小充值金额
     * @format double
     */
    leastPayForReward?: number
    /**
     * 赠金倍数
     * @format float
     */
    multiple?: number
    /**
     * 赠金上限
     * @format double
     */
    maximum?: number
    items?: PayAmountConfigItem[] | null
    data?: Record<string, ChannelsData>
}

/** 充值金额ipo */
export interface PayAmountConfigIpo {
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
    /** 应用编码 */
    appId?: string | null
    /**
     * 充值金额
     * @format double
     * @pattern ^(([1-9]{1}\d{1,6})|(0{1,7}))(\.\d{1,2})?$
     */
    amount?: number
    /**
     * 充值参与领取bonus状态，0不参与，1参与
     * @format int32
     */
    receiveBonus?: number
}

/** PayAmountConfigItem */
export interface PayAmountConfigItem {
    /** @format double */
    amount?: number
    /** @format double */
    bonus?: number
    /** @format int32 */
    orderNum?: number
    isSelected?: boolean
}

/** 提现记录dto */
export interface PayCashRecordsDto {
    /** 银行编码（支付渠道） */
    channelName?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /** 订单编号 */
    orderId?: string | null
    /**
     * 发起时间
     * @format date-time
     */
    applyTime?: string
    /**
     * 更新时间
     * @format date-time
     */
    updateTime?: string
    /**
     * 状态
     * 充值：0-初始1-处理中2-成功3-失败4-已回滚5-异常且需处理6-异常已处理
     * 提现：0-初始1-处理中2-成功3-失败4-已回滚5-异常且需处理6-异常已处理100-审核处理中102-审核拒绝103-审核异常待处理
     * @format int32
     */
    status?: number
    /**
     * 实际金额（正负数）
     * @format double
     */
    amount?: number
    /**
     * 已完成流水
     * @format double
     */
    completedFlowMoney?: number
    /**
     * 提现所要达到的流水
     * @format double
     */
    requireFlowMoney?: number
    /**
     * 流水系数
     * @format float
     */
    flowMultip?: number
}

export interface PersonalInfoDto {
    /** 用户昵称 */
    NickName?: string | null
    /** First Name */
    FirstName?: string | null
    /** Last Name */
    LastName?: string | null
    /** 生日 */
    BirthDay?: string | null
    /** 手机号 */
    PhoneNumber?: string | null
    /** 邮箱 */
    Email?: string | null
}

export interface PersonalInfoFormDto {
    /** 对应后端的key */
    uiFieldID?: string | null
    /** 显示名称 */
    title?: string | null
    /** Placeholder */
    placeholder?: string | null
    /** 错误提示 */
    errorMessage?: string | null
    /** 是否必填 */
    isRequired?: boolean
    /** 是否允许修改 */
    isAllowModify?: boolean
    /**
     * 数据类型
     * 1、datetime
     * @format int32
     */
    dbType?: number | null
}

/** 个人信息表单模板ipo */
export interface PersonalInfoFormIpo {
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

export interface PersonalInfoIpo {
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
     * 用户昵称
     * @minLength 1
     */
    nickName: string
    /**
     * FirstName
     * @minLength 1
     */
    firstName: string
    /**
     * LastName
     * @minLength 1
     */
    lastName: string
    /**
     * 生日
     * @minLength 1
     * @pattern ^((0([1-9]))|(1([0-9]))|(2([0-9]))|(3(0|1)))(-|/)((0([1-9]))|(1(0|1|2)))(-|/)\d{4}$
     */
    birthDay: string
    /** 证件号 */
    idCard?: string | null
    /** 手机号 */
    phoneNumber?: string | null
    /**
     * 邮箱
     * @minLength 1
     * @pattern ^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$
     */
    email: string
    /** 地址 */
    address?: string | null
}

/** 首页弹框 */
export interface PopupBox {
    /** @format int32 */
    code?: number
    /** 图片地址 */
    imageUrl?: string | null
    /** 链接地址 */
    linkUrl?: string | null
    /** 链接文字 */
    linkContent?: string | null
    /** 图片文字 */
    content?: string | null
}

export interface ProcessData {
    /** 运营商编码 */
    operatorId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * 当前utc时间
     * @format date-time
     */
    utcTime?: string
    /**
     * 当前日期
     * @format date-time
     */
    currentDate?: string
    /**
     * 签到周期
     * @format int32
     */
    cycle?: number
    /**
     * 签到周期起始日期
     * @format date-time
     */
    cycleStartDate?: string
    /**
     * 签到周期截止日期
     * @format date-time
     */
    cycleEndDate?: string
    weeklyCardUserEo?: SaWeeklycardUserEO
    /** 用户最近一个签到周期明细 */
    userLastDetailEoList?: SaWeeklycardDetailEO[] | null
    configEo?: SaWeeklycardConfigEO
    /** 签到配置List */
    detailConfigEoList?: SaWeeklycardDetailConfigEO[] | null
    /** 用户是否购买了周卡 */
    isBuyWeeklyCard?: boolean
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

/** QuartzApiResult */
export interface QuartzApiResult {
    success?: boolean
    message?: string | null
}

export interface QueryInputIpo {
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
    /** 用户输入查询条件 */
    input?: string | null
}

export interface QueryKeywordIpo {
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
     * 关键字Id
     * @minLength 1
     */
    keywordID: string
}

export interface ReadMessageRequest {
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
    ids?: string[] | null
}

export interface ReadingTagMapDto {
    /** @format int32 */
    displayTag?: number
    /** @format int32 */
    count?: number
}

export interface RebateDotConfigDto {
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

export interface RebateDotConfigIpo {
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
    /** @format int32 */
    activityId?: number
}

export interface RebateDotRequet {
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
    /** @format int32 */
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

export interface RebateWaterRequest {
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

/** @format int32 */
export enum ReceiveStatus100013 {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
}

/** @format int32 */
export enum ReceiveStatusEnum {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
}

export interface ReceiveTaskRewardRequest {
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
    detailId?: string | null
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

/** 活动100007 */
export interface Register7 {
    /** 是否显示register7送bonus弹框 */
    isTipRegister?: boolean
    /**
     * 送bonus金额
     * @format double
     */
    bonus?: number
}

/** 获取充值、首充活动奖励记录dto */
export interface RegpayDetailsDto {
    /** @format double */
    rewardMoney?: number
    mobile?: string | null
    userName?: string | null
}

/** 获取充值、首充活动奖励记录ipo */
export interface RegpayDetailsIpo {
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

export interface RegpayGamesIpo {
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

/** 领取充值、首充奖金dto */
export interface RegpayReceiveBonusDto {
    success?: boolean
    message?: string | null
}

/** 领取充值、首充奖金ipo */
export interface RegpayReceiveBonusIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
}

/** 获取充值、首充活动用户dto */
export interface RegpayUserDto {
    userId?: string | null
    operatorId?: string | null
    countryId?: string | null
    currencyId?: string | null
    /** @format double */
    sumPay?: number
    /** @format double */
    regPay?: number
    /** @format double */
    firstPay?: number
    /** @format double */
    sumBet?: number
    /** @format double */
    returnRewards?: number
    isRegpay?: boolean
    isFirstPay?: boolean
    /** @format double */
    betAmount?: number
}

/** 获取充值、首充活动用户ipo */
export interface RegpayUserIpo {
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

export interface Roulette101001LoadDto {
    config?: RouletteConfig
    user?: RouletteUser
    items?: RouletteItem[] | null
}

export interface Roulette101001LoadIpo {
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

export interface RouletteConfig {
    operatorId?: string | null
    countryId?: string | null
    currencyId?: string | null
    /** @format double */
    payCondition?: number
    /** @format int32 */
    dayNumLimit?: number
}

export interface RouletteDto {
    /** 是否为freespin */
    isFreespin?: boolean
    /** 是否中奖 */
    isWin?: boolean
    /** 是否弹框充值提示 */
    isPayTip?: boolean
    /**
     * 奖金
     * @format double
     */
    winAmount?: number
    user?: RouletteUserDataDto
    roulette?: RouletteOdds
}

export interface RouletteGamesDto {
    /** 应用编码 */
    appId?: string | null
    /** 应用图片 */
    icon?: string | null
    /**
     * 应用标识
     * 0、默认
     * 1、Hot
     * 2、New
     * @format int32
     */
    flag?: number
    /** 应用名称 */
    appName?: string | null
    /** 当前用户是否收藏此应用 */
    isFavorite?: boolean
    /**
     * 当前应用Jackpot奖池
     * 如果应用无Jackpot奖池则为空或null
     */
    jackpot?: string | null
}

export interface RouletteGamesIpo {
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

export interface RouletteIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
}

export interface RouletteItem {
    /** @format int32 */
    rewardType?: number
    /** @format int32 */
    position?: number
    /** @format double */
    bonus?: number
    rewardTypeDesc?: string | null
}

/** 活动中奖播报 */
export interface RouletteMarqueeDto {
    /** 货币编码 */
    currencyID?: string | null
    /** 用户手机号 */
    mobile?: string | null
    /** 用户名 */
    userName?: string | null
    /**
     * 奖金
     * @format double
     */
    bonus?: number
}

export interface RouletteMarqueeIpo {
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
     * @format int32
     * @min 1
     * @max 100
     */
    pageSize?: number
}

export interface RouletteOdds {
    /**
     * 奖励等级
     * @format int32
     */
    level?: number
    /**
     * 奖励类型1-无奖励2-真金3-二级抽奖A4-二级抽奖B
     * @format int32
     */
    rewardType?: number
    /**
     * 上一级奖励类型
     * @format int32
     */
    preRewardType?: number
    /**
     * 位置
     * @format int32
     */
    position?: number
    /**
     * 倍率
     * @format float
     */
    multiple?: number
    /**
     * 排序字段
     * @format int32
     */
    orderNum?: number
    item?: RouletteOdds
}

export interface RouletteOddsBaseDto {
    /** @format int32 */
    level?: number
    /** @format int32 */
    rewardType?: number
    /** @format int32 */
    preRewardType?: number
    /** @format int32 */
    rewardTypeDesc?: number
    /** @format int32 */
    position?: number
    /** @format float */
    multiple?: number
    /** @format int32 */
    orderNum?: number
    items?: RouletteOddsBaseDto[] | null
}

export interface RouletteOddsBaseIpo {
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

export interface RouletteOddsResult {
    /** @format int32 */
    rewardType?: number
    /** @format int32 */
    position?: number
    /** @format double */
    bonus?: number
    rewardTypeDesc?: string | null
}

export interface RouletteRaffleDto {
    isWin?: boolean
    /** @format double */
    winAmount?: number
    /** 是否提示充值 */
    isTipPay?: boolean
    reward?: RouletteOddsResult
}

export interface RouletteRaffleIpo {
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

export interface RouletteUser {
    userId?: string | null
    /** @format int32 */
    spinNum?: number
}

export interface RouletteUserDataDto {
    /** 用户编码 */
    userId?: string | null
    /**
     * 用户余额
     * @format double
     */
    balance?: number
    /**
     * 当前用户剩余freespin次数
     * @format int32
     */
    freespin?: number
    /**
     * 用户类型
     * @format int32
     */
    userType?: number
}

export interface RouletteUserDto {
    /** 用户编码 */
    userId?: string | null
    /**
     * 剩余freespin次数
     * @format int32
     */
    freespin?: number
    /**
     * 当前freespin轮数
     * @format int32
     */
    freespinRound?: number
}

export interface RouletteUserIpo {
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

export interface SCBannerDto {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /** 位置 */
    position?: number[] | null
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
     * 应用编码
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
    /** 通知编码 */
    notifyId?: string | null
    /**
     * 显示位置
     * 1-顶部
     * 2-中部
     * 3-下部
     * @format int32
     */
    position?: number
    /**
     * 自动关闭间隔（秒）
     * 0-手动关闭
     * @format int32
     */
    closeInterval?: number
    /**
     * 链接类型
     * 1-email
     * 2-url
     * @format int32
     */
    linkKind?: number
    /** 链接地址 */
    linkUrl?: string | null
    /** 标题 */
    title?: string | null
    /** 内容 */
    content?: string | null
    /** 图片链接 */
    imageUrl?: string | null
    /** 文本集合 */
    txts?: string[] | null
    /** 图片集合 */
    imgs?: string[] | null
}

export interface SCNotifyIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 何时显示
     * 1-登录前
     * 2-注册后第一次登录
     * 3-登录后
     * @format int32
     */
    actionAt?: number
    /**
     * 显示页面FLAG值
     * 1-首页
     * 2-
     * 4-
     * 8-
     * @format int32
     */
    showAt?: number
}

export interface SaWeeklycardConfigEO {
    hasOriginal?: boolean
    originalOperatorID?: string | null
    originalCurrencyID?: string | null
    operatorID?: string | null
    currencyID?: string | null
    countryId?: string | null
    /** @format float */
    vipMultip?: number
    /** @format int64 */
    payAmount?: number
    /** @format float */
    flowMultip?: number
    isRepeat?: boolean
}

export interface SaWeeklycardDetailEO {
    hasOriginal?: boolean
    /** @format date-time */
    originalDayId?: string
    originalUserId?: string | null
    /** @format date-time */
    dayId?: string
    userId?: string | null
    /** @format int64 */
    bonus?: number
    /** @format float */
    flowMultip?: number
    /** @format int32 */
    currentCycleNumber?: number
    /** @format date-time */
    cycleStartDate?: string
    /** @format date-time */
    cycleEndDate?: string
    /** @format date-time */
    recDate?: string
}

export interface SaWeeklycardDetailConfigEO {
    hasOriginal?: boolean
    originalConfigID?: string | null
    configID?: string | null
    operatorID?: string | null
    currencyID?: string | null
    countryId?: string | null
    /** @format int64 */
    bonus?: number
    /** @format float */
    flowMultip?: number
    /** @format int32 */
    dateNumber?: number
    isStartDay?: boolean
}

export interface SaWeeklycardUserEO {
    hasOriginal?: boolean
    /** @format date-time */
    originalDayId?: string
    originalUserId?: string | null
    /** @format date-time */
    dayId?: string
    userId?: string | null
    operatorID?: string | null
    currencyID?: string | null
    fromId?: string | null
    /** @format int32 */
    fromMode?: number
    /** @format int64 */
    payAmount?: number
    /** @format float */
    flowMultip?: number
    /** @format date-time */
    cycleStartDate?: string
    /** @format date-time */
    cycleEndDate?: string
    /** @format date-time */
    recDate?: string
}

export interface SignRecord {
    /** @format date-time */
    dayId?: string
    flag?: boolean
    /** @format int64 */
    amount?: number
    /** @format int32 */
    level?: number
    recordId?: string | null
}

export interface SigninBonusDto {
    /**
     * -1 获取下注金额出错
     * 0 没有签到
     * 1 已经签到 但是没领取奖励
     * 2 已经签到 已经领取过奖励
     * @format int32
     */
    status?: number
    success?: boolean
    message?: string | null
    /** @format int64 */
    rewardAmount?: number
    /** @format int64 */
    pettingAmount?: number
    /** @format date-time */
    signTime?: string
}

export interface SigninBonusIpo {
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
    /** @format date-time */
    dayId?: string
    /** @minLength 1 */
    appID: string
    /** @minLength 1 */
    bannerID: string
}

export interface SigninLevelDto {
    /** @format int32 */
    levelID?: number
    picPath?: string | null
    name?: string | null
    /** @format int32 */
    minMoney?: number
    /** @format int32 */
    maxMoney?: number
    /** @format int32 */
    petMoney?: number
    /** @format int32 */
    index?: number
    /** @format int32 */
    level?: number
    /** @format int32 */
    days?: number
}

export interface SigninLevelIpo {
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

export interface SigninListDto {
    /** @format date-time */
    currentDate?: string
    signlist?: SignRecord[] | null
}

export interface SigninListIpo {
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
    /** @minLength 1 */
    bannerID: string
}

/** 签到dto */
export interface SigninNewDto {
    status?: boolean
    /** @format double */
    rewardAmount?: number
    statusDesc?: string | null
}

/** 签到ipo */
export interface SigninNewIpo {
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
    appId?: string | null
    /**
     * 日期编号
     * @format int32
     * @min 1
     * @max 366
     */
    dateNumber?: number
}

/** 签到列表dto */
export interface SigninNewListDto {
    /** 用户当天是否允许签到 */
    isSignin?: boolean
    /** 用户当天可补签次数 */
    isMissSignin?: boolean
    /**
     * 漏签需要完成的充值
     * @format double
     */
    missSigninPayAmount?: number
    /**
     * 签到需要完成的充值金额
     * @format double
     */
    signinPayAmount?: number
    /**
     * 当前周期签到次数
     * @format int32
     */
    signinTimes?: number
    /** 当前周期上一次签到日期 */
    preSigninDate?: string | null
    /** 签到列表 */
    items?: UserSignDetails[] | null
}

/** 签到列表ipo */
export interface SigninNewListIpo {
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

/** 查询Spei支持的银行dto */
export interface SpeiBanksDto {
    /**
     * 银行代码
     * sb_bank_code表BankCode
     */
    bankCode?: string | null
    /**
     * 银行名称
     * sb_bank_code表BankName
     */
    bankName?: string | null
}

/** 查询Spei支持的银行ipo */
export interface SpeiBanksIpo {
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
    /** 应用appid编码 */
    appId?: string | null
}

export interface SpeiDepositDto {
    /** 每次请求的唯一标识 */
    requestUUID?: string | null
    /** 用户唯一标识 */
    userId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * 金额
     * @format double
     */
    amount?: number
    /**
     * 账户余额
     * @format double
     */
    balance?: number
    /** 订单id */
    orderId?: string | null
    /** SPEI创建的虚拟账号 */
    vaNumber?: string | null
    /** 状态描述 */
    status?: string | null
    /** 扩展书 */
    meta?: any
    /** 描述 */
    message?: string | null
    /** 是否成功 */
    success?: boolean
}

export interface SpeiDepositIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
}

export interface SpeiDepositOrWithdrawDto {
    /** 每次请求的唯一标识 */
    requestUUID?: string | null
    /** 用户编码 */
    userId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * 充值金额
     * @format double
     */
    amount?: number
    /**
     * 账户余额
     * @format int64
     */
    balance?: number
    /** 订单编码 */
    orderId?: string | null
    /** 状态 */
    status?: string | null
    /** 扩展书 */
    meta?: any
    /** 描述 */
    message?: string | null
    /** 创建的虚拟账号 */
    vaNumber?: string | null
    /** 是否成功 */
    success?: boolean
}

export interface SpeiWithdrawIpo {
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
     * 应用编码
     * @minLength 1
     */
    appId: string
    /**
     * 提现金额
     * @format double
     */
    amount?: number
    /** @minLength 1 */
    name: string
    address?: string | null
    idNo?: string | null
    birthday?: string | null
    city?: string | null
    /** 收款银行代码：见附录 */
    bankCode?: string | null
    /**
     * 收款银行账号
     * @minLength 1
     */
    bankNumber: string
    /**
     * 提现类型withDrawType（0:cash 1:coin）0：是之前逻辑的类型，可默认不传，1是新页面跳转过来的
     */
    withDrawType?: number
}

export interface SyncDto {
    balance?: Balance
    order?: Order
}

/**
 * 同步类型
 * @format int32
 */
export enum SyncEnum {
    Value1 = 1,
    Value2 = 2,
}

export interface SyncIpo {
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
    syncTypes?: SyncEnum[] | null
    orderId?: string | null
}

export interface TakeRebateDto {
    data?: any
    success?: boolean
    message?: string | null
}

export interface TakeRebateIpo {
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
    template?: string | null
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

/** 获取用户当前可参加的第一个活动的返回值 */
export interface UserCurrentActivityDto {
    /** @format int32 */
    activityCode?: number
    activityUrl?: string | null
    /** banner图片 */
    imgUrl?: string | null
    /** @format int32 */
    linkType?: number
    linkParams?: string | null
}

/** 获取用户当前可参加的第一个活动时的请求体 */
export interface UserCurrentActivityIpo {
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
     * 等同于sc_banner.position
     * 1、首页推荐
     * 2、首页头部
     * 3、汉堡栏
     * 4、个人中心
     * 5、充值
     * @format int32
     */
    recommendType?: number
}

/** 用户邮件相关 */
export interface UserMessage {
    /**
     * 用户未读邮件数量
     * @format int32
     */
    unReadMessageCount?: number
}

/** 用户记录ipo */
export interface UserRecordsIpo {
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
     * 起始时间
     * @format date-time
     */
    startDate?: string | null
    /**
     * 截止时间
     * @format date-time
     */
    endDate?: string | null
    /**
     * 当前页码
     * @format int32
     * @min 1
     * @max 2147483647
     */
    pageIndex?: number
    /**
     * 页大小
     * @format int32
     * @min 1
     * @max 10
     */
    pageSize?: number
}

export interface UserSignDetails {
    /** 用户编码 */
    userId?: string | null
    /** 是否选中 */
    isSelected?: boolean
    /** 当前日期 */
    dayId?: string | null
    /**
     * 当前周期标识
     * @format int32
     */
    dateNumber?: number
    /**
     * 当前日期返奖金额（已签到则为实际奖励金额，未签到、漏签为最大奖励金额）
     * @format double
     */
    reward?: number
    /** @format date-time */
    recDate?: string | null
    /**
     * SigninStatus
     * @format int32
     */
    status?: number
}

export interface UserVipInfoDto {
    /**
     * 当前vip等级
     * @format int32
     */
    vip?: number
    /**
     * 当前vip积分
     * @format double
     */
    point?: number
    /**
     * 下一升级奖励
     * @format double
     */
    gradeReward?: number
    /**
     * 每周可享收益
     * @format double
     */
    weekReward?: number
    /**
     * 升级还需要投注额
     * @format double
     */
    upgradeRequireBet?: number
    /**
     * 升级已投注
     * @format double
     */
    upgradeHasBet?: number
}

export interface UserVipInfoIpo {
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

export interface VipConfigDto {
    /** 运营商编码 */
    operatorId?: string | null
    /** 国家编码 */
    countryId?: string | null
    /** 货币编码 */
    currencyId?: string | null
    /**
     * vip等级
     * @format int32
     */
    vipGrade?: number
    /**
     * 需要达到的最小下注额度
     * @format double
     */
    betMinAmount?: number
    /**
     * 升级奖励
     * @format double
     */
    gradeReward?: number
    /**
     * 每周可享收益
     * @format double
     */
    weekReward?: number
}

export interface VipConfigIpo {
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

export interface WeeklyCardExecuteDto {
    status?: boolean
    /** @format double */
    bonus?: number
    /** 【测试字段】服务器时间 */
    serverTime?: string | null
    /** 【测试字段】UTC时间 */
    utcTime?: string | null
    /** 【测试字段】运营商当地时间 */
    localTime?: string | null
    /** 【测试字段】本次周卡领取周期起始日期 */
    cycleStartDate?: string | null
    /** 【测试字段】本次周卡领取周期截止日期 */
    cycleEndDate?: string | null
}

export interface WeeklyCardExecuteIpo {
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
    appId?: string | null
    /**
     * 日期编号
     * @format int32
     * @min 1
     * @max 366
     */
    dateNumber?: number
    processData?: ProcessData
}

export interface WeeklyCardLoadDto {
    /**
     * 购买周卡需要的金额
     * @format double
     */
    payAmount?: number
    /**
     * 购买周卡后总返奖金
     * @format double
     */
    sumBonus?: number
    /**
     * 允许领取次数
     * @format int32
     */
    cycle?: number
    /** 用户是否购买了周卡 */
    isBuyWeeklyCard?: boolean
    /** 【测试字段】服务器时间 */
    serverTime?: string | null
    /** 【测试字段】UTC时间 */
    utcTime?: string | null
    /** 【测试字段】运营商当地时间 */
    localTime?: string | null
    /** 【测试字段】本次周卡领取周期起始日期 */
    cycleStartDate?: string | null
    /** 【测试字段】本次周卡领取周期截止日期 */
    cycleEndDate?: string | null
    items?: WeeklyCardLoadItem[] | null
}

export interface WeeklyCardLoadIpo {
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
    processData?: ProcessData
}

export interface WeeklyCardLoadItem {
    /** @format double */
    bonus?: number
    isSelected?: boolean
    /**
     * 当前周期标识
     * @format int32
     */
    dateNumber?: number
    currDate?: string | null
    status?: ReceiveStatusEnum
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

export interface VipReceiveIpo {
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
    /** @format int32 */
    vipGrade?: number
}

export interface PayAmounts {
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
    * 应用ID
    * @minLength 1
    */
    appId: string
    /**
    * 语言编码
    * @minLength 1
    */
    langId: string
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
}

export interface InviteUser102001LoadIpo {
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
   * 当前页码
   * 默认1
   * @format int32
   * @min 1
   * @max 2147483647
   */
  pageIndex?: number
  /**
   * 页大小
   * 默认5
   * @format int32
   * @min 1
   * @max 5
   */
  pageSize?: number
}

export interface InviteUser102001LoadDto {
  /** 运营商编码 */
  operatorId?: string | null
  /** 货币编码 */
  currencyId?: string | null
  /**
   * 总共可领取奖金
   * @format double
   */
  totalBonus?: number
  /**
   * 待提现金额
   * @format double
   */
  amountToWithdraw?: number
  /**
   * 已邀请有效人数
   * @format int64
   */
  totalValidUser?: number
  /**
   * 是否有银行卡
   */
  hasUserBank?: boolean
  /**
   * 当前邀请等级
   * @format int32
   */
  level?: number
  /**
   * 当前邀请等级差几人升级
   * @format int32
   */
  reValidUser?: number
  /**
   * 当前邀请等级需几人升级
   * @format int32
   */
  needValidUser?: number
  /** 配置奖励明细 */
  configItems?: InviteUser102001ConfigItem[] | null
  /** 宝箱奖励明细 */
  boxsItems?: InviteUser102001BoxsItem[] | null
}

export interface InviteUser102001ConfigItem {
  /**
   * 等级
   * @format int32
   */
  level?: number
  /**
   * 邀请人数最小值
   * @format int32
   */
  validQuantityMin?: number
  /**
   * 邀请人数最大值
   * @format int32
   */
  validQuantityMax?: number
  /**
   * 奖励
   * @format double
   */
  bonus?: number
}

export interface InviteUser102001BoxsItem {
  /**
   * 序号
   * @format int32
   */
  orderNum?: number
  /**
   * 奖励
   * @format double
   */
  bonus?: number
  /**
   * 是否领取
   */
  isRecived?: boolean
}

export interface InviteUser102001ReciveDto {
  /**
   * 用户昵称
   */
  userName?: string
  /**
   * 奖金
   * @format double
   */
  bonus?: number
  /**
   * 领取时间
   * @format date-time
   */
  recDate?: string
}

export interface VipUserInfoIpo {
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

export interface VipUserInfoDto {
  /** 当前vip等级 */
  vip?: number
  /** 用户累计真金下注额度 */
  totalCashBetAmount?: number
  /** 用户累计充值额度 */
  totalPayAmount?: number
  /** 当前等级日返比例 */
  cashBackDayRate?: number
  /** 最大日返比例 */
  cashBackDayMaxRate?: number
  /** 可领取的日返额度 */
  cashBackDayReciveAmount?: number
  /** 日返领取状态(1:不可领取 2:可领取 3:已领取) */
  cashBackDayStatus?: number
  /** 日返可领取开始时间 */
  cashBackDayBeginTime?: string
  /** 日返可领取结束时间 */
  cashBackDayEndTime?: string
  /** 当前等级周返比例 */
  cashBackWeekRate?: number
  /** 最大周返比例 */
  cashBackWeekMaxRate?: number
  /** 可领取的周返额度 */
  cashBackWeekReciveAmount?: number
  /** 周返领取状态(1:不可领取 2:可领取 3:已领取) */
  cashBackWeekStatus?: number
  /** 周返可领取开始时间 */
  cashBackWeekBeginTime?: string
  /** 周返可领取结束时间 */
  cashBackWeekEndTime?: string
  /** 可领取的周返额度（下周预估） */
  cashBackNextWeekReciveAmount?: number
  /** 周返可领取开始时间(下周预估) */
  cashBackNextWeekBeginTime?: string
  /** 周返可领取结束时间(下周预估) */
  cashBackNextWeekEndTime?: string
  /**  */
  configItems?: Sc_vip_configEO[] | null
}

export interface Sc_vip_configEO {
  /** 提现手续费率 */
  cashRate?: number
  /** 每日提现次数上限 */
  dayCashNumLimit?: number
  /** 每日提现金额上限 */
  dayCashAmountLimit?: number
  /** 日返比例 */
  cashBackDayRate?: number
  /** 周返比例 */
  cashBackWeekRate?: number
  /** 需要充值的额度 */
  needPayAmount?: number
  /** 需要真金下注的额度 */
  needCashBetAmount?: string
}

export interface CouponPackageLoadIpo {
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

export interface CouponPackageLoadDto {
  /** 充值金额 */
  payAmout?: number
  /** Cash */
  casAmount?: number
  /** 礼包等级 */
  level?: number
  /** Bonus */
  bounsAmout?: number
  /** 总共获得的金额 */
  totalAmount?: number
  /** 优惠百分比 */
  counponRate?: number
}