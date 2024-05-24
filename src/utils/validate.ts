/**
 * 是否是手机号
 */
export function isMobile(mobile: string) {
  return /^1[3-9]\d{9}$/.test(mobile)
}

/**
 * 是否是邮箱
 */
export function isEmail(email: string) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
}

/**
 * 是否是合法用户名（英文大小写+数字）
 */
export function isUsername(username: string) {
  return /^[a-zA-Z0-9_-]{5,16}$/.test(username)
}

/**
 * 是否合法昵称（中文+英文大小写+数字）
 */
export function isNickname(nickname: string) {
  return /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(nickname)
}

/**
 * 是否是合法菜单名称（中文+英文大小写+数字）
 */
export function isMenuTitle(menuTitle: string) {
  return /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(menuTitle)
}

/**
 * 是否是合法路由名称（英文大小写）
 */
export function isRouteName(routeName: string) {
  return /^[a-zA-Z]+$/.test(routeName)
}

/**
 * 是否是合法路由路径
 */
export function isRoutePath(routePath: string) {
  return /^[a-zA-Z0-9_\-\\/:]+$/.test(routePath)
}

/**
 * 是否是合法组件路径
 */
export function isComponentPath(componentPath: string) {
  return /^@\/views\/[a-zA-Z0-9_\-\\/]+\.vue$/.test(componentPath)
}
