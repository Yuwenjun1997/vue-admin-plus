import type { CSSProperties } from 'vue'
import { customAlphabet } from 'nanoid'

import {
  ComponentModules,
  VisualBlockSlotMap,
  VisualEditorBlockData,
  VisualEditorComponent,
  VisualEditorProps,
} from './types'

export const generateNanoid = customAlphabet('123456ABCDEF', 6)

export function createNewBlock(component: VisualEditorComponent): VisualEditorBlockData {
  return {
    _vid: `vid_${generateNanoid()}`,
    moduleName: component.moduleName,
    componentKey: component!.key,
    label: component!.label,
    isActive: false,
    styles: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    props: Object.entries(component.props || {}).reduce((prev: Record<string, any>, [propName, propSchema]) => {
      prev[propName] = propSchema?.defaultValue
      return prev
    }, {}),
    draggable: component.draggable ?? true, // 是否可以拖拽
    slots: (component.slots || []).reduce((prev: VisualBlockSlotMap, slot, index) => {
      const props = Object.entries(slot).reduce((props: Record<string, any>, [propName, propSchema]) => {
        props[propName] = propSchema?.defaultValue
        return props
      }, {})
      prev[`slot${index}`] = {
        index,
        props: props,
        children: [] as VisualEditorBlockData[],
      }
      return prev
    }, {}),
    model: {},
  }
}

/**
 * @description 创建编辑器配置
 */
export function createVisualEditorConfig() {
  const componentModules: ComponentModules = {
    basicWidgets: [],
    containerWidgets: [],
  }
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
