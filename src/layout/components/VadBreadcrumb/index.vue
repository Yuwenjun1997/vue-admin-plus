<template>
  <el-breadcrumb :class="prefixCls + 'breadcrumb'" separator=">">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="{ path: '/' }">
      <template #default>
        <div class="flex items-center">
          <Icon :icon="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { Icon } from '@iconify/vue'
import { Menu } from '@/types/index'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route)

const breadcrumbs: Menu[] = [
  {
    path: '/',
    icon: 'line-md:home-md-twotone-alt',
    title: '首页',
  },
  {
    path: '/center',
    icon: 'line-md:account',
    title: '个人中心',
  },
]
</script>
