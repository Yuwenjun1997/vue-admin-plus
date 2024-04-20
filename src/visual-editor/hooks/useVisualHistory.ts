import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { useRefHistory } from '@vueuse/core'
import { VisualEditorPage } from '../types'
import { useVisualStorage } from './useVisualStorage'

export const useVisualHistory = () => {
  const { currentPage, visualPages } = storeToRefs(useVisualBoxStore())
  const { setState } = useVisualStorage()

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
      setState()
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
