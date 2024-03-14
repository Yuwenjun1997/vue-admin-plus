import { VisualBoxOption } from '@/types/visual-box'

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
    target: 'style',
    label: '最小高度',
    property: 'minHeight',
    formType: 'cssInput',
    value: '20px',
  },
  {
    groupName: '字体颜色',
    target: 'style',
    formType: 'cssInput',
    label: '字体大小',
    property: 'fontSize',
  },
  {
    groupName: '字体颜色',
    target: 'style',
    formType: 'colorPicker',
    label: '字体颜色',
    property: 'color',
  },
  {
    groupName: '字体颜色',
    target: 'style',
    formType: 'cssInput',
    label: '行间距',
    property: 'lineHeight',
  },
  {
    groupName: '字体颜色',
    target: 'style',
    formType: 'select',
    label: '对齐方式',
    property: 'textAlign',
    options: [
      {
        label: '左对齐',
        value: 'left',
      },
      {
        label: '居中对齐',
        value: 'center',
      },
      {
        label: '右对齐',
        value: 'right',
      },
      {
        label: '边缘对齐',
        value: 'justify',
      },
    ],
  },
  {
    groupName: '字体颜色',
    target: 'style',
    formType: 'select',
    label: '是否斜体',
    property: 'fontStyle',
    options: [
      {
        label: '是',
        value: 'italic',
      },
      {
        label: '否',
        value: 'normal',
      },
    ],
  },
  {
    groupName: '字体颜色',
    target: 'style',
    formType: 'select',
    label: '字体粗细',
    property: 'fontWeight',
    options: [
      {
        label: '正常',
        value: 'normal',
      },
      {
        label: '加粗',
        value: 'bold',
      },
      {
        label: '纤细',
        value: 'lighter',
      },
    ],
  },
  {
    groupName: '外边距',
    target: 'style',
    formType: 'cssInput',
    label: '上外边距',
    property: 'marginTop',
  },
  {
    groupName: '外边距',
    target: 'style',
    formType: 'cssInput',
    label: '右外边距',
    property: 'marginRight',
  },
  {
    groupName: '外边距',
    target: 'style',
    formType: 'cssInput',
    label: '下外边距',
    property: 'marginBottom',
  },
  {
    groupName: '外边距',
    target: 'style',
    formType: 'cssInput',
    label: '左外边距',
    property: 'marginLeft',
  },
  {
    groupName: '内边距',
    target: 'style',
    formType: 'cssInput',
    label: '上内边距',
    property: 'paddingTop',
  },
  {
    groupName: '内边距',
    target: 'style',
    formType: 'cssInput',
    label: '右内边距',
    property: 'paddingRight',
  },
  {
    groupName: '内边距',
    target: 'style',
    formType: 'cssInput',
    label: '下内边距',
    property: 'paddingBottom',
  },
  {
    groupName: '内边距',
    target: 'style',
    formType: 'cssInput',
    label: '左内边距',
    property: 'paddingLeft',
  },
  // {
  //   groupName: '边框',
  //   target: 'style',
  //   formType: 'select',
  //   label: '边框位置',
  //   property: 'border-width',
  //   options: [],
  // },
  {
    groupName: '边框',
    target: 'style',
    formType: 'select',
    label: '边框样式',
    property: 'borderStyle',
    options: [
      {
        label: '无边框',
        value: 'none',
      },
      {
        label: '实线',
        value: 'solid',
      },
      {
        label: '虚线',
        value: 'dashed',
      },
      {
        label: '点线',
        value: 'dotted',
      },
      {
        label: '双实线',
        value: 'double',
      },
    ],
  },
  {
    groupName: '边框',
    target: 'style',
    formType: 'cssInput',
    label: '边框大小',
    property: 'borderWidth',
  },
  {
    groupName: '边框',
    target: 'style',
    formType: 'colorPicker',
    label: '边框颜色',
    property: 'borderColor',
  },
]
