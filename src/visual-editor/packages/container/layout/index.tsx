import { VisualBlockSlotData, VisualEditorComponent, VisualBlockSlotMap } from '@/visual-editor/types'
import { Row, Col } from 'vant'
import { renderSlot } from 'vue'
import styleModule from './index.module.scss'
import {
  createEditorInputNumberProp,
  createEditorInputProp,
  createEditorSelectProp,
} from '@/visual-editor/visual-editor.props'

const slotsTemp = {} as any

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
  render: ({ props, styles, block, custom, slots: vslots }) => {
    const slots = useSlots()
    slotsTemp[block._vid] ??= {}
    watchEffect(() => {
      if (Object.keys(vslots || {}).length) {
        Object.entries<VisualBlockSlotData>(vslots || {}).forEach(([key, vslot]) => {
          if (slotsTemp[block._vid][key]?.children) {
            vslot.children = slotsTemp[block._vid][key].children
          }
        })
      }
    })

    return () => (
      <div style={styles}>
        <Row {...custom} {...props} class={styleModule['van-row1']}>
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
  slots: [
    { span: createEditorInputNumberProp({ label: '栅格宽度', defaultValue: 12, max: 24, min: 1 }) },
    { span: createEditorInputNumberProp({ label: '栅格宽度', defaultValue: 12, max: 24, min: 1 }) },
  ],
  addSlot() {
    this.slots = this.slots || []
    this.slots.push({ span: createEditorInputNumberProp({ label: '栅格宽度', defaultValue: 24, max: 24, min: 1 }) })
  },
  deleteSlot(index: number) {
    this.slots?.splice(index, 1)
  },
  initSlotsOptions(slopMap: VisualBlockSlotMap) {
    this.slots = Object.entries(slopMap).map(([_slotKey, slotValue]) => {
      return {
        span: createEditorInputNumberProp({
          label: '栅格宽度',
          defaultValue: slotValue.props.span,
          max: 24,
          min: 1,
        }),
      }
    })
  },
} as VisualEditorComponent
