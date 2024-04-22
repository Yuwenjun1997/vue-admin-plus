import { PropType, defineComponent } from 'vue'
import type { VisualEditorBlockData } from '@/visual-editor/types'
import { visualConfig } from '@/visual-editor/visual.config'

export default defineComponent({
  name: 'ComponentRender',
  props: {
    element: {
      type: Object as PropType<VisualEditorBlockData>,
      default: () => ({}),
    },
  },
  setup(props) {
    return visualConfig.componentMap[props.element.componentKey].render({
      styles: props.element.styles || {},
      block: props.element,
      slots: props.element.slots,
      sourceData: props.element.sourceData || {},
    })
  },
})
