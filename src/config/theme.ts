import { ThemeColorMap, ThemeConfig } from '@/types/theme'

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

const defaultTheme: ThemeConfig = {
  /**
   * 主题设置弹窗
   */
  showThemeSetting: false,

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
  menuWidth: 240,

  /**
   * 显示菜单
   */
  showMenu: true,

  /**
   * 分栏宽度
   */
  subfieldWidth: 60,

  /**
   * 显示分栏
   */
  showSubfield: true,

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
   * 主题颜色
   */
  themeColorMap: themeColorMap,
}

export default defaultTheme
