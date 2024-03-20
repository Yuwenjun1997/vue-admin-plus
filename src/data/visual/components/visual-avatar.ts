import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualAvatarProps {
  size?: number | 'large' | 'default' | 'small'
  shape?: 'circle' | 'square'
  src?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export const VisualAvatar: VisualBasic<VisualAvatarProps> = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '头像',
  visualBoxIcon: 'ep:avatar',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  component: 'VisualAvatar',
  customStyle: {
    fontSize: '0px',
  },
  props: {
    size: 36,
    shape: 'circle',
    src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    fit: 'fill',
  },
  propsOptions: [
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'numberInput',
      label: '头像大小',
      property: 'size',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'select',
      label: '形状',
      property: 'shape',
      value: 'circle',
      options: [
        { label: '圆形', value: 'circle' },
        { label: '正方形', value: 'square' },
      ],
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'input',
      label: '图片的源地址',
      property: 'src',
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

export default VisualAvatar
