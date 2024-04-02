<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <VisualBox2 v-for="template in visualBoxTemplates" :key="template.key" :template="template" />
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates } = storeToRefs(visualBoxStore)
</script>
