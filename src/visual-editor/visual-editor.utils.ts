import type { CSSProperties } from 'vue'
import { customAlphabet } from 'nanoid'

import {
  ComponentModules,
  VisualBlockEventMap,
  VisualBlockSlotMap,
  VisualEditorBlockData,
  VisualEditorComponent,
  VisualEditorProps,
} from './types'
import { isArray } from 'lodash'

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
    slotEditable: component.slotEditable ?? true, // 是否可以编辑slot
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
    events: (component.events || []).reduce((prev: VisualBlockEventMap, event) => {
      prev[event.eventName] = []
      return prev
    }, {}),
    bindProps: component.bindProps ?? {},
    sourceData: Object.entries(component.sourceData || {}).reduce((source: Record<string, any>, [key, item]) => {
      if (isArray(item.value)) {
        source[key] = item.value.map((item) =>
          Object.entries(item).reduce((prev: Record<string, any>, [prop, propSchema]) => {
            prev[prop] = propSchema?.defaultValue
            return prev
          }, {})
        )
      } else {
        source[key] = Object.entries(item.value).reduce((prev: Record<string, any>, [prop, propSchema]) => {
          prev[prop] = propSchema?.defaultValue
          return prev
        }, {})
      }
      return source
    }, {}),
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
    registry: <_, Props extends Record<string, VisualEditorProps> = {}>(
      moduleName: keyof ComponentModules,
      key: string,
      component: {
        label: string
        preview: () => JSX.Element
        render: (data: {
          styles: CSSProperties
          block: VisualEditorBlockData
          slots?: VisualBlockSlotMap
        }) => () => JSX.Element
        props?: Props
        styles?: CSSProperties
      }
    ) => {
      const comp = { ...component, key, moduleName }
      componentModules[moduleName].push(comp)
      componentMap[key] = comp
    },
  }
}
