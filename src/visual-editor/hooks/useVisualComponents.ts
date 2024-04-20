import { visualConfig } from '@/visual-editor/visual.config'

export const useVisualComponents = () => {
  const basicWidgets = computed(() => visualConfig.componentModules.basicWidgets)
  const containerWidgets = computed(() => visualConfig.componentModules.containerWidgets)

  return {
    basicWidgets,
    containerWidgets,
  }
}
