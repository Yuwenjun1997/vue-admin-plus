/**
 * @description 将内容保存到本地存储
 * @param key string
 * @param value any
 */
export function setStorage(key: string, value: string | object) {
  const val = typeof value === 'string' ? value : JSON.stringify(value)
  window.localStorage.setItem(key, val)
}

/**
 * @description 读取本地存储的内容
 * @param key string
 * @param clearFlag boolean 获取完内容后是否立即删除
 */
export function getStorage(key: string, clearFlag: boolean = false) {
  const val = window.localStorage.getItem(key)
  if (clearFlag) window.localStorage.removeItem(key)
  try {
    return JSON.parse(val || '')
  } catch (error) {
    return val
  }
}

/**
 * @description 清空本地存储的内容
 */
export function clearStorage() {
  window.localStorage.clear()
}

/**
 * @description 删除本地储存的内容
 * @param key 要删除的key
 */
export function removeStorage(key: string) {
  window.localStorage.removeItem(key)
}
