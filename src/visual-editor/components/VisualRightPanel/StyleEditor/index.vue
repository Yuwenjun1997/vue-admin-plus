<template>
  <el-collapse v-model="activeIndex" class="style-editor">
    <el-collapse-item v-for="(item, index) in props.options" :key="index" :name="index" :title="item.groupName">
      <AttrEditor :options="item.optionMap" :trigger-handler="triggerHandler" />
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts" name="StyleEditor">
import AttrEditor from '../AttrEditor/index.vue'
import { CssEditorOption } from '@/visual-editor/configs/css-editor-options'

interface Props {
  vid?: string
  options?: CssEditorOption[]
  triggerHandler?: (e: any) => void
}

const props = defineProps<Props>()

const activeIndex = ref<number[]>([])

onMounted(() => {
  props.options?.forEach((_item, index) => {
    activeIndex.value.push(index)
  })
})
</script>

<style scoped lang="scss">
.style-editor {
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
</style>
