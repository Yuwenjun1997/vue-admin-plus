import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'
import { customBindMehotdDesc } from '../options/constant'

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
  content: '按钮',
  layoutStyle: {
    display: 'inline-block',
  },
  props: {
    color: '#409eff',
  },
  options: [
    {
      groupName: '基础信息',
      target: 'root',
      formType: 'input',
      label: '文本内容',
      property: 'content',
      bindAble: true,
      bindProp: '',
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
      label: '是否禁用',
      property: 'disabled',
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
      label: '是否为圆角按钮',
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
  bindMethodMap: {},
  customMethod: {},
  bindOptions: [
    {
      groupName: '绑定事件',
      target: 'bindMethodMap',
      formType: 'methodSelect',
      label: '点击事件',
      property: 'click',
      value: '',
    },
    {
      groupName: '自定义事件',
      target: 'customMethod',
      formType: 'codeInput',
      label: '点击事件',
      property: 'click',
      value: '',
      description: customBindMehotdDesc,
    },
  ],
}

export default visualElButton
