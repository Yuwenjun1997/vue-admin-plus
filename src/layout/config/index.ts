import type { ThemeColorMap, ThemeConfig } from '@/layout/types'

// class类名前缀
export const prefixCls: string = 'vad-'

// 主题样式
const themeColorMap: ThemeColorMap = {
  light: [
    {
      key: '--el-color-primary',
      percent: 0,
      mixType: 'light',
      value: '',
    },
    {
      key: '--el-color-primary-light-3',
      percent: 30,
      mixType: 'light',
      value: '',
    },
    {
      key: '--el-color-primary-light-5',
      percent: 50,
      mixType: 'light',
      value: '',
    },
    {
      key: '--el-color-primary-light-7',
      percent: 70,
      mixType: 'light',
      value: '',
    },
    {
      key: '--el-color-primary-light-8',
      percent: 80,
      mixType: 'light',
      value: '',
    },
    {
      key: '--el-color-primary-light-9',
      percent: 90,
      mixType: 'light',
      value: '',
    },
    {
      key: '--el-color-primary-dark-2',
      percent: 20,
      mixType: 'dark',
      value: '',
    },
  ],
  dark: [
    {
      key: '--el-color-primary',
      percent: 0,
      mixType: 'dark',
      value: '',
    },
    {
      key: '--el-color-primary-light-3',
      percent: 30,
      mixType: 'dark',
      value: '',
    },
    {
      key: '--el-color-primary-light-5',
      percent: 50,
      mixType: 'dark',
      value: '',
    },
    {
      key: '--el-color-primary-light-7',
      percent: 70,
      mixType: 'dark',
      value: '',
    },
    {
      key: '--el-color-primary-light-8',
      percent: 80,
      mixType: 'dark',
      value: '',
    },
    {
      key: '--el-color-primary-light-9',
      percent: 90,
      mixType: 'dark',
      value: '',
    },
    {
      key: '--el-color-primary-dark-2',
      percent: 20,
      mixType: 'light',
      value: '',
    },
  ],
}

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  /**
   * 主题颜色
   */
  themeColor: '#409eff',

  /**
   * 菜单是否收起
   */
  menuCollapse: false,

  /**
   * 菜单宽度
   */
  menuWidth: 200,

  /**
   * logo宽度
   */
  logoWidth: 60,

  /**
   * 显示菜单
   */
  showMenu: true,

  /**
   * 显示标签栏
   */
  showNavbarTags: true,

  /**
   * 显示标签栏图标
   */
  showNavbarTagsIcon: true,

  /**
   * 显示工具栏
   */
  hideToolbar: true,

  /**
   * 显示面包屑
   */
  showBreadcrumb: true,

  /**
   * 显示水印
   */
  showWatermark: false,

  /**
   * 水印内容
   */
  watermarkContent: 'vue admin plus',

  /**
   * 水印颜色
   */
  watermarkColor: 'rgba(0,0,0,.15)',

  /**
   * 水印大小
   */
  watermarkFontSize: 16,

  /**
   * 主题颜色
   */
  themeColorMap: themeColorMap,
}

// css属性键
export const ThemeCssProperty = {
  SPACING_XS: `--${prefixCls}spacing-xs`,
  SPACING_SM: `--${prefixCls}spacing-sm`,
  SPACING_MD: `--${prefixCls}spacing-md`,
  LOGO_WIDTH: `--${prefixCls}logo-width`,
  LOGO_HEIGHT: `--${prefixCls}logo-height`,
  COLUMN_BAR_TABS_WIDTH: `--${prefixCls}column-bar-tabs-width`,
  COLUMN_BAR_TABS_BG_COLOR: `--${prefixCls}column-bar-tabs-bg-color`,
  NAV_HEIGHT: `--${prefixCls}nav-height`,
  TABS_HEIGHT: `--${prefixCls}tabs-height`,
  MENU_WIDTH: `--${prefixCls}menu-width`,
}
