import { useGlobalProperties } from '@/visual-editor/hooks/useGlobalProperties'
import  { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorInputProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { NavBar } from 'vant'

export default {
  key: 'navbar',
  moduleName: 'basicWidgets',
  label: '导航栏',
  preview: () => (<NavBar></NavBar>),
  render: ({ props, styles, block }) => {
    const { registerRef } = useGlobalProperties()
    return () => (
      <div style={styles}>
        <NavBar ref={(el) => registerRef(el, block._vid)} {...props}></NavBar>
      </div>
    )
  },
  props: {
    title: createEditorInputProp({ label: '标题', defaultValue: '标题' }),
    leftText: createEditorInputProp({ label: '左侧文案', defaultValue: '' }),
    rightText: createEditorInputProp({ label: '右侧文案', defaultValue: '' }),
    'left-disabled':createEditorSwitchProp({ label: '是否禁用左侧按钮', defaultValue: false }),
    'right-disabled':createEditorSwitchProp({ label: '是否禁用右侧按钮', defaultValue: false }),
    'left-arrow':createEditorSwitchProp({ label: '是否显示左侧箭头', defaultValue: false }),
    border:createEditorSwitchProp({ label: '是否显示下边框', defaultValue: false }),
    fixed:createEditorSwitchProp({ label: '是否固定在顶部', defaultValue: false }),
    placeholder:createEditorSwitchProp({ label: '固定在顶部时，是否在标签位置生成一个等高的占位元素', defaultValue: false }),
    'z-index':createEditorSwitchProp({ label: '导航栏 z-index', defaultValue: false }),
    'safe-area-inset-top':createEditorSwitchProp({ label: '是否开启顶部安全区适配', defaultValue: false }),
    'clickable':createEditorSwitchProp({ label: '是否开启两侧按钮的点击反馈', defaultValue: false }),
  },
} as VisualEditorComponent
