<template>
  <el-scrollbar height="100%">
    <div :class="prefixCls + 'main'">
      <slot />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts" name="VadMain">
import { prefixCls } from '@/layout/config'
</script>

<style scoped></style>
