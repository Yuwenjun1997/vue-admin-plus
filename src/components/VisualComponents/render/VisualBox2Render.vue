<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <VisualBox2 v-for="template in templates" :key="template.visualBoxKey" :template="template" />
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates } = storeToRefs(visualBoxStore)

const templates = computed(() => visualBoxTemplates.value[0].children || [])
</script>

<style scoped></style>
