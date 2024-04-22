import { VisualBlockSlotData, VisualEditorComponent } from '@/visual-editor/types'
import { Row, Col } from 'vant'
import { renderSlot } from 'vue'
import styleModule from './index.module.scss'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSelectProp,
} from '@/visual-editor/visual-editor.props'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { useVisualStorage } from '@/visual-editor/hooks/useVisualStorage'

const slotsTemp = {} as any

const createSlot = () => ({
  span: createEditorInputNumberProp({ label: '栅格宽度', defaultValue: 12, max: 24, min: 1 }),
})

export default {
  key: 'layout',
  moduleName: 'basicWidgets',
  label: '栅格布局',
  preview: () => (
    <Row style={{ width: '100%' }} gutter={4}>
      <Col span={8}>
        <div style={{ background: '#f0f0f0', minHeight: '26px' }}></div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#f0f0f0', minHeight: '26px' }}></div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#f0f0f0', minHeight: '26px' }}></div>
      </Col>
    </Row>
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
        <Row {...props.value} class={styleModule['van-row1']}>
          {Object.entries<VisualBlockSlotData>(vslots || {}).map(([key, vslot]) => {
            slotsTemp[block._vid][key] = vslot
            return <Col {...vslot.props}>{renderSlot(slots, key)}</Col>
          })}
        </Row>
      </div>
    )
  },
  props: {
    gutter: createEditorInputProp({ label: '列间隔' }),
    justify: createEditorSelectProp({
      label: '主轴对齐方式',
      options: [
        { label: '左对齐', value: 'start' },
        { label: '居中排列', value: 'center' },
        { label: '均匀对齐', value: 'space-around' },
        { label: '两端对齐', value: 'space-between' },
        { label: '右对齐', value: 'end' },
      ],
    }),
    align: createEditorSelectProp({
      label: '交叉轴对齐方式',
      options: [
        { label: '顶部对齐', value: 'top' },
        { label: '垂直居中', value: 'center' },
        { label: '底部对齐', value: 'bottom' },
      ],
    }),
  },
  slots: [createSlot(), createSlot()],
  createSlotHandler: createSlot,
} as VisualEditorComponent
