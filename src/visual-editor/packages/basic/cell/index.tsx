import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'
import { useVisualProps } from '@/visual-editor/hooks/useVisualProps'
import { VisualEditorComponent } from '@/visual-editor/types'
import {
  createEditorInputProp,
  createEditorSelectProp,
  createEditorSwitchProp,
} from '@/visual-editor/visual-editor.props'
import { isArray } from 'lodash'
import { CellGroup, Cell } from 'vant'

const createCell = () => ({
  title: createEditorInputProp({ label: '	左侧标题', defaultValue: '单元格' }),
  value: createEditorInputProp({ label: '	右侧内容', defaultValue: '内容' }),
  label: createEditorInputProp({ label: '	标题下方的描述信息' }),
  size: createEditorSelectProp({
    label: '	单元格大小',
    options: [
      { label: '默认', value: 'normal' },
      { label: '大', value: 'large' },
    ],
  }),
  icon: createEditorInputProp({ label: '左侧图标名称或图片链接' }),
  iconPrefix: createEditorInputProp({ label: '图标类名前缀' }),
  tag: createEditorInputProp({ label: '根节点对应的 HTML 标签名' }),
  url: createEditorInputProp({ label: '点击后跳转的链接地址' }),
  to: createEditorInputProp({ label: '点击后跳转的目标路由对象' }),
  border: createEditorSwitchProp({ label: '是否显示内边框' }),
  replace: createEditorSwitchProp({ label: '是否在跳转时替换当前页面历史' }),
  clickable: createEditorSwitchProp({ label: '是否开启点击反馈' }),
  isLink: createEditorSwitchProp({ label: '是否展示右侧箭头并开启点击反馈' }),
  required: createEditorSwitchProp({ label: '是否显示表单必填星号' }),
  center: createEditorSwitchProp({ label: '是否使内容垂直居中' }),
  arrowDirection: createEditorSelectProp({
    label: '箭头方向',
    options: [
      { label: '左', value: 'left' },
      { label: '上', value: 'up' },
      { label: '下', value: 'down' },
    ],
  }),
})

export default {
  key: 'cell',
  moduleName: 'basicWidgets',
  label: '单元格',

  preview: () => (
    <CellGroup style={'width: 100%'}>
      <Cell title={'单元格'} value={'内容'}></Cell>
      <Cell title={'单元格'} value={'内容'}></Cell>
    </CellGroup>
  ),

  render: ({ styles, block, sourceData }) => {
    const { genProps } = useVisualProps()
    const props = computed(() => genProps(block))

    const { genEvents } = useVisualEvents()
    const events = computed(() => genEvents(block))

    return () => (
      <div style={styles}>
        <CellGroup {...props.value} style={'width: 100%'}>
          {isArray(sourceData.cells) &&
            sourceData.cells.map((item, index) => {
              return <Cell {...item} {...events.value} key={index}></Cell>
            })}
        </CellGroup>
      </div>
    )
  },
  props: {
    title: createEditorInputProp({ label: '分组标题', defaultValue: '' }),
    inset: createEditorSwitchProp({ label: '是否展示为圆角卡片风格' }),
    border: createEditorSwitchProp({ label: '是否显示外边框' }),
  },
  sourceData: {
    cells: {
      label: '单元格',
      value: [createCell(), createCell()],
      createHandler: createCell,
    },
  },
  events: [{ label: '点击单元格时触发', eventName: 'click' }],
} as VisualEditorComponent
