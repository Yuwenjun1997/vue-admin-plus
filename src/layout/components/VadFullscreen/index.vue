<template>
  <el-tooltip :class="prefixCls + 'fullscreen__btn'" :content="fullscreenLabel" effect="dark">
    <Icon :class="prefixCls + 'tools-btn__icon'" :icon="fullscreenIcon" @click="toggle()" />
  </el-tooltip>
</template>

<script setup lang="ts" name="VadFullscreen">
import { Icon } from '@iconify/vue'
import { useFullscreen } from '@vueuse/core'
import { prefixCls } from '@/layout/config/index'

// 切换全屏
const { isFullscreen, toggle } = useFullscreen()
const fullscreenIcon = computed(() => `material-symbols:fullscreen${isFullscreen.value ? '-exit' : ''}`)
const fullscreenLabel = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
</script>
