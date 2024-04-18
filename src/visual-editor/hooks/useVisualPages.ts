import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { PageConfig, VisualEditorBlockData, VisualEditorPage } from '../types'
import { generateNanoid } from '../visual-editor.utils'

export class VisualEditorPageForm implements VisualEditorPage {
  parentId?: string | undefined
  pageId: string = ''
  path: string = ''
  isDefault?: boolean | undefined = false
  config: PageConfig = { bgColor: '', bgImage: '', bgRepeat: false }
  blocks: VisualEditorBlockData[] = []
  title: string = ''
}

export interface VisualEditorPageTree {
  title: string
  value: string
  data: VisualEditorPage
  children?: VisualEditorPageTree[]
}

export const useVisualPages = () => {
  const { visualPages } = storeToRefs(useVisualBoxStore())

  const { setCurrentPage: activeCurrentPage } = useVisualBoxStore()

  const setCurrentPage = (current: VisualEditorPage) => {
    activeCurrentPage(current)
  }

  const add = (form: VisualEditorPageForm) => {
    form.pageId = `page_${generateNanoid()}`
    visualPages.value.push(form)
  }

  const update = (form: VisualEditorPageForm) => {
    const page = visualPages.value.find((item) => item.pageId === form.pageId)
    if (!page) return
    page.title = form.title
    page.path = form.path
    page.parentId = form.parentId
    Object.assign(page.config, form.config)
  }

  const remove = (form: VisualEditorPageForm) => {
    visualPages.value = visualPages.value.filter((item) => item.pageId !== form.pageId)
    activeCurrentPage(null)
  }

  const genTreeData = (page: VisualEditorPage): VisualEditorPageTree => {
    const { pageId, title } = page
    const children = visualPages.value.filter((item) => item.parentId === pageId).map((page) => genTreeData(page))
    return { value: pageId, title, children, data: page }
  }

  const visualPagesTree = computed<VisualEditorPageTree[]>(() => {
    return visualPages.value.filter((page) => !page.parentId).map((page) => genTreeData(page))
  })

  return {
    add,
    remove,
    update,
    setCurrentPage,
    visualPagesTree,
    visualPages,
  }
}
