<template>
  <el-tooltip :class="prefixCls + 'refresh__btn'" content="刷新" effect="dark">
    <Icon :class="prefixCls + 'tools-btn__icon'" icon="material-symbols:refresh" @click="handleRefresh" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ElMessageBox } from 'element-plus'
import { prefixCls } from '@/layout/config/index'

// 刷新页面
const router = useRouter()
const route = useRoute()
const handleRefresh = () => {
  ElMessageBox.confirm('确认刷新当前页面?', '提示', { type: 'warning' })
    .then(() => {
      router.replace({ path: '/redirect' + route.fullPath, query: route.query })
    })
    .catch(() => {
      // 取消
    })
}
</script>
