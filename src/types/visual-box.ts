import { CSSProperties } from 'vue'

export interface VisualBoxTemplateRender {
  component: string
}

export interface VisualBoxTemplate {
  visualBoxKey: string
  showTools?: boolean
  isDraggable?: boolean
  isDeletable?: boolean
  isRoot?: boolean
  isActive?: boolean
  render?: VisualBoxTemplateRender
  layoutStyle?: CSSProperties
  style?: CSSProperties
  children?: VisualBoxTemplate[]
}
