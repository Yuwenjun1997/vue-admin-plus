<template>
  <div :class="prefixCls + 'nav'">
    <VadCollapse />
    <VadBreadcrumb v-if="theme.showBreadcrumb" />
    <VadTools align="end" />
    <VadAvatar />
  </div>
</template>

<script setup lang="ts" name="VadNav">
import VadCollapse from '../VadCollapse/index.vue'
import VadTools from '../VadTools/index.vue'
import VadAvatar from '../VadAvatar/index.vue'
import VadBreadcrumb from '../VadBreadcrumb/index.vue'
import { useThemeStore } from '@/layout/store/theme'
import { prefixCls } from '@/layout/config/index'

const theme = useThemeStore()
</script>

<style scoped></style>
