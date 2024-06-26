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

export interface VisualEditorPageTree extends Record<string, any> {
  title: string
  value: string
  path: string
  data: VisualEditorPage
  children?: VisualEditorPageTree[]
}

export const useVisualPages = () => {
  const { visualPages, currentPage } = storeToRefs(useVisualBoxStore())

  const { setCurrentPage: activeCurrentPage } = useVisualBoxStore()

  const setCurrentPage = (current: VisualEditorPage) => {
    activeCurrentPage(current)
  }

  const getPageBlockMap = (pages: VisualEditorPage[]) => {
    const visualPageBlocks: Record<string, string[]> = {}
    const recursion = (block: VisualEditorBlockData, page: VisualEditorPage) => {
      visualPageBlocks[page.pageId] = visualPageBlocks[page.pageId] || []
      visualPageBlocks[page.pageId].push(block._vid)
      Object.entries(block.slots).forEach(([_key, value]) => {
        value.children.forEach((child) => recursion(child, page))
      })
    }
    pages.forEach((page) => {
      page.blocks.forEach((block) => recursion(block, page))
    })
    return visualPageBlocks
  }

  const getPage = (block: VisualEditorBlockData) => {
    const pageBlockMap = getPageBlockMap(visualPages.value)
    return visualPages.value.find((page) => {
      return pageBlockMap[page.pageId] && pageBlockMap[page.pageId].includes(block._vid)
    })
  }

  const add = (form: VisualEditorPageForm) => {
    form.pageId = `page_${generateNanoid()}`
    visualPages.value.push(form)
    if (form.isDefault) {
      visualPages.value.forEach((item) => (item.isDefault = item.pageId === form.pageId))
    }
  }

  const update = (form: VisualEditorPageForm) => {
    const page = visualPages.value.find((item) => item.pageId === form.pageId)
    if (!page) return
    page.title = form.title
    page.path = form.path
    page.parentId = form.parentId
    page.isDefault = form.isDefault
    Object.assign(page.config, form.config)
    if (form.isDefault) {
      visualPages.value.forEach((item) => (item.isDefault = item.pageId === form.pageId))
    }
  }

  const remove = (form: VisualEditorPageForm) => {
    visualPages.value = visualPages.value.filter((item) => item.pageId !== form.pageId)
    activeCurrentPage(null)
  }

  const genTreeData = (page: VisualEditorPage): VisualEditorPageTree => {
    const { pageId, title, path } = page
    const children = visualPages.value.filter((item) => item.parentId === pageId).map((page) => genTreeData(page))
    return { value: pageId, title, path, children, data: page }
  }

  const visualPagesTree = computed<VisualEditorPageTree[]>(() => {
    return visualPages.value.filter((page) => !page.parentId).map((page) => genTreeData(page))
  })

  return {
    add,
    remove,
    update,
    setCurrentPage,
    getPage,
    getPageBlockMap,
    visualPagesTree,
    visualPages,
    currentPage,
  }
}
