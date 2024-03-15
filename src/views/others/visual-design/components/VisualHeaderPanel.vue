<template>
  <div class="VisualHeaderPanel h-full">
    <div class="flex-1 flex items-center">
      <el-tooltip content="撤销" effect="dark">
        <div class="visual-tools__control" @click.stop="undo">
          <Icon icon="ion:ios-undo" />
        </div>
      </el-tooltip>
      <el-tooltip content="重做" effect="dark">
        <div class="visual-tools__control" @click.stop="redo">
          <Icon icon="ion:ios-redo" />
        </div>
      </el-tooltip>
    </div>
    <div>
      <el-tooltip :content="isFullscreen ? '恢复窗口大小' : '窗口最大化'" effect="dark">
        <div class="visual-tools__control" @click.stop="toggleFullscreen()">
          <Icon icon="ion:copy-sharp" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts" name="VisualHeaderPanel">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { Icon } from '@iconify/vue'
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

const visualBoxStore = useVisualBoxStore()
const { isFullscreen } = storeToRefs(visualBoxStore)
const { undo, redo } = visualBoxStore
const toggleFullscreen = useToggle(isFullscreen)
</script>

<style scoped lang="scss">
.VisualHeaderPanel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--el-text-color-regular);

  .visual-tools__control {
    cursor: pointer;
    padding: 8px;
    border-radius: var(--el-border-radius-base);
    transition: var(--el-transition-all);

    &:hover {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
}
</style>
