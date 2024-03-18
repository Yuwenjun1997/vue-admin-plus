import { CSSProperties } from 'vue'

export interface VisualBoxRenderOption {
  groupId: string
  groupName: string
  options: VisualBoxOption[]
}

export interface VisualBasic<T = any> {
  visualBoxKey: string
  visualBoxParentKey?: string
  visualBoxGroup?: string
  visualBoxName?: string
  visualBoxCover?: string
  visualBoxIcon?: string
  showTools?: boolean
  isDraggable?: boolean
  isDeletable?: boolean
  isEditable?: boolean
  isRoot?: boolean
  isActive?: boolean
  isLocked?: boolean
  disabled?: boolean
  style?: CSSProperties // 不可修改的样式
  layoutStyle?: CSSProperties // 用于控制布局的样式
  layoutClassList?: string[]
  customStyle?: CSSProperties // 自定义的样式
  customClassList?: string[]
  component?: string
  props?: T
  propsOptions?: VisualBoxOption[]
  options?: VisualBoxOption[]
  children?: VisualBasic[]
}

export interface VisualBoxOptionItem {
  label: string
  value: string
}

export interface VisualBoxOption {
  order?: number
  formType: string
  groupName: string
  target: 'props' | 'root' | 'customStyle' | 'layoutStyle'
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
