<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <DraggableEditor
        v-if="currentPage"
        :key="currentPage.id"
        class="VisualCenterPanel-wrap"
        :class="[device, { 'is-drag': isDrag }]"
        :style="pageStyles"
      />
      <div v-else class="VisualCenterPanel-wrap" :class="[device, { 'is-drag': isDrag }]">
        <el-empty description="当前为选中页面" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import DraggableEditor from '../DraggableEditor/index.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { VisualEditorBlockData } from '@/visual-editor/types'
import { storeToRefs } from 'pinia'
import { CSSProperties } from 'vue'

const { device, isDrag, currentPage } = storeToRefs(useVisualBoxStore())

const pageStyles = computed<CSSProperties | undefined>(() => {
  if (!currentPage.value) return
  return {
    backgroundColor: currentPage.value.config.bgColor,
    backgroundImage: currentPage.value.config.bgImage ? `url(${currentPage.value.config.bgImage})` : '',
    backgroundRepeat: currentPage.value.config.bgRepeat ? 'repeat' : 'no-repeat',
    paddingTop: hasFixedComponent.value ? 'var(--visual-navbar-height)' : '',
  }
})

const hasFixedComponent = computed<boolean>(() => {
  let result = false
  if (!currentPage.value) return result
  const recursion = (blocks: VisualEditorBlockData[]) => {
    blocks.forEach((block) => {
      result = result || (block.componentKey === 'navbar' && block.props.fixed)
      if (result) return
      Object.entries(block.slots).forEach(([_key, value]) => recursion(value.children))
    })
  }
  recursion(currentPage.value.blocks)
  return result
})
</script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  background-color: var(--el-bg-color);
  contain: layout;

  &.pc {
    width: 100%;
  }

  &.h5 {
    width: 390px;
  }

  &.pad {
    width: 768px;
  }
}

:deep(.el-loading-mask) {
  background-color: transparent !important;
}

.el-scrollbar {
  :deep(.el-scrollbar__view) {
    min-height: calc(100% - 4px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
