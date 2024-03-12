<template>
  <el-col :span="props.template.props?.span">
    <VisualBoxRender :template="props.template" />
  </el-col>
</template>

<script setup lang="ts" name="VisualCol">
import { VisualBoxTemplate } from '@/types/visual-box'

interface Options {
  span: number
}

interface Props {
  template: VisualBoxTemplate<Options>
}

const props = defineProps<Props>()
</script>

<style scoped></style>
