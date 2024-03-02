<template>
  <div :class="prefixCls + 'column-bar'">
    <el-scrollbar height="100%">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="[prefixCls + 'column-bar__item', { 'is-active': index === activeIndex }]"
        @click="handleClick(item, index)"
      >
        <Icon :class="prefixCls + 'column-bar__item--icon'" :icon="item.icon" />
        <span :class="prefixCls + 'column-bar__item--label'">{{ item.label }}</span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { Icon } from '@iconify/vue'
import type { TabsItem } from '@/types/index'

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
</script>
