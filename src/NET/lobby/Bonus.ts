import { PayAmounts } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Bonus<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Success
     * @name GetPayAmounts
     * @summary 获取支付落地页信息
     * @request POST:/api/Home/GetPayAmountsByTimeLimit
     * @secure
     */
    GetPayAmounts = (data: PayAmounts, params: RequestParams = {}) =>
        this.request<any, any>({
            path: `/api/Home/GetPayAmountsByTimeLimit`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            format: 'json',
            ...params,
        })
}