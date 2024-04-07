import { VisualBasic, VisualBoxOption } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualTextProps {
  content: string
}

export const visualText: VisualBasic<VisualTextProps> = {
  key: uuidv4(),
  name: 'visualText',
  group: 'basic',
  title: '文本',
  icon: 'bi:file-earmark-font',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  content: '这是一行文本',
}

const options: VisualBoxOption[] = [
  {
    groupName: '基础信息',
    target: 'root',
    formType: 'textarea',
    label: '文本内容',
    property: 'content',
    bindAble: true,
    bindProp: '',
  },
]

export default {
  component: visualText,
  options,
}
