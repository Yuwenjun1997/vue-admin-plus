<template>
  <div class="xy-active-tags">
    <el-tabs v-model="activeTab" closable type="card">
      <el-tab-pane v-for="item in list" :key="item.name" :label="item.title" :name="item.name">
        <template #label>
          <div class="xy-tags-item" @contextmenu.prevent="openMenu(item, $event)">
            <Icon v-if="item.icon" :icon="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown
      ref="contextmenu"
      class="contextmenu"
      placement="bottom-start"
      trigger="click"
      @command="handleCommand"
    >
      <div style="width: 0; height: 0" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in commandList" :key="item.command" :command="item.command">
            <template #default>
              <Icon v-if="item.icon" :icon="item.icon" />
              <span class="ml-1">{{ item.name }}</span>
            </template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DropdownInstance } from 'element-plus'
import { TagView } from '@/types/index'
import { commandList } from './options'

const activeTab = ref('first')

const list = ref<TagView[]>([
  {
    title: '工作台',
    name: 'first',
    icon: '',
  },
  {
    title: '收银开单',
    name: 'second',
    icon: '',
  },
])

const contextmenu = ref<DropdownInstance>()
const openMenu = (item: TagView, evnt: MouseEvent) => {
  console.log(item)
  if (!contextmenu.value) return
  contextmenu.value.handleOpen()
  const { clientX, clientY } = evnt
  contextmenu.value.$el.style.left = clientX + 'px'
  contextmenu.value.$el.style.top = clientY + 'px'
}

const handleCommand = () => {}
</script>

<style scoped lang="scss">
.xy-active-tags {
  :deep(.el-tabs) {
    --el-tabs-header-height: 30px;
    padding-top: calc(var(--xy-layout-active-tags-height) - var(--el-tabs-header-height));
    height: var(--xy-layout-active-tags-height);
    border: 0;
    border-top: 1px var(--el-border-color) var(--el-border-style);
    background: transparent;

    .el-tabs__content {
      display: none;
    }

    .el-tabs__header {
      border-bottom: 0;
      margin-bottom: 0;
      background-color: transparent;

      .el-tabs__nav-wrap {
        margin-bottom: 0;

        .el-tabs__nav {
          border: 0;
        }

        .el-tabs__item {
          border: 0;
          mask: url('@/assets/mask.png');
          mask-size: 100% 100%;

          &:nth-child(1) {
            margin-left: 0;
          }

          &.is-active {
            background-color: var(--el-menu-hover-bg-color) !important;
          }

          &:hover {
            background-color: #f1f1f1;
          }
        }
      }
    }
  }

  .contextmenu {
    position: fixed;
    left: 100px;
    height: 100px;
    z-index: 999;
  }
}
</style>
