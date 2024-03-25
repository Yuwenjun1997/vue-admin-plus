import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export const visualElForm: VisualBasic = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'form',
  visualBoxName: '表单',
  visualBoxIcon: 'bi:journal-text',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'el-form',
  componentType: 'element',
  props: {
    'label-width': '80px',
  },
  options: [
    {
      formType: 'propSelect',
      groupName: '基本信息',
      label: '数据对象',
      property: 'model',
      target: 'props',
      bindAble: true,
    },
    {
      formType: 'codeInput',
      groupName: '基本信息',
      label: '验证规则',
      property: 'rules',
      target: 'props',
    },
    {
      formType: 'cssInput',
      groupName: '基本信息',
      label: '标签的长度',
      property: 'label-width',
      target: 'props',
    },
    {
      formType: 'select',
      groupName: '基本信息',
      label: '标签位置',
      property: 'label-position',
      target: 'props',
      description: '表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性',
      options: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
      ],
    },
    {
      formType: 'input',
      groupName: '基本信息',
      label: '标签的后缀',
      property: 'label-suffix',
      target: 'props',
      description: '表单域标签的后缀',
      value: '',
    },
    {
      formType: 'switch',
      groupName: '基本信息',
      label: '隐藏红色星号',
      property: 'hide-required-asterisk',
      target: 'props',
      description: '是否隐藏必填字段标签旁边的红色星号',
      value: false,
    },
    {
      formType: 'select',
      groupName: '基本信息',
      label: '星号的位置',
      property: 'require-asterisk-position',
      target: 'props',
      options: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
      ],
      value: 'left',
    },
    {
      formType: 'switch',
      groupName: '基本信息',
      label: '显示错误信息',
      property: 'show-message',
      target: 'props',
      value: true,
    },
    {
      formType: 'switch',
      groupName: '基本信息',
      label: '是否禁用',
      property: 'disabled',
      target: 'props',
      description: '是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性',
      value: false,
    },
    {
      formType: 'select',
      groupName: '基本信息',
      label: '尺寸',
      property: 'size',
      target: 'props',
      description: '用于控制该表单内组件的尺寸',
      options: [
        { label: '默认', value: '' },
        { label: '大', value: 'large' },
        { label: '中', value: 'default' },
        { label: '小', value: 'small' },
      ],
    },
  ],
  children: [
    {
      visualBoxKey: uuidv4(),
      visualBoxName: '表单内容区域',
      isEditable: false,
      isDeletable: false,
    },
  ],
}

export default visualElForm
