import { createVisualEditorConfig } from '@/visual-editor/visual-editor.utils'

import basicWidgets from '@/visual-editor/packages/basic'
import containerWidgets from '@/visual-editor/packages/container'

export const visualConfig = createVisualEditorConfig()
// 注册基础控件
Object.entries(basicWidgets).forEach(([name, widget]) => visualConfig.registry('basicWidgets', name, widget))

Object.entries(containerWidgets).forEach(([name, widget]) => visualConfig.registry('containerWidgets', name, widget))

console.log(
  `%c成功加载组件数量:${Object.keys(visualConfig.componentMap).length}`,
  'color:#409EFF;background-color:#ecf5ff;padding:0 10px;line-height:2;margin-bottom:4px;'
)

console.log('visualConfig:', visualConfig)
