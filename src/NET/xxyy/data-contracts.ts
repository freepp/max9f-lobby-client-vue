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

/** 前端传入三方返回授权信息 */
export interface AuthCallbackIpo {
        /** 访问AuthorizeUrl后回调时带的参数code */
    code?: string | null
    /** 访问AuthorizeUrl后回调时带的参数state，用于和请求AuthorizeUrl前的state比较，防止CSRF攻击 */
    state?: string | null
    /** 回调后返回的oauth_token */
    access_token?: string | null
    /** 三方枚举类型 */
    oAuthType?: OAuthEnum
}

export interface AuthUrlIpo {
/** 三方枚举类型 */
    oAuthType?: OAuthEnum
    /** 三方跳转url */
    redirectUri?: string | null
}

/** @format int32 */
export enum BrowserType {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
    Value6 = 6,
}

export interface ChangeMobileIpo {
    userId?: string | null
    mobile?: string | null
    verifyCode?: string | null
    securityCode?: string | null
    appId?: string | null
    newPassword?: string | null
}

export interface ChangeNicknameIpo {
    userId?: string | null
    nickname?: string | null
}

export interface ChangePasswordIpo {
    userId?: string | null
    oldPassword?: string | null
    newPassword?: string | null
}

export interface ChannelThemes {
    logoUrl?: string | null
}

export interface CheckVerifyCodeDto {
    /** 安全码 */
    securityCode?: string | null
}

export interface CheckVerifyCodeIpo {
    mode?: VerifyCodeMode
    /** 验证码标识，如mobile或者email */
    id?: string | null
    verifyCode?: string | null
}

export interface ForgotPasswordIpo {
    mobile?: string | null
    /** 验证码 */
    verifyCode?: string | null
    /** 安全码 */
    securityCode?: string | null
    newPassword?: string | null
    operatorId?: string | null
}

export interface InitOperatorAppDto {
    operatorId?: string | null
    providerId?: string | null
    countryId?: string | null
    currencyId?: string | null
    operatorLangs?: string[] | null
    /** 服务端地址 */
    serverUrl?: string | null
    serverUrl2?: string | null
    serverUrl3?: string | null
    accessKey?: string | null
    themes?: ChannelThemes
    isShowBonus?: boolean
}

export interface InitOperatorAppIpo {
    appId?: string | null
    operatorId?: string | null
    uuid?: string | null
    /** @format int64 */
    timestamp?: number
    aus?: string | null
    channelId?: string | null
}

export interface InitProviderAppDto {
    appServerUrl?: string | null
    accessKey?: string | null
    themes?: ChannelThemes
}

export interface InitProviderAppIpo {
    appId?: string | null
    uuid?: string | null
    /** @format int64 */
    timestamp?: number
    aus?: string | null
    channelId?: string | null
}

export interface LoginDto {
    userId?: string | null
    nickname?: string | null
    /**
     * 用户登录模式
     * s_user.UserMode
     */
    userMode?: UserMode
    /** 仅游客使用 */
    visitorPassword?: string | null
    /**
     * 用户类型
     * s_user.UserKind
     */
    userKind?: UserKind
    /** Jwt Token（xxyy平台和lobby共用） */
    jwtToken?: string | null
    countryId?: string | null
    currencyId?: string | null
    /** @format double */
    cash?: number
    /** @format int64 */
    coin?: number
    /** @format int64 */
    gold?: number
    /** @format int64 */
    point?: number
    /** @format int32 */
    vip?: number
    /** @format int64 */
    swb?: number
    /** @format double */
    bonus?: number
    /** 用户名 */
    username?: string | null
    /** Email */
    email?: string | null
    /** 手机号 */
    mobile?: string | null
    /** 运营平台支持的语言，null为全部 */
    operatorLangs?: string[] | null
    pUserId1?: string | null
    /** @format int32 */
    fromMode?: number
    fromId?: string | null
    /** @format date-time */
    registDate?: string
    setPass?: boolean
}

