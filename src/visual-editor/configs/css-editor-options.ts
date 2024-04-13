import { VisualEditorProps } from '@/visual-editor/types'
import { createEditorCssInputProp, createEditorSelectProp } from '@/visual-editor/visual-editor.props'

export const cssEditorOptions: Record<string, VisualEditorProps> = {
  justifyContent: createEditorSelectProp({
    label: '组件对齐方式',
    options: [
      { label: '左对齐', value: 'flex-start' },
      { label: '居中对齐', value: 'center' },
      { label: '右对齐', value: 'flex-end' },
    ],
    defaultValue: 'flex-start',
  }),
  marginTop: createEditorCssInputProp({
    label: '上外边距',
  }),
  marginBottom: createEditorCssInputProp({
    label: '下外边距',
  }),
  marginLeft: createEditorCssInputProp({
    label: '左外边距',
  }),
  marginRight: createEditorCssInputProp({
    label: '右外边距',
  }),
  paddingTop: createEditorCssInputProp({
    label: '上内边距',
  }),
  paddingBottom: createEditorCssInputProp({
    label: '下内边距',
  }),
  paddingLeft: createEditorCssInputProp({
    label: '左内边距',
  }),
  paddingRight: createEditorCssInputProp({
    label: '右内边距',
  }),
}
