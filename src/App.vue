<template>
  <el-config-provider :locale="zhCn" :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
// import Layout from '@/components/Layout/Index.vue'
// import { useDark, useToggle } from '@vueuse/core'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
const size = 'default'
const zIndex = 3000

// const isDark = useDark()
// const toggleDark = useToggle(isDark)
</script>
