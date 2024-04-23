import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { useVisualStorage } from '@/visual-editor/hooks/useVisualStorage'
import { VisualBlockSlotData, VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorCssInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { Form, CellGroup, Field } from 'vant'
import { renderSlot } from 'vue'

const slotsTemp = {} as any

const createSlot = () => ({})

export default {
  key: 'form',
  moduleName: 'basicWidgets',
  label: '表单',
  preview: () => (
    <Form>
      <CellGroup>
        <Field label="用户名" placeholder="请输入用户名" />
        <Field label="密码" placeholder="请输入密码" />
      </CellGroup>
    </Form>
  ),
  render: ({ styles, block, slots: vslots }) => {
    const slots = useSlots()
    slotsTemp[block._vid] ??= {}

    const { genProps } = useVisualProps()

    const props = computed(() => genProps(block))

    watchEffect(() => {
      if (Object.keys(vslots || {}).length) {
        Object.entries<VisualBlockSlotData>(vslots || {}).forEach(([key, vslot]) => {
          if (slotsTemp[block._vid][key]?.children) {
            vslot.children = slotsTemp[block._vid][key].children
          }
        })
        useVisualStorage().setState()
      }
    })

    return () => (
      <div style={styles}>
        <Form style="width:100%" {...props.value}>
          {Object.entries<VisualBlockSlotData>(vslots || {}).map(([key, vslot]) => {
            slotsTemp[block._vid][key] = vslot
            return renderSlot(slots, key)
          })}
        </Form>
      </div>
    )
  },
  props: {
    labelWidth: createEditorCssInputProp({ label: '标签宽度', defaultValue: '6.2em' }),
    labelAlign: createEditorSelectProp({
      label: '标签对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '居中对齐', value: 'center' },
        { label: '右对齐', value: 'right' },
        { label: '顶部', value: 'top' },
      ],
      defaultValue: 'left',
    }),
    inputAlign: createEditorSelectProp({
      label: '输入框对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '居中对齐', value: 'center' },
        { label: '右对齐', value: 'right' },
      ],
      defaultValue: 'left',
    }),
    errorMessageAlign: createEditorSelectProp({
      label: '错误提示对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '居中对齐', value: 'center' },
        { label: '右对齐', value: 'right' },
      ],
      defaultValue: 'left',
    }),
    colon: createEditorSwitchProp({ label: '是否显示冒号' }),
    disabled: createEditorSwitchProp({ label: '是否禁用所有输入框' }),
    readonly: createEditorSwitchProp({ label: '所有输入框设置为只读状态' }),
    required: createEditorSwitchProp({ label: '是否显示表单必填星号' }),
    validateFirst: createEditorSwitchProp({ label: '是校验不通过时停止校验', defaultValue: false }),
    scrollToError: createEditorSwitchProp({ label: '是否滚动至错误的表单项', defaultValue: false }),
    showError: createEditorSwitchProp({ label: '是否在校验不通过时标红输入框', defaultValue: false }),
    showErrorMessage: createEditorSwitchProp({ label: '是否在校验不通过时显示错误信息', defaultValue: true }),
    submitOnEnter: createEditorSwitchProp({ label: '是否在按下回车键时提交表单', defaultValue: true }),
  },
  slotEditable: false,
  slots: [createSlot()],
  createSlotHandler: createSlot,
  events: [
    { label: '提交表单且验证通过后触发', eventName: 'submit' },
    { label: '提交表单且验证不通过后触发', eventName: 'failed' },
  ],
} as VisualEditorComponent
