<template>
  <el-tree ref="treeRef" class="w-full" :data="data" default-expand-all :props="defaultProps" />
</template>

<script setup lang="ts" name="VisualPagesTree">
const data: any[] = []
const defaultProps = {}
</script>

<style scoped></style>
