<template>
  <div class="visual-source-editor">
    <el-collapse v-model="activeIndex" accordion>
      <template v-if="isArray(props.options.value)">
        <el-collapse-item v-for="(option, index) in props.options.value" :key="index" :name="index">
          <template #title>
            <div class="flex items-center gap-1">
              <template v-if="props.options && props.options.value.length > 1">
                <Icon
                  class="slot-del-btn"
                  icon="ep:circle-close-filled"
                  @click.stop="emit('remove-item', keyName, index)"
                />
              </template>
              <span>{{ option?.title?.defaultValue }}</span>
            </div>
          </template>
          <AttrEditor :options="option" show-bind :trigger-handler="triggerHandler" />
        </el-collapse-item>
        <el-button class="w-full" size="small" type="primary" @click="emit('add-item', keyName)">添加</el-button>
      </template>
      <el-collapse-item v-else :key="1" :name="1" :title="props.options.value?.title?.defaultValue">
        <AttrEditor :options="props.options.value" :trigger-handler="triggerHandler" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts" name="SourceEditorItem">
import { Icon } from '@iconify/vue'
import AttrEditor from '../AttrEditor/index.vue'
import { VisualEditorSourceData } from '@/visual-editor/types'
import { isArray } from 'lodash'

interface Props {
  options: VisualEditorSourceData
  triggerHandler?: (e: any) => void
  keyName: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'add-item', keyName: string): void
  (e: 'remove-item', keyName: string, index: number): void
}>()

const activeIndex = ref<number[]>([])
</script>

<style scoped lang="scss">
.visual-source-editor {
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
