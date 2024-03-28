import { setupVisual } from '@/components/VisualComponents'
import VisualBox2Render from '@/components/VisualComponents/render/VisualBox2Render.vue'

export function renderVisualBox(el?: HTMLElement) {
  const mountEl = el || document.createElement('div')
  const app = createApp({
    render: () => h(VisualBox2Render),
  })
  setupVisual(app)
  app.mount(mountEl)
  // 清除所有的注释
  return mountEl.innerHTML.replace(/<!--[\s\S]*?-->/g, '')
}
