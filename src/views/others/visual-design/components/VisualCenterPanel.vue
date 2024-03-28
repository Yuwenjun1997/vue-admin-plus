<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <SortableBox
        :key="actionUid"
        v-loading="isLoading"
        class="VisualCenterPanel-wrap"
        :class="device"
        data-visual-box-key="root"
        @on-end="onEnd"
      >
        <VisualBoxRender v-for="template in visualBoxTemplates" :key="template.visualBoxKey" :template="template" />
      </SortableBox>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates, device, isLoading, actionUid } = storeToRefs(visualBoxStore)

const onEnd = (evt: Sortable.SortableEvent) => {
  visualBoxStore.start()
  const currentKey = evt.item.dataset.visualBoxKey || ''
  const fromKey = evt.from.dataset.visualBoxKey || ''
  const toKey = evt.to.dataset.visualBoxKey || ''
  const { oldIndex = 0, newIndex = 0 } = evt
  if (fromKey !== toKey) {
    nextTick(() => evt.item.remove())
  }
  visualBoxStore.moveVisualBox(currentKey, fromKey, toKey, oldIndex, newIndex)
  visualBoxStore.done()
}
</script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  background-color: var(--el-bg-color);
  padding: 2px;

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
