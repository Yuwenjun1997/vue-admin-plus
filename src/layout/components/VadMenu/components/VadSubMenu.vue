<template>
  <el-sub-menu :index="item.meta.menuId">
    <template #title>
      <template v-if="item.meta.icon">
        <Icon :class="prefixCls + 'menu__item--icon'" :icon="item.meta.icon" />
      </template>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot />
  </el-sub-menu>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { prefixCls } from '@/layout/config/index'
import { MenuOption } from '@/layout/types'

interface Props {
  itemOrMenu: MenuOption
}

const props = defineProps<Props>()
const item = computed(() => props.itemOrMenu)
</script>
