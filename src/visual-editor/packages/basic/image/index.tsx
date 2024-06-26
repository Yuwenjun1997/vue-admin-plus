import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { useVisualRef } from '@/visual-editor/hooks/useVisualRef'
import type { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorCssInputProp,
  createEditorImageProp,
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { Image } from 'vant'

export default {
  key: 'image',
  moduleName: 'basicWidgets',
  label: '图片',
  preview: () => (
    <Image iconSize={44} src={'https://img.yzcdn.cn/vant/cat.jpeg'} width={'100px'} height={'100px'} fit={'cover'} />
  ),
  render: ({ styles, block }) => {
    const { registerRef } = useVisualRef()
    const { genEvents } = useVisualEvents()
    const { genProps } = useVisualProps()

    const props = computed(() => genProps(block))
    const events = computed(() => genEvents(block))

    return () => (
      <div style={styles}>
        <Image ref={(el) => registerRef(el, block._vid)} {...props.value} {...events.value}></Image>
      </div>
    )
  },
  props: {
    src: createEditorImageProp({ label: '图片链接', defaultValue: 'https://img.yzcdn.cn/vant/cat.jpeg' }),
    width: createEditorCssInputProp({ label: '宽度', defaultValue: '100px' }),
    height: createEditorCssInputProp({ label: '高度', defaultValue: '100px' }),
    errorIcon: createEditorInputProp({ label: '失败时提示的图标名称或图片链接' }),
    fit: createEditorSelectProp({
      label: '图片填充模式',
      options: [
        { label: '保持宽高缩放图片，使图片的长边能完全显示出来', value: 'contain' },
        { label: '保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边', value: 'cover' },
        { label: '拉伸图片，使图片填满元素', value: 'fill' },
        { label: '保持图片原有尺寸', value: 'none' },
        { label: '取 none 或 contain 中较小的一个', value: 'scale-down' },
      ],
      defaultValue: 'cover',
    }),
    iconPrefix: createEditorInputProp({
      label: '图标类名前缀',
      tips: '图标类名前缀，同Icon组件的class-prefix属性',
    }),
    iconSize: createEditorInputProp({ label: '加载图标和失败图标的大小' }),
    lazyLoad: createEditorSwitchProp({ label: '是否开启图片懒加载', tips: '须配合 Lazyload 组件使用' }),
    loadingIcon: createEditorInputProp({ label: '加载时提示的图标名称或图片链接' }),
    radius: createEditorCssInputProp({ label: '圆角大小', tips: '默认单位为 px' }),
    round: createEditorSwitchProp({ label: '是否显示为圆形' }),
    showError: createEditorSwitchProp({ label: '是否展示图片加载失败提示' }),
    showLoading: createEditorSwitchProp({ label: '是否展示图片加载中提示' }),
    alt: createEditorInputProp({ label: '替代文本' }),
  },
  events: [
    { eventName: 'click', label: '点击图片时触发' },
    { eventName: 'load', label: '图片加载完毕时触发' },
    { eventName: 'error', label: '图片加载失败时触发' },
  ],
} as VisualEditorComponent
