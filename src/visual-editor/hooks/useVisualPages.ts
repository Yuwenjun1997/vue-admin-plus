import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { PageConfig, VisualEditorBlockData, VisualEditorPage } from '../types'
import { generateNanoid } from '../visual-editor.utils'

export class VisualEditorPageForm implements VisualEditorPage {
  parentId?: string | undefined
  id: string = ''
  path: string = ''
  isDefault?: boolean | undefined = false
  config: PageConfig = { bgColor: '', bgImage: '', bgRepeat: false }
  blocks: VisualEditorBlockData[] = []
  children: VisualEditorPage[] = []
  title: string = ''
}

const flatVisualPagesFn = (pages: VisualEditorPage[], result: VisualEditorPage[] = []) => {
  pages?.forEach((page) => {
    result.push(page)
    flatVisualPagesFn(page.children, result)
  })
  return result
}

export const useVisualPages = () => {
  const { visualPages } = storeToRefs(useVisualBoxStore())

  const { setCurrentPage: activeCurrentPage } = useVisualBoxStore()

  const flatVisualPages = computed(() => flatVisualPagesFn(visualPages.value))

  const setCurrentPage = (current: VisualEditorPage) => {
    const page = flatVisualPages.value.find((item) => item.id === current.id)
    if (!page) return
    activeCurrentPage(page)
  }

  const add = (form: VisualEditorPageForm) => {
    form.id = `page_${generateNanoid()}`
    if (form.parentId) {
      const parent = flatVisualPages.value.find((item) => item.id === form.parentId)
      if (parent) parent.children.push(form)
    } else {
      visualPages.value.push(form)
    }
  }

  const update = (form: VisualEditorPageForm) => {
    const page = flatVisualPages.value.find((item) => item.id === form.id)
    if (!page) return
    Object.assign(page.config, form.config)
    page.title = form.title
    page.path = form.path
  }

  const remove = (form: VisualEditorPageForm) => {
    if (form.parentId) {
      const parent = flatVisualPages.value.find((item) => item.id === form.parentId)
      if (!parent) return
      const index = parent.children.findIndex((item) => item.id === form.id)
      if (index > -1) parent.children.splice(index, 1)
    } else {
      const index = visualPages.value.findIndex((item) => item.id === form.id)
      if (index > -1) visualPages.value.splice(index, 1)
    }
    activeCurrentPage(null)
  }

  watchEffect(() => {
    console.log(flatVisualPages.value)
  })

  return {
    add,
    remove,
    update,
    setCurrentPage,
    visualPages,
  }
}
