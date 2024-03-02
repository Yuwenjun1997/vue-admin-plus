<template>
  <el-sub-menu index="1">
    <template #title>
      <Icon :class="prefixCls + 'menu__item--icon'" icon="line-md:compass-loop" />
      <span>子菜单</span>
    </template>
    <VadMenu />
  </el-sub-menu>
</template>

<script setup lang="ts">
import VadMenu from '../index.vue'
import { prefixCls } from '@/layout/config/index'
</script>
