<template>
  <div class="vad-bg-color p-4">
    <el-alert class="!mb-4" title="图标选择器演示" type="success" />
    <VadIconPicker v-model="icon" />
  </div>
</template>

<script setup lang="ts">
const icon = ref<string>()
</script>

<style lang="scss" scoped></style>
