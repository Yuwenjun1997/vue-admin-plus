import { setupVisual } from '@/components/VisualComponents'
import VisualBox2Render from '@/components/VisualComponents/render/VisualBox2Render.vue'

export function renderVisualBox() {
  const mountEl = document.createElement('div')
  const app = createApp({
    render: () => h(VisualBox2Render),
  })
  setupVisual(app)
  app.mount(mountEl)
  return mountEl.innerHTML
}
