import { createVisualEditorConfig } from '@/visual-editor/visual-editor.utils'

import baseWidgets from '@/visual-editor/packages/base-widgets'

export const visualConfig = createVisualEditorConfig()
// 注册基础控件
Object.entries(baseWidgets).forEach(([name, widget]) => visualConfig.registry('baseWidgets', name, widget))

console.log(
  `%c成功加载组件数量:${Object.keys(visualConfig.componentMap).length}`,
  'color:#409EFF;background-color:#ecf5ff;padding:0 10px;line-height:2;margin-bottom:4px;'
)

console.log('visualConfig:', visualConfig)
