import { VisualEditorProps } from '@/visual-editor/types'
import {
  createEditorColorProp,
  createEditorCssInputProp,
  createEditorInputProp,
  createEditorSelectProp,
} from '@/visual-editor/visual-editor.props'

export interface CssEditorOption {
  groupName: string
  optionMap: Record<string, VisualEditorProps>
}

const BORDER_WIDTH_VALUES = {
  ALL: 'var(--visual-border-width,0px)',
  ONLY_TOP: 'var(--visual-border-width,0px) 0 0',
  ONLY_BOTTOM: '0 0 var(--visual-border-width,0px)',
  ONLY_LEFT: '0 0 0 var(--visual-border-width,0px)',
  ONLY_RIGHT: '0 var(--visual-border-width,0px) 0 0',
  TOP_AND_BOTTOM: 'var(--visual-border-width,0px) 0',
  LEFT_AND_RIGHT: '0 var(--visual-border-width,0px) 0',
  TOP_AND_LEFT: 'var(--visual-border-width,0px) 0 0 var(--visual-border-width,0px)',
  TOP_AND_RIGHT: 'var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  BOTTOM_AND_LEFT: '0 0 var(--visual-border-width,0px) var(--visual-border-width,0px)',
  BOTTOM_AND_RIGHT: '0 var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  NOT_TOP: '0 var(--visual-border-width,0px) var(--visual-border-width,0px)',
  NOT_BOTTOM: 'var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  NOT_LEFT: 'var(--visual-border-width,0px) var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  NOT_RIGHT: 'var(--visual-border-width,0px) 0 var(--visual-border-width,0px) var(--visual-border-width,0px)',
}

const BOX_SHADOW_VALUE =
  'var(--visual-box-shadow-inset,) var(--visual-box-shadow-x,0px) var(--visual-box-shadow-y,0px) var(--visual-box-shadow-offset,0px) var(--visual-box-shadow-color,rgba(0,0,0,.1))'

