import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export const visualElForm: VisualBasic = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'form',
  visualBoxName: '表单列',
  visualBoxIcon: 'bi:input-cursor-text',
  isEditable: true,
  isDeletable: true,
  disabled: true,
  component: 'el-form-item',
  componentType: 'element',
  visualStyle: { display: 'flex', flexDirection: 'column' },
  props: {
    label: '表单列',
  },
  options: [
    {
      formType: 'input',
      groupName: '基本信息',
      label: '表单标签',
      property: 'label',
      target: 'props',
    },
  ],
  children: [
    {
      visualBoxKey: uuidv4(),
      visualBoxName: '表单列内容区域',
      isEditable: false,
      isDeletable: false,
      noWrapper: true,
      visualLayoutStyle: {
        width: '100%',
      },
      visualStyle: {
        width: '100%',
      },
    },
  ],
}

export default visualElForm
