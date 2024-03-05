<template>
  <div :class="prefixCls + 'column-bar'">
    <el-scrollbar height="100%">
      <ul :class="prefixCls + 'column-bar-tabs'">
        <li v-for="item in menuStore.rootMenus" :key="item.meta.menuId">
          <router-link
            :class="[
              prefixCls + 'column-bar-tabs__item',
              { 'is-active': item.meta.menuId === menuStore.activeRootMenuKey },
            ]"
            :to="item.path"
          >
            <template v-if="item.meta.icon">
              <Icon :class="prefixCls + 'column-bar-tabs__item--icon'" :icon="item.meta.icon" />
            </template>
            <span :class="prefixCls + 'column-bar-tabs__item--label'">{{ item.meta.title }}</span>
          </router-link>
        </li>
      </ul>
    </el-scrollbar>
    <transition name="el-zoom-in-center">
      <el-scrollbar v-if="showMenu" height="100%">
        <div :class="prefixCls + 'column-bar-menu'">
          <el-menu :default-active="menuStore.activeMenuKey" @select="handleMenuSelect">
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
import { useMenuStore } from '@/layout/store/menu'

const router = useRouter()

const { showMenu } = useAside()
const menuStore = useMenuStore()
const subMenus = computed(() => {
  const menus = menuStore.rootMenus.find((item) => item.meta.menuId === menuStore.activeRootMenuKey)
  return menus?.children || []
})

const handleMenuSelect = (index: string) => {
  const menu = menuStore.flatMenus.find((item) => item.meta.menuId === index)
  if (!menu) return
  router.push(menu.path)
}
</script>
