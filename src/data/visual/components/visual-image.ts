import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'
import { ImageProps } from 'vant'
import { FormatProps } from '../types'

export const visualImage: VisualBasic<FormatProps<ImageProps>> = {
  key: uuidv4(),
  group: 'basic',
  name: '图片',
  icon: 'ep:picture',
  isDeletable: true,
  isEditable: true,
  disabled: true,
  componentType: 'vant',
  component: 'van-image',
  layoutStyle: {
    display: 'inline-block',
  },
  props: {
    src: 'https://vue-admin-assets.oss-cn-hangzhou.aliyuncs.com/default-empty.png',
    round: false,
    block: false,
    lazyLoad: false,
    showLoading: true,
    width: '200px',
    height: '200px',
  },
  options: [
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'input',
      label: '图片地址',
      property: 'src',
      value: '',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'cssInput',
      label: '图片宽度',
      property: 'width',
      value: '',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'cssInput',
      label: '图片长度',
      property: 'height',
      value: '',
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'switch',
      label: '圆形图片',
      property: 'round',
      value: false,
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'switch',
      label: '块级元素',
      property: 'block',
      value: false,
    },
    {
      groupName: '基础信息',
      target: 'props',
      formType: 'switch',
      label: '懒加载',
      property: 'lazyLoad',
      value: false,
    },
  ],
}

export default visualImage
