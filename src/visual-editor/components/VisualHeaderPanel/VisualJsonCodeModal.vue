<template>
  <el-dialog
    v-if="showJsonCodeModal"
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
</template>

<script setup lang="ts">
import VadCodeEditor from '@/components/VadCodeEditor/index.vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { useVisualStorage } from '@/visual-editor/hooks/useVisualStorage'

const { visualPages, currentPage } = storeToRefs(useVisualBoxStore())
const { setState } = useVisualStorage()

// 导入导出json
const showJsonCodeModal = ref<boolean>(false)
const jsonCodeModalTitle = ref<string>('导出Json')
const jsonCode = ref<string>('')
const jsonCodeModalType = ref<string>('export')
const { copy: copyJsonCode } = useClipboard({ source: jsonCode })

const handleCopyJsonCode = () => {
  copyJsonCode(jsonCode.value).then(() => {
    ElMessage.success('复制成功')
  })
}

const handleImportJson = () => {
  try {
    const data = JSON.parse(jsonCode.value)
    visualPages.value = data
    currentPage.value = null
    showJsonCodeModal.value = false
    setState()
    ElMessage.success('已导入全部页面')
  } catch (error) {
    ElMessage.error('导入失败，请检查Json格式')
  }
}

const handleSaveJsonAsFile = () => {
  const blob = new Blob([jsonCode.value], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `visual-box-${Date.now()}.json`)
}

const showJsonExportModal = () => {
  jsonCodeModalType.value = 'export'
  jsonCodeModalTitle.value = '导出Json'
  jsonCode.value = JSON.stringify(visualPages.value)
  showJsonCodeModal.value = true
}

const showJsonImportModal = () => {
  jsonCodeModalType.value = 'import'
  jsonCodeModalTitle.value = '导入Json'
  jsonCode.value = ''
  showJsonCodeModal.value = true
}

defineExpose({
  showJsonExportModal,
  showJsonImportModal,
})
</script>

<style scoped></style>
