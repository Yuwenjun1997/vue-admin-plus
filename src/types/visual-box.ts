import { CSSProperties } from 'vue'

export interface VisualBoxRenderOption {
  groupId: string
  groupName: string
  options: VisualBoxOption[]
}

export interface VisualBasic<T = any> {
  visualBoxKey: string
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
  layoutStyle?: CSSProperties
  layoutClassList?: string[]
  style?: CSSProperties
  classList?: string[]
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
  formType: string
  groupName: string
  target: 'style' | 'props' | 'root'
  label: string
  property: string
  value?: any
  options?: VisualBoxOptionItem[]
  disabled?: boolean
  required?: boolean
}

export interface VisualBoxGroup {
  group: string
  groupName: string
  components: VisualBasic[]
}
