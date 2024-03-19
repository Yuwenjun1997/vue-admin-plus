import { useVisualBoxStore } from '@/store/modules/visual-box'
import { useClipboard } from '@vueuse/core'
import { ElMessage, ElMessageBox } from 'element-plus'
import { isArray } from 'lodash'
import { saveAs } from 'file-saver'

export function useVisualUtils() {
  const visualBoxStore = useVisualBoxStore()
  const { initVisualBoxTemplates, clearAllVisualBox } = visualBoxStore

  const handleClear = async () => {
    try {
      await ElMessageBox.confirm('确定要清空画布吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      clearAllVisualBox()
    } catch (error) {
      console.log(error)
    }
  }

  const showJsonCodeModal = ref<boolean>(false)
  const jsonCodeModalTitle = ref<string>('导出Json')
  const jsonCode = ref<string>('')
  const jsonCodeModalType = ref<string>('export')
  const { copy: copyJsonCode } = useClipboard({ source: jsonCode })
  const handleShowJsonExportModal = () => {
    jsonCodeModalType.value = 'export'
    jsonCodeModalTitle.value = '导出Json'
    jsonCode.value = JSON.stringify(visualBoxStore.visualBoxTemplates, null, 2)
    showJsonCodeModal.value = true
  }
  const handleShowJsonImportModal = () => {
    jsonCodeModalType.value = 'import'
    jsonCodeModalTitle.value = '导入Json'
    jsonCode.value = ''
    showJsonCodeModal.value = true
  }
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
      initVisualBoxTemplates(data)
      ElMessage.success('导入成功')
      jsonCode.value = ''
      showJsonCodeModal.value = false
    } catch (error) {
      ElMessage.error('导入失败，请检查数据格式')
    }
  }
  const handleSaveJsonAsFile = () => {
    const blob = new Blob([jsonCode.value], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'visual-box.json')
  }

  const showCodeExportModal = ref<boolean>(false)
  const activeCodeExportTab = ref<string>('html')
  const htmlCode = ref<string>('')
  const vueCode = ref<string>('')
  const handleShowCodeExportModal = () => {
    // 后期需要更换
    htmlCode.value = '<div>导出的html</div>'
    vueCode.value = '<div>导出的vue</div>'
    showCodeExportModal.value = true
  }

  return {
    jsonCodeModalType,
    showJsonCodeModal,
    jsonCodeModalTitle,
    jsonCode,
    showCodeExportModal,
    activeCodeExportTab,
    htmlCode,
    vueCode,
    handleClear,
    handleShowJsonExportModal,
    handleShowJsonImportModal,
    handleCopyJsonCode,
    handleImportJson,
    handleSaveJsonAsFile,
    handleShowCodeExportModal,
  }
}