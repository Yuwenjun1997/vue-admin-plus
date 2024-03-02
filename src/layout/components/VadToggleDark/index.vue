<template>
  <el-tooltip :class="prefixCls + 'toggle-dark__btn'" :content="_darkThemeLabel" effect="dark">
    <Icon :class="prefixCls + 'tools-btn__icon'" :icon="_darkThemeIcon" @click="handleToggleDark" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { useDark, useToggle } from '@vueuse/core'

// 切换暗夜模式
const isDark = useDark()
const toggleDark = useToggle(isDark)
const _darkThemeIcon = computed(() =>
  isDark.value ? 'line-md:sun-rising-twotone-loop' : 'line-md:sunny-outline-to-moon-loop-transition'
)
const _darkThemeLabel = computed(() => (isDark.value ? '明亮模式' : '暗夜模式'))
const handleToggleDark = () => {
  toggleDark()
}
</script>


