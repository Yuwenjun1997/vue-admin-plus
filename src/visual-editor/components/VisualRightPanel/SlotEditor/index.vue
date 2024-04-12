<template>
  <div class="visual-slot-editor">
    <el-collapse v-model="activeIndex">
      <el-collapse-item v-for="(option, index) in props.options" :key="index" :name="index">
        <template #title>
          <div class="flex items-center gap-1">
            <Icon class="slot-del-btn" icon="ep:circle-close-filled" />
            <span>插槽{{ index + 1 }}</span>
          </div>
        </template>
        <AttrEditor :options="option" :trigger-handler="triggerHandler" />
      </el-collapse-item>
    </el-collapse>
    <el-button class="w-full" size="small" type="primary" @click="handleAddSlot">添加插槽</el-button>
  </div>
</template>

<script setup lang="ts" name="SlotEditor">
import { Icon } from '@iconify/vue'
import AttrEditor from '../AttrEditor/index.vue'
import { VisualBlockSlot } from '@/visual-editor/types'

interface Props {
  options?: VisualBlockSlot[]
  triggerHandler?: (e: any) => void
}

const props = defineProps<Props>()

const activeIndex = ref<number[]>([])

const handleAddSlot = () => {}
</script>

<style scoped lang="scss">
.visual-slot-editor {
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }

  .slot-del-btn {
    color: var(--el-text-color-placeholder);
    transition: var(--el-transition-all);

    &:hover {
      color: var(--el-color-danger);
    }
  }
}
</style>
