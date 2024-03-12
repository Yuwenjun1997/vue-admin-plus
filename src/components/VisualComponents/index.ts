import { App } from 'vue'

const moudules = import.meta.glob('./**/*.vue', { eager: true })
const pattern = /([^/\\]+)\.vue$/

export function setupVisual(app: App) {
  Object.keys(moudules).forEach((key) => {
    const mod = (moudules[key] as any).default
    const match = key.match(pattern)
    if (match) app.component(match[1], mod)
  })
}
