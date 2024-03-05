<template>
  <div :class="prefixCls + 'tabs'">
    <el-tabs v-model="menuStore.activeMenuKey" type="card" @tab-change="handleTabChange" @tab-remove="handleTabRemove">
      <el-tab-pane
        v-for="item in tabsStore.activeTabs"
        :key="item.menuId"
        :closable="!item.tabFixed"
        :name="item.menuId"
      >
        <template #label>
          <div class="flex items-center gap-1" @contextmenu.prevent="openMenu(item, $event, contextmenu)">
            <transition name="el-zoom-in-center">
              <Icon v-if="item.icon && themeStore.showNavbarTagsIcon" :icon="item.icon" />
            </transition>
            <span>{{ item.title }}</span>
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
      @command="onCommand"
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

<script setup lang="ts" name="VadTabs">
import { prefixCls } from '@/layout/config/index'
import { useThemeStore } from '@/layout/store/theme'
import { Icon } from '@iconify/vue'
import { DropdownInstance } from 'element-plus'
import { commandList } from './options'
import { useTabsStore } from '@/layout/store/tabs'
import { useMenuStore } from '@/layout/store/menu'
import { useTabsCommand } from '@/layout/hooks/useTabsCommand'
import { useTabsAction } from '@/layout/hooks/useTabsAction'

const themeStore = useThemeStore()
const tabsStore = useTabsStore()
const menuStore = useMenuStore()
const contextmenu = ref<DropdownInstance>()
const { disabledCommand, onCommand, openMenu } = useTabsCommand()
const { handleTabChange, handleTabRemove } = useTabsAction()
</script>
