import { http } from '@/utils/service'

const authLogin = '/api/auth/login'

export function userLogin<T, D>(data: D) {
  return http.post<T, D>(authLogin, data)
}
