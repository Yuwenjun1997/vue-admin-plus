import { PropType, defineComponent } from 'vue'
import type { VisualEditorBlockData } from '@/visual-editor/types'
import { visualConfig } from '@/visual-editor/visual.config'

export default defineComponent({
  name: 'ComponentPreviewRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({}),
    },
  },
  setup(props) {
    return visualConfig.componentMap[props.element.componentKey].preview
  },
})
