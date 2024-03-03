<template>
  <el-container>
    <el-aside :class="prefixCls + 'layout-aside'" :width="toPx(asideWidth)">
      <VadLogo />
      <VadColumnBar />
    </el-aside>
    <el-container>
      <el-header :class="prefixCls + 'layout-header'">
        <VadNav />
        <VadTabs v-if="theme.showNavbarTags" />
      </el-header>
      <el-main :class="prefixCls + 'layout-main'">Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import VadLogo from '../components/VadLogo/index.vue'
import VadColumnBar from '../components/VadColumnBar/index.vue'
import VadNav from '../components/VadNav/index.vue'
import VadTabs from '../components/VadTabs/index.vue'
import { prefixCls } from '../config/index'
import { useAside } from '@/layout/hooks/useAside'
import { toPx } from '../utils'
import { useThemeStore } from '../store'

const { asideWidth } = useAside()
const theme = useThemeStore()
</script>

<style scoped></style>
