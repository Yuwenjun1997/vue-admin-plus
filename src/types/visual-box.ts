import { CSSProperties } from 'vue'

export enum VisualBoxTemplateType {}

export interface VisualBoxOption {
  formControlType: string
  label: string
  property: any
  value?: any
  options?: any
  required?: boolean
  rule?: any
  disabled?: boolean
}

export interface VisualBoxOptionItem {
  title: string
  target: string
  options: VisualBoxOption[]
}

export interface VisualBoxTemplate<T = any> {
  visualBoxKey: string
  visualBoxName?: string
  visualBoxType?: VisualBoxTemplateType
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
  propOptions?: VisualBoxOption[]
  options?: VisualBoxOptionItem[]
  children?: VisualBoxTemplate[]
}

export interface VisualBoxComponents {
  type: string
  title: string
  components: VisualBoxTemplate[]
}
