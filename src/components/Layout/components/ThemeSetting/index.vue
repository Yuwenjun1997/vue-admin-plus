<template>
  <el-drawer v-model="theme.showThemeSetting" direction="rtl" :size="350" title="主题配置" @open="onOpen">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="theme.themeColor" @change="onThemeColorChange" />
      </el-form-item>
      <el-form-item label="菜单宽度">
        <el-select v-model="theme.menuWidth" :disabled="!theme.showMenu">
          <el-option label="200px" :value="200" />
          <el-option label="240px" :value="240" />
          <el-option label="280px" :value="280" />
        </el-select>
      </el-form-item>
      <el-form-item label="分栏宽度">
        <el-select v-model="theme.subfieldWidth" :disabled="!theme.showSubfield" @change="onSubfieldWidthChange">
          <el-option label="60px" :value="60" />
          <el-option label="70px" :value="70" />
          <el-option label="80px" :value="80" />
          <el-option label="90px" :value="90" />
        </el-select>
      </el-form-item>
      <el-divider />
      <el-form-item label="菜单">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showMenu" />
        </div>
      </el-form-item>
      <el-form-item label="分栏">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showSubfield" />
        </div>
      </el-form-item>
      <el-form-item label="标签">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showNavbarTags" @change="onNavbarTagsChange" />
        </div>
      </el-form-item>
      <el-form-item label="标签图标">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showNavbarTagsIcon" :disabled="!theme.showNavbarTags" />
        </div>
      </el-form-item>
      <el-form-item label="面包屑">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showBreadcrumb" />
        </div>
      </el-form-item>
      <el-divider />
      <el-form-item label="显示水印">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showWatermark" />
        </div>
      </el-form-item>
      <el-form-item label="水印内容">
        <el-input
          v-model="watermarkContent"
          :disabled="!theme.showWatermark"
          type="textarea"
          @blur="onWatermarkContentBlur"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button>恢复默认</el-button>
      <el-button type="primary" @click="handleSaveTheme">保存</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { useCssVar, useDark } from '@vueuse/core'
import { useTheme } from '@/store/theme'
import { toPx } from '@/utils'
import { setThemeConfig } from '@/utils/theme'
const theme = useTheme()

const isDark = useDark()

const watermarkContent = ref<string>()

const onOpen = () => {
  if (typeof theme.watermarkContent === 'string') {
    watermarkContent.value = theme.watermarkContent
  } else if (Array.isArray(theme.watermarkContent)) {
    watermarkContent.value = theme.watermarkContent.join('\n')
  }
}

// 主题色修改
const onThemeColorChange = () => {
  theme.updateThemeColor()
  theme.applyThemeColor(isDark.value)
}

// 水印
const onWatermarkContentBlur = () => {
  theme.watermarkContent = watermarkContent.value?.split('\n') || ''
}

// 分栏
const onSubfieldWidthChange = () => {
  const width = useCssVar('--xy-layout-aside-left-width', document.documentElement)
  width.value = toPx(theme.subfieldWidth)
}

// 标签栏
const onNavbarTagsChange = () => {
  const height = useCssVar('--xy-layout-navbar-tags-height', document.documentElement)
  height.value = theme.showNavbarTags ? toPx(40) : toPx(0)
}

// 保存配置
const handleSaveTheme = () => {
  theme.showThemeSetting = false
  setThemeConfig(JSON.stringify(theme.$state))
}
</script>

<style scoped></style>
