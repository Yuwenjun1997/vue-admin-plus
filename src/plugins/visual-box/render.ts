import { setupVisual } from '@/components/VisualComponents'
import VisualBox2Render from '@/components/VisualComponents/render/VisualBox2Render.vue'
import { setupElementPlus } from '../element-ui'

export function renderVisualBox(el?: HTMLElement) {
  const mountEl = el || document.createElement('div')
  const app = createApp({
    render: () => h(VisualBox2Render),
  })
  setupVisual(app)
  el && setupElementPlus(app)
  app.mount(mountEl)
  // 清除所有的注释
  return mountEl.innerHTML.replace(/<!--[\s\S]*?-->/g, '')
}
