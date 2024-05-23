import type { AxiosInstance } from 'axios'
import type {
  HttpRequestConfig,
  HttpRequestInterceptors,
  HttpRequestOptions,
  HttpRequestResponse,
  InternalHttpRequestConfig,
} from './type'
import axios, { AxiosHeaders } from 'axios'
import qs from 'qs'

export class HttpRequest<T = any, D = any> {
  /**
   * axios请求实例
   */
  private instance: AxiosInstance

  /**
   * 请求拦截器
   */
  private interceptors?: HttpRequestInterceptors<T, D>

  /**
   * 取消请求
   */
  static abortControllerMap: Map<string, AbortController> = new Map()

  constructor(config: HttpRequestOptions<T, D>) {
    this.interceptors = config.interceptors
    this.instance = axios.create(config)
    this.interceptorsExec()
  }

  /**
   * 生成requestKey
   */
  static createRequestKey(config: HttpRequestConfig) {
    const { method, url, params, data } = config
    return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
  }

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    HttpRequest.abortControllerMap.forEach((abortController) => {
      abortController.abort()
    })
    HttpRequest.abortControllerMap.clear()
  }

  /**
   * 默认请求拦截器
   */
  requestInterceptor(config: InternalHttpRequestConfig<T, D>) {
    if (!config.headers) {
      config.headers = new AxiosHeaders()
    }
    const controller = new AbortController()
    config.signal = controller.signal
    config.requestKey = HttpRequest.createRequestKey(config)
    HttpRequest.abortControllerMap.get(config.requestKey)?.abort() // 取消重复请求
    HttpRequest.abortControllerMap.set(config.requestKey, controller)
    return config
  }

  /**
   * 默认请求错误拦截器
   */
  requestInterceptorCatch(error: any) {
    return error
  }

  /**
   * 默认响应拦截器
   */
  responseInterceptor(response: HttpRequestResponse<T, D>) {
    if (response.config.requestKey) {
      HttpRequest.abortControllerMap.delete(response.config.requestKey)
    }
    return response
  }

  /**
   * 默认响应失败拦截器
   */
  responseInterceptorCatch(error: any) {
    return Promise.reject(error)
  }

  /**
   * 实例请求拦截器
   */
  interceptorsExec() {
    this.instance.interceptors.request.use(this.requestInterceptor, this.requestInterceptorCatch)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.response.use(this.responseInterceptor, this.responseInterceptorCatch)
  }

  /**
   * 发起请求
   */
  request<T, D>(config: HttpRequestConfig<T, D>): Promise<HttpRequestResponse<T, D>> {
    if (config.interceptors?.requestPrevInterceptor) {
      config = config.interceptors.requestPrevInterceptor(config)
    }
    return new Promise((reslove, reject) => {
      this.instance
        .request<T, HttpRequestResponse<T, D>, D>(config)
        .then((response) => {
          if (config.interceptors?.responseInterceptor) {
            reslove(config.interceptors.responseInterceptor(response))
          } else {
            reslove(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
