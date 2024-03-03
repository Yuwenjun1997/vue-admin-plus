import { useToggle } from '@vueuse/core'
import { useThemeStore } from '../store'
import { storeToRefs } from 'pinia'

export function useMenuCollapse() {
  const { menuCollapse, showMenu } = storeToRefs(useThemeStore())
  const toggle = useToggle(menuCollapse)
  return {
    showMenu,
    menuCollapse,
    toggle,
  }
}
