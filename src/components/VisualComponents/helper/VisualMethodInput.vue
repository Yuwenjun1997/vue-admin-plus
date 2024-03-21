<template>
  <div>
    <VadCodeEditor :model-value="props.modelValue" />
  </div>
</template>

<script setup lang="ts" VisualMethodInput>
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
</script>

<style scoped></style>
