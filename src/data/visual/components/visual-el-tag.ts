import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export const visualElTag: VisualBasic = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '标签',
  visualBoxIcon: 'bi:tag',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'el-tag',
  componentType: 'element',
  content: '标签',
  props: {
    type: 'primary',
    size: 'default',
    effect: 'light',
    'disable-transitions': false,
    hit: false,
    round: false,
  },
  options: [
    {
      groupName: '基础信息',
      target: 'root',
      formType: 'input',
      label: '文本内容',
      property: 'content',
      bindAble: true,
      bindProp: ''
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'colorPicker',
      label: '颜色',
      property: 'color',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'select',
      label: '类型',
      property: 'type',
      options: [
        { label: '默认', value: 'primary' },
        { label: '成功', value: 'success' },
        { label: '信息', value: 'info' },
        { label: '警告', value: 'warning' },
        { label: '危险', value: 'danger' },
      ],
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'switch',
      label: '禁用渐变动画',
      property: 'disable-transitions',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'switch',
      label: '边框描边',
      property: 'hit',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'select',
      label: '当前状态',
      property: 'size',
      options: [
        { label: '大', value: 'large' },
        { label: '中', value: 'default' },
        { label: '小', value: 'small' },
      ],
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'select',
      label: '主题',
      property: 'effect',
      options: [
        { label: '暗色', value: 'dark' },
        { label: '亮色', value: 'light' },
        { label: '无', value: 'plain' },
      ],
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'switch',
      label: '是否为圆形',
      property: 'round',
    },
  ],
}

export default visualElTag
