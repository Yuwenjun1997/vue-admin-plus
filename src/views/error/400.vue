<template>
  <el-empty :description="_description">
    <el-button type="primary" @click="onEdit">立即修改</el-button>
  </el-empty>
</template>

<script setup lang="ts">
const _description = computed<string>(() => {
  return '页面组件未找到'
})

const onEdit = () => {}
</script>

<style scoped></style>
