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

import { HttpClient, RequestParams } from './http-client'

export class Test<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Test
     * @name TestDiagnosticsList
     * @request GET:/api/Test/Diagnostics
     * @secure
     */
    testDiagnosticsList = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/Test/Diagnostics`,
            method: 'GET',
            secure: true,
            ...params,
        })
    /**
     * No description
     *
     * @tags Test
     * @name TestProcessesList
     * @request GET:/api/Test/Processes
     * @secure
     */
    testProcessesList = (params: RequestParams = {}) =>
        this.request<string[], any>({
            path: `/api/Test/Processes`,
            method: 'GET',
            secure: true,
            format: 'json',
            ...params,
        })
    /**
     * No description
     *
     * @tags Test
     * @name TestDumpList
     * @request GET:/api/Test/Dump
     * @secure
     */
    testDumpList = (
        query?: {
            /** @format int32 */
            processId?: number
            /**
             * @format int32
             * @default 4
             */
            dumpType?: number
        },
        params: RequestParams = {}
    ) =>
        this.request<string, any>({
            path: `/api/Test/Dump`,
            method: 'GET',
            query: query,
            secure: true,
            format: 'json',
            ...params,
        })
}
