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
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { isArray } from 'lodash'
import { saveAs } from 'file-saver'

const visualBoxStore = useVisualBoxStore()

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
    if (jsonCode.value.length === 0) {
      return ElMessage.warning('导入数据必须为json格式')
    }
    const data = JSON.parse(jsonCode.value)
    if (!isArray(data)) {
      return ElMessage.error('导入失败，请检查数据格式')
    }
    visualBoxStore.initVisualBoxTemplates(data)
    ElMessage.success('导入成功')
    jsonCode.value = ''
    showJsonCodeModal.value = false
  } catch (error) {
    ElMessage.error('导入失败，请检查数据格式')
  }
}

const handleSaveJsonAsFile = () => {
  const blob = new Blob([jsonCode.value], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `visual-box-${Date.now()}.json`)
}

const showJsonExportModal = () => {
  jsonCodeModalType.value = 'export'
  jsonCodeModalTitle.value = '导出Json'
  jsonCode.value = JSON.stringify(visualBoxStore.visualBoxTemplates, null, 2)
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
