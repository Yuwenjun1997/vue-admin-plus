import Cookies from 'js-cookie'

const ThemeKey = 'Admin-Theme-Config'

export function getThemeConfig() {
  return Cookies.get(ThemeKey)
}

export function setThemeConfig(themeConfig: string) {
  return Cookies.set(ThemeKey, themeConfig)
}

export function removeThemeConfig() {
  return Cookies.remove(ThemeKey)
}
