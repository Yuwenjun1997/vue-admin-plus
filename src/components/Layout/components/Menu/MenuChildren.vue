<template>
  <el-sub-menu :index="menu.path" v-if="hasChild">
    <template #title>
      <Icon :icon="menu.icon" class="xy-menu__item--icon" />
      <span>{{ menu.title }}</span>
    </template>
    <MenuChildren v-for="_menu in menu.children" :key="_menu.path" :menu="_menu" />
  </el-sub-menu>
  <el-menu-item :index="menu.path" v-else>
    <Icon :icon="menu.icon" class="xy-menu__item--icon" />
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
import { defineComponent, PropType } from 'vue'
import type { Menu } from '@/types/index'

export default defineComponent({
  name: 'MenuChildren',
  components: {
    Icon,
  },
  props: {
    menu: {
      type: Object as PropType<Menu>,
      default: () => ({}),
    },
  },
  setup(props) {
    const menu = computed(() => props.menu)
    const hasChild = computed(() => menu.value.children && menu.value.children.length > 0)

    return {
      menu,
      hasChild,
    }
  },
})
</script>

<style scoped>
.xy-menu__item--icon {
  font-size: 18px;
  margin-right: 5px;
}
</style>
