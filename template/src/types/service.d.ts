/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'axios-observable'
import { Observable } from 'rxjs'

interface ExtendAxiosRequestConfig extends AxiosRequestConfig {
  meta: { name: string }
}

export declare class AxiosOverload extends Axios {
  static request<T = unknown>(config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  static get<T = unknown>(url: string, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  static post<T = unknown>(url: string, data?: unknown, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  static put<T = unknown>(url: string, data?: unknown, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  static patch<T = unknown>(url: string, data?: unknown, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  static delete<T = unknown>(url: string, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  static head<T = unknown>(url: string, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  request<T = unknown>(config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  get<T = unknown>(url: string, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  head<T = unknown>(url: string, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  post<T = unknown>(url: string, data?: unknown, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  put<T = unknown>(url: string, data?: unknown, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  patch<T = unknown>(url: string, data?: unknown, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
  delete<T = unknown>(url: string, config: ExtendAxiosRequestConfig): Observable<AxiosResponse<T>>
}

export interface ServiceRequest<T = unknown> {
  (args?: T): Observable<AxiosResponse['data']>
}

export interface Service<T = unknown> {
  [key: string]: ServiceRequest<T>
}

export interface Reducer {
  [key: string]: any
}
