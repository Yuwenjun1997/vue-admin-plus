import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData } from '../types'
import { CSSProperties } from 'vue'

export const useVisualTheme = () => {
  const { currentPage } = storeToRefs(useVisualBoxStore())

  const hasFixedComponent = computed<boolean>(() => {
    let result = false
    if (!currentPage.value) return result
    const recursion = (blocks: VisualEditorBlockData[]) => {
      blocks.forEach((block) => {
        result = result || (block.componentKey === 'navbar' && block.props.fixed)
        if (result) return
        Object.entries(block.slots).forEach(([_key, value]) => recursion(value.children))
      })
    }
    recursion(currentPage.value.blocks)
    return result
  })

  watchEffect(() => {
    console.log(hasFixedComponent.value)
  })

  const pageStyles = computed<CSSProperties | undefined>(() => {
    if (!currentPage.value) return
    return {
      backgroundColor: currentPage.value.config.bgColor,
      backgroundImage: currentPage.value.config.bgImage ? `url(${currentPage.value.config.bgImage})` : '',
      backgroundRepeat: currentPage.value.config.bgRepeat ? 'repeat' : 'no-repeat',
      paddingTop: hasFixedComponent.value ? 'var(--visual-navbar-height)' : '',
    }
  })

  return { isFixed: hasFixedComponent, pageStyles }
}
