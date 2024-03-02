<template>
  <div :class="prefixCls + 'menu'">
    <el-scrollbar height="100%">
      <el-menu default-active="1">
        <VadMenu v-for="menu in menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import VadMenu from '../VadMenu/index.vue'
import type { Menu } from '@/types/index'

const menus = ref<Menu[]>([
  {
    path: '/dash',
    title: '工作台',
    icon: 'line-md:compass-loop',
  },
  {
    path: '/personnal',
    title: '个人中心',
    icon: 'line-md:account',
  },
  {
    path: '/message',
    title: '消息',
    icon: 'line-md:bell-loop',
    children: [
      {
        path: '/message/list',
        title: '消息列表',
        icon: 'line-md:bell-loop',
        children: [
          {
            path: '/message/list',
            title: '消息列表',
            icon: 'line-md:bell-loop',
          },
        ],
      },
    ],
  },
  {
    path: '/setting',
    title: '系统设置',
    icon: 'line-md:cog-loop',
    children: [
      {
        path: '/setting/user',
        title: '用户设置',
        icon: 'line-md:person-search',
      },
      {
        path: '/setting/menu',
        title: '菜单设置',
        icon: 'line-md:person-search',
      },
    ],
  },
])
</script>
