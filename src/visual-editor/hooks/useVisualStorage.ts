import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { useStorage } from '@vueuse/core'
import { VisualEditorBlockData } from '../types'

export const useVisualStorage = () => {
  const { visualPages, visualStore, currentPage, device, currentBlock } = storeToRefs(useVisualBoxStore())
  const { setCurrentBlock } = useVisualBoxStore()

  const previewLink = computed(() => `/visual-preview.html#${currentPage.value?.path || ''}`)

  // 预览数据
  const state = useStorage('visual-editor-preview', {
    device: device.value || 'h5',
    visualPages: visualPages.value,
    visualStore: visualStore.value,
    currentPageId: currentPage.value?.pageId,
    currentBlockId: currentBlock.value?._vid,
  })

  // 保存编辑状态
  const setState = () => {
    state.value.currentPageId = currentPage.value?.pageId
    state.value.visualPages = visualPages.value
    state.value.visualStore = visualStore.value
    state.value.device = device.value
    state.value.currentBlockId = currentBlock.value?._vid
  }

  const setCurrentBlockFn = (blocks: VisualEditorBlockData[]) => {
    blocks.forEach((block) => {
      if (currentBlock.value) return
      if (block._vid === state.value.currentBlockId) {
        currentBlock.value = block
        setCurrentBlock(block)
      } else {
        Object.entries(block.slots).forEach(([_key, value]) => setCurrentBlockFn(value.children))
      }
    })
  }

  // 初始化预览数据
  const init = () => {
    device.value = state.value.device || 'h5'
    visualPages.value = state.value.visualPages
    visualStore.value = state.value.visualStore
    currentPage.value = visualPages.value.find((item) => item.pageId === state.value.currentPageId) || null
    if (currentPage.value) {
      setCurrentBlockFn(currentPage.value.blocks)
    }
  }

  return {
    previewLink,
    init,
    setState,
  }
}
