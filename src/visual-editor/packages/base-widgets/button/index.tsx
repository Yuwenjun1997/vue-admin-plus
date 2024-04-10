import type { VisualEditorComponent } from '@/visual-editor/types'
import { Button } from 'vant'

export default {
  key: 'button',
  moduleName: 'baseWidgets',
  label: '按钮',
  preview: () => <Button type={'primary'}>按钮</Button>,
  render: ({ props, styles }) => {
    return () => (
      <div style={styles}>
        <Button {...props}></Button>
      </div>
    )
  },
  props: {
    text: '按钮',
  },
} as VisualEditorComponent
