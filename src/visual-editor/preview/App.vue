<template>
  <RenderBlocks v-if="currentPage" :blocks="currentPage.blocks" />
</template>

<script setup lang="ts">
import RenderBlocks from './components/RenderBlocks.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

const { currentPage } = storeToRefs(useVisualBoxStore())
</script>

<style scoped lang="scss"></style>
