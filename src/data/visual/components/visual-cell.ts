import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

import { CellGroupProps, CellProps } from 'vant'
import { FormatProps } from '../types'

export interface VisualCellGroupProps extends FormatProps<CellGroupProps> {
  cells: FormatProps<CellProps>[]
}

export interface VisualCellProps {
  cellGroup: VisualCellGroupProps[]
}

export const visualCell: VisualBasic<VisualCellProps> = {
  name: 'VisualCell',
  key: uuidv4(),
  group: 'basic',
  componentType: 'visual',
  component: 'VisualCell',
  title: '单元格',
  icon: 'bi:list',
  isEditable: true,
  isDeletable: true,
  props: {
    cellGroup: [
      {
        title: '',
        inset: false,
        border: false,
        cells: [
          {
            title: '单元格',
            value: '内容',
            label: '描述信息',
          },
        ],
      },
      {
        title: '标题',
        inset: false,
        border: false,
        cells: [
          {
            title: '单元格',
            value: '内容',
            label: '描述信息',
          },
        ],
      },
    ],
  },
}

export default {
  component: visualCell,
}
