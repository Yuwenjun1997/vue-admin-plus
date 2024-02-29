<template>
  <el-drawer v-model="theme.showThemeSetting" direction="rtl" :size="350" title="主题配置" @open="onOpen">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="theme.themeColor" @change="loadTheme()" />
      </el-form-item>
      <el-form-item label="菜单宽度">
        <el-select v-model="theme.menuWidth" :disabled="!theme.showMenu">
          <el-option label="200px" :value="200" />
          <el-option label="240px" :value="240" />
          <el-option label="280px" :value="280" />
        </el-select>
      </el-form-item>
      <el-form-item label="分栏宽度">
        <el-select v-model="theme.subfieldWidth" :disabled="!theme.showSubfield" @change="applyThemeSize()">
          <el-option label="60px" :value="60" />
          <el-option label="70px" :value="70" />
          <el-option label="80px" :value="80" />
          <el-option label="90px" :value="90" />
        </el-select>
      </el-form-item>
      <el-divider />
      <el-form-item label="菜单">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showMenu" @change="applyThemeSize()" />
        </div>
      </el-form-item>
      <el-form-item label="分栏">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showSubfield" @change="applyThemeSize()" />
        </div>
      </el-form-item>
      <el-form-item label="标签">
        <div class="flex justify-end w-full">
          <el-switch v-model="theme.showNavbarTags" @change="applyThemeSize()" />
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
      <el-button @click="handleResetDefault">恢复默认</el-button>
      <el-button type="primary" @click="handleSaveTheme">保存</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { useTheme } from '@/store/theme'
import { setThemeConfig } from '@/utils/theme'
import { ElMessage, ElMessageBox } from 'element-plus'

const theme = useTheme()
const { loadTheme, applyThemeSize } = theme

const onOpen = () => {
  if (typeof theme.watermarkContent === 'string') {
    watermarkContent.value = theme.watermarkContent
  } else if (Array.isArray(theme.watermarkContent)) {
    watermarkContent.value = theme.watermarkContent.join('\n')
  }
}

// 水印
const watermarkContent = ref<string>()
const onWatermarkContentBlur = () => {
  theme.watermarkContent = watermarkContent.value?.split('\n') || ''
}

// 保存配置
const handleSaveTheme = () => {
  theme.showThemeSetting = false
  setThemeConfig(JSON.stringify(theme.$state))
  ElMessage.success('主题已保存')
}

// 默认配置
const handleResetDefault = () => {
  ElMessageBox.confirm('确认恢复默认主题?', '提示', { type: 'warning' })
    .then(() => {
      theme.resetTheme()
      ElMessage.success('已恢复默认主题')
    })
    .catch(() => {
      // 取消
    })
}
</script>

<style scoped></style>
