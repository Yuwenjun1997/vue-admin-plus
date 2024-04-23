import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorCssInputProp,
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { CellGroup, Field } from 'vant'

export default {
  key: 'field',
  moduleName: 'basicWidgets',
  label: '输入框',

  preview: () => (
    <CellGroup inset>
      <Field label="文本" placeholder="请输入内容" />
    </CellGroup>
  ),
  render: ({ styles, block }) => {
    const { genProps } = useVisualProps()
    const props = computed(() => genProps(block))

    const { genEvents } = useVisualEvents()
    const events = computed(() => genEvents(block))

    return () => (
      <div style={styles}>
        <Field {...props.value} {...events.value} />
      </div>
    )
  },
  props: {
    modelValue: createEditorInputProp({ label: '当前输入的值' }),
    label: createEditorInputProp({ label: '输入框左侧文本', defaultValue: '文本' }),
    name: createEditorInputProp({ label: '名称' }),
    size: createEditorSelectProp({
      label: '大小',
      options: [
        { label: '大', value: 'large' },
        { label: '中', value: 'normal' },
        { label: '默认', value: '' },
      ],
    }),
    maxlength: createEditorInputNumberProp({ label: '输入的最大字符数' }),
    placeholder: createEditorInputProp({ label: '输入框占位提示文字', defaultValue: '请输入内容' }),
    disabled: createEditorSwitchProp({ label: '是否禁用输入框' }),
    readonly: createEditorSwitchProp({ label: '是否为只读状态' }),
    colon: createEditorSwitchProp({ label: '是否在标签后面添加冒号' }),
    required: createEditorSwitchProp({ label: '是否显示表单必填星号' }),
    center: createEditorSwitchProp({ label: '是否使内容垂直居中' }),
    clearable: createEditorSwitchProp({ label: '是否启用清除图标' }),
    clearIcon: createEditorInputProp({ label: '自定义清除图标', defaultValue: 'clear' }),
    clickable: createEditorSwitchProp({ label: '是否开启点击反馈' }),
    isLink: createEditorSwitchProp({ label: '是否展示右侧箭头并开启点击反馈' }),
    autofocus: createEditorSwitchProp({ label: '是否自动获取焦点' }),
    showWordLimit: createEditorSwitchProp({ label: '是否显示字数统计' }),
    error: createEditorSwitchProp({ label: '是否将输入内容标红' }),
    errorMessage: createEditorInputProp({ label: '错误提示文案' }),
    errorMessageAlign: createEditorSelectProp({
      label: '错误提示文案对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
        { label: '居中对齐', value: 'center' },
      ],
    }),
    arrowDirection: createEditorSelectProp({
      label: '箭头方向',
      options: [
        { label: '上', value: 'up' },
        { label: '右', value: 'right' },
        { label: '下', value: 'down' },
        { label: '左', value: 'left' },
      ],
    }),
    labelWidth: createEditorCssInputProp({ label: '左侧文本宽度', defaultValue: '3.2em' }),
    labelAlign: createEditorSelectProp({
      label: '左侧文本对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
        { label: '居中对齐', value: 'center' },
      ],
    }),
    inputAlign: createEditorSelectProp({
      label: '输入框对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
        { label: '居中对齐', value: 'center' },
      ],
    }),
    autosize: createEditorSwitchProp({ label: '是否自适应内容高度' }),
    leftIcon: createEditorInputProp({ label: '左侧图标名称' }),
    rightIcon: createEditorInputProp({ label: '右侧图标名称' }),
    iconPrefix: createEditorInputProp({ label: '图标类名前缀' }),
    autocomplete: createEditorSelectProp({
      label: '是否启用自动完成',
      options: [
        { label: '关闭', value: 'off' },
        { label: 'on', value: 'on' },
        { label: 'new-password', value: 'new-password' },
      ],
    }),
  },
  events: [
    { label: '输入框内容变化时触发', eventName: 'update:model-value' },
    { label: '输入框获得焦点时触发', eventName: 'focus' },
    { label: '输入框失去焦点时触发', eventName: 'blur' },
    { label: '点击清除按钮时触发', eventName: 'clear' },
    { label: '点击组件时触发', eventName: 'click' },
    { label: '点击输入区域时触发', eventName: 'click-input' },
    { label: '点击左侧图标时触发', eventName: 'click-left-icon' },
    { label: '点击右侧图标时触发', eventName: 'click-right-icon' },
    { label: '点击左侧图标时触发', eventName: 'click-left-icon' },
  ],
} as VisualEditorComponent
