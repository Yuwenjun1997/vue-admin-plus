<template>
  <div class="w-screen h-screen flex items-center justify-center flex-col bg-gray-50">
    <div class="flex items-center gap-4">
      <Icon class="text-blue-500" icon="svg-spinners:pulse-2" style="font-size: 80px" />
      <Icon class="text-blue-500" icon="svg-spinners:pulse-3" style="font-size: 140px" />
      <Icon class="text-blue-500" icon="svg-spinners:pulse-2" style="font-size: 80px" />
    </div>
    <span class="text-2xl text-gray-700 mt-16">正在初始可视化配置</span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped></style>
