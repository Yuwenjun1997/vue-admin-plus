import { CSSProperties } from 'vue'

export interface VisualBoxRenderOption {
  groupId: string
  groupName: string
  options: VisualBoxOption[]
}

export interface VisualBoxMethod extends Record<string, any> {}

export interface VisualBoxBindProp {
  propName: string
  propType: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function'
  defaultValue?: any
  bindPropName?: string
  visualBoxKey?: string
}

export interface VisualBoxBindMethod {
  trigger: string
  methodName: string
  bindMethodName?: string
  methodToken: string
  visualBoxKey: string
}

export interface VisualBasic<T = any> {
  visualBoxKey: string
  visualBoxParentKey?: string
  visualBoxGroup?: string
  visualBoxName?: string
  visualBoxCover?: string
  visualBoxIcon?: string
  isDeletable?: boolean
  isEditable?: boolean
  isRoot?: boolean
  isLocked?: boolean
  disabled?: boolean
  style?: CSSProperties // 不可修改的样式
  layoutStyle?: CSSProperties // 用于控制布局的样式
  layoutClassList?: string[]
  customStyle?: CSSProperties // 自定义的样式
  customClassList?: string[]
  component?: string
  componentType?: 'element' | 'visual'
  props?: T
  propsOptions?: VisualBoxOption[]
  options?: VisualBoxOption[]
  children?: VisualBasic[]
  methods?: VisualBoxMethod
  bindProps?: VisualBoxBindProp[]
}

export interface VisualBoxOptionItem {
  label: string
  value: string
}

export interface VisualBoxOption {
  order?: number
  formType: string
  groupName: string
  target: 'props' | 'root' | 'customStyle' | 'layoutStyle' | 'methods'
  label: string
  property: string
  value?: any
  options?: VisualBoxOptionItem[]
  disabled?: boolean
  required?: boolean
  trueValue?: any
  falseValue?: any
  step?: number
  min?: number
  max?: number
}

export interface VisualBoxGroup {
  group: string
  groupName: string
  components: VisualBasic[]
}
