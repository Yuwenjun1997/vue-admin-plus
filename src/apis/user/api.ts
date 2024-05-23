import { http } from '@/utils/service'

const userUri = '/api/user'

export function getUserList<T = any, D = any>(data: D) {
  return http.get<T>(userUri, data)
}

export function getUserDetail<T = any, D = any>(data: D) {
  return http.get<T, D>(`${userUri}/:id`, data)
}

export function createUser<T = any, D = any>(data: D) {
  return http.post<T, D>(userUri, data)
}

export function updateUser<T = any, D = any>(data: D) {
  return http.put<T, D>(`${userUri}/:id`, data)
}

export function deleteUser<T = any, D = any>(data: D) {
  return http.delete<T, D>(`${userUri}/:id`, data)
}
