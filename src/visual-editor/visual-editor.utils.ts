import type { VisualEditorProps } from './visual-editor.props'
import type { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ComponentModules, VisualEditorBlockData, VisualEditorComponent } from './types'

export function createNewBlock(component: VisualEditorComponent): VisualEditorBlockData {
  return {
    _vid: `vid_${uuidv4()}`,
    moduleName: component.moduleName,
    componentKey: component!.key,
    label: component!.label,
    isActive: false,
    styles: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: '0',
      paddingRight: '0',
      paddingLeft: '0',
      paddingBottom: '0',
    },
    props: component.props ?? {},
    draggable: component.draggable ?? true, // 是否可以拖拽
    model: {},
  }
}

/**
 * @description 创建编辑器配置
 */
export function createVisualEditorConfig() {
  const componentModules: ComponentModules = {
    baseWidgets: [],
    containerComponents: [],
  }
  // const componentList: VisualEditorComponent[] = []
  const componentMap: Record<string, VisualEditorComponent> = {}
  return {
    componentModules,
    componentMap,
    registry: <_, Props extends Record<string, VisualEditorProps> = {}, Model extends Record<string, string> = {}>(
      moduleName: keyof ComponentModules,
      key: string,
      component: {
        label: string
        preview: () => JSX.Element
        render: (data: {
          props: { [k in keyof Props]: any }
          model: Partial<{ [k in keyof Model]: any }>
          styles: CSSProperties
          block: VisualEditorBlockData
          custom: Record<string, any>
        }) => () => JSX.Element
        props?: Props
        model?: Model
        styles?: CSSProperties
      }
    ) => {
      const comp = { ...component, key, moduleName }
      componentModules[moduleName].push(comp)
      componentMap[key] = comp
    },
  }
}
