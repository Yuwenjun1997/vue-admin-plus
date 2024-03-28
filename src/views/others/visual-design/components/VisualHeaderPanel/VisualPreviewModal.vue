<template>
  <el-dialog
    v-if="previewModal"
    v-model="previewModal"
    align-center
    append-to-body
    center
    destroy-on-close
    draggable
    fullscreen
    title="预览"
  >
    <template #header>
      <el-radio-group v-model="visualBoxStore.device" size="small" @change="handleDeviceChange">
        <el-radio-button label="PC" value="pc" />
        <el-radio-button label="Pad" value="pad" />
        <el-radio-button label="H5" value="h5" />
      </el-radio-group>
    </template>
    <div v-loading="isIframeLoading" class="iframe-container">
      <iframe ref="previewFrame" height="100%" :width="iframeWidth" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { genPreviewHtml } from '@/plugins/visual-box'

const visualBoxStore = useVisualBoxStore()

const handleDeviceChange = (name: string | number | boolean | undefined) => {
  visualBoxStore.setDevice(name as string)
}

// 预览
const previewFrame = ref<HTMLIFrameElement | null>(null)
const previewModal = ref<boolean>(false)
const isIframeLoading = ref<boolean>(true)

const iframeWidth = computed(() => {
  if (visualBoxStore.device === 'pc') return '100%'
  if (visualBoxStore.device === 'pad') return '768px'
  if (visualBoxStore.device === 'h5') return '390px'
})

const showPreviewModal = async () => {
  previewModal.value = true
  isIframeLoading.value = true
  await nextTick()
  if (!previewFrame.value) return
  previewFrame.value.srcdoc = genPreviewHtml(visualBoxStore.flatVisualBoxTemplates)
  previewFrame.value.onload = () => {
    isIframeLoading.value = false
  }
}

defineExpose({
  showPreviewModal,
})
</script>

<style scoped lang="scss">
.iframe-container {
  width: 100%;
  height: calc(100vh - var(--el-dialog-padding-primary) - var(--el-dialog-padding-primary) - 50px);
  overflow: auto;

  iframe {
    margin: 0 auto;
    border: 1px solid var(--el-border-color);
  }
}
</style>
