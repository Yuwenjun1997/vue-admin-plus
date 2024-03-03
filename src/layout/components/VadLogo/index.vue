<template>
  <div :class="prefixCls + 'logo'">
    <div :class="prefixCls + 'logo__icon'">
      <img alt="" src="/vite.svg" />
    </div>
    <transition name="el-zoom-in-center">
      <div v-if="showLogoLabel" :class="prefixCls + 'logo__content'">
        <div :class="prefixCls + 'logo__content--label'">Vue Admin Plus</div>
        <el-divider>首页</el-divider>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { useAside } from '@/layout/hooks/useAside'

const { showMenu } = useAside()
const showLogoLabel = computed(() => showMenu.value)
</script>

<style scoped></style>
