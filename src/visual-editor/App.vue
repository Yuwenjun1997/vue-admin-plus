<template>
  <VisualEditor />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { VisualEditor } from './index'

import { useVisualBoxStore } from './store/visual-box'

const { isFullscreen, hideFullscreen } = storeToRefs(useVisualBoxStore())

isFullscreen.value = true
hideFullscreen.value = true
</script>

<style scoped></style>
