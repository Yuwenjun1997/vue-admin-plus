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

export interface VisualBasic<T = Record<string, any>> {
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
  visualLayoutStyle?: CSSProperties // 不可修改且不会出现在生成的代码之中的样式
  visualStyle?: CSSProperties // 不可修改且不会出现在生成的代码之中的样式
  style?: CSSProperties // 不可修改的样式
  layoutStyle?: CSSProperties // 用于控制布局的样式
  customStyle?: CSSProperties // 自定义的样式
  layoutClassList?: string[]
  customClassList?: string[]
  props?: T
  options?: VisualBoxOption[]
  bindOptions?: VisualBoxOption[]
  bindMethodMap?: Record<string, any>
  bindPropMap?: Record<string, any>
  componentType?: 'element' | 'visual'
  component?: string // 优先级最高
  children?: VisualBasic[] // 第二优先级
  content?: any // 第三优先级
  noWrapper?: boolean // 是否不渲染容器
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
  description?: string
}

export interface VisualBoxGroup {
  group: string
  groupName: string
  components: VisualBasic[]
}
