import { useGlobalProperties } from '@/visual-editor/hooks/useGlobalProperties'
import type { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorColorProp,
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { Button } from 'vant'

export default {
  key: 'button',
  moduleName: 'basicWidgets',
  label: '按钮',
  preview: () => (
    <Button size="small" type="primary" square>
      按钮
    </Button>
  ),
  render: ({ props, styles, block }) => {
    const { registerRef } = useGlobalProperties()
    return () => (
      <div style={styles}>
        <Button ref={(el) => registerRef(el, block._vid)} {...props}></Button>
      </div>
    )
  },
  props: {
    text: createEditorInputProp({ label: '按钮文字', defaultValue: '按钮' }),
    type: createEditorSelectProp({
      label: '按钮类型',
      options: [
        { label: '主要按钮', value: 'primary' },
        { label: '成功按钮', value: 'success' },
        { label: '默认按钮', value: 'default' },
        { label: '警告按钮', value: 'warning' },
        { label: '危险按钮', value: 'danger' },
      ],
      defaultValue: 'primary',
    }),
    size: createEditorSelectProp({
      label: '按钮尺寸',
      options: [
        { label: '大型', value: 'large' },
        { label: '普通', value: 'normal' },
        { label: '小型', value: 'small' },
        { label: '迷你', value: 'mini' },
      ],
      defaultValue: 'normal',
    }),
    'native-type': createEditorSelectProp({
      label: '原生button的type属性',
      options: [
        { label: '普通button', value: 'button' },
        { label: '表单提交按钮', value: 'submit' },
        { label: '表单重置按钮', value: 'reset' },
      ],
      defaultValue: 'button',
    }),
    to: createEditorInputProp({ label: '路由跳转' }),
    url: createEditorInputProp({ label: '跳转链接' }),
    plain: createEditorSwitchProp({ label: '是否为朴素按钮' }),
    replace: createEditorSwitchProp({ label: '是否在跳转时替换当前页面历史' }),
    round: createEditorSwitchProp({ label: '是否为圆形按钮' }),
    square: createEditorSwitchProp({ label: '是否为方形按钮', defaultValue: true }),
    block: createEditorSwitchProp({ label: '是否为块级元素', defaultValue: false }),
    color: createEditorColorProp({ label: '按钮颜色' }),
    disabled: createEditorSwitchProp({ label: '是否禁用按钮' }),
    hairline: createEditorSwitchProp({ label: '是否使用 0.5px 边框' }),
    icon: createEditorInputProp({ label: '左侧图标名称或图片链接' }),
    'icon-position': createEditorSelectProp({
      label: '图标展示位置',
      options: [
        { label: '左侧', value: 'left' },
        { label: '右侧', value: 'right' },
      ],
    }),
    'icon-prefix': createEditorInputProp({
      label: '图标类名前缀',
      tips: '图标类名前缀，同 Icon 组件的 class-prefix 属性',
    }),
    loading: createEditorSwitchProp({ label: '是否显示为加载状态' }),
    'loading-size': createEditorInputProp({ label: '加载图标大小' }),
    'loading-text': createEditorInputProp({ label: '加载状态提示文字' }),
    'loading-type': createEditorSelectProp({
      label: '加载图标类型',
      options: [
        { label: 'circular', value: 'circular' },
        { label: 'spinner', value: 'spinner' },
      ],
      defaultValue: 'circular',
    }),
  },
} as VisualEditorComponent
