import { CSSProperties } from 'vue'
import { VisualEditorSelectOptions } from '../visual-editor.props'
import { createVisualEditorConfig } from '../visual-editor.utils'

// 组件属性编辑类型
export enum VisualEditorPropsType {
  input = 'input',
  inputNumber = 'InputNumber',
  cssInput = 'cssInput',
  color = 'colorPicker',
  select = 'select',
  switch = 'switch',
}

// 组件属性编辑配置
export type VisualEditorProps = {
  type: VisualEditorPropsType
  label: string
  tips?: string
  labelPosition?: string
  defaultValue?: any
} & {
  options?: VisualEditorSelectOptions
  multiple?: boolean
} & {
  max?: number
  min?: number
}

// 组件属性
export type VisualEditorBlockData = {
  _vid: string
  moduleName: keyof ComponentModules
  componentKey: string
  label: string
  isActive: boolean
  styles: CSSProperties
  props: Record<string, any>
  model: Record<string, string>
  draggable: boolean
}

// 页面配置
export type PageConfig = {
  bgImage: string
  bgColor: string
  keepAlive: boolean
}

// 页面对象
export type VisualEditorPage = {
  title: string
  path: string
  isDefault?: boolean
  config: PageConfig
  blocks: VisualEditorBlockData[]
}

// 可以认为是 路由=>页面
export type VisualEditorPages = {
  [path: string]: VisualEditorPage
}

// 单个组件注册规则
export type VisualEditorComponent = {
  key: string
  moduleName: keyof ComponentModules
  _vid?: string
  label: string
  preview: () => JSX.Element
  render: (data: {
    props: any
    model: any
    styles: CSSProperties
    block: VisualEditorBlockData
    custom: Record<string, any>
  }) => () => JSX.Element
  draggable?: boolean
  showStyleConfig?: boolean
  props?: Record<string, VisualEditorProps>
  styles?: CSSProperties
}

// 组件模块
export type ComponentModules = {
  basicWidgets: VisualEditorComponent[] // 基础组件
  containerWidgets: VisualEditorComponent[] // 容器组件
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>