export const cssEditorOptions: CssEditorOption[] = [
  {
    groupName: '基础',
    optionMap: {
      justifyContent: createEditorSelectProp({
        label: '组件对齐方式',
        options: [
          { label: '左对齐', value: 'flex-start' },
          { label: '居中对齐', value: 'center' },
          { label: '右对齐', value: 'flex-end' },
        ],
        defaultValue: 'flex-start',
      }),
      overflow: createEditorSelectProp({
        label: '内容溢出处理方式',
        options: [
          { label: '滚动条', value: 'scroll' },
          { label: '隐藏', value: 'hidden' },
          { label: '自动', value: 'auto' },
        ],
      }),
      width: createEditorCssInputProp({
        label: '宽度',
      }),
      height: createEditorCssInputProp({
        label: '高度',
      }),
    },
  },
  {
    groupName: '外边距',
    optionMap: {
      marginTop: createEditorCssInputProp({
        label: '上外边距',
      }),
      marginBottom: createEditorCssInputProp({
        label: '下外边距',
      }),
      marginLeft: createEditorCssInputProp({
        label: '左外边距',
      }),
      marginRight: createEditorCssInputProp({
        label: '右外边距',
      }),
    },
  },
  {
    groupName: '内边距',
    optionMap: {
      paddingTop: createEditorCssInputProp({
        label: '上内边距',
      }),
      paddingBottom: createEditorCssInputProp({
        label: '下内边距',
      }),
      paddingLeft: createEditorCssInputProp({
        label: '左内边距',
      }),
      paddingRight: createEditorCssInputProp({
        label: '右内边距',
      }),
    },
  },
  {
    groupName: '边框',
    optionMap: {
      borderWidth: createEditorSelectProp({
        label: '边框位置',
        options: [
          { label: '全边框', value: BORDER_WIDTH_VALUES.ALL },
          { label: '上边框', value: BORDER_WIDTH_VALUES.ONLY_TOP },
          { label: '下边框', value: BORDER_WIDTH_VALUES.ONLY_BOTTOM },
          { label: '左边框', value: BORDER_WIDTH_VALUES.ONLY_LEFT },
          { label: '右边框', value: BORDER_WIDTH_VALUES.ONLY_RIGHT },
          { label: '上下边框', value: BORDER_WIDTH_VALUES.TOP_AND_BOTTOM },
          { label: '左右边框', value: BORDER_WIDTH_VALUES.LEFT_AND_RIGHT },
          { label: '上右边框', value: BORDER_WIDTH_VALUES.TOP_AND_RIGHT },
          { label: '上左边框', value: BORDER_WIDTH_VALUES.TOP_AND_LEFT },
          { label: '下右边框', value: BORDER_WIDTH_VALUES.BOTTOM_AND_RIGHT },
          { label: '下左边框', value: BORDER_WIDTH_VALUES.BOTTOM_AND_LEFT },
          { label: '仅无上边框', value: BORDER_WIDTH_VALUES.NOT_TOP },
          { label: '仅无下边框', value: BORDER_WIDTH_VALUES.NOT_BOTTOM },
          { label: '仅无左边框', value: BORDER_WIDTH_VALUES.NOT_LEFT },
          { label: '仅无右边框', value: BORDER_WIDTH_VALUES.NOT_RIGHT },
        ],
      }),
      borderStyle: createEditorSelectProp({
        label: '边框样式',
        options: [
          { label: '无边框', value: 'none' },
          { label: '实线', value: 'solid' },
          { label: '虚线', value: 'dashed' },
          { label: '点线', value: 'dotted' },
          { label: '双实线', value: 'double' },
        ],
        defaultValue: 'solid',
      }),
      '--visual-border-width': createEditorCssInputProp({
        label: '边框宽度',
      }),
      borderColor: createEditorColorProp({
        label: '边框颜色',
      }),
    },
  },
  {
    groupName: '圆角',
    optionMap: {
      borderTopLeftRadius: createEditorCssInputProp({
        label: '上左圆角',
      }),
      borderTopRightRadius: createEditorCssInputProp({
        label: '上右圆角',
      }),
      borderBottomLeftRadius: createEditorCssInputProp({
        label: '下左圆角',
      }),
      borderBottomRightRadius: createEditorCssInputProp({
        label: '下右圆角',
      }),
    },
  },
  {
    groupName: '阴影',
    optionMap: {
      boxShadow: createEditorSelectProp({
        label: '启用阴影',
        options: [
          { label: '启用', value: BOX_SHADOW_VALUE },
          { label: '禁用', value: 'none' },
        ],
      }),
      '--visual-box-shadow-x': createEditorCssInputProp({
        label: '阴影水平偏移',
      }),
      '--visual-box-shadow-y': createEditorCssInputProp({
        label: '阴影垂直偏移',
      }),
      '--visual-box-shadow-offset': createEditorCssInputProp({
        label: '阴影模糊距离',
      }),
      '--visual-box-shadow-color': createEditorColorProp({
        label: '阴影颜色',
      }),
    },
  },
  {
    groupName: '背景',
    optionMap: {
      backgroundColor: createEditorColorProp({
        label: '背景颜色',
      }),
      backgroundImage: createEditorInputProp({
        label: '背景图片',
      }),
      backgroundPosition: createEditorSelectProp({
        label: '背景图片位置',
        options: [
          { label: '左上', value: 'left top' },
          { label: '左中', value: 'left center' },
          { label: '左下', value: 'left bottom' },
          { label: '居中', value: 'center center' },
          { label: '右上', value: 'right top' },
          { label: '右中', value: 'right center' },
          { label: '右下', value: 'right bottom' },
        ],
      }),
      backgroundRepeat: createEditorSelectProp({
        label: '背景图片重复方式',
        options: [
          { label: '不重复', value: 'no-repeat' },
          { label: '水平重复', value: 'repeat-x' },
          { label: '垂直重复', value: 'repeat-y' },
          { label: '全部重复', value: 'repeat' },
        ],
      }),
      backgroundSize: createEditorSelectProp({
        label: '背景图片大小',
        options: [
          { label: '原始大小', value: 'auto' },
          { label: '完全适应', value: 'cover' },
          { label: '完全铺满', value: 'contain' },
        ],
      }),
    },
  },
]
