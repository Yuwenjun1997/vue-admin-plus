<template>
  <div>{{ props.modelValue }}</div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any
}

const props = defineProps<Props>()
</script>

<style scoped></style>
