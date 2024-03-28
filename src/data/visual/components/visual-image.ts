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
  componentType: 'visual',
  component: 'VisualImage',
  layoutStyle: {
    width: '300px',
  },
  customStyle: {
    height: '300px',
  },
  props: {
    src: 'https://vue-admin-assets.oss-cn-hangzhou.aliyuncs.com/default-empty.png',
  },
  options: [
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'input',
      label: '源地址',
      property: 'src',
      bindAble: true,
      bindProp: '',
    },
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
}

export default visualImage
