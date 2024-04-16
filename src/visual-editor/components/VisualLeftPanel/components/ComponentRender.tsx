import { PropType, defineComponent } from 'vue'
import type { VisualEditorComponent } from '@/visual-editor/types'

export default defineComponent({
  name: 'ComponentPreviewRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorComponent>,
      default: () => ({}),
    },
  },
  setup(props) {
    return props.element.preview
  },
})
