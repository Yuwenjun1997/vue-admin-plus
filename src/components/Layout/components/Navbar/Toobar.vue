<template>
  <div class="xy-toolbar">
    <el-tooltip :content="_fullscreenLabel" effect="dark">
      <Icon class="xy-toolbar__icon" :icon="_fullscreenIcon" @click="toggle()" />
    </el-tooltip>
    <el-tooltip content="刷新" effect="dark">
      <Icon class="xy-toolbar__icon" icon="material-symbols:refresh" @click="handleRefresh" />
    </el-tooltip>
    <el-tooltip content="消息通知" effect="dark">
      <Icon class="xy-toolbar__icon" icon="line-md:bell-loop" />
    </el-tooltip>
    <el-tooltip content="主题设置" effect="dark">
      <Icon class="xy-toolbar__icon" icon="line-md:discord" @click="theme.showThemeSetting = true" />
    </el-tooltip>
    <el-tooltip content="访问GitHub" effect="dark">
      <a href="https://gitee.com/yuwenjun1997/vue-admin-plus" target="_blank">
        <Icon class="xy-toolbar__icon" icon="line-md:github-loop" />
      </a>
    </el-tooltip>
    <el-tooltip :content="_darkThemeLabel" effect="dark">
      <Icon class="xy-toolbar__icon" :icon="_darkThemeIcon" @click="handleToggleDark" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTheme } from '@/store/theme'
import { useDark, useToggle, useFullscreen } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const theme = useTheme()

// 切换暗夜模式
const isDark = useDark()
const toggleDark = useToggle(isDark)
const _darkThemeIcon = computed(() =>
  isDark.value ? 'line-md:sun-rising-twotone-loop' : 'line-md:sunny-outline-to-moon-loop-transition'
)
const _darkThemeLabel = computed(() => (isDark.value ? '明亮模式' : '暗夜模式'))
const handleToggleDark = () => {
  toggleDark()
  theme.applyThemeColor(isDark.value)
}

// 切换全屏
const { isFullscreen, toggle } = useFullscreen()
const _fullscreenIcon = computed(() => `material-symbols:fullscreen${isFullscreen.value ? '-exit' : ''}`)
const _fullscreenLabel = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))

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

<style scoped lang="scss">
.xy-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;

  .xy-toolbar__icon {
    font-size: var(--el-font-size-extra-large);
    color: var(--xy-layout-navbar-text-color);
    cursor: pointer;
    outline: none;
  }
}
</style>
