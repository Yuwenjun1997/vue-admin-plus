import { CSSProperties } from 'vue'

export type VariableType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function'
export type MethodTriggerType = 'click' | 'hover' | 'change' | 'input' | 'focus' | 'blur'
export type VisualBoxOptionTarget =
  | 'props'
  | 'root'
  | 'customStyle'
  | 'normalStyle'
  | 'bindMethodMap'
  | 'bindPropMap'
  | 'customMethod'

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
  layoutStyle?: CSSProperties // 布局样式最终不会附加到生成的组件上
  normalStyle?: CSSProperties // 不可修改的样式
  customStyle?: CSSProperties // 自定义的样式
  customClassList?: string[]
  props?: T
  options?: VisualBoxOption[]
  bindOptions?: VisualBoxOption[]
  bindMethodMap?: Record<string, any> // 绑定事件的键值对
  bindPropMap?: Record<string, any> // 绑定属性的键值对
  customMethod?: Record<string, any> // 自定义事件
  componentType?: 'element' | 'visual'
  component?: string // 组件名
  children?: VisualBasic[] // 第一优先级
  content?: any // 第二优先级
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
  bindMehodName?: string
  description?: string
}

export interface VisualBoxGroup {
  group: string
  groupName: string
  components: VisualBasic[]
}
