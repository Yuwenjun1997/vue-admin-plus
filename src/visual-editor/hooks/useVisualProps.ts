import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData } from '../types'
import { useVisualPages } from './useVisualPages'

export const useVisualProps = () => {
  const { visualStore } = storeToRefs(useVisualBoxStore())
  const { getPage } = useVisualPages()

  const genProps = (block: VisualEditorBlockData) => {
    const currentPage = getPage(block)
    return Object.entries(block.props).reduce((prev: Record<string, any>, [key]) => {
      const option = block.bindProps[key]
      if (option && option.bindSourceKey && option.bindProp) {
        if (option.bindSourceKey === 'currentPage') {
          prev[key] = currentPage?.store && currentPage?.store[option.bindProp]
        } else if (option.bindSourceKey === 'global') {
          prev[key] = visualStore.value[option.bindProp]
        }
      } else {
        prev[key] = block.props[key]
      }
      return prev
    }, {})
  }

  return {
    genProps,
  }
}
