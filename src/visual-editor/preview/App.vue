<template>
  <RenderBlocks :blocks="visualBlocks" />
</template>

<script setup lang="ts">
import RenderBlocks from './components/RenderBlocks.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

const { visualBlocks } = storeToRefs(useVisualBoxStore())
</script>

<style scoped lang="scss"></style>
