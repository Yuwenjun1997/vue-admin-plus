<template>
  <component :is="renderComponent" :item-or-menu="menu">
    <template v-if="hasChild">
      <VadMenu v-for="item in menu.children" :key="item.meta.menuId" :menu="item" />
    </template>
  </component>
</template>

<script lang="ts" name="VadMenu">
import { defineComponent, PropType, computed } from 'vue'
import VadMenuItem from './components/VadMenuItem.vue'
import VadSubMenu from './components/VadSubMenu.vue'
import type { MenuOption } from '@/layout/types'

export default defineComponent({
  name: 'VadMenu',
  components: {
    VadMenuItem,
    VadSubMenu,
  },
  props: {
    menu: {
      type: Object as PropType<MenuOption>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { menu } = props
    const hasChild = computed(() => menu.children && menu.children.length > 0)
    const renderComponent = computed(() => {
      return hasChild.value ? VadSubMenu : VadMenuItem
    })
    return {
      hasChild,
      renderComponent,
    }
  },
})
</script>

<style scoped>
.xy-menu__item--icon {
  font-size: var(--el-font-size-large);
  margin-right: 5px;
}
</style>
