<template>
  <div class="p-4 vad-bg-color">
    <VisualBox v-for="temp in visualBoxTemplates" :key="temp.visualBoxKey" :template="temp">
      <VisualBoxRender v-if="temp.children" :templates="temp.children" />
    </VisualBox>
  </div>
</template>
<script lang="ts" setup>
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'
import templates from './data'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates } = storeToRefs(visualBoxStore)
visualBoxStore.initVisualBox(templates)
</script>
