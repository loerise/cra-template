/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

export type ISteam = AxiosResponse['data']

export type IServiceResponse = Observable<ISteam>

export interface IServiceRequest<T = any> {
  (...args: T[]): IServiceResponse
}

export type IService = Record<string, IServiceRequest>
export type IReducer = Record<string, any>
