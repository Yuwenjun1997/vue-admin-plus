<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <van-cell-group
    v-for="(item, index) in cellGroup"
    :key="index"
    :border="item.border"
    :inset="item.inset"
    :title="item.title"
  >
    <van-cell v-for="(cell, cIndex) in item.cells" v-bind="cell" :key="cIndex" value="内容" />
  </van-cell-group>
</template>

<script setup lang="ts">
import { VisualCellGroupProps, VisualCellProps } from '@/data/visual/components/visual-cell'
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic<VisualCellProps>
}

const props = defineProps<Props>()

const cellGroup = computed<VisualCellGroupProps[]>(() => props.template.props?.cellGroup || [])
</script>

<style scoped></style>
