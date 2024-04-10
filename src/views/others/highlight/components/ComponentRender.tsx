import { defineComponent, h } from 'vue'
import baseWidgets from '../packages/base-widgets/index'

console.log(baseWidgets)

export default defineComponent({
  name: 'ComponentRender',
  props: {
    element: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          styles: props.element.styles || {},
          props: props.element.props || {},
          model: {},
          block: props.element,
          custom: {},
        },
        props.element.name
      )
  },
})
