<template>
  <div :class="prefixCls + 'collapse__btn'" @click="toggleMenuCollapse()">
    <Icon :class="prefixCls + 'tools-btn__icon'" :icon="_collapseIcon" />
  </div>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { Icon } from '@iconify/vue'
import { useTheme } from '@/store/theme'
import { storeToRefs } from 'pinia'

const themeStore = useTheme()
const { menuCollapse } = storeToRefs(themeStore)
const { toggleMenuCollapse } = themeStore

const _collapseIcon = computed(() => `line-md:menu-fold-${menuCollapse.value ? 'right' : 'left'}`)
</script>
