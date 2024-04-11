import { DecorateItem, VisualEditorComponent } from '@/visual-editor/types'
import { Row, Col } from 'vant'
import { renderSlot } from 'vue'
import styleModule from './index.module.scss'
import { createEditorInputProp, createEditorSelectProp } from '@/visual-editor/visual-editor.props'

const decoratesTemp = {} as any

const createSlots = (str: string): DecorateItem =>
  str.split(':').reduce(
    (prev, curr, index) => {
      prev[`decorate${index}`] = {
        key: `decorate${index}`,
        span: curr,
        children: [],
      }
      return prev
    },
    { value: str } as DecorateItem
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
    const decorates = useSlots()
    decoratesTemp[block._vid] ??= {}
    watchEffect(() => {
      if (Object.keys(props.decorates || {}).length) {
        Object.entries<DecorateItem>(props.decorates || {}).forEach(([key, decorate]) => {
          if (decoratesTemp[block._vid][key]?.children) {
            decorate.children = decoratesTemp[block._vid][key].children
          }
        })
      }
    })

    return () => (
      <div style={styles}>
        <Row {...custom} {...props} class={styleModule['van-row1']}>
          {Object.values<DecorateItem>(
            Object.keys(props.decorates || {}).length ? props.decorates || {} : createSlots('12:12')
          )
            ?.filter((item) => typeof item !== 'string')
            .map((spanItem, spanIndex) => {
              decoratesTemp[block._vid][`decorate${spanIndex}`] = spanItem
              return (
                <>
                  <Col span={spanItem.span}>{renderSlot(decorates, `decorate${spanIndex}`)}</Col>
                </>
              )
            })}
        </Row>
      </div>
    )
  },
  props: {
    gutter: createEditorInputProp({ label: '列间隔' }),
    decorates: createEditorSelectProp({
      label: '列比例',
      options: [
        { label: '24', value: createSlots('24') },
        { label: '12:12', value: createSlots('12:12') },
        { label: '6:18', value: createSlots('6:18') },
        { label: '18:6', value: createSlots('18:6') },
        { label: '8:8:8', value: createSlots('8:8:8') },
        { label: '6:12:6', value: createSlots('6:12:6') },
        { label: '6:6:6:6', value: createSlots('6:6:6:6') },
      ],
      defaultValue: createSlots('12:12'),
    }),
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
} as VisualEditorComponent
