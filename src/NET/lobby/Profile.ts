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
    AddBankInfoIpo,
    BankInfosDto,
    BetRecordDayIpo,
    BetRecordDetailIpo,
    BetRecordDto,
    BRAAddBankIpo,
    BraBankQueryDto,
    BraBankQueryIpo,
    BraDepositDto,
    BraDepositIpo,
    BraUserIpo,
    BraWithDrawDto,
    BraWithDrawIpo,
    CashConfirmDto,
    CashLoadDto,
    CashLoadIpo,
    DepositOrWithdrawDto,
    DepositOrWithdrawIpo,
    GetBankInfosIpo,
    GetPersonIpo,
    HubtelChannelsIpo,
    OrderDto,
    OrderIpo,
    PayCashRecordsDto,
    PersonalInfoDto,
    PersonalInfoFormDto,
    PersonalInfoFormIpo,
    PersonalInfoIpo,
    SpeiBanksDto,
    SpeiBanksIpo,
    SpeiDepositDto,
    SpeiDepositIpo,
    SpeiDepositOrWithdrawDto,
    SpeiWithdrawIpo,
    UserCurrentActivityDto,
    UserCurrentActivityIpo,
    UserRecordsIpo,
    UserVipInfoDto,
    UserVipInfoIpo,
    OrderResponseIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Profile<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Profile
     * @name CashLoad
     * @summary 提现页面加载
     * @request POST:/api/Profile/CashLoad
     * @secure
     */
    cashLoad = (data: CashLoadIpo, params: RequestParams = {}) =>
        this.request<CashLoadDto, any>({
            path: `/api/Profile/CashLoad`,
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
     * @tags Profile
     * @name Form
     * @summary 个人信息表单模板
     * @request POST:/api/Profile/Form
     * @secure
     */
    form = (data: PersonalInfoFormIpo, params: RequestParams = {}) =>
        this.request<PersonalInfoFormDto[], any>({
            path: `/api/Profile/Form`,
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
     * @tags Profile
     * @name Info
     * @summary 获取个人信息
     * @request POST:/api/Profile/Info
     * @secure
     */
    info = (data: GetPersonIpo, params: RequestParams = {}) =>
        this.request<PersonalInfoDto, any>({
            path: `/api/Profile/Info`,
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
     * @tags Profile
     * @name Modify
     * @summary 更新个人信息
     * @request POST:/api/Profile/Modify
     * @secure
     */
    modify = (data: PersonalInfoIpo, params: RequestParams = {}) =>
        this.request<PersonalInfoDto, any>({
            path: `/api/Profile/Modify`,
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
     * @tags Profile
     * @name GetBanks
     * @summary 查询用户银行卡列表
     * @request POST:/api/Profile/GetBanks
     * @secure
     */
    getBanks = (data: GetBankInfosIpo, params: RequestParams = {}) =>
        this.request<BankInfosDto[], any>({
            path: `/api/Profile/GetBanks`,
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
     * @tags Profile
     * @name AddBank
     * @summary 用户添加\更新银行卡
     * @request POST:/api/Profile/AddBank
     * @secure
     */
    addBank = (data: AddBankInfoIpo, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Profile/AddBank`,
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
     * @tags Profile
     * @name SingleBank
     * @summary 获取一条银行卡信息
     * @request POST:/api/Profile/SingleBank
     * @secure
     */
    singleBank = (data: GetBankInfosIpo, params: RequestParams = {}) =>
        this.request<BankInfosDto, any>({
            path: `/api/Profile/SingleBank`,
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
     * @tags Profile
     * @name HubtelChannels
     * @summary 获取手机钱包支付渠道（加纳）
     * @request POST:/api/Profile/HubtelChannels
     * @secure
     */
    hubtelChannels = (data: HubtelChannelsIpo, params: RequestParams = {}) =>
        this.request<string[], any>({
            path: `/api/Profile/HubtelChannels`,
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
     * @tags Profile
     * @name HubtelDeposit
     * @summary Hubtel充值（加纳）
     * @request POST:/api/Profile/HubtelDeposit
     * @secure
     */
    hubtelDeposit = (data: DepositOrWithdrawIpo, params: RequestParams = {}) =>
        this.request<DepositOrWithdrawDto, any>({
            path: `/api/Profile/HubtelDeposit`,
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
     * @tags Profile
     * @name HubtelWithdraw
     * @summary Hubtel提现（加纳）
     * @request POST:/api/Profile/HubtelWithdraw
     * @secure
     */
    hubtelWithdraw = (data: DepositOrWithdrawIpo, params: RequestParams = {}) =>
        this.request<DepositOrWithdrawDto, any>({
            path: `/api/Profile/HubtelWithdraw`,
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
     * @tags Profile
     * @name AddBraUser
     * @summary 充值时补充用户tax信息
     * @request POST:/api/Profile/AddBraUser
     * @secure
     */
    addBraUser = (data: BraUserIpo, params: RequestParams = {}) =>
        this.request<string, any>({
            path: `/api/Profile/AddBraUser`,
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
     * @tags Profile
     * @name AddBraBank
     * @summary 巴西添加、更新银行卡
     * @request POST:/api/Profile/AddBraBank
     * @secure
     */
    addBraBank = (data: BRAAddBankIpo, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Profile/AddBraBank`,
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
     * @tags Profile
     * @name SingleBraBank
     * @summary 获取单条银行卡信息
     * @request POST:/api/Profile/SingleBraBank
     * @secure
     */
    singleBraBank = (data: BraBankQueryIpo, params: RequestParams = {}) =>
        this.request<BraBankQueryDto, any>({
            path: `/api/Profile/SingleBraBank`,
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
     * @tags Profile
     * @name GetBraBanks
     * @summary 巴西银行卡列表
     * @request POST:/api/Profile/GetBraBanks
     * @secure
     */
    getBraBanks = (data: BraBankQueryIpo, params: RequestParams = {}) =>
        this.request<BraBankQueryDto[], any>({
            path: `/api/Profile/GetBanks`,
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
     * @tags Profile
     * @name BraDeposit
     * @summary 巴西充值
     * @request POST:/api/Profile/BraDeposit
     * @secure
     */
    braDeposit = (data: BraDepositIpo, params: RequestParams = {}) =>
        this.request<BraDepositDto, any>({
            path: `/api/Profile/BraDeposit`,
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
     * @tags Profile
     * @name BraWithDraw
     * @summary 巴西提现
     * @request POST:/api/Profile/BraWithDraw
     * @secure
     */
    braWithDraw = (data: BraWithDrawIpo, params: RequestParams = {}) =>
        this.request<BraWithDrawDto, any>({
            path: `/api/Profile/BraWithDraw`,
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
     * @tags Profile
     * @name SpeiDeposit
     * @summary Spei充值
     * @request POST:/api/Profile/SpeiDeposit
     * @secure
     */
    speiDeposit = (data: SpeiDepositIpo, params: RequestParams = {}) =>
        this.request<SpeiDepositDto, any>({
            path: `/api/Profile/SpeiDeposit`,
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
     * @tags Profile
     * @name CashConfirm
     * @summary 提现确认
     * @request POST:/api/Profile/CashConfirm
     * @secure
     */
    cashConfirm = (data: SpeiWithdrawIpo, params: RequestParams = {}) =>
        this.request<CashConfirmDto, any>({
            path: `/api/Profile/CashConfirm`,
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
     * @tags Profile
     * @name SpeiWithdraw
     * @summary Spei提现（审批版）
     * @request POST:/api/Profile/SpeiWithdraw
     * @secure
     */
    speiWithdraw = (data: SpeiWithdrawIpo, params: RequestParams = {}) =>
        this.request<SpeiDepositOrWithdrawDto, any>({
            path: `/api/Profile/SpeiWithdraw`,
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
     * @tags Profile
     * @name SpeiBanks
     * @summary 获取Spei支持的银行列表
     * @request POST:/api/Profile/SpeiBanks
     * @secure
     */
    speiBanks = (data: SpeiBanksIpo, params: RequestParams = {}) =>
        this.request<SpeiBanksDto[], any>({
            path: `/api/Profile/SpeiBanks`,
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
     * @tags Profile
     * @name GetOrder
     * @summary 获取订单信息
     * @request POST:/api/Profile/GetOrder
     * @secure
     */
    getOrder = (data: OrderIpo, params: RequestParams = {}) =>
        this.request<OrderDto, any>({
            path: `/api/Profile/GetOrder`,
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
     * @tags Profile
     * @name PayRecords
     * @summary 用户充值记录
     * @request POST:/api/Profile/PayRecords
     * @secure
     */
    payRecords = (data: UserRecordsIpo, params: RequestParams = {}) =>
        this.request<PayCashRecordsDto[], any>({
            path: `/api/Profile/PayRecords`,
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
     * @tags Profile
     * @name CashRecords
     * @summary 用户提现记录
     * @request POST:/api/Profile/CashRecords
     * @secure
     */
    cashRecords = (data: UserRecordsIpo, params: RequestParams = {}) =>
        this.request<PayCashRecordsDto[], any>({
            path: `/api/Profile/CashRecords`,
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
     * @tags Profile
     * @name BonusRecords
     * @summary Bonus奖励记录
     * @request POST:/api/Profile/BonusRecords
     * @secure
     */
    bonusRecords = (data: UserRecordsIpo, params: RequestParams = {}) =>
        this.request<PayCashRecordsDto[], any>({
            path: `/api/Profile/BonusRecords`,
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
     * @tags Profile
     * @name BetRecordsDay
     * @summary 查询下注记录明细，（单位：天）
     * @request POST:/api/Profile/BetRecordsDay
     * @secure
     */
    betRecordsDay = (data: BetRecordDayIpo, params: RequestParams = {}) =>
        this.request<BetRecordDto, any>({
            path: `/api/Profile/BetRecordsDay`,
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
     * @tags Profile
     * @name BetRecordsDetail
     * @summary 查询下注记录明细，（单位：每一笔下注）
     * @request POST:/api/Profile/BetRecordsDetail
     * @secure
     */
    betRecordsDetail = (data: BetRecordDetailIpo, params: RequestParams = {}) =>
        this.request<BetRecordDto, any>({
            path: `/api/Profile/BetRecordsDetail`,
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
     * @tags Profile
     * @name GetCurrentActivity
     * @summary 获取用户当前还未参加的第一个活动
     * @request POST:/api/Profile/GetCurrentActivity
     * @secure
     */
    getCurrentActivity = (data: UserCurrentActivityIpo, params: RequestParams = {}) =>
        this.request<UserCurrentActivityDto, any>({
            path: `/api/Profile/GetCurrentActivity`,
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
     * @tags Profile
     * @name GetVipInfo
     * @summary 获取用户vip相关信息
     * @request POST:/api/Profile/GetVipInfo
     * @secure
     */
    getVipInfo = (data: UserVipInfoIpo, params: RequestParams = {}) =>
        this.request<UserVipInfoDto, any>({
            path: `/api/Profile/GetVipInfo`,
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
     * @tags Profile
     * @name OrderResponse
     * @summary 巴西充值-复制上报
     * @request POST:/api/Profile/OrderResponse
     * @secure
     */
    orderResponse = (data: OrderResponseIpo, params: RequestParams = {}) =>
      this.request<BraDepositDto, any>({
          path: `/api/Profile/OrderResponse`,
          method: 'POST',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
      })
}
