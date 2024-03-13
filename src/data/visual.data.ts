import { VisualBoxComponents, VisualBasic, VisualBoxOption } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

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

export const templates: VisualBasic[] = [
  {
    visualBoxKey: uuidv4(),
    isRoot: true,
    showTools: false,
    isEditable: false,
    layoutStyle: {},
    style: {
      minHeight: '600px',
    },
    children: [],
  },
]

export const visualBoxComponents: VisualBoxComponents[] = [
  {
    title: '容器组件',
    type: 'container',
    components: [
      {
        visualBoxKey: uuidv4(),
        visualBoxName: '栅格',
        visualBoxIcon: 'bi:grid-3x3',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: true,
        component: 'VisualGrid',
        props: {},
        propsOptions: [
          {
            groupName: '基础信息',
            target: 'props',
            label: '当前栅格列',
            property: 'columns',
            formType: 'numberInput',
          },
          {
            groupName: '基础信息',
            target: 'props',
            label: '栅格间隔(px)',
            property: 'gutter',
            formType: 'numberInput',
          },
          {
            groupName: '基础信息',
            target: 'props',
            label: '水平排列方式',
            property: 'justify',
            formType: 'select',
            options: [
              {
                label: '头部对齐',
                value: 'start',
              },
              {
                label: '尾部对齐',
                value: 'end',
              },
              {
                label: '居中对齐',
                value: 'center',
              },
              {
                label: '两端对齐',
                value: 'space-between',
              },
              {
                label: '自动分布',
                value: 'space-around',
              },
              {
                label: '均匀分布',
                value: 'space-evenly',
              },
            ],
          },
          {
            groupName: '基础信息',
            target: 'props',
            label: '垂直排列方式',
            property: 'align',
            formType: 'select',
            options: [
              {
                label: '顶部对齐',
                value: 'top',
              },
              {
                label: '居中',
                value: 'middle',
              },
              {
                label: '底部对齐',
                value: 'bottom',
              },
            ],
          },
        ],
        children: [],
      },
      {
        visualBoxKey: uuidv4(),
        visualBoxName: '弹性盒子',
        visualBoxIcon: 'bi:grid-1x2',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: false,
        layoutStyle: {},
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    ],
  },
  {
    type: 'basic',
    title: '基础组件',
    components: [
      {
        visualBoxKey: uuidv4(),
        visualBoxName: '文本组件',
        visualBoxIcon: 'bi:file-earmark-font',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: true,
        component: 'VisualText',
        style: {
          fontSize: '16px',
          color: '#333',
          textAlign: 'left',
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
        props: {
          content: '这是一行文本，hello world',
        },
        propsOptions: [
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'textarea',
            label: '文本内容',
            property: 'content',
            value: '这是一行文本，hello world',
          },
        ],
        options: [],
      },
      {
        visualBoxKey: uuidv4(),
        visualBoxName: '按钮组件',
        visualBoxIcon: 'bi:file-earmark-font',
        showTools: true,
        isDraggable: true,
        isDeletable: true,
        isEditable: true,
        disabled: true,
        component: 'VisualButton',
        props: {
          content: '按钮',
        },
        propsOptions: [
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'input',
            label: '按钮内容',
            property: 'content',
          },
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'colorPicker',
            label: '按钮颜色',
            property: 'color',
          },
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'switch',
            label: '是否为朴素按钮',
            property: 'plain',
          },
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'switch',
            label: '是否为文字按钮',
            property: 'text',
          },
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'switch',
            label: '是否为链接按钮',
            property: 'link',
          },
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'switch',
            label: '是否为链接按钮',
            property: 'round',
          },
          {
            groupName: '基础信息',
            target: 'props',
            formType: 'switch',
            label: '是否为圆形按钮',
            property: 'circle',
          },
        ],
      },
    ],
  },
]
