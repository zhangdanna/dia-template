import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth'
import type { ApiResponse } from '@/api/types'
import router from '@/router'

// 待处理请求：用于取消重复请求
const pendingMap = new Map<string, AbortController>()

function genKey(config: AxiosRequestConfig): string {
  return [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
}

function addPending(config: AxiosRequestConfig): void {
  removePending(config)
  const controller = new AbortController()
  config.signal = config.signal ?? controller.signal
  pendingMap.set(genKey(config), controller)
}

function removePending(config: AxiosRequestConfig): void {
  const controller = pendingMap.get(genKey(config))
  if (controller) {
    controller.abort()
    pendingMap.delete(genKey(config))
  }
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    addPending(config)
    const token = getToken()
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error) => Promise.reject(error),
)

let isReloginShown = false

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    removePending(response.config)
    const body = response.data
    if (body.code === 0 || body.code === 200) {
      return response
    }
    if (body.code === 401) {
      handleRelogin()
      return Promise.reject(new Error(body.message || '登录已过期'))
    }
    ElMessage.error(body.message || '请求失败')
    return Promise.reject(new Error(body.message || '请求失败'))
  },
  (error) => {
    if (error?.name === 'CanceledError' || error?.message === 'canceled') {
      return Promise.reject(error)
    }
    let message = '网络异常，请稍后重试'
    if (error?.response) {
      const status = error.response.status
      if (status === 401) {
        handleRelogin()
        return Promise.reject(new Error('登录已过期'))
      }
      message = error.response.data?.message || `请求错误 (${status})`
    } else if (error?.code === 'ECONNABORTED') {
      message = '请求超时'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

function handleRelogin(): void {
  if (isReloginShown) return
  isReloginShown = true
  ElMessageBox.confirm('登录状态已过期，请重新登录', '提示', {
    type: 'warning',
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
  })
    .then(() => {
      removeToken()
      router.push({ path: '/login' })
    })
    .catch(() => {})
    .finally(() => {
      isReloginShown = false
    })
}

export async function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  const res = await service.request<ApiResponse<T>>(config)
  return res.data.data
}

export default service
