import { VisualEditorComponent } from '@/visual-editor/types'
import { Row, Col } from 'vant'
import { renderSlot } from 'vue'
import styleModule from './index.module.scss'

interface SlotItem {
  value: string
  [prop: string]: any
}

const slotsTemp = {} as any

const createSlots = (str: string): SlotItem =>
  str.split(':').reduce(
    (prev, curr, index) => {
      prev[`slot${index}`] = {
        key: `slot${index}`,
        span: curr,
        children: [],
      }
      return prev
    },
    { value: str } as SlotItem
  )

export default {
  key: 'layout',
  moduleName: 'basicWidgets',
  label: '布局容器',
  preview: () => (
    <Row>
      <Col span={12}>12</Col>
      <Col span={12}>12</Col>
    </Row>
  ),
  render: ({ props, styles, block, custom }) => {
    const slots = useSlots()
    slotsTemp[block._vid] ??= {}
    watchEffect(() => {
      if (Object.keys(props.slots || {}).length) {
        Object.entries<SlotItem>(props.slots).forEach(([key, slot]) => {
          if (slotsTemp[block._vid][key]?.children) {
            slot.children = slotsTemp[block._vid][key].children
          }
        })
      }
    })

    return () => (
      <div style={styles}>
        <Row {...custom} {...props} class={styleModule['van-row1']}>
          {Object.values<SlotItem>(Object.keys(props.slots || {}).length ? props.slots : createSlots('12:12'))
            ?.filter((item) => typeof item !== 'string')
            .map((spanItem, spanIndex) => {
              slotsTemp[block._vid][`slot${spanIndex}`] = spanItem
              return (
                <>
                  <Col span={spanItem.span}>{renderSlot(slots, `slot${spanIndex}`)}</Col>
                </>
              )
            })}
        </Row>
      </div>
    )
  },
  props: {
    slots: {
      value: '12:12',
      slot0: { key: 'slot0', span: '12', children: [] },
      slot1: { key: 'slot1', span: '12', children: [] },
    },
  },
} as VisualEditorComponent
