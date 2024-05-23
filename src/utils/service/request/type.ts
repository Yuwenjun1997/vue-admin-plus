import type { CreateAxiosDefaults, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

/**
 * 拦截适配器
 */
export interface HttpRequestInterceptors<T = any, D = any> {
  requestInterceptor?: (config: InternalHttpRequestConfig<T, D>) => InternalHttpRequestConfig<T, D>
  requestPrevInterceptor?: (config: HttpRequestConfig<T, D>) => HttpRequestConfig<T, D>
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: HttpRequestResponse<T, D>) => HttpRequestResponse<T, D>
  responseInterceptorCatch?: (error: any) => any
}

/**
 * 实例初始化配置
 */
export interface HttpRequestOptions<T = any, D = any> extends CreateAxiosDefaults<D> {
  interceptors?: HttpRequestInterceptors<T, D>
}

/**
 * 拦截器配置
 */
export interface InternalHttpRequestConfig<T = any, D = any> extends HttpRequestConfig<T, D> {
  headers: AxiosRequestHeaders
}

/**
 * 请求配置
 */
export interface HttpRequestConfig<T = any, D = any> extends AxiosRequestConfig<D> {
  requestKey?: string
  interceptors?: HttpRequestInterceptors<T, D>
}

/**
 * 响应数据
 */
export interface HttpRequestResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: InternalHttpRequestConfig<T, D>
}
