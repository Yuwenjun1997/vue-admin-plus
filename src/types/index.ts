export interface Menu {
  title: string
  path: string
  icon: string
  children?: Menu[]
}

export interface TabsItem {
  label: string
  icon: string
}

export interface TagView {
  title: string
  name: string
  icon?: string
  isFixed?: boolean
  noCache?: boolean
  path?: string
  fullPath?: string
  params?: Record<string, any>
  query?: Record<string, any>
}
