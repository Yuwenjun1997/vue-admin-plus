<template>
  <div>
    <VadCodeEditor v-model="code" />
  </div>
</template>

<script setup lang="ts">
const code = ref<string>('')
</script>

<style scoped></style>
