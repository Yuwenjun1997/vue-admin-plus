import { http } from '@/utils/service'

const menuUri = '/api/menu'

export function getMenuList<T = any, D = any>(data: D) {
  return http.get<T>(menuUri, data)
}

export function getMenuTree<T = any, D = any>(data?: D) {
  return http.get<T>(`${menuUri}/tree`, data)
}

export function getMenuDetail<T = any, D = any>(data: D) {
  return http.get<T, D>(`${menuUri}/:id`, data)
}

export function createMenu<T = any, D = any>(data: D) {
  return http.post<T, D>(menuUri, data)
}

export function updateMenu<T = any, D = any>(data: D) {
  return http.put<T, D>(`${menuUri}/:id`, data)
}

export function deleteMenu<T = any, D = any>(data: D) {
  return http.delete<T, D>(`${menuUri}/:id`, data)
}
