<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <template v-if="props.template.children">
    <VisualBox2 v-for="t in props.template.children" :key="t.key" :template="t" />
  </template>
  <template v-else-if="props.template.content">
    <template v-if="isBindContentProp">{{ bindPropStr }}</template>
    <template v-else>{{ props.template.content }}</template>
  </template>
</template>

<script setup lang="ts" name="VisualBox2Content">
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()

const isBindContentProp = computed(() => {
  if (!props.template.bindPropMap) return false
  return Object.keys(props.template.bindPropMap).some((key) => key === 'content')
})

const bindPropStr = computed(() => {
  return `{{${props.template.bindPropMap?.content}}}`
})
</script>

<style scoped></style>
