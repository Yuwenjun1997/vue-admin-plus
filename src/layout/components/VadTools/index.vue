<template>
  <div :class="prefixCls + 'tools'">
    <VadRefresh />
    <VadFullscreen />
    <VadNotice />
    <VadTheme />
    <VadToggleDark />
  </div>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import VadFullscreen from '../VadFullscreen/index.vue'
import VadNotice from '../VadNotice/index.vue'
import VadRefresh from '../VadRefresh/index.vue'
import VadTheme from '../VadTheme/index.vue'
import VadToggleDark from '../VadToggleDark/index.vue'
</script>


