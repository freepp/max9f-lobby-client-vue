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
    AddLobbyBankIpo,
    BetRecordDayIpo,
    BetRecordDetailIpo,
    BetRecordDto,
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
    DeleteBankIpo,
    DepositOrWithdrawDto,
    DepositOrWithdrawIpo,
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
    TejeePayBankListDto,
    TejeePayBankListIpo,
    UserRecordsIpo,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Profile<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Profile
     * @name ProfileCashLoadCreate
     * @summary 提现页面加载
     * @request POST:/api/Profile/CashLoad
     * @secure
     */
    profileCashLoadCreate = (data: CashLoadIpo, params: RequestParams = {}) =>
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
     * @name ProfileFormCreate
     * @summary 个人信息表单模板
     * @request POST:/api/Profile/Form
     * @secure
     */
    profileFormCreate = (data: PersonalInfoFormIpo, params: RequestParams = {}) =>
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
     * @name ProfileInfoCreate
     * @summary 获取个人信息
     * @request POST:/api/Profile/Info
     * @secure
     */
    profileInfoCreate = (data: GetPersonIpo, params: RequestParams = {}) =>
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
     * @name ProfileModifyCreate
     * @summary 更新个人信息
     * @request POST:/api/Profile/Modify
     * @secure
     */
    profileModifyCreate = (data: PersonalInfoIpo, params: RequestParams = {}) =>
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
     * @name ProfileHubtelChannelsCreate
     * @summary 获取手机钱包支付渠道（加纳）
     * @request POST:/api/Profile/HubtelChannels
     * @secure
     */
    profileHubtelChannelsCreate = (data: HubtelChannelsIpo, params: RequestParams = {}) =>
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
     * @name ProfileHubtelDepositCreate
     * @summary Hubtel充值（加纳）
     * @request POST:/api/Profile/HubtelDeposit
     * @secure
     */
    profileHubtelDepositCreate = (data: DepositOrWithdrawIpo, params: RequestParams = {}) =>
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
     * @name ProfileHubtelWithdrawCreate
     * @summary Hubtel提现（加纳）
     * @request POST:/api/Profile/HubtelWithdraw
     * @secure
     */
    profileHubtelWithdrawCreate = (data: DepositOrWithdrawIpo, params: RequestParams = {}) =>
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
     * @name ProfileAddBraUserCreate
     * @summary 充值时补充用户tax信息
     * @request POST:/api/Profile/AddBraUser
     * @secure
     */
    profileAddBraUserCreate = (data: BraUserIpo, params: RequestParams = {}) =>
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
     * @name ProfileAddLobbyBankCreate
     * @summary 添加、更新银行卡（兼容墨西哥 + 巴西）
     * @request POST:/api/Profile/AddLobbyBank
     * @secure
     */
    profileAddLobbyBankCreate = (data: AddLobbyBankIpo, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Profile/AddLobbyBank`,
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
     * @name ProfileSingleBankCreate
     * @summary 获取单条银行卡信息
     * @request POST:/api/Profile/SingleBank
     * @secure
     */
    profileSingleBankCreate = (data: BraBankQueryIpo, params: RequestParams = {}) =>
        this.request<BraBankQueryDto, any>({
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
     * @name ProfileGetBanksCreate
     * @summary 巴西银行卡列表
     * @request POST:/api/Profile/GetBanks
     * @secure
     */
    profileGetBanksCreate = (data: BraBankQueryIpo, params: RequestParams = {}) =>
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
     * @name ProfileChannelBankListCreate
     * @summary 获取支付渠道支持的银行列表
     * @request POST:/api/Profile/ChannelBankList
     * @secure
     */
    profileChannelBankListCreate = (data: TejeePayBankListIpo, params: RequestParams = {}) =>
        this.request<TejeePayBankListDto, any>({
            path: `/api/Profile/ChannelBankList`,
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
     * @name ProfileDeleteLobbyBankCreate
     * @summary 删除银行卡
     * @request POST:/api/Profile/DeleteLobbyBank
     * @secure
     */
    profileDeleteLobbyBankCreate = (data: DeleteBankIpo, params: RequestParams = {}) =>
        this.request<boolean, any>({
            path: `/api/Profile/DeleteLobbyBank`,
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
     * @name ProfileDepositCreate
     * @summary 充值
     * @request POST:/api/Profile/Deposit
     * @secure
     */
    profileDepositCreate = (data: BraDepositIpo, params: RequestParams = {}) =>
        this.request<BraDepositDto, any>({
            path: `/api/Profile/Deposit`,
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
     * @name ProfileWithdrawCreate
     * @summary 提现
     * @request POST:/api/Profile/Withdraw
     * @secure
     */
    profileWithdrawCreate = (data: BraWithDrawIpo, params: RequestParams = {}) =>
        this.request<BraWithDrawDto, any>({
            path: `/api/Profile/Withdraw`,
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
     * @name ProfileBraDepositCreate
     * @summary 巴西充值
     * @request POST:/api/Profile/BraDeposit
     * @deprecated
     * @secure
     */
    profileBraDepositCreate = (data: BraDepositIpo, params: RequestParams = {}) =>
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
     * @name ProfileBraWithDrawCreate
     * @summary 巴西提现
     * @request POST:/api/Profile/BraWithDraw
     * @deprecated
     * @secure
     */
    profileBraWithDrawCreate = (data: BraWithDrawIpo, params: RequestParams = {}) =>
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
     * @name ProfileSpeiDepositCreate
     * @summary Spei充值
     * @request POST:/api/Profile/SpeiDeposit
     * @secure
     */
    profileSpeiDepositCreate = (data: SpeiDepositIpo, params: RequestParams = {}) =>
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
     * @name ProfileCashConfirmCreate
     * @summary 提现确认
     * @request POST:/api/Profile/CashConfirm
     * @secure
     */
    profileCashConfirmCreate = (data: SpeiWithdrawIpo, params: RequestParams = {}) =>
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
     * @name ProfileSpeiWithdrawCreate
     * @summary Spei提现（审批版）
     * @request POST:/api/Profile/SpeiWithdraw
     * @secure
     */
    profileSpeiWithdrawCreate = (data: SpeiWithdrawIpo, params: RequestParams = {}) =>
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
     * @name ProfileSpeiBanksCreate
     * @summary 获取Spei支持的银行列表
     * @request POST:/api/Profile/SpeiBanks
     * @secure
     */
    profileSpeiBanksCreate = (data: SpeiBanksIpo, params: RequestParams = {}) =>
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
     * @name ProfileGetOrderCreate
     * @summary 获取订单信息
     * @request POST:/api/Profile/GetOrder
     * @secure
     */
    profileGetOrderCreate = (data: OrderIpo, params: RequestParams = {}) =>
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
     * @name ProfilePayRecordsCreate
     * @summary 用户充值记录
     * @request POST:/api/Profile/PayRecords
     * @secure
     */
    profilePayRecordsCreate = (data: UserRecordsIpo, params: RequestParams = {}) =>
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
     * @name ProfileCashRecordsCreate
     * @summary 用户提现记录
     * @request POST:/api/Profile/CashRecords
     * @secure
     */
    profileCashRecordsCreate = (data: UserRecordsIpo, params: RequestParams = {}) =>
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
     * @name ProfileBonusRecordsCreate
     * @summary Bonus奖励记录
     * @request POST:/api/Profile/BonusRecords
     * @secure
     */
    profileBonusRecordsCreate = (data: UserRecordsIpo, params: RequestParams = {}) =>
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
     * @name ProfileBetRecordsDayCreate
     * @summary 查询下注记录明细，（单位：天）
     * @request POST:/api/Profile/BetRecordsDay
     * @secure
     */
    profileBetRecordsDayCreate = (data: BetRecordDayIpo, params: RequestParams = {}) =>
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
     * @name ProfileBetRecordsDetailCreate
     * @summary 查询下注记录明细，（单位：每一笔下注）
     * @request POST:/api/Profile/BetRecordsDetail
     * @secure
     */
    profileBetRecordsDetailCreate = (data: BetRecordDetailIpo, params: RequestParams = {}) =>
        this.request<BetRecordDto, any>({
            path: `/api/Profile/BetRecordsDetail`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}
