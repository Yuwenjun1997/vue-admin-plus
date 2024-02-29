<template>
  <div class="xy-navbar">
    <div class="xy-navbar__left">
      <transition name="el-zoom-in-center">
        <div v-if="showMenu" class="xy-collapse__btn" @click="toggleMenuCollapse()">
          <Icon :icon="_collapseIcon" />
          <!-- <Icon icon="line-md:menu-fold-right" /> -->
        </div>
      </transition>
      <transition name="el-zoom-in-top">
        <Breadcrumb v-if="showBreadcrumb" />
      </transition>
    </div>
    <div class="xy-navbar__right">
      <Toobar />
      <Dropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Breadcrumb from './Breadcrumb.vue'
import Dropdown from './Dropdown.vue'
import Toobar from './Toobar.vue'
import { useTheme } from '@/store/theme'
import { storeToRefs } from 'pinia'

const themeStore = useTheme()
const { showMenu, menuCollapse, showBreadcrumb } = storeToRefs(themeStore)
const { toggleMenuCollapse } = themeStore

const _collapseIcon = computed(() => `line-md:menu-fold-${menuCollapse.value ? 'right' : 'left'}`)
</script>

<style scoped lang="scss">
.xy-navbar {
  --xy-collapse-btn-size: 18px;

  height: var(--xy-layout-navbar-height);
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  padding: var(--xy-layout-spacing) 0;

  .xy-navbar__left,
  .xy-navbar__right {
    display: flex;
    align-items: center;
  }
}

.xy-collapse__btn {
  margin-right: 20px;
  font-size: var(--xy-collapse-btn-size);
  color: var(--xy-layout-navbar-text-color);
  cursor: pointer;
}
</style>
