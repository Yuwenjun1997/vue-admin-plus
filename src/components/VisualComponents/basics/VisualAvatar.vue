<template>
  <el-avatar v-bind="props.template.props" />
</template>

<script setup lang="ts">
import { VisualAvatarProps } from '@/data/visual/components/visual-avatar'
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic<VisualAvatarProps>
}

const props = defineProps<Props>()
</script>

<style scoped></style>