export interface LoginIpo {
    /**
     *   Visitor = 1, 游客不登录，使用UserId即可
     *  UsernameAndPassword = 2, 游客不登录，使用UserId即可
     * EmailAndPassword = 3, Email+密码
     *   MobileAndPassword = 4, 手机+密码
     *  MobileAndSMSCode = 5 手机+短信验证码
     *  JwtToken = 6  jwt token重新登录
     * OAuth = 8 授权登陆
     */
    loginMode?: LoginMode
    appId?: string | null
    operatorId?: string | null
    /** 用户id，游客登录用 */
    userId?: string | null
    /** 用户名 */
    username?: string | null
    /** Email */
    email?: string | null
    /** 手机号 */
    mobile?: string | null
    /** 密码 */
    password?: string | null
    /** 验证码 */
    verifyCode?: string | null
    versionId?: string | null
    language?: string | null
    os?: SystemType
    browser?: BrowserType
    isMobile?: boolean
    /** 登录附加 */
    meta?: any
}

/**
 *   Visitor = 1, 游客不登录，使用UserId即可
 *  UsernameAndPassword = 2, 游客不登录，使用UserId即可
 * EmailAndPassword = 3, Email+密码
 *   MobileAndPassword = 4, 手机+密码
 *  MobileAndSMSCode = 5 手机+短信验证码
 *  JwtToken = 6  jwt token重新登录
 * OAuth = 8 授权登陆
 * @format int32
 */
export enum LoginMode {
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
    Value6 = 6,
    Value7 = 7,
    Value8 = 8,
}

/**
 * 三方枚举类型
 * @format int32
 */
export enum OAuthEnum {
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
}

export interface OAuthLoginIpo {
    /** 应用编码 */
    appId?: string | null
    /** 运营商平台编码 */
    operatorId?: string | null
    /**
     *   Visitor = 1, 游客不登录，使用UserId即可
     *  UsernameAndPassword = 2, 游客不登录，使用UserId即可
     * EmailAndPassword = 3, Email+密码
     *   MobileAndPassword = 4, 手机+密码
     *  MobileAndSMSCode = 5 手机+短信验证码
     *  JwtToken = 6  jwt token重新登录
     * OAuth = 8 授权登陆
     */
    loginMode?: LoginMode
    /** 游客转注册用户必须提供UserId */
    userId?: string | null
    /** 安全码 */
    securityCode?: string | null
    /**
     * 来源渠道
     *     0-运营商新用户
     *     1-推广员用户 uid
     *     2-渠道推广 cid
     * @format int32
     */
    fromMode?: number
    fromId?: string | null
    imei?: string | null
    gaid?: string | null
    versionId?: string | null
    language?: string | null
    /** 用户第一次进入客户端时的url */
    clientUrl?: string | null
    os?: SystemType
    browser?: BrowserType
    isMobile?: boolean
    /**
     * 用户类型
     * s_user.UserKind
     */
    userKind?: UserKind
    meta?: any
/** 前端传入三方返回授权信息 */
    authCallbackIpo?: AuthCallbackIpo
}

export interface RefreshJwtTokenIpo {
    jwtToken?: string | null
    userId?: string | null
}

/** 注册返回参数 */
export interface RegisterDto {
    userId?: string | null
    nickname?: string | null
    /**
     * 用户登录模式
     * s_user.UserMode
     */
    userMode?: UserMode
    /** 仅游客使用 */
    visitorPassword?: string | null
    /**
     * 用户类型
     * s_user.UserKind
     */
    userKind?: UserKind
    /** Jwt Token（xxyy平台和lobby共用） */
    jwtToken?: string | null
    countryId?: string | null
    currencyId?: string | null
    /** @format double */
    cash?: number
    /** @format int64 */
    coin?: number
    /** @format int64 */
    gold?: number
    /** @format int64 */
    point?: number
    /** @format int32 */
    vip?: number
    /** @format int64 */
    swb?: number
    /** @format double */
    bonus?: number
    /** 用户名 */
    username?: string | null
    /** Email */
    email?: string | null
    /** 手机号 */
    mobile?: string | null
    /** 运营平台支持的语言，null为全部 */
    operatorLangs?: string[] | null
    pUserId1?: string | null
    /** @format int32 */
    fromMode?: number
    fromId?: string | null
    /** @format date-time */
    registDate?: string
    setPass?: boolean
}

