<template>
  <div :class="prefixCls + 'tabs'">
    <el-tabs v-model="menuStore.activeMenuKey" closable type="card">
      <el-tab-pane
        v-for="item in tabsStore.activeTabs"
        :key="item.meta.menuId"
        :closable="!item.meta.tabFixed"
        :name="item.meta.menuId"
      >
        <template #label>
          <div class="flex items-center gap-1" @contextmenu.prevent="openMenu(item, $event)">
            <transition name="el-zoom-in-center">
              <Icon v-if="item.meta.icon && themeStore.showNavbarTagsIcon" :icon="item.meta.icon" />
            </transition>
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown
      ref="contextmenu"
      :class="prefixCls + 'tabs__contextmenu'"
      placement="bottom-start"
      :teleported="false"
      trigger="click"
      @command="handleCommand"
    >
      <div style="width: 0; height: 0" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in commandList"
            :key="item.command"
            :command="item.command"
            :disabled="disabledCommand(item.command)"
          >
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
import { prefixCls } from '@/layout/config/index'
import { useThemeStore } from '@/layout/store/theme'
import { Icon } from '@iconify/vue'
import { DropdownInstance } from 'element-plus'
import { Command, commandList } from './options'
import { useTabsStore } from '@/layout/store/tabs'
import { MenuOption } from '@/layout/types'
import { useMenuStore } from '@/layout/store/menu'

// const router = useRouter()
const themeStore = useThemeStore()
const tabsStore = useTabsStore()

const menuStore = useMenuStore()

const handleMenu = ref<MenuOption>()

const contextmenu = ref<DropdownInstance>()
const openMenu = (item: MenuOption, evnt: MouseEvent) => {
  if (!contextmenu.value) return
  contextmenu.value.handleOpen()
  const { clientX, clientY } = evnt
  contextmenu.value.$el.style.left = clientX + 'px'
  contextmenu.value.$el.style.top = clientY + 'px'
  handleMenu.value = item
}

const handleMenuIndex = computed(() => {
  return tabsStore.activeTabs.findIndex((item) => item.meta.menuId === handleMenu.value?.meta.menuId)
})

const disabledCommand = (command: Command): boolean => {
  if (!handleMenu.value) return false
  if (command === Command.closeLeft) return handleMenuIndex.value === 0
  if (command === Command.closeRight) return handleMenuIndex.value === tabsStore.activeTabs.length - 1
  if (command === Command.closeOther) return tabsStore.activeTabs.length === 1
  return false
}

const handleCommand = (command: Command) => {
  if (!handleMenu.value) return
  if (command === Command.closeOther) tabsStore.delOtherTabs(handleMenu.value)
  if (command === Command.closeLeft) tabsStore.delLeftTabs(handleMenu.value)
  if (command === Command.closeRight) tabsStore.delRightTabs(handleMenu.value)
  if (command === Command.closeAll) tabsStore.delAllTabs()
  if (command === Command.refresh) {
    // router.replace({ path: '/redirect' + route.fullPath, query: route.query })
  }
}
</script>

<style scoped lang="scss">
.xy-active-tags {
  :deep(.el-tabs) {
    --el-tabs-header-height: 30px;
    padding-top: calc(var(--xy-layout-navbar-tags-height) - var(--el-tabs-header-height));
    height: var(--xy-layout-navbar-tags-height);
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
          position: relative;
          z-index: 1;
          border: 0;
          mask: url('@/assets/mask.png');
          mask-size: 100% 100%;
          margin-left: -15px;
          padding-left: 20px !important;
          padding-right: 20px !important;

          &:nth-child(1) {
            margin-left: 0;
          }

          &.is-active {
            background-color: var(--el-color-primary-light-9) !important;
            z-index: 5;
          }

          &:hover {
            background-color: var(--el-color-info-light-7);
            z-index: 10 !important;
          }
        }
      }
    }
  }

  .contextmenu {
    position: fixed;
    z-index: var(--el-index-top);
  }
}
</style>
