import { CSSProperties } from 'vue'

export type VariableType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function'
export type MethodTriggerType = 'click' | 'hover' | 'change' | 'input' | 'focus' | 'blur'
export type VisualBoxOptionTarget = 'props' | 'root' | 'customStyle' | 'layoutStyle' | 'bindMethodMap' | 'bindPropMap'

export interface VisualBoxRenderOption {
  groupId: string
  groupName: string
  options: VisualBoxOption[]
}

export interface VisualBoxGlobalVariable {
  uuid: string
  name: string
  variableName: string
  valueType: VariableType
  defaultValue?: any
  description?: string
}

export interface VisualBoxGlobalMethod {
  uuid: string
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

export interface VisualBoxBindPropOption {
  propName: string
  bindPropName: string
  propType: VariableType
  defaultValue: any
  visualBoxKey: string
}

export interface VisualBoxBindMethodOption {
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
  options?: VisualBoxOption[]
  bindOptions?: VisualBoxOption[]
  children?: VisualBasic[]
  content?: any
  bindMethodMap?: Record<string, any>
  bindPropMap?: Record<string, any>
}

export interface VisualBoxOptionItem {
  label: string
  value: string
}

export interface VisualBoxOption {
  order?: number
  formType: string
  groupName: string
  target: VisualBoxOptionTarget
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
  bindProp?: string
}

export interface VisualBoxGroup {
  group: string
  groupName: string
  components: VisualBasic[]
}