/** 注册输入参数 */
export interface RegisterIpo {
    /** 应用编码 */
    appId?: string | null
    /** 运营商平台编码 */
    operatorId?: string | null
    /**
     *   Visitor = 1, 游客不登录，使用UserId即可
     *  UsernameAndPassword = 2, 游客不登录，使用UserId即可
     * EmailAndPassword = 3, Email+密码
     *   MobileAndPassword = 4, 手机+密码
     *  MobileAndSMSCode = 5 手机+短信验证码
     *  JwtToken = 6  jwt token重新登录
     * OAuth = 8 授权登陆
     */
    loginMode?: LoginMode
    /** 游客转注册用户必须提供UserId */
    userId?: string | null
    /** 用户名 */
    username?: string | null
    /** Email */
    email?: string | null
    /** 手机号 */
    mobile?: string | null
    /** 密码 */
    password?: string | null
    /** 重复密码 */
    repeatPassword?: string | null
    /** 昵称 */
    nickname?: string | null
    /** 验证码 */
    verifyCode?: string | null
    /** 安全码 */
    securityCode?: string | null
    /**
     * 来源渠道
     *     0-运营商新用户
     *     1-推广员用户 uid
     *     2-渠道推广 cid
     * @format int32
     */
    fromMode?: number
    fromId?: string | null
    imei?: string | null
    gaid?: string | null
    versionId?: string | null
    language?: string | null
    /** 用户第一次进入客户端时的url */
    clientUrl?: string | null
    os?: SystemType
    browser?: BrowserType
    isMobile?: boolean
    /**
     * 用户类型
     * s_user.UserKind
     */
    userKind?: UserKind
    meta?: any
    /** @format int32 */
    oAuthType?: number
    oAuthID?: string | null
}

export interface ReloginDto {
    userId?: string | null
    nickname?: string | null
    /**
     * 用户登录模式
     * s_user.UserMode
     */
    userMode?: UserMode
    /** 仅游客使用 */
    visitorPassword?: string | null
    /**
     * 用户类型
     * s_user.UserKind
     */
    userKind?: UserKind
    /** Jwt Token（xxyy平台和lobby共用） */
    jwtToken?: string | null
    countryId?: string | null
    currencyId?: string | null
    /** @format double */
    cash?: number
    /** @format int64 */
    coin?: number
    /** @format int64 */
    gold?: number
    /** @format int64 */
    point?: number
    /** @format int32 */
    vip?: number
    /** @format int64 */
    swb?: number
    /** @format double */
    bonus?: number
    /** 用户名 */
    username?: string | null
    /** Email */
    email?: string | null
    /** 手机号 */
    mobile?: string | null
    /** 运营平台支持的语言，null为全部 */
    operatorLangs?: string[] | null
    pUserId1?: string | null
    /** @format int32 */
    fromMode?: number
    fromId?: string | null
    /** @format date-time */
    registDate?: string
    setPass?: boolean
}

export interface ReloginIpo {
    appId?: string | null
    operatorId?: string | null
    meta?: any
    userId?: string | null
}

/** 发送验证码IPO */
export interface SendVerifyCodeIpo {
    mode?: VerifyCodeMode
    /** 验证码标识，如mobile或者email */
    id?: string | null
    operatorId?: string | null
    appId?: string | null
    langId?: string | null
}

/** @format int32 */
export enum SystemType {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
}

/**
 * 用户类型
 * s_user.UserKind
 * @format int32
 */
export enum UserKind {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
    Value4 = 4,
    Value5 = 5,
    Value6 = 6,
    Value9 = 9,
}

/**
 * 用户登录模式
 * s_user.UserMode
 * @format int32
 */
export enum UserMode {
    Value0 = 0,
    Value1 = 1,
    Value2 = 2,
    Value3 = 3,
}

/** @format int32 */
export enum VerifyCodeMode {
    Value0 = 0,
    Value1 = 1,
}
