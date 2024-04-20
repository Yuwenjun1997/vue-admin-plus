import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { useStorage } from '@vueuse/core'

export const useVisualStorage = () => {
  const { visualPages, visualStore, currentPage, device } = storeToRefs(useVisualBoxStore())

  const previewLink = computed(() => `/visual-preview.html#${currentPage.value?.path || ''}`)

  // 预览数据
  const state = useStorage('visual-editor-preview', {
    device: device.value,
    visualPages: visualPages.value,
    visualStore: visualStore.value,
    currentPageId: currentPage.value?.pageId,
  })

  const setState = () => {
    state.value.currentPageId = currentPage.value?.pageId
    state.value.visualPages = visualPages.value
    state.value.visualStore = visualStore.value
    state.value.device = device.value
  }

  // 初始化预览数据
  const init = () => {
    device.value = state.value.device
    visualPages.value = state.value.visualPages
    visualStore.value = state.value.visualStore
    currentPage.value = visualPages.value.find((item) => item.pageId === state.value.currentPageId) || null
  }

  return {
    previewLink,
    init,
    setState,
  }
}
