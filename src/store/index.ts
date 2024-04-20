import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useVisualStorage } from '@/visual-editor/hooks/useVisualStorage'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
  useVisualStorage().init()
}

export { store }
