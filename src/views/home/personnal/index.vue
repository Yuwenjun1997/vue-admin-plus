<template>
  <div>
    <el-input v-model="model" />
  </div>
</template>

<script setup lang="ts" name="Personnal">
const model = ref<string>('hello world')
</script>

<style scoped></style>
