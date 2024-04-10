/**
 * @description 组件属性
 */
export interface VisualEditorBlockData {
  /** 组件id 时间戳, 组件唯一标识 */
  _vid: string
  /** 组件所属的模块（基础组件、容器组件） */
  moduleName: keyof ComponentModules
  /** 映射 VisualEditorConfig 中 componentMap 的 component对象 */
  componentKey: string
  /** 组件标签名称 */
  label: string
  /** 当前是否为选中状态 */
  isActive: boolean
  /** 当前组件的样式 */
  styles: CSSProperties
  /** 组件的设计属性 */
  props: Record<string, any>
  /** 绑定的字段 */
  model: Record<string, string>
  /** 组件是否可以被拖拽 */
  draggable: boolean
}

/**
 * @description 页面配置
 */
export interface PageConfig {
  /** 背景图片 */
  bgImage: string
  /** 背景颜色 */
  bgColor: string
  /** 是否缓存当前页面 */
  keepAlive: boolean
}

/**
 * @description 页面对象
 */
export interface VisualEditorPage {
  /** 页面标题 */
  title: string
  /** 页面路径 */
  path: string
  /** 404是重定向到默认页面 */
  isDefault?: boolean
  /** 页面配置 */
  config: PageConfig
  /** 当前页面的所有组件 */
  blocks: VisualEditorBlockData[]
}

/**
 * @description 可以认为是 路由=>页面
 */
export interface VisualEditorPages {
  [path: string]: VisualEditorPage
}

/**
 * @description 单个组件注册规则
 */
export interface VisualEditorComponent {
  /** 组件name */
  key: string
  /** 组件所属模块名称 */
  moduleName: keyof ComponentModules
  /** 组件唯一id */
  _vid?: string
  /** 组件中文名称 */
  label: string
  /** 组件预览函数 */
  preview: () => JSX.Element
  /** 组件渲染函数 */
  render: (data: {
    props: any
    model: any
    styles: CSSProperties
    block: VisualEditorBlockData
    custom: Record<string, any>
  }) => () => JSX.Element
  /** 组件是否可以被拖拽 */
  draggable?: boolean
  /** 是否显示组件的样式配置项 */
  showStyleConfig?: boolean
  /** 组件属性 */
  props?: Record<string, VisualEditorProps>
  /** 组件样式 */
  styles?: CSSProperties
}

// 组件模块
export interface ComponentModules {
  baseWidgets: VisualEditorComponent[] // 基础组件
  containerComponents: VisualEditorComponent[] // 容器组件
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>
