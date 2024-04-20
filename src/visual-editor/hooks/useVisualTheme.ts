import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData } from '../types'
import { CSSProperties } from 'vue'

export const useVisualTheme = () => {
  const { currentPage } = storeToRefs(useVisualBoxStore())

  const hasNavbar = computed<boolean>(() => {
    let result = false
    if (!currentPage.value) return result
    const recursion = (blocks: VisualEditorBlockData[]) => {
      blocks.forEach((block) => {
        result = result || (block.componentKey === 'navbar' && block.props.fixedTop)
        if (result) return
        Object.entries(block.slots).forEach(([_key, value]) => recursion(value.children))
      })
    }
    recursion(currentPage.value.blocks)
    return result
  })

  const hasTabbar = computed<boolean>(() => {
    let result = false
    if (!currentPage.value) return result
    const recursion = (blocks: VisualEditorBlockData[]) => {
      blocks.forEach((block) => {
        result = result || (block.componentKey === 'tabbar' && block.props.fixedBottom)
        if (result) return
        Object.entries(block.slots).forEach(([_key, value]) => recursion(value.children))
      })
    }
    recursion(currentPage.value.blocks)
    return result
  })

  const pageStyles = computed<CSSProperties | undefined>(() => {
    if (!currentPage.value) return
    return {
      backgroundColor: currentPage.value.config.bgColor,
      backgroundImage: currentPage.value.config.bgImage ? `url(${currentPage.value.config.bgImage})` : '',
      backgroundRepeat: currentPage.value.config.bgRepeat ? 'repeat' : 'no-repeat',
      paddingTop: hasNavbar.value ? 'var(--visual-navbar-height)' : '',
      paddingBottom: hasTabbar.value ? 'var(--visual-tabbar-height)' : '',
    }
  })

  return { hasNavbar, hasTabbar, pageStyles }
}
