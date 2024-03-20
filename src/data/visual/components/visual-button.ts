import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualButtonProps {
  content: string
  color: string
  plain: boolean
  text: boolean
  link: boolean
  round: boolean
  circle: boolean
}

export const visualButton: VisualBasic<VisualButtonProps> = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '按钮',
  visualBoxIcon: 'ep:switch-button',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'VisualButton',
  props: {
    content: '按钮',
    color: '#007DFF',
    plain: false,
    text: false,
    link: false,
    round: false,
    circle: false,
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
}

export default visualButton
