<template>
  <div :class="prefixCls + 'main'">
    <slot />
  </div>
</template>

<script setup lang="ts" name="VadMain">
import { prefixCls } from '@/layout/config'
</script>
