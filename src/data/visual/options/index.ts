import { VisualBoxOption } from '@/types/visual-box'
import { BORDER_WIDTH_VALUES, BOX_SHADOW_VALUE, TEXT_SHADOW_VALUE } from './constant'

export const basicOptions: VisualBoxOption[] = [
  {
    groupName: '基础属性',
    target: 'root',
    label: '唯一标识',
    property: 'visualBoxKey',
    formType: 'input',
    disabled: true,
    required: true,
  },
  {
    groupName: '基础属性',
    target: 'root',
    label: '自定义名称',
    property: 'visualBoxName',
    formType: 'input',
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    label: '宽度',
    property: 'width',
    formType: 'cssInput',
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    label: '高度',
    property: 'height',
    formType: 'cssInput',
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    label: '最小宽度',
    property: 'minWidth',
    formType: 'cssInput',
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    label: '最小高度',
    property: 'minHeight',
    formType: 'cssInput',
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    label: '内容溢出',
    property: 'overflow',
    formType: 'select',
    options: [
      { label: '隐藏', value: 'hidden' },
      { label: '滚动', value: 'scroll' },
      { label: '自动', value: 'auto' },
    ],
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    formType: 'switch',
    label: '启用透明度',
    property: 'opacity',
    trueValue: 'var(--visual-opacity-number,1)',
    falseValue: 'unset',
    value: 'unset',
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    formType: 'slider',
    label: '透明度',
    property: '--visual-opacity-number',
    value: 1,
    step: 0.1,
    min: 0,
    max: 1,
  },
  {
    groupName: '基础属性',
    target: 'customStyle',
    formType: 'colorPicker',
    label: '背景色',
    property: 'backgroundColor',
  },
  {
    groupName: '定位',
    target: 'customStyle',
    formType: 'select',
    label: '定位方式',
    property: 'position',
    options: [
      { label: '相对定位', value: 'relative' },
      { label: '绝对定位', value: 'absolute' },
    ],
  },
  {
    groupName: '定位',
    target: 'customStyle',
    formType: 'cssInput',
    label: '距左边',
    property: 'left',
  },
  {
    groupName: '定位',
    target: 'customStyle',
    formType: 'cssInput',
    label: '距右边',
    property: 'right',
  },
  {
    groupName: '定位',
    target: 'customStyle',
    formType: 'cssInput',
    label: '距上边',
    property: 'top',
  },
  {
    groupName: '定位',
    target: 'customStyle',
    formType: 'cssInput',
    label: '距下边',
    property: 'bottom',
  },
  {
    groupName: '定位',
    target: 'customStyle',
    formType: 'cssInput',
    label: '等距（inset）',
    property: 'inset',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'cssInput',
    label: '字体大小',
    property: 'fontSize',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'colorPicker',
    label: '字体颜色',
    property: 'color',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'cssInput',
    label: '行间距',
    property: 'lineHeight',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'cssInput',
    label: '字间距',
    property: 'letterSpacing',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'cssInput',
    label: '首行缩进',
    property: 'textIndent',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'select',
    label: '对齐方式',
    property: 'textAlign',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中对齐', value: 'center' },
      { label: '右对齐', value: 'right' },
      { label: '边缘对齐', value: 'justify' },
    ],
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'switch',
    label: '是否斜体',
    property: 'fontStyle',
    trueValue: 'italic',
    falseValue: 'normal',
    value: 'normal',
  },
  {
    groupName: '字体',
    target: 'customStyle',
    formType: 'select',
    label: '字体粗细',
    property: 'fontWeight',
    options: [
      { label: '加粗', value: 'bold' },
      { label: '变细', value: 'lighter' },
    ],
  },
  {
    groupName: '字体阴影',
    target: 'customStyle',
    formType: 'switch',
    label: '开启阴影',
    property: 'textShadow',
    trueValue: TEXT_SHADOW_VALUE,
    falseValue: 'none',
    value: 'none',
  },
  {
    groupName: '字体阴影',
    target: 'customStyle',
    formType: 'cssInput',
    label: '水平偏移',
    property: '--visual-text-shadow-x',
  },
  {
    groupName: '字体阴影',
    target: 'customStyle',
    formType: 'cssInput',
    label: '垂直偏移',
    property: '--visual-text-shadow-y',
  },
  {
    groupName: '字体阴影',
    target: 'customStyle',
    formType: 'cssInput',
    label: '模糊半径',
    property: '--visual-text-shadow-offset',
  },
  {
    groupName: '字体阴影',
    target: 'customStyle',
    formType: 'colorPicker',
    label: '阴影颜色',
    property: '--visual-text-shadow-color',
  },
  {
    groupName: '外边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '上外边距',
    property: 'marginTop',
  },
  {
    groupName: '外边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '下外边距',
    property: 'marginBottom',
  },
  {
    groupName: '外边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '左外边距',
    property: 'marginLeft',
  },
  {
    groupName: '外边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '右外边距',
    property: 'marginRight',
  },
  {
    groupName: '内边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '上内边距',
    property: 'paddingTop',
  },
  {
    groupName: '内边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '下内边距',
    property: 'paddingBottom',
  },
  {
    groupName: '内边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '左内边距',
    property: 'paddingLeft',
  },
  {
    groupName: '内边距',
    target: 'customStyle',
    formType: 'cssInput',
    label: '右内边距',
    property: 'paddingRight',
  },
  {
    groupName: '边框',
    target: 'customStyle',
    formType: 'select',
    label: '边框样式',
    property: 'borderStyle',
    options: [
      { label: '无边框', value: 'none' },
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
      { label: '双实线', value: 'double' },
    ],
  },
  {
    groupName: '边框',
    target: 'customStyle',
    formType: 'cssInput',
    label: '边框大小',
    property: '--visual-border-width',
  },
  {
    groupName: '边框',
    target: 'customStyle',
    formType: 'colorPicker',
    label: '边框颜色',
    property: 'borderColor',
  },
  {
    groupName: '边框',
    target: 'customStyle',
    formType: 'select',
    label: '边框位置',
    property: 'borderWidth',
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
  },
  {
    groupName: '圆角',
    target: 'customStyle',
    formType: 'cssInput',
    label: '上左圆角',
    property: 'border-top-left-radius',
  },
  {
    groupName: '圆角',
    target: 'customStyle',
    formType: 'cssInput',
    label: '上右圆角',
    property: 'border-top-right-radius',
  },
  {
    groupName: '圆角',
    target: 'customStyle',
    formType: 'cssInput',
    label: '下左圆角',
    property: 'border-bottom-left-radius',
  },
  {
    groupName: '圆角',
    target: 'customStyle',
    formType: 'cssInput',
    label: '下右圆角',
    property: 'border-bottom-right-radius',
  },
  {
    groupName: '阴影',
    target: 'customStyle',
    formType: 'switch',
    label: '开启阴影',
    property: 'boxShadow',
    trueValue: BOX_SHADOW_VALUE,
    falseValue: 'none',
    value: 'none',
  },
  {
    groupName: '阴影',
    target: 'customStyle',
    formType: 'cssInput',
    label: '水平偏移',
    property: '--visual-box-shadow-x',
  },
  {
    groupName: '阴影',
    target: 'customStyle',
    formType: 'cssInput',
    label: '垂直偏移',
    property: '--visual-box-shadow-y',
  },
  {
    groupName: '阴影',
    target: 'customStyle',
    formType: 'cssInput',
    label: '模糊半径',
    property: '--visual-box-shadow-offset',
  },
  {
    groupName: '阴影',
    target: 'customStyle',
    formType: 'colorPicker',
    label: '阴影颜色',
    property: '--visual-box-shadow-color',
  },
  {
    groupName: '阴影',
    target: 'customStyle',
    formType: 'switch',
    label: '内阴影',
    property: '--visual-box-shadow-inset',
    trueValue: 'inset',
    falseValue: 'unset',
    value: 'unset',
  },
  {
    groupName: 'flex布局子元素',
    target: 'customStyle',
    formType: 'cssInput',
    label: '初始大小',
    property: 'flex-basis',
  },
  {
    groupName: 'flex布局子元素',
    target: 'customStyle',
    formType: 'numberInput',
    label: '放大比例',
    property: 'flex-grow',
  },
  {
    groupName: 'flex布局子元素',
    target: 'customStyle',
    formType: 'numberInput',
    label: '缩小比例',
    property: 'flex-shrink',
  },
  {
    groupName: 'flex布局子元素',
    target: 'customStyle',
    formType: 'numberInput',
    label: '排列顺序',
    property: 'order',
  },
  {
    groupName: 'flex布局子元素',
    target: 'customStyle',
    formType: 'select',
    label: '对齐方式',
    property: 'alignSelf',
    options: [
      { label: '默认', value: 'auto' },
      { label: '起始位置对齐', value: 'flex-start' },
      { label: '结束位置对齐', value: 'flex-end' },
      { label: '居中对齐', value: 'center' },
      { label: '基线对齐', value: 'baseline' },
      { label: '拉伸适应', value: 'stretch' },
    ],
  },
]

// export const basicOptions: VisualBoxOption[] = [
//   {
//     groupName: '基础属性',
//     target: 'customStyle',
//     formType: 'switch',
//     label: '启用透明度',
//     property: 'opacity',
//     trueValue: 'var(--visual-opacity-number,1)',
//     falseValue: 'unset',
//     value: 'unset',
//   },
// ]
