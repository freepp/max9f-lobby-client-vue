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
    ChangeMobileIpo,
    ChangeNicknameIpo,
    ChangePasswordIpo,
    CheckVerifyCodeDto,
    CheckVerifyCodeIpo,
    ForgotPasswordIpo,
    LoginDto,
    LoginIpo,
    RefreshJwtTokenIpo,
    RegisterDto,
    RegisterIpo,
    ReloginDto,
    ReloginIpo,
    SendVerifyCodeIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Account<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
 * No description
 *
 * @tags Account
 * @name SendVerifyCode
 * @summary 发送验证码
SMSLimited - 短信验证码发送限制（频繁）
 * @request POST:/api/Account/SendVerifyCode
 * @secure
 */
    sendVerifyCode = (data: SendVerifyCodeIpo, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Account/SendVerifyCode`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
 * No description
 *
 * @tags Account
 * @name CheckVerifyCode
 * @summary 验证验证码
VerifyCodeError - 验证码错误
 * @request POST:/api/Account/CheckVerifyCode
 * @secure
 */
    checkVerifyCode = (data: CheckVerifyCodeIpo, params: RequestParams = {}) =>
        this.request<CheckVerifyCodeDto, any>({
            path: `/api/Account/CheckVerifyCode`,
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
 * @tags Account
 * @name Register
 * @summary 新用户注册
NicknameExist - 注册时Nickname已存在
PasswordDifferent - 注册时密码不一致
SecurityCodeErr - 安全码错误
MobileExist - 注册时登录Mobile已存在
UsernameExist - 注册时登录用户名已存在
EmailExist - 注册时登录Email已存在
UsernameInvalid
RS_PUSER_NOT_EXISTS - 推广用户不存在
 * @request POST:/api/Account/Register
 * @secure
 */
    register = (data: RegisterIpo, params: RequestParams = {}) =>
        this.request<RegisterDto, any>({
            path: `/api/Account/Register`,
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
 * @tags Account
 * @name Login
 * @summary 登录
MobileNotExist - mobile不存在
UserStatusError - 用户状态异常
LoginErrorLimit - 登录错误次数过多，等待30分钟
UserPasswordError - 登录密码错误
UsernameInvalid
 * @request POST:/api/Account/Login
 * @secure
 */
    login = (data: LoginIpo, params: RequestParams = {}) =>
        this.request<LoginDto, any>({
            path: `/api/Account/Login`,
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
     * @tags Account
     * @name Relogin
     * @summary 重新登陆
     * @request POST:/api/Account/Relogin
     * @secure
     */
    relogin = (data: ReloginIpo, params: RequestParams = {}) =>
        this.request<ReloginDto, any>({
            path: `/api/Account/Relogin`,
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
 * @tags Account
 * @name RefreshJwtToken
 * @summary 刷新JwtToken
G_JwtTokenInvalid - 无效的token
G_JwtTokenExpired - 过期的token
 * @request POST:/api/Account/RefreshJwtToken
 * @secure
 */
    refreshJwtToken = (data: RefreshJwtTokenIpo, params: RequestParams = {}) =>
        this.request<string, any>({
            path: `/api/Account/RefreshJwtToken`,
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
 * @tags Account
 * @name ChangePassword
 * @summary 修改密码
UserPasswordError - 登录密码错误
 * @request POST:/api/Account/ChangePassword
 * @secure
 */
    changePassword = (data: ChangePasswordIpo, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Account/ChangePassword`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
 * No description
 *
 * @tags Account
 * @name ChangeMobile
 * @summary 修改手机号和重置密码
MobileExist -- Mobile已存在
 * @request POST:/api/Account/ChangeMobile
 * @secure
 */
    changeMobile = (data: ChangeMobileIpo, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Account/ChangeMobile`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
 * No description
 *
 * @tags Account
 * @name ChangeNickname
 * @summary 修改昵称
NicknameInvalid
NicknameExist
 * @request POST:/api/Account/ChangeNickname
 * @secure
 */
    changeNickname = (data: ChangeNicknameIpo, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Account/ChangeNickname`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
 * No description
 *
 * @tags Account
 * @name ForgotPassword
 * @summary 忘记密码
MobileNotExist - mobile不存在
SecurityCodeErr - 安全码错误
 * @request POST:/api/Account/ForgotPassword
 * @secure
 */
    forgotPassword = (data: ForgotPasswordIpo, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Account/ForgotPassword`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    /**
     * No description
     *
     * @tags Account
     * @name Loginout
     * @summary 退出登录
     * @request GET:/api/Account/Loginout
     * @secure
     */
    loginout = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Account/Loginout`,
            method: 'GET',
            secure: true,
            ...params,
        })
}
