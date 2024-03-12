<template>
  <el-row v-if="props.template.children" :gutter="props.template.render?.props?.gutter">
    <VisualCol v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
  </el-row>
</template>

<script setup lang="ts" name="VisualGrid">
import { VisualBoxTemplate } from '@/types/visual-box'

interface Options {
  columns: number
  gutter: number
}

interface Props {
  template: VisualBoxTemplate<Options>
}

const props = defineProps<Props>()
</script>

<style scoped></style>
