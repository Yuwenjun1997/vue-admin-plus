<template>
  <el-tree
    ref="treeRef"
    class="w-full"
    :current-node-key="currentBlock?._vid"
    :data="treeData"
    default-expand-all
    :expand-on-click-node="false"
    highlight-current
    node-key="_vid"
    @current-change="handleCurrentChange"
  >
    <template #default="{ data: nodeData }">
      <div class="flex items-center gap-1">
        <template v-if="nodeData.value.moduleName === 'basicWidgets'">
          <Icon icon="ion:color-palette-outline" />
        </template>
        <template v-if="nodeData.value.moduleName === 'containerWidgets'">
          <Icon icon="bi:inboxes" />
        </template>
        <span>{{ nodeData.title }}</span>
      </div>
    </template>
    <template #empty>
      <el-empty description="暂无数据" :image-size="60" />
    </template>
  </el-tree>
</template>

<script setup lang="ts" name="VisualNodesTree">
import { Icon } from '@iconify/vue'
import { VisualEditorBlockData } from '@/visual-editor/types'
import { TreeInstance } from 'element-plus'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

interface TreeData {
  _vid: string
  title: string
  value: VisualEditorBlockData
  children: TreeData[]
}

const treeRef = ref<TreeInstance>()

const { currentPage, currentBlock } = storeToRefs(useVisualBoxStore())
const { setCurrentBlock } = useVisualBoxStore()

const genTreeData = (block: VisualEditorBlockData): TreeData => {
  const { _vid, label, slots } = block

  const children = Object.entries(slots).reduce((prev, [_key, value]) => {
    if (Array.isArray(value.children)) {
      prev.push(...value.children.map(genTreeData))
    }
    return prev
  }, [] as TreeData[])

  return { _vid, title: label, value: block, children }
}

const treeData = computed<TreeData[]>(() => currentPage.value?.blocks.map(genTreeData) || [])

watch(
  currentBlock,
  () => {
    treeRef.value?.setCurrentKey(currentBlock.value?._vid, true)
  },
  { deep: true }
)

const handleCurrentChange = (data: TreeData) => {
  if (!data) return
  setCurrentBlock(data.value)
}
</script>

<style scoped></style>
