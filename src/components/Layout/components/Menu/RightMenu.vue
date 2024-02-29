<template>
  <div class="xy-menu">
    <el-scrollbar height="100%">
      <el-menu default-active="1">
        <MenuChildren v-for="menu in menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import MenuChildren from './MenuChildren.vue'
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

<style scoped lang="scss">
.xy-menu {
  height: 100%;
  padding-top: calc(20px - var(--xy-layout-spacing));

  :deep(.el-scrollbar__view) {
    padding: var(--xy-layout-spacing);
  }

  :deep(.el-menu) {
    border-right: 0;

    .el-menu-item,
    .el-sub-menu,
    .el-sub-menu__title {
      border-radius: var(--el-border-radius-base);
    }

    .el-menu-item.is-active {
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
