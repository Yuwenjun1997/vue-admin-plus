<template>
  <div :class="prefixCls + 'column-bar'">
    <el-scrollbar height="100%">
      <ul :class="prefixCls + 'column-bar-tabs'">
        <li
          v-for="item in rootMenus"
          :key="item.meta.menuId"
          :class="[prefixCls + 'column-bar-tabs__item', { 'is-active': item.meta.menuId === activeKey }]"
          @click="handleClick(item)"
        >
          <template v-if="item.meta.icon">
            <Icon :class="prefixCls + 'column-bar-tabs__item--icon'" :icon="item.meta.icon" />
          </template>
          <span :class="prefixCls + 'column-bar-tabs__item--label'">{{ item.meta.title }}</span>
        </li>
      </ul>
    </el-scrollbar>
    <transition name="el-zoom-in-center">
      <el-scrollbar v-if="showMenu" height="100%">
        <div :class="prefixCls + 'column-bar-menu'">
          <el-menu default-active="1">
            <VadMenu v-for="item in subMenus" :key="item.meta.menuId" :menu="item" />
          </el-menu>
        </div>
      </el-scrollbar>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import VadMenu from '../VadMenu/index.vue'
import { prefixCls } from '@/layout/config/index'
import { useAside } from '@/layout/hooks/useAside'
import type { MenuOption } from '@/layout/types'
import { useRouter } from 'vue-router'

const router = useRouter()

const { showMenu } = useAside()

const rootMenus = ref<MenuOption[]>([
  {
    name: 'Home',
    path: '/',
    meta: {
      menuId: 'Home',
      title: '首页',
      icon: 'line-md:home-md-twotone-alt',
    },
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: {
          menuId: 'Dashboard',
          title: '工作台',
          icon: 'line-md:compass-loop',
        },
      },
      {
        name: 'Personnal',
        path: '/personnal',
        meta: {
          menuId: 'Personnal',
          title: '个人中心',
          icon: 'line-md:account',
        },
      },
    ],
  },
  {
    name: 'Customer',
    path: '/customer',
    meta: {
      menuId: 'Customer',
      title: '客资',
      icon: 'line-md:person-search',
    },
    children: [
      {
        name: 'CustomerManager',
        path: '/customer/manager',
        meta: {
          menuId: 'CustomerManager',
          title: '客资管理',
          icon: 'line-md:account',
        },
      },
      {
        name: 'CustomerSetting',
        path: '/customer/setting',
        meta: {
          menuId: 'CustomerSetting',
          title: '系统设置',
          icon: 'line-md:cog-loop',
        },
        children: [
          {
            name: '/setting/user',
            path: '/setting/user',
            meta: {
              menuId: '/setting/user',
              title: '用户设置',
              icon: 'line-md:person-search',
            },
          },
          {
            name: '/setting/menu',
            path: '/setting/menu',
            meta: {
              menuId: '/setting/menu',
              title: '菜单设置',
              icon: 'line-md:person-search',
            },
          },
        ],
      },
    ],
  },
])

const activeKey = ref<string>('Home')
const handleClick = (item: MenuOption) => {
  activeKey.value = item.meta.menuId
  router.push(item.path)
}

const subMenus = computed(() => {
  const menus = rootMenus.value.find((item) => item.meta.menuId === activeKey.value)
  return menus?.children || []
})
</script>
