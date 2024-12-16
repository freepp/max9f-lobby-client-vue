import { ContentType, HttpClient, RequestParams } from './http-client'

export class Request<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    initOperatorApp = (data: any, params: RequestParams = {}) =>
        this.request<any, any>({
            //path: `/xxyy/api/InitApp/InitOperatorApp`,
            path: `/api/InitApp/InitOperatorApp`,
            method: 'POST',
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        })
    initXxyyJson = () =>
        this.fetchRequest(`xxyy.json?v=${Math.random()}`, {
            method: 'GET'
        })
}