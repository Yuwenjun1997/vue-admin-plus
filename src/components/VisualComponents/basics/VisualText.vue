<template>
  <span :style="customStyle">{{ text }}</span>
</template>

<script setup lang="ts" name="VisualText">
import { VisualBoxTemplate } from '@/types/visual-box'

interface Options {
  content: string
  fontSize: string
  color: string
}

interface Props {
  template: VisualBoxTemplate<Options>
}

const props = defineProps<Props>()

const customStyle = computed(() => {
  if (!props.template.render) return
  if (!props.template.render.props) return
  return {
    color: props.template.render.props.color,
    fontSize: props.template.render.props.fontSize,
  }
})

const text = computed(() => {
  return props.template.render?.props?.content
})
</script>

<style scoped></style>
