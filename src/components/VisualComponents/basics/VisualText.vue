<template>
  <span>{{ text }}</span>
</template>

<script setup lang="ts" name="VisualText">
import { VisualBasic } from '@/types/visual-box'

interface Options {
  content: string
  fontSize: string
  color: string
}

interface Props {
  template: VisualBasic<Options>
}

const props = defineProps<Props>()

const text = computed(() => {
  return props.template.props?.content
})
</script>

<style scoped></style>
