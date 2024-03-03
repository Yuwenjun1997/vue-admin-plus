<template>
  <el-watermark
    class="h-full"
    :content="watermarkContent"
    :font="{ color: theme.watermarkColor, fontSize: theme.watermarkFontSize }"
    :z-index="10000"
  >
    <VadLayoutColumn :class="prefixCls + 'layout'" />
  </el-watermark>
</template>

<script setup lang="ts">
import { prefixCls } from './config/index'
import VadLayoutColumn from './layouts/VadLayoutColumn.vue'
import { useThemeStore } from './store'

const theme = useThemeStore()
const watermarkContent = computed(() => (theme.showWatermark ? theme.watermarkContent : ''))
onMounted(() => {
  theme.loadTheme()
})
</script>
