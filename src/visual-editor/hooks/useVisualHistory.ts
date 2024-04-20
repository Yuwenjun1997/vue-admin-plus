import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { useRefHistory } from '@vueuse/core'
import { VisualEditorPage } from '../types'

export const useVisualHistory = () => {
  const { currentPage, visualPages } = storeToRefs(useVisualBoxStore())

  const { undo, redo, canRedo, canUndo } = useRefHistory(currentPage, { deep: true })

  // 更新页面数据
  const updatePages = (newPage: VisualEditorPage) => {
    visualPages.value.forEach((page) => {
      if (page.pageId === newPage.pageId) Object.assign(page, newPage)
    })
  }

  watch(
    currentPage,
    (nVal, oldVal) => {
      if (nVal !== oldVal && nVal) updatePages(nVal)
    },
    { deep: true }
  )

  return {
    undo,
    redo,
    canRedo,
    canUndo,
  }
}
