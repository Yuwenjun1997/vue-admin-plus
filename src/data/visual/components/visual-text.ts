import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualTextProps {
  content: string
}

export const visualText: VisualBasic<VisualTextProps> = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '文本组件',
  visualBoxIcon: 'bi:file-earmark-font',
  showTools: true,
  isDraggable: true,
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'VisualText',
  props: {
    content: '这是一行文本',
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
}

export default visualText
