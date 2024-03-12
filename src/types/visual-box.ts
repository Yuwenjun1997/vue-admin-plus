import { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export enum VisualBoxTemplateType {}

export interface VisualBoxTemplateRenderOption<T = any> {
  formControlType: string
  label: string
  property: keyof T
  value?: any
  options?: any
  required?: boolean
  rule?: any
}

export interface VisualBoxTemplateRender<T = any> {
  component?: string
  props?: T
  options?: VisualBoxTemplateRenderOption<T>[]
}

export interface VisualBoxTemplateOption<T = any> {
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
  render?: VisualBoxTemplateRender<T>
  layoutStyle?: CSSProperties
  layoutClassList?: string[]
  style?: CSSProperties
  classList?: string[]
  children?: VisualBoxTemplate[]
}

export class VisualBoxTemplate<T = any> implements VisualBoxTemplateOption<T> {
  visualBoxKey: string = uuidv4()
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
  render?: VisualBoxTemplateRender<T>
  layoutStyle?: CSSProperties
  layoutClassList?: string[]
  style?: CSSProperties
  classList?: string[]
  children?: VisualBoxTemplate[]
}

export interface VisualBoxComponents {
  type: string
  title: string
  components: VisualBoxTemplate[]
}
