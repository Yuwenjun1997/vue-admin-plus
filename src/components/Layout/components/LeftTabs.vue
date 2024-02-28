<template>
  <div class="xy-tabs">
    <el-scrollbar height="100%">
      <div
        class="xy-tabs__item"
        :class="{ 'is-active': index === activeIndex }"
        v-for="(item, index) in list"
        :key="index"
        @click="handleClick(item, index)"
      >
        <Icon :icon="item.icon" class="xy-tabs__item--icon" />
        <span class="xy-tabs__item--label">{{ item.label }}</span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
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

<style scoped lang="scss">
.xy-tabs {
  height: 100%;
  background: var(--xy-layout-tabs-background-color);

  :deep(.el-scrollbar__view) {
    padding: var(--xy-layout-spacing);
  }

  .xy-tabs__item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    height: var(--xy-layout-tabs-item-height);
    border-radius: 4px;
    cursor: pointer;
    margin-top: var(--xy-layout-spacing);
    transition: all 0.2s;

    &:nth-child(1) {
      margin-top: 0;
    }

    &.is-active {
      background: var(--xy-layout-tabs-active-color);
      color: white;
    }

    .xy-tabs__item--icon {
      font-size: 18px;
    }

    .xy-tabs__item--label {
      line-height: 1.8;
      font-size: 12px;
    }
  }
}
</style>
