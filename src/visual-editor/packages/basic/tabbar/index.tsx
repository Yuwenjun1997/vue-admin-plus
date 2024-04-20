import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { useVisualRef } from '@/visual-editor/hooks/useVisualRef'
import { VisualEditorComponent } from '@/visual-editor/types'
import { createEditorInputNumberProp, createEditorSwitchProp } from '@/visual-editor/visual-editor.props'
import { Tabbar, TabbarItem } from 'vant'

export default {
  key: 'navbar',
  moduleName: 'basicWidgets',
  label: '标签栏',
  preview: () => <div>标签栏</div>,
  render: ({ styles, block }) => {
    const { registerRef } = useVisualRef()
    const { genProps } = useVisualProps()
    const { genEvents } = useVisualEvents()

    const props = computed(() => genProps(block))
    const events = computed(() => genEvents(block))

    return () => (
      <div style={styles}>
        <Tabbar ref={(el) => registerRef(el, block._vid)} {...props.value} {...events.value}>
          <TabbarItem icon="home-o">标签</TabbarItem>
          <TabbarItem icon="search">标签</TabbarItem>
          <TabbarItem icon="friends-o">标签</TabbarItem>
          <TabbarItem icon="setting-o">标签</TabbarItem>
        </Tabbar>
      </div>
    )
  },
  props: {
    fixedBottom: createEditorSwitchProp({ label: '是否固定在顶部', defaultValue: true }),
    zIndex: createEditorInputNumberProp({ label: '标签栏 z-index' }),
  },
} as VisualEditorComponent
