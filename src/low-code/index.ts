export interface VisualDesignConfig {
  schema: VisualSchema
}

export interface VisualSchema {
  _vid: string
  type: string
  properties?: Record<string, VisualBlockProperty>
}

export interface VisualBlockProperty {
  _vid: string
  _vindex: number
  type: string
  title: string
  decorator?: string
  component: string
  validator?: any[]
  componentProps?: Record<string, any>
  decoratorProps?: Record<string, any>
  properties?: Record<string, VisualBlockProperty>
}

export interface VisualBlockData {
  _vid: string
  _vindex: number
  type: string
  title: string
  decorator?: string
  component: string
  componentProps?: Record<string, any>
  decoratorProps?: Record<string, any>
  children: VisualBlockData[]
}
