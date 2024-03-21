import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export const visualElButton: VisualBasic = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '按钮',
  visualBoxIcon: 'ep:switch-button',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'el-button',
  componentType: 'element',
  methods: {},
  props: {
    color: '#409eff',
  },
  options: [
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
  propsOptions: [
    {
      groupName: '事件',
      target: 'methods',
      formType: 'methodInput',
      label: '监听按钮点击',
      property: 'click:handleClick',
      value: '',
    },
  ],
  children: [
    {
      visualBoxKey: uuidv4(),
      visualBoxName: '按钮内容',
      isEditable: true,
      isLocked: true,
      disabled: true,
      component: 'VisualText',
      customStyle: {
        color: '#ffffff',
      },
      props: {
        content: '按钮',
      },
      propsOptions: [
        {
          groupName: '基础信息',
          target: 'props',
          formType: 'textarea',
          label: '文本内容',
          property: 'content',
        },
      ],
    },
  ],
}

export default visualElButton