import { ElMessage, ElMessageBox, ElMessageBoxOptions, MessageHandler } from 'element-plus'

export const useMessageBox = () => {
  const showMessageBox = ref<boolean>(false)
  const showMessage = ref<MessageHandler>()

  const alert = async (content: string, title = '提示', options: ElMessageBoxOptions = {}) => {
    try {
      if (showMessageBox.value) return
      showMessageBox.value = true
      return await ElMessageBox.alert(content, title, { type: 'warning', ...options })
    } finally {
      showMessageBox.value = false
    }
  }

  const success = (message: string) => {
    if (showMessage.value) showMessage.value.close()
    showMessage.value = ElMessage.success(message)
  }

  const error = (message: string) => {
    if (showMessage.value) showMessage.value.close()
    showMessage.value = ElMessage.error(message)
  }

  return {
    alert,
    success,
    error,
  }
}
