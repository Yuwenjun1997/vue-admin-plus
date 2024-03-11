import { App } from 'vue'
import VisualText from './basics/VisualText.vue'
import VisualBoxRender from './basics/VisualBoxRender.vue'
import VisualBox from './basics/VisualBox.vue'

export function setupVisual(app: App) {
  app.component('VisualBox', VisualBox)
  app.component('VisualBoxRender', VisualBoxRender)
  app.component('VisualText', VisualText)
}
