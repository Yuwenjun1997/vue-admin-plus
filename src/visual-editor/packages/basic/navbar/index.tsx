import { useGlobalProperties } from '@/visual-editor/hooks/useGlobalProperties'
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
    <NavBar
      style={{
        width: '100%',
        '--van-nav-bar-title-font-size': '10px',
        '--van-nav-bar-arrow-size': '10px',
        '--van-padding-md': '2px',
        '--van-font-size-md': '10px',
        '--van-nav-bar-height': '26px',
        '--van-nav-bar-background': '#f9f9f9',
      }}
      leftArrow
      leftText="返回"
      rightText="按钮"
      title="标题"
      border
    ></NavBar>
  ),
  render: ({ props, styles, block }, isDesinger) => {
    const { registerRef } = useGlobalProperties()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { fixed, zIndex, safeAreaInsetTop, ...reset } = props
    const bindProps = isDesinger ? reset : props
    return () => (
      <div style={styles}>
        <NavBar ref={(el) => registerRef(el, block._vid)} {...bindProps} placeholder style={{ flex: 1 }}></NavBar>
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
    fixed: createEditorSwitchProp({ label: '是否固定在顶部', defaultValue: true }),
    // placeholder: createEditorSwitchProp({ label: '固定在顶部时，生成一个等高的占位元素', defaultValue: true }),
    zIndex: createEditorInputNumberProp({ label: '导航栏 z-index' }),
    safeAreaInsetTop: createEditorSwitchProp({ label: '是否开启顶部安全区适配', defaultValue: false }),
    clickable: createEditorSwitchProp({ label: '是否开启两侧按钮的点击反馈', defaultValue: true }),
  },
  fixed: true,
} as VisualEditorComponent
