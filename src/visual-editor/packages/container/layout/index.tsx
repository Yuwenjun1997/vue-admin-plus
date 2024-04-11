import { VisualEditorComponent } from '@/visual-editor/types'
import { Row, Col } from 'vant'
import { renderSlot } from 'vue'
import styleModule from './index.module.scss'
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorTableProp,
} from '@/visual-editor/visual-editor.props'
import { VisualBlockData } from '@/low-code'

const decoratesTemp = {} as any

interface Decorate {
  [key: string]: any
}

interface DecorateItem {
  children?: VisualBlockData[]
  [prop: string]: any
}

const createDecorate = (str: string): Decorate =>
  str.split(':').reduce(
    (prev, curr, index) => {
      prev[`decorate${index}`] = {
        key: `decorate${index}`,
        span: curr,
        children: [],
      } as DecorateItem
      return prev
    },
    { value: str } as Decorate
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
    console.log(props.decorates)
    const decorates = useSlots()
    decoratesTemp[block._vid] ??= {}
    watchEffect(() => {
      if (Object.keys(props.decorates || {}).length) {
        Object.entries<Decorate>(props.decorates || {}).forEach(([key, decorate]) => {
          if (decoratesTemp[block._vid][key]?.children) {
            decorate.children = decoratesTemp[block._vid][key].children
          }
        })
      }
    })

    return () => (
      <div style={styles}>
        <Row {...custom} {...props} class={styleModule['van-row1']}>
          {Object.values<Decorate>(
            Object.keys(props.decorates || {}).length ? props.decorates || {} : createDecorate('12:12')
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
    decorates: createEditorTableProp<Decorate>({
      label: '列配置',
      option: {
        options: [],
        showKey: 'label',
      },
      defaultValue: createDecorate('12:12'),
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
