<template>
  <el-tooltip :class="prefixCls + 'refresh__btn'" content="刷新" effect="dark">
    <Icon :class="prefixCls + 'tools-btn__icon'" icon="material-symbols:refresh" @click="handleRefresh" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { prefixCls } from '@/layout/config/index'
import { useRedo } from '@/layout/hooks/usePage'

// 刷新页面
const router = useRouter()
const handleRefresh = useRedo(router)
</script>
