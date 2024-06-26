import { RouteMeta } from 'vue-router'

export interface ThemeConfig {
  /**
   * 主题颜色
   */
  themeColor: string

  /**
   * 菜单是否收起
   */
  menuCollapse: boolean

  /**
   * 菜单宽度
   */
  menuWidth: number

  /**
   * logo宽度
   */
  logoWidth: number

  /**
   * 显示菜单
   */
  showMenu: boolean

  /**
   * 显示标签栏
   */
  showNavbarTags: boolean

  /**
   * 显示标签栏图标
   */
  showNavbarTagsIcon: boolean

  /**
   * 显示工具栏
   */
  hideToolbar: boolean

  /**
   * 显示面包屑
   */
  showBreadcrumb: boolean

  /**
   * 显示面包屑图标
   */
  showBreadcrumbIcon: boolean

  /**
   * 显示水印
   */
  showWatermark: boolean

  /**
   * 水印内容
   */
  watermarkContent: string | string[]

  /**
   * 水印颜色
   */
  watermarkColor: string

  /**
   * 水印大小
   */
  watermarkFontSize: number

  /**
   * 主题颜色
   */
  themeColorMap: ThemeColorMap
}

export interface ColorMap {
  key: string
  percent: number
  mixType: 'light' | 'dark'
  value: string
}

export interface ThemeColorMap {
  light: ColorMap[]
  dark: ColorMap[]
}

export interface MenuMeta extends RouteMeta {}

export interface MenuOption {
  name: string
  path: string
  redirect?: string
  meta: MenuMeta
  children?: MenuOption[]
}

export interface BreadcrumbOption extends MenuOption {}

export enum CommandEnums {
  refresh = 'refresh',
  closeOther = 'closeOther',
  closeLeft = 'closeLeft',
  closeRight = 'closeRight',
  closeAll = 'closeAll',
}
