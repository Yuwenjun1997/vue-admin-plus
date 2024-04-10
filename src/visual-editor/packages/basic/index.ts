import type { VisualEditorComponent } from '@/visual-editor/types'

const modules = import.meta.glob('./*/index.tsx', { eager: true })

const components: Record<string, VisualEditorComponent> = {}

Object.entries(modules).forEach(([key, module]) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1')
  components[name] = (module as any)?.default || module
})

console.log(components, 'base-widgets')
export default components
