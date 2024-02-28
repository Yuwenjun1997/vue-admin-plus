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
