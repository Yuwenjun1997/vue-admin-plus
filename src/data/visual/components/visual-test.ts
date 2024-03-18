import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

export interface VisualTestProps {
  content: string
}

export const visualTest: VisualBasic<VisualTestProps> = {
  visualBoxKey: uuidv4(),
  visualBoxGroup: 'basic',
  visualBoxName: '测试',
  visualBoxIcon: 'bi:file-earmark-font',
}

export default visualTest
