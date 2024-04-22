<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div v-for="(option, key) in props.options" :key="key" class="visual-source-item" :name="key">
    <el-divider>{{ option.label }}</el-divider>
    <SourceEditorItem
      :key-name="key"
      :options="option"
      :trigger-handler="triggerHandler"
      @add-item="add"
      @remove-item="remove"
    />
  </div>
</template>

<script setup lang="ts" name="SourceEditor">
import { VisualEditorSourceDataMap } from '@/visual-editor/types'
import SourceEditorItem from './SourceEditorItem.vue'
import { useVisualSourceData } from '@/visual-editor/hooks/useVisualSourceData'

interface Props {
  options?: VisualEditorSourceDataMap
  triggerHandler?: (e: any) => void
}

const props = defineProps<Props>()

const { add, remove } = useVisualSourceData()
</script>
