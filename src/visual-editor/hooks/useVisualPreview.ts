import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

export const useVisualPreview = () => {
  const { visualPages, currentPage } = storeToRefs(useVisualBoxStore())
  const { setCurrentPage } = useVisualBoxStore()

  const router = useRouter()
  const route = useRoute()

  watch(route, () => {
    const page = visualPages.value.find((page) => page.pageId === route.meta.menuId)
    if (!page) return router.replace({ path: '/404' })
    setCurrentPage(page)
  })

  return {
    currentPage,
  }
}
