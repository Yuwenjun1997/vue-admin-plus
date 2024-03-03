<template>
  <div :class="prefixCls + 'column-bar'">
    <el-scrollbar height="100%">
      <ul :class="prefixCls + 'column-bar-tabs'">
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="[prefixCls + 'column-bar-tabs__item', { 'is-active': index === activeIndex }]"
          @click="handleClick(item, index)"
        >
          <Icon :class="prefixCls + 'column-bar-tabs__item--icon'" :icon="item.icon" />
          <span :class="prefixCls + 'column-bar-tabs__item--label'">{{ item.label }}</span>
        </li>
      </ul>
    </el-scrollbar>
    <transition name="el-zoom-in-center">
      <el-scrollbar v-if="showMenu" height="100%">
        <div :class="prefixCls + 'column-bar-menu'">
          <el-menu default-active="1">
            <VadMenu v-for="item in menus" :key="item.path" :menu="item" />
          </el-menu>
        </div>
      </el-scrollbar>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { Icon } from '@iconify/vue'
import VadMenu from '../VadMenu/index.vue'
import type { Menu, TabsItem } from '@/types/index'
import { useAside } from '@/layout/hooks/useAside'

const { showMenu } = useAside()

const list = ref<TabsItem[]>([
  {
    label: '首页',
    icon: 'line-md:home-md-twotone-alt',
  },
  {
    label: '客资',
    icon: 'line-md:person-search',
  },
  {
    label: '设置',
    icon: 'line-md:cog-loop',
  },
])

const activeIndex = ref(0)
const handleClick = (item: TabsItem, index: number) => {
  console.log(item)
  activeIndex.value = index
}

const menus = ref<Menu[]>([])

setTimeout(() => {
  menus.value = [
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
  ]
})
</script>
