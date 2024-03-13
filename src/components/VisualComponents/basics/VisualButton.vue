<template>
  <el-button v-bind="props.template.props" :dark="isDark">{{ props.template.props?.content }}</el-button>
</template>

<script setup lang="ts">
import { VisualBasic } from '@/types/visual-box'
import { useDark } from '@vueuse/core'

interface Options {
  content: string
}

interface Props {
  template: VisualBasic<Options>
}

const props = defineProps<Props>()

const isDark = useDark()
</script>

<style scoped></style>
