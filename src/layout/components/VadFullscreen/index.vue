<template>
  <el-tooltip :class="prefixCls + 'fullscreen__btn'" :content="_fullscreenLabel" effect="dark">
    <Icon :class="prefixCls + 'tools-btn__icon'" :icon="_fullscreenIcon" @click="toggle()" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { useFullscreen } from '@vueuse/core'

// 切换全屏
const { isFullscreen, toggle } = useFullscreen()
const _fullscreenIcon = computed(() => `material-symbols:fullscreen${isFullscreen.value ? '-exit' : ''}`)
const _fullscreenLabel = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
</script>


