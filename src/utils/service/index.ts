import { HttpRequest } from './request/index'
import { HttpRequestConfig } from './request/type'
import netConfig from '@/config/net.config'
import { getStorage, removeStorage } from '../storage'
import { useMessageBox } from '@/hooks/useMessageBox'
import { router } from '@/router/index'

const { alert, error } = useMessageBox()

export interface ResponseData<T = any> {
  timestamp: number
  status: string
  message: string
  data: T
}

const handleRestful = (config: HttpRequestConfig) => {
  const url = config.url || ''
  const keys: string[] = []
  const method = config.method || 'GET'
  const relpace = (path: string, source: Record<string, any>) => {
    return path.replace(/:(\w+)/g, (_, key) => {
      keys.push(key)
      return source[key]
    })
  }
  if (['GET', 'DELETE'].includes(method.toUpperCase())) {
    config.url = relpace(url, config.params || {})
    keys.forEach((key) => delete config.params[key])
  }
  if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    config.url = relpace(url, config.data || {})
    keys.forEach((key) => delete config.data[key])
  }
}

export const httpRequest = new HttpRequest<ResponseData, any>({
  baseURL: netConfig.baseUrl,
  timeout: netConfig.timeout,
  interceptors: {
    requestInterceptor(config) {
      handleRestful(config)
      const token = getStorage(netConfig.tokenName)
      config.headers.set('Authorization', `Bearer ${token}`)
      config.headers.set('Content-Type', 'application/json')
      return config
    },
    responseInterceptor(response) {
      return response
    },
    responseInterceptorCatch(error) {
      return Promise.reject(error)
    },
  },
})

const handleHttpError = (response: ResponseData) => {
  httpRequest.cancelAllRequest()
  const code = Number(response.status)
  if (code === 4001 || code === 4002) {
    alert('登录已过期，请重新登录', '提示', { showCancelButton: false }).then(() => {
      router.replace({ name: 'Login' })
      removeStorage(netConfig.tokenName)
    })
  } else if (code === 4003) {
    alert('暂无访问权限，是否重新登录', '提示').then(() => {
      removeStorage(netConfig.tokenName)
    })
  } else {
    error(response.message || '请求失败')
  }
}

const baseRequest = async <T = any, D = any, R extends ResponseData<T> = ResponseData<T>>(
  config: HttpRequestConfig<R, D>
) => {
  try {
    const { data } = await httpRequest.request<R, D>(config)
    const status = Number(data.status)
    if (!netConfig.successCode.includes(status)) {
      handleHttpError(data)
      return Promise.reject(data)
    } else {
      return Promise.resolve(data)
    }
  } catch (error: any) {
    if (error.response.data) {
      handleHttpError(error.response.data)
    }
    return Promise.reject(error)
  }
}

export const http = {
  get<T = any, D = any>(url: string, params?: D) {
    return baseRequest<T, D>({ url, method: 'GET', params })
  },
  post<T = any, D = any>(url: string, data?: D) {
    return baseRequest<T, D>({ url, method: 'POST', data })
  },
  put<T = any, D = any>(url: string, data?: D) {
    return baseRequest<T, D>({ url, method: 'PUT', data })
  },
  delete<T = any, D = any>(url: string, params?: D) {
    return baseRequest<T, D>({ url, method: 'DELETE', params })
  },
  patch<T = any, D = any>(url: string, data?: D) {
    return baseRequest<T, D>({ url, method: 'PATCH', data })
  },
}
