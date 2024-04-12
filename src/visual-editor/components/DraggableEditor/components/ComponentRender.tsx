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
      props: props.element.props || {},
      model: {},
      block: props.element,
      custom: {},
      slots: props.element.slots,
    })
  },
})