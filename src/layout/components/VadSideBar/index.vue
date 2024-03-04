<template>
  <div :class="prefixCls + 'menu'">
    <el-scrollbar height="100%">
      <el-menu>
        <VadMenu v-for="menu in menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { MenuOption } from '@/layout/types'
import { prefixCls } from '@/layout/config/index'
import VadMenu from '../VadMenu/index.vue'

const menus = ref<MenuOption[]>([
  {
    name: '/dash',
    path: '/dash',
    meta: {
      title: '工作台',
      icon: 'line-md:compass-loop',
    },
  },
  {
    name: '/personnal',
    path: '/personnal',
    meta: {
      title: '个人中心',
      icon: 'line-md:account',
    },
  },
  {
    name: '/message',
    path: '/message',
    meta: {
      title: '消息',
      icon: 'line-md:bell-loop',
    },
    children: [
      {
        name: '/message/list',
        path: '/message/list',
        meta: {
          title: '消息列表',
          icon: 'line-md:bell-loop',
        },
        children: [
          {
            name: '/message/list2',
            path: '/message/list2',
            meta: {
              title: '消息列表',
              icon: 'line-md:bell-loop',
            },
          },
        ],
      },
    ],
  },
  {
    name: '/setting',
    path: '/setting',
    meta: {
      title: '系统设置',
      icon: 'line-md:cog-loop',
    },
    children: [
      {
        name: '/setting/user',
        path: '/setting/user',
        meta: {
          title: '用户设置',
          icon: 'line-md:person-search',
        },
      },
      {
        name: '/setting/menu',
        path: '/setting/menu',
        meta: {
          title: '菜单设置',
          icon: 'line-md:person-search',
        },
      },
    ],
  },
])
</script>
