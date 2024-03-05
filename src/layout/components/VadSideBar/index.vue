<template>
  <div :class="prefixCls + 'menu'">
    <el-scrollbar height="100%">
      <el-menu>
        <VadMenu v-for="menu in menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="VadSideBar">
import type { MenuOption } from '@/layout/types'
import { prefixCls } from '@/layout/config/index'
import VadMenu from '../VadMenu/index.vue'

const menus = ref<MenuOption[]>([])
</script>
