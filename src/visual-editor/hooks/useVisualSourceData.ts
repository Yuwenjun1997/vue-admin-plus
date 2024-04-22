import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { isArray } from 'lodash'
import { VisualSourceDataMap } from '../types'

export const useVisualSourceData = () => {
  const { visualEditor } = storeToRefs(useVisualBoxStore())
  const { applyVisualEditor } = useVisualBoxStore()

  const add = (key: string) => {
    if (!visualEditor.value) return
    if (!visualEditor.value.sourceData) return
    if (!visualEditor.value.sourceData[key]) return
    const createHandler = visualEditor.value.sourceData[key].createHandler
    const target = visualEditor.value.sourceData[key].value
    if (isArray(target) && typeof createHandler === 'function') {
      target.push(createHandler())
      applyVisualEditor()
    }
  }

  const remove = (key: string, index: number) => {
    if (!visualEditor.value) return
    if (!visualEditor.value.sourceData) return
    if (!visualEditor.value.sourceData[key]) return
    const target = visualEditor.value.sourceData[key].value
    if (isArray(target)) {
      target.splice(index, 1)
      applyVisualEditor()
    }
  }

  const init = (sourceDataMap?: VisualSourceDataMap) => {
    if (!sourceDataMap) return
    if (!visualEditor.value) return
    if (!visualEditor.value.sourceData) return
    Object.entries(visualEditor.value.sourceData).forEach(([key]) => {
      if (!visualEditor.value) return
      if (!visualEditor.value.sourceData) return

      const target = visualEditor.value.sourceData[key]
      const props = sourceDataMap[key]

      if (isArray(props) && isArray(target.value)) {
        target.value = props.map((item: Record<string, any>) => {
          if (typeof target.createHandler !== 'function') return {} as any
          const option = target.createHandler()
          Object.entries(option).forEach(([key, value]) => {
            value.defaultValue = item[key]
          })
          return option
        })
      } else if (!isArray(props) && !isArray(target.value)) {
        if (typeof target.createHandler !== 'function') return
        Object.entries(target.value).forEach(([key, value]) => {
          value.defaultValue = props[key]
        })
      }
    })
  }

  return {
    add,
    remove,
    init,
  }
}
