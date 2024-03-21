import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualImageProps {
  src?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export const visualImage: VisualBasic<VisualImageProps> = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '图片',
  visualBoxIcon: 'ep:picture',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'VisualImage',
  layoutStyle: {
    width: '300px',
  },
  customStyle: {
    height: '300px',
  },
  props: {
    src: 'https://static-mp-c0f2ea90-b7eb-4763-9dcb-64820c2f7a60.next.bspapp.com/static/default-empty.png',
  },
  options: [
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'select',
      label: '填充',
      property: 'fit',
      value: 'cover',
      options: [
        { label: 'fill', value: 'fill' },
        { label: ' contain', value: 'contain' },
        { label: ' cover', value: 'cover' },
        { label: ' none', value: 'none' },
        { label: ' scale-down', value: 'scale-down' },
      ],
    },
  ],
  propsOptions: [
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'input',
      label: '图片的源地址',
      property: 'src',
    },
  ],
}

export default visualImage
