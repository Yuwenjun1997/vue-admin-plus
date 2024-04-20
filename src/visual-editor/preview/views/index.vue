<template>
  <div class="visual-preview-container" :style="pageStyles">
    <RenderBlocks v-if="currentPage" :blocks="currentPage.blocks" />
  </div>
</template>

<script setup lang="ts">
import { useVisualTheme } from '@/visual-editor/hooks/useVisualTheme'
import RenderBlocks from '../components/RenderBlocks.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

const { visualPages } = storeToRefs(useVisualBoxStore())

const { path } = useRoute()
const currentPage = computed(() => visualPages.value.find((page) => page.path === path))

const { pageStyles } = useVisualTheme()
</script>
