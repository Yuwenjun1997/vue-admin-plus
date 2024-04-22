import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { useVisualRef } from '@/visual-editor/hooks/useVisualRef'
import { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { NavBar } from 'vant'

export default {
  key: 'navbar',
  moduleName: 'basicWidgets',
  label: '导航栏',
  preview: () => (
    <NavBar style={{ width: '100%' }} leftArrow leftText="返回" rightText="按钮" title="标题" border></NavBar>
  ),
  render: ({ styles, block }) => {
    const { registerRef } = useVisualRef()
    const { genProps } = useVisualProps()
    const { genEvents } = useVisualEvents()

    const props = computed(() => {
      const bindProps = genProps(block)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { fixedTop, zIndex, safeAreaInsetTop, ...reset } = bindProps
      return reset
    })

    const events = computed(() => genEvents(block))

    return () => (
      <div style={styles}>
        <NavBar
          ref={(el) => registerRef(el, block._vid)}
          {...props.value}
          {...events.value}
          style={{ flex: 1 }}
        ></NavBar>
      </div>
    )
  },
  props: {
    title: createEditorInputProp({ label: '标题', defaultValue: '标题' }),
    leftText: createEditorInputProp({ label: '左侧文案', defaultValue: '返回' }),
    rightText: createEditorInputProp({ label: '右侧文案', defaultValue: '按钮' }),
    leftDisabled: createEditorSwitchProp({ label: '是否禁用左侧按钮', defaultValue: false }),
    rightDisabled: createEditorSwitchProp({ label: '是否禁用右侧按钮', defaultValue: false }),
    leftArrow: createEditorSwitchProp({ label: '是否显示左侧箭头', defaultValue: true }),
    border: createEditorSwitchProp({ label: '是否显示下边框', defaultValue: true }),
    fixedTop: createEditorSwitchProp({ label: '是否固定在顶部', defaultValue: true }),
    // placeholder: createEditorSwitchProp({ label: '固定在顶部时，生成一个等高的占位元素', defaultValue: true }),
    zIndex: createEditorInputNumberProp({ label: '导航栏 z-index' }),
    safeAreaInsetTop: createEditorSwitchProp({ label: '是否开启顶部安全区适配', defaultValue: false }),
    clickable: createEditorSwitchProp({ label: '是否开启两侧按钮的点击反馈', defaultValue: true }),
  },
  events: [
    { label: '点击左侧按钮时触发', eventName: 'click-left' },
    { label: '点击右侧按钮时触发', eventName: 'click-right' },
  ],
} as VisualEditorComponent
