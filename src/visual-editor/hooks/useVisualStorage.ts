import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { useStorage } from '@vueuse/core'

export const useVisualStorage = () => {
  const { visualPages, visualStore, currentPage } = storeToRefs(useVisualBoxStore())

  const previewLink = computed(() => `/visual-preview.html#${currentPage.value?.path || ''}`)

  // 预览数据
  const state = useStorage('visual-editor-preview', {
    visualPages: visualPages.value,
    visualStore: visualStore.value,
    currentPageId: currentPage.value?.pageId,
  })

  // 初始化预览数据
  const init = () => {
    visualPages.value = state.value.visualPages
    visualStore.value = state.value.visualStore
    currentPage.value = visualPages.value.find((item) => item.pageId === state.value.currentPageId) || null
  }

  return {
    previewLink,
    init,
  }
}
