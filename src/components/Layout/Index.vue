<template>
  <el-watermark class="h-full" :content="_watermarkContent" :z-index="10000">
    <div class="xy-layout text-sm">
      <!-- 默认布局 -->
      <LayoutDefault />

      <!-- 主题设置 -->
      <ThemeSetting />
    </div>
  </el-watermark>
</template>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue'
import ThemeSetting from './components/ThemeSetting/index.vue'

import { useTheme } from '@/store/theme'
const theme = useTheme()

const _watermarkContent = computed(() => (theme.showWatermark ? theme.watermarkContent : ''))
</script>

<style scoped>
.xy-layout {
  height: 100%;
}
</style>
