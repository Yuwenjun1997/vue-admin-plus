<template>
  <div class="VisualHeaderPanel h-full">
    <div class="flex-1 flex items-center">
      <el-tooltip content="撤销" effect="dark">
        <div class="visual-tools__control" :class="{ disabled: !canUndo }" @click.stop="undo">
          <Icon icon="ion:ios-undo" />
        </div>
      </el-tooltip>
      <el-tooltip content="重做" effect="dark">
        <div class="visual-tools__control" :class="{ disabled: !canRedo }" @click.stop="redo">
          <Icon icon="ion:ios-redo" />
        </div>
      </el-tooltip>
      <el-radio-group v-model="device" class="mx-2" size="small" @change="handleDeviceChange">
        <el-radio-button label="PC" value="pc" />
        <el-radio-button label="Pad" value="pad" />
        <el-radio-button label="H5" value="h5" />
      </el-radio-group>
      <el-tooltip content="页面全局设置" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowGlobalSettingModal">
          <Icon icon="ion:ios-settings-strong" />
          <span>全局设置</span>
        </div>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip content="清空画布" effect="dark">
        <div class="visual-tools__control" @click.stop="handleClearScreen">
          <Icon icon="ep:delete" />
          <span>清空</span>
        </div>
      </el-tooltip>
      <el-tooltip content="预览" effect="dark">
        <div class="visual-tools__control" @click.stop="handlePreview">
          <Icon icon="ep:view" />
          <span>预览</span>
        </div>
      </el-tooltip>
      <el-tooltip content="导入JSON配置" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowJsonImportModal">
          <Icon icon="line-md:cloud-upload-loop" />
          <span>导入</span>
        </div>
      </el-tooltip>
      <el-tooltip content="导出JSON配置" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowJsonExportModal">
          <Icon icon="line-md:cloud-download-loop" />
          <span>导出</span>
        </div>
      </el-tooltip>
      <el-tooltip content="导出代码" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowCodeExportModal">
          <Icon icon="ion:code-working" />
          <span>导出代码</span>
        </div>
      </el-tooltip>
      <el-tooltip v-if="!hideFullscreen" :content="isFullscreen ? '恢复窗口大小' : '窗口最大化'" effect="dark">
        <div class="visual-tools__control" @click.stop="toggleFullscreen()">
          <Icon icon="bi:window-fullscreen" />
        </div>
      </el-tooltip>
    </div>

    <!-- json代码导入导出 -->
    <VisualJsonCodeModal ref="jsonCodeModal" />

    <!-- 代码导入导出 -->
    <VisualCodeExportModal ref="codeExportModal" />

    <!-- 预览 -->
    <VisualPreviewModal ref="previewModal" />

    <!-- 全局设置 -->
    <VisualGlobalSettingModal ref="golbalSettingModal" />
  </div>
</template>

<script setup lang="ts" name="VisualHeaderPanel">
import VisualJsonCodeModal from './VisualJsonCodeModal.vue'
import VisualCodeExportModal from './VisualCodeExportModal.vue'
import VisualPreviewModal from './VisualPreviewModal.vue'
import VisualGlobalSettingModal from './VisualGlobalSettingModal/index.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { Icon } from '@iconify/vue'
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import { useVisualUtils } from '@/visual-editor/hooks/useVisualUtils'
import { useVisualHistory } from '@/visual-editor/hooks/useVisualHistory'

const visualBoxStore = useVisualBoxStore()
const { isFullscreen, device, hideFullscreen } = storeToRefs(visualBoxStore)
const { undo, redo, canRedo, canUndo } = useVisualHistory()

const toggleFullscreen = useToggle(isFullscreen)
const { clear } = useVisualUtils()

// 清空画布
const handleClearScreen = async () => {
  try {
    await ElMessageBox.confirm('确定要清空画布吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    clear()
  } catch (error) {
    console.log(error)
  }
}

// 屏幕切换
const handleDeviceChange = (name: string | number | boolean | undefined) => {
  visualBoxStore.setDevice(name as string)
}

// json导入导出
const jsonCodeModal = ref<InstanceType<typeof VisualJsonCodeModal>>()
const handleShowJsonImportModal = () => {
  if (!jsonCodeModal.value) return
  jsonCodeModal.value.showJsonImportModal()
}
const handleShowJsonExportModal = () => {
  if (!jsonCodeModal.value) return
  jsonCodeModal.value.showJsonExportModal()
}

// 代码导出
const codeExportModal = ref<InstanceType<typeof VisualCodeExportModal>>()
const handleShowCodeExportModal = () => {
  if (!codeExportModal.value) return
  codeExportModal.value.showCodeExportModal()
}

// 预览
const previewModal = ref<InstanceType<typeof VisualPreviewModal>>()
const handlePreview = () => {
  if (!previewModal.value) return
  previewModal.value.showPreviewModal()
}

// 全局设置
const golbalSettingModal = ref<InstanceType<typeof VisualGlobalSettingModal>>()
const handleShowGlobalSettingModal = () => {
  if (!golbalSettingModal.value) return
  golbalSettingModal.value.showModal()
}
</script>

<style scoped lang="scss">
.VisualHeaderPanel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--el-text-color-regular);

  .visual-tools__control {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 8px;
    border-radius: var(--el-border-radius-base);
    transition: var(--el-transition-all);
    user-select: none;

    &.disabled {
      opacity: 0.2;
      pointer-events: none;
    }

    &:hover {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }

    span {
      margin-left: 4px;
      font-size: var(--el-font-size-extra-small);
    }
  }
}
</style>
