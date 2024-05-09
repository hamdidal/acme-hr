import { AxiosResponse } from 'axios'
import { EmptyObject } from 'react-hook-form'

export type Service<ServiceParams> = (params: ServiceParams) => Promise<AxiosResponse>

export type NoServiceData = EmptyObject
export type NoServiceParams = EmptyObject

export interface PagedResultDto<T> {
    totalCount: number
    items: T[]
}

export interface PagedRequestDto {
    pageSize: number
    page: number
    search?: string
}

export type RequestParams<T> = {
    queryKey: [string, { params: T }]
}
