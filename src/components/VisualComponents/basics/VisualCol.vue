<template>
  <el-col
    :offset="props.template.props?.offset"
    :pull="props.template.props?.pull"
    :push="props.template.props?.push"
    :span="props.template.props?.span"
  >
    <VisualBoxRender :template="props.template" />
  </el-col>
</template>

<script setup lang="ts" name="VisualCol">
import { VisualBasic } from '@/types/visual-box'

interface Options {
  span: number
  offset: number
  push: number
  pull: number
}

interface Props {
  template: VisualBasic<Options>
}

const props = defineProps<Props>()
</script>

<style scoped></style>
