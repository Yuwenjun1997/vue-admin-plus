import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export const visualElInput: VisualBasic = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'form',
  visualBoxName: '输入框',
  visualBoxIcon: 'bi:input-cursor-text',
  isEditable: true,
  isDeletable: true,
  disabled: true,
  component: 'el-input',
  componentType: 'element',
  options: [],
  customStyle: {
    width: '100%',
  },
}

export default visualElInput
