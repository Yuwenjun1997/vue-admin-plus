<template>
  <el-dialog
    v-if="showCodeModal"
    v-model="showCodeModal"
    align-center
    append-to-body
    destroy-on-close
    draggable
    title="导出代码"
    width="1200px"
  >
    <el-tabs v-model="activeCodeExportTab" type="border-card">
      <el-tab-pane label="HTML" name="html">
        <VadCodeEditor v-model="htmlCode" mode="html" :readonly="true" :user-worker="false" />
      </el-tab-pane>
      <el-tab-pane label="CSS" name="css">
        <VadCodeEditor v-model="cssCode" mode="css" :readonly="true" :user-worker="false" />
      </el-tab-pane>
      <el-tab-pane label="VUE3" name="vue3">
        <VadCodeEditor v-model="vue3Code" mode="vue" :readonly="true" :user-worker="false" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <el-button type="primary" @click="handleCopyCode">复制代码</el-button>
      <el-button type="primary" @click="handleSaveAsFile">另存为文件</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import VadCodeEditor from '@/components/VadCodeEditor/index.vue'
import { genHtml, genVue3 } from '@/plugins/visual-box'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'

const { copy: copyCode } = useClipboard()

const visualBoxStore = useVisualBoxStore()

const showCodeModal = ref<boolean>(false)
const activeCodeExportTab = ref<string>('html')

const htmlCode = ref<string>('')
const cssCode = ref<string>('')
const vue3Code = ref<string>('')

const showCode = computed(() => {
  let code = ''
  if (activeCodeExportTab.value === 'html') code = htmlCode.value
  if (activeCodeExportTab.value === 'css') code = cssCode.value
  if (activeCodeExportTab.value === 'vue3') code = vue3Code.value
  return code
})

const ext = computed(() => {
  if (activeCodeExportTab.value === 'html') return 'html'
  if (activeCodeExportTab.value === 'css') return 'css'
  if (activeCodeExportTab.value === 'vue3') return 'vue'
})

const handleCopyCode = () => {
  copyCode(showCode.value).then(() => {
    ElMessage.success('复制成功')
  })
}

const handleSaveAsFile = () => {
  const blob = new Blob([showCode.value], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `visual-box-${Date.now()}.${ext.value}`)
}

const showCodeExportModal = () => {
  activeCodeExportTab.value = 'html'
  const { html, css } = genHtml(visualBoxStore.flatVisualBoxTemplates)
  htmlCode.value = html
  cssCode.value = css
  vue3Code.value = genVue3(visualBoxStore.flatVisualBoxTemplates)
  showCodeModal.value = true
}

defineExpose({
  showCodeExportModal,
})
</script>
