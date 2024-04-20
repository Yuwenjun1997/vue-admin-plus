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
    <div v-loading="isLoading" class="preview-container visual-preview-container">
      <iframe ref="iframeRef" class="h-full preview-el" :src="previewLink" :style="{ width: previewWidth }" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useVisualStorage } from '@/visual-editor/hooks/useVisualStorage'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'

const visualBoxStore = useVisualBoxStore()
const { previewLink } = useVisualStorage()

const handleDeviceChange = (name: string | number | boolean | undefined) => {
  visualBoxStore.setDevice(name as string)
}

const iframeRef = ref<HTMLIFrameElement>()

// 预览
const previewModal = ref<boolean>(false)
const isLoading = ref<boolean>(true)

const previewWidth = computed(() => {
  if (visualBoxStore.device === 'pc') return '100%'
  if (visualBoxStore.device === 'pad') return '768px'
  if (visualBoxStore.device === 'h5') return '390px'
})

const showPreviewModal = async () => {
  previewModal.value = true
  isLoading.value = true
  await nextTick()
  if (!iframeRef.value) return
  iframeRef.value.onload = () => {
    isLoading.value = false
  }
}

defineExpose({
  showPreviewModal,
})
</script>

<style scoped lang="scss">
.preview-container {
  width: 100%;
  height: calc(100vh - var(--el-dialog-padding-primary) - var(--el-dialog-padding-primary) - 50px);
  overflow: auto;

  .preview-el {
    contain: layout;
    margin: 0 auto;
    border: 1px solid var(--el-border-color);
  }
}
</style>
