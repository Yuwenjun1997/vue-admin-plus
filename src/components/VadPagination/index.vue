<template>
  <el-pagination
    background
    :current-page="props.pageNum"
    :layout="layout"
    :page-size="props.pageSize"
    :page-sizes="pageSizes"
    small
    :total="props.total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup lang="ts">
const layout = 'total, sizes, prev, pager, next, jumper'
const pageSizes = [10, 20, 30, 40, 50]

interface Props {
  total: number
  pageSize: number
  pageNum: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:pageNum', pageNum: number): void
  (e: 'update:pageSize', pageSize: number): void
  (e: 'change', pageNum: number, pageSize: number): void
}>()

const handleSizeChange = (val: number) => {
  emit('update:pageSize', val)
  emit('change', props.pageNum, val)
}
const handleCurrentChange = (val: number) => {
  emit('update:pageNum', val)
  emit('change', val, props.pageSize)
}
</script>

<style scoped></style>
