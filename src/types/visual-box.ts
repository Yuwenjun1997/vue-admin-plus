export interface VisualBoxTemplateRender {
  type: string
}

export interface VisualBoxTemplate {
  visualBoxKey: string
  isRoot?: boolean
  isActive?: boolean
  children?: VisualBoxTemplate[]
  render?: VisualBoxTemplateRender
}
