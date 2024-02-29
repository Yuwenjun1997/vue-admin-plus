<template>
  <el-container class="xy-layout__container">
    <el-aside class="xy-layout__aside" :width="_asideWidth">
      <div class="xy-logo">
        <transition name="el-zoom-in-center">
          <div v-if="showSubfield" class="xy-logo-content">
            <div class="xy-logo--pic"><img alt="" src="/vite.svg" /></div>
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div v-if="_showMenu" class="xy-logo-right">
            <div class="xy-logo--label">Vue Admin Plus</div>
            <el-divider>首页</el-divider>
          </div>
        </transition>
      </div>
      <div class="xy-layout__aside--container">
        <transition name="el-zoom-in-center">
          <div v-if="showSubfield" class="xy-layout__aside--left h-full">
            <LeftTabs />
          </div>
        </transition>
        <transition name="el-zoom-in-center">
          <div v-if="_showMenu" class="xy-layout__aside--right h-full">
            <RightMenu />
          </div>
        </transition>
      </div>
    </el-aside>
    <el-container class="xy-layout__container">
      <el-header class="xy-layout__header">
        <Navbar />
        <NavbarTags v-if="showNavbarTags" />
      </el-header>
      <el-main class="xy-layout__main">
        <el-scrollbar height="100%">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import LeftTabs from './components/LeftTabs.vue'
import RightMenu from './components/Menu/RightMenu.vue'
import Navbar from './components/Navbar/index.vue'
import NavbarTags from './components/NavbarTags/index.vue'
import { useTheme } from '@/store/theme'
import { toPx } from '@/utils/index'

const themeStore = useTheme()
const { showSubfield, showMenu, showNavbarTags, menuWidth, subfieldWidth, menuCollapse } = storeToRefs(themeStore)

const _showMenu = computed<boolean>(() => showMenu.value && !menuCollapse.value)

const _asideWidth = computed<string>(() => {
  if (showSubfield.value && _showMenu.value) {
    return toPx(menuWidth.value + subfieldWidth.value)
  }
  if (showSubfield.value) return toPx(subfieldWidth.value)
  if (_showMenu.value) return toPx(menuWidth.value)
  return toPx(0)
})
</script>

<style scoped lang="scss">
.xy-layout__container {
  height: 100%;
}

.xy-layout__header {
  --el-header-height: calc(var(--xy-layout-navbar-height) + var(--xy-layout-navbar-tags-height));
  background-color: var(--xy-layout-header-bg-color);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.xy-layout__aside {
  background-color: var(--xy-layout-aside-bg-color);
  transition: var(--el-transition-all);

  .xy-layout__aside--left {
    width: var(--xy-layout-aside-left-width);
    transition: var(--el-transition-all);
  }

  .xy-layout__aside--right {
    width: calc(100% - var(--xy-layout-aside-left-width));
  }

  .xy-layout__aside--container {
    display: flex;
    height: calc(100% - var(--xy-logo-height));
  }
}

.xy-layout__main {
  background-color: var(--xy-layout-main-bg-color);
}

.xy-logo {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  min-width: var(--xy-logo-width);
  height: var(--xy-logo-height);

  :deep(.el-divider--horizontal) {
    position: absolute;
    bottom: 0;
    margin: 0 !important;
  }

  .xy-logo--pic,
  .xy-logo-right,
  .xy-logo--label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .xy-logo-right {
    position: relative;
    z-index: 10;
    flex: 1;
    flex-direction: column;
    margin: 0 var(--xy-layout-spacing);
    padding: var(--xy-layout-spacing) 0;
  }

  .xy-logo-content {
    width: var(--xy-logo-width);
    height: var(--xy-logo-height);
  }

  .xy-logo--pic {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    width: var(--xy-logo-width);
    height: var(--xy-logo-height);
    background-color: var(--xy-layout-tabs-bg-color);
    transition: var(--el-transition-all);
  }

  .xy-logo--label {
    font-size: var(--el-font-size-extra-large);
    color: var(--el-text-color-regular);
    white-space: nowrap;
  }
}
</style>
