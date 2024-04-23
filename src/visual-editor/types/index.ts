import { CSSProperties } from 'vue'
import { VisualEditorSelectOptions } from '../visual-editor.props'
import { createVisualEditorConfig } from '../visual-editor.utils'

export type VisualBlockSlotData = {
  index: number
  props: Record<string, any>
  children: VisualEditorBlockData[]
}

export type VisualBlockSlot = {
  [prop: string]: any
}

export type VisualBlockSlotMap = Record<string, VisualBlockSlotData>

export type VisualBlockProps = Record<string, any>

export type VisualEditorSourceData = {
  label: string
  value: Record<string, VisualEditorProps> | Record<string, VisualEditorProps>[]
  createHandler?: () => Record<string, VisualEditorProps>
}

export type VisualEditorSourceDataMap = Record<string, VisualEditorSourceData>

export type VisualSourceData = Record<string, any> | Record<string, any>[]

export type VisualSourceDataMap = Record<string, VisualSourceData>

// 组件属性编辑类型
export enum VisualEditorPropsType {
  input = 'input',
  inputNumber = 'InputNumber',
  cssInput = 'cssInput',
  color = 'colorPicker',
  select = 'select',
  switch = 'switch',
  table = 'table',
  image = 'image',
  options = 'options',
}

export type VisualEditorTableOption = {
  options: {
    label: string // 列显示文本
    field: string // 列绑定的字段
  }[]
  showKey: string
}

// 组件属性编辑配置
export type VisualEditorProps = {
  type: VisualEditorPropsType
  label: string
  tips?: string
  labelPosition?: string
  defaultValue?: any
  reactive?: boolean
} & {
  options?: VisualEditorSelectOptions
  multiple?: boolean
} & {
  max?: number
  min?: number
} & {
  table?: VisualEditorTableOption
}

// 组件事件编辑配置
export type VisualEditorEvent = {
  label: string
  eventName: string
}

export type VisualEventName = 'routerEvent' | 'apiEvent' // 内置事件名称

// 组件事件绑定内容
export type VisualEventData = {
  _vid?: string
  key: string // 绑定事件名称
  custom: boolean // 是否自定义事件
  methodToken: string // 自定义事件内容
  eventName?: VisualEventName // 内置事件名称
  eventParams: Record<string, any> // 内置事件参数
  description: string // 事件描述
}

// 组件事件绑定
export type VisualBlockEventMap = Record<string, VisualEventData[]>

// 组件属性
export type VisualEditorBlockData = {
  _vid: string
  moduleName: keyof ComponentModules
  componentKey: string
  label: string
  isActive: boolean
  styles: CSSProperties
  props: VisualBlockProps
  draggable: boolean
  slots: VisualBlockSlotMap
  events: VisualBlockEventMap
  bindProps: Record<string, VisualBindProp>
  sourceData: VisualSourceDataMap
  slotEditable: boolean
}

// 页面配置
export type PageConfig = {
  bgImage: string
  bgColor: string
  bgRepeat: boolean
}

// 页面对象
export type VisualEditorPage = {
  parentId?: string
  pageId: string
  title: string
  path: string
  isDefault?: boolean
  config: PageConfig
  blocks: VisualEditorBlockData[]
  store?: Record<string, any>
}

// 可以认为是 路由=>页面
export type VisualEditorPages = {
  [path: string]: VisualEditorPage
}

// 单个组件注册规则
export type VisualEditorComponent = {
  key: string
  moduleName: keyof ComponentModules
  label: string
  preview: () => JSX.Element
  render: (data: {
    styles: CSSProperties
    block: VisualEditorBlockData
    slots: VisualBlockSlotMap
    sourceData: VisualSourceDataMap
  }) => () => JSX.Element
  draggable?: boolean
  props?: Record<string, VisualEditorProps>
  styles?: CSSProperties
  slots?: Record<string, VisualEditorProps>[]
  createSlotHandler?: () => Record<string, VisualEditorProps>
  addSlot?: () => void
  deleteSlot?: (index: number) => void
  initSlotsOptions?: (slotMap: VisualBlockSlotMap) => void
  events?: VisualEditorEvent[]
  bindProps?: Record<string, VisualBindProp>
  sourceData?: VisualEditorSourceDataMap
  slotEditable?: boolean
}

// 组件模块
export type ComponentModules = {
  basicWidgets: VisualEditorComponent[] // 基础组件
  containerWidgets: VisualEditorComponent[] // 容器组件
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>

export type VisualBindProp = {
  propName: string
  bindSourceKey?: 'global' | 'currentPage'
  bindProp?: string
}
