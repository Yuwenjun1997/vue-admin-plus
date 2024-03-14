import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualFlexBoxProps {}

export const visualFlexBox: VisualBasic<VisualFlexBoxProps> = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'container',
  visualBoxName: '弹性盒子',
  visualBoxIcon: 'bi:grid-1x2',
  showTools: true,
  isDraggable: true,
  isDeletable: true,
  isEditable: true,
  disabled: false,
  style: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  options: [
    {
      groupName: '弹性布局',
      label: '水平排列方式',
      formType: 'select',
      target: 'style',
      property: 'justifyContent',
      options: [
        {
          label: '左对齐',
          value: 'flex-start',
        },
        {
          label: '居中',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'flex-end',
        },
        {
          label: '等间距排列',
          value: 'space-between',
        },
        {
          label: '环绕排列',
          value: 'space-around',
        },
        {
          label: '等间距环绕排列',
          value: 'space-evenly',
        },
      ],
    },
    {
      groupName: '弹性布局',
      label: '垂直排列方式',
      formType: 'select',
      target: 'style',
      property: 'alignItems',
      options: [
        {
          label: '起始位置对齐',
          value: 'flex-start',
        },
        {
          label: '结束位置对齐',
          value: 'flex-end',
        },
        {
          label: '居中对齐',
          value: 'center',
        },
        {
          label: '基线对齐',
          value: 'baseline',
        },
        {
          label: '拉伸',
          value: 'stretch',
        },
      ],
    },
    {
      groupName: '弹性布局',
      label: '元素换行',
      formType: 'select',
      target: 'style',
      property: 'nowrap',
      options: [
        {
          label: '不换行',
          value: 'nowrap',
        },
        {
          label: '换行',
          value: 'wrap',
        },
      ],
    },
    {
      groupName: '弹性布局',
      label: '主轴方向',
      formType: 'select',
      target: 'style',
      property: 'flexDirection',
      options: [
        {
          label: '从左向右',
          value: 'row',
        },
        {
          label: '从右向左',
          value: 'row-reverse',
        },
        {
          label: '从上向下',
          value: 'column',
        },
        {
          label: '从下向上',
          value: 'column-reverse',
        },
      ],
    },
  ],
}

export default visualFlexBox
