<template>
  <div class="visual-preview-container" :style="pageStyles">
    <RenderBlocks v-if="currentPage" :blocks="currentPage.blocks" />
  </div>
</template>

<script setup lang="ts">
import { useVisualTheme } from '@/visual-editor/hooks/useVisualTheme'
import RenderBlocks from '../components/RenderBlocks.vue'
import { useVisualPreview } from '@/visual-editor/hooks/useVisualPreview'

const { pageStyles } = useVisualTheme()
const { currentPage } = useVisualPreview()
</script>
