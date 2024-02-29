export interface ThemeConfig {
  /**
   * 主题颜色
   */
  themeColor: string
  /**
   * 主题设置弹窗
   */
  showThemeSetting: boolean

  /**
   * 菜单是否收起
   */
  menuCollapse: boolean

  /**
   * 菜单宽度
   */
  menuWidth: number

  /**
   * 显示菜单
   */
  showMenu: boolean

  /**
   * 分栏宽度
   */
  subfieldWidth: number

  /**
   * 显示分栏
   */
  showSubfield: boolean

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
   * 显示水印
   */
  showWatermark: boolean

  /**
   * 水印内容
   */
  watermarkContent: string | string[]

  /**
   * 主题颜色
   */
  themeColorMap: ThemeColorMap
}

export type ThemeColorProperty =
  | '--el-color-primary'
  | '--el-color-primary-light-3'
  | '--el-color-primary-light-5'
  | '--el-color-primary-light-7'
  | '--el-color-primary-light-8'
  | '--el-color-primary-light-9'
  | '--el-color-primary-dark-2'
  | '--xy-layout-navbar-tags-height'
  | '--xy-layout-aside-left-width'

export interface ColorMap {
  key: ThemeColorProperty
  percent: number
  mixType: 'light' | 'dark'
  value: string
}

export interface ThemeColorMap {
  light: ColorMap[]
  dark: ColorMap[]
}
