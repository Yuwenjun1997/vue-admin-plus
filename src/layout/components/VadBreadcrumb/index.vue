<template>
  <el-breadcrumb :class="prefixCls + 'breadcrumb'" separator=">">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.meta.menuId" :to="{ ...item }">
      <template #default>
        <div class="flex items-center">
          <template v-if="themeStore.showBreadcrumbIcon">
            <Icon v-if="item.meta.icon" :icon="item.meta.icon" />
          </template>
          <span>{{ item.meta.title }}</span>
        </div>
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="VadBreadcrumb">
import { prefixCls } from '@/layout/config/index'
import { useThemeStore } from '@/layout/store/theme'
import { Icon } from '@iconify/vue'

const themeStore = useThemeStore()
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched.map((item) => item)
})
</script>
