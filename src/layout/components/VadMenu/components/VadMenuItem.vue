<template>
  <el-menu-item :index="item.path">
    <Icon :class="prefixCls + 'menu__item--icon'" :icon="item.icon" />
    <span>{{ item.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { Icon } from '@iconify/vue'
import { Menu } from '@/types'

interface Props {
  itemOrMenu: Menu
}

const props = defineProps<Props>()
const item = computed(() => props.itemOrMenu)
</script>
