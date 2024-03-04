import { useThemeStore } from '../store/theme'

export function useAside() {
  const themeStore = useThemeStore()
  const showMenu = computed(() => themeStore.showMenu && !themeStore.menuCollapse)
  const asideWidth = ref<number>(0)

  watchEffect(() => {
    if (showMenu.value) {
      asideWidth.value = themeStore.menuWidth + themeStore.logoWidth
    } else {
      asideWidth.value = themeStore.logoWidth
    }
  })

  return {
    asideWidth,
    showMenu,
  }
}
