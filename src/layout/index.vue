<template>
  <el-watermark
    class="h-full"
    :content="watermarkContent"
    :font="{ color: theme.watermarkColor, fontSize: theme.watermarkFontSize }"
    :z-index="10000"
  >
    <VadLayoutColumn :class="prefixCls + 'layout'">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cacheList">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </VadLayoutColumn>
  </el-watermark>
</template>

<script setup lang="ts" name="VadLayout">
import { prefixCls } from './config/index'
import VadLayoutColumn from './layouts/VadLayoutColumn.vue'
import { useThemeStore } from './store/theme'
import { useTabsStore } from './store/tabs'

const theme = useThemeStore()
const watermarkContent = computed(() => (theme.showWatermark ? theme.watermarkContent : ''))

const tabsStore = useTabsStore()
const cacheList = computed(() => tabsStore.cacheTabs.map((item) => item.menuId))
</script>
