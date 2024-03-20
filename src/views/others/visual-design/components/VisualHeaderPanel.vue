<template>
  <div class="VisualHeaderPanel h-full">
    <div class="flex-1 flex items-center">
      <el-tooltip content="撤销" effect="dark">
        <div class="visual-tools__control" :class="{ disabled: !canUndo }" @click.stop="handleUndo">
          <Icon icon="ion:ios-undo" />
        </div>
      </el-tooltip>
      <el-tooltip content="重做" effect="dark">
        <div class="visual-tools__control" :class="{ disabled: !canRedo }" @click.stop="handleRedo">
          <Icon icon="ion:ios-redo" />
        </div>
      </el-tooltip>
    </div>
    <div class="flex items-center">
      <el-tooltip content="清空画布" effect="dark">
        <div class="visual-tools__control" @click.stop="handleClear()">
          <Icon icon="ep:delete" />
          <span>清空</span>
        </div>
      </el-tooltip>
      <el-tooltip content="导入JSON配置" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowJsonImportModal()">
          <Icon icon="line-md:cloud-upload-loop" />
          <span>导入</span>
        </div>
      </el-tooltip>
      <el-tooltip content="导出JSON配置" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowJsonExportModal()">
          <Icon icon="line-md:cloud-download-loop" />
          <span>导出</span>
        </div>
      </el-tooltip>
      <el-tooltip content="导出代码" effect="dark">
        <div class="visual-tools__control" @click.stop="handleShowCodeExportModal()">
          <Icon icon="ion:code-working" />
          <span>导出代码</span>
        </div>
      </el-tooltip>
      <el-tooltip :content="isFullscreen ? '恢复窗口大小' : '窗口最大化'" effect="dark">
        <div class="visual-tools__control" @click.stop="toggleFullscreen()">
          <Icon icon="bi:window-fullscreen" />
        </div>
      </el-tooltip>
    </div>

    <el-dialog
      v-model="showJsonCodeModal"
      align-center
      append-to-body
      destroy-on-close
      draggable
      :title="jsonCodeModalTitle"
      width="1200px"
    >
      <VadCodeEditor v-model="jsonCode" mode="json" :readonly="jsonCodeModalType === 'export'" :user-worker="false" />
      <template #footer>
        <el-button @click="showJsonCodeModal = false">取消</el-button>
        <template v-if="jsonCodeModalType === 'import'">
          <el-button type="primary" @click="handleImportJson">确定导入</el-button>
        </template>
        <template v-if="jsonCodeModalType === 'export'">
          <el-button type="primary" @click="handleCopyJsonCode">复制JSON</el-button>
          <el-button type="primary" @click="handleSaveJsonAsFile">另存为文件</el-button>
        </template>
      </template>
    </el-dialog>

    <el-dialog
      v-model="showCodeExportModal"
      align-center
      append-to-body
      destroy-on-close
      draggable
      title="导出代码"
      width="1200px"
    >
      <el-tabs v-model="activeCodeExportTab" type="border-card">
        <el-tab-pane label="html" name="html">
          <VadCodeEditor v-model="htmlCode" mode="html" :readonly="true" :user-worker="false" />
        </el-tab-pane>
        <el-tab-pane label="css" name="css">
          <VadCodeEditor v-model="cssCode" mode="css" :readonly="true" :user-worker="false" />
        </el-tab-pane>
        <el-tab-pane label="vue2" name="vue2">
          <VadCodeEditor v-model="vue2Code" mode="vue" :readonly="true" :user-worker="false" />
        </el-tab-pane>
        <el-tab-pane label="vue3" name="vue3">
          <VadCodeEditor v-model="vue3Code" mode="vue" :readonly="true" :user-worker="false" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="VisualHeaderPanel">
import VadCodeEditor from '@/components/VadCodeEditor/index.vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { Icon } from '@iconify/vue'
import { useRefHistory, useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useVisualUtils } from '@/hooks/useVisualUtils'

const visualBoxStore = useVisualBoxStore()
const { isFullscreen, visualBoxTemplates, activeVisualBox } = storeToRefs(visualBoxStore)
const { flatVisualBox } = visualBoxStore
const toggleFullscreen = useToggle(isFullscreen)

const { undo, redo, canRedo, canUndo } = useRefHistory(visualBoxTemplates, { deep: true })

const handleUndo = () => {
  undo()
  activeVisualBox.value = null
  flatVisualBox()
}

const handleRedo = () => {
  redo()
  activeVisualBox.value = null
  flatVisualBox()
}

const {
  jsonCodeModalType,
  showJsonCodeModal,
  jsonCodeModalTitle,
  jsonCode,
  showCodeExportModal,
  activeCodeExportTab,
  htmlCode,
  cssCode,
  vue2Code,
  vue3Code,
  handleClear,
  handleShowJsonExportModal,
  handleShowJsonImportModal,
  handleCopyJsonCode,
  handleImportJson,
  handleSaveJsonAsFile,
  handleShowCodeExportModal,
} = useVisualUtils()
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
