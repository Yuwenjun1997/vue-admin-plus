import { CSSProperties } from 'vue'

export interface VisualBoxRenderOption {
  groupId: string
  groupName: string
  options: VisualBoxOption[]
}

export type VariableType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function'

export interface VisualBoxGlobalVariable {
  name: string
  variableName: string
  valueType: VariableType
  defaultValue?: any
  description?: string
}

export type MethodTriggerType = 'click' | 'hover' | 'change' | 'input' | 'focus' | 'blur'

export interface VisualBoxGlobalMethod {
  name: string
  methodName: string
  trigger: MethodTriggerType
  methodToken: string
  params?: string
  description?: string
}

export interface VisualBoxGlobal {
  variables: VisualBoxGlobalVariable[]
  methods: VisualBoxGlobalMethod[]
}

export interface VisualBoxMethod extends Record<string, any> {}

export interface VisualBoxBindProp extends Record<string, any> {}

export interface VisualBoxBindPropOption {
  propName: string
  bindPropName: string
  propType: VariableType
  defaultValue: any
  visualBoxKey: string
}

export interface VisualBoxBindMethod {
  trigger: string
  methodName: string
  bindMethodName?: string
  methodToken: string
  visualBoxKey: string
  params?: string
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
  bindOptions?: VisualBoxOption[]
  options?: VisualBoxOption[]
  children?: VisualBasic[]
  methods?: VisualBoxMethod
  bindProps?: VisualBoxBindProp
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
  bindAble?: boolean
  bindProps?: string
}

export interface VisualBoxGroup {
  group: string
  groupName: string
  components: VisualBasic[]
}
