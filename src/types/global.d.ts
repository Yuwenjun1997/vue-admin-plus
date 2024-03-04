import type { ComponentPublicInstance, FunctionalComponent } from 'vue'

declare global {
  declare type Recordable<T = any> = Record<string, T>
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module 'vue-router' {
  interface RouteMeta {
    menuId: string
    title: string
    icon?: string
    cache?: boolean
    tabFixed?: boolean
    layout?: string
    component?: string
  }
}
