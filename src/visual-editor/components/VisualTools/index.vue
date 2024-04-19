<template>
  <div class="VisualTools" @click.stop>
    <div class="visual-tools__icon">
      <Icon icon="bi:tools" />
    </div>
    <el-tooltip content="上移" effect="dark" placement="left">
      <div class="visual-tools__control" @click="moveUp">
        <Icon icon="line-md:arrow-close-up" />
      </div>
    </el-tooltip>
    <el-tooltip content="下移" effect="dark" placement="left">
      <div class="visual-tools__control" @click="moveDown">
        <Icon icon="line-md:arrow-close-down" />
      </div>
    </el-tooltip>
    <el-tooltip content="复制" effect="dark" placement="left">
      <div class="visual-tools__control" @click="clone">
        <Icon icon="bi:copy" />
      </div>
    </el-tooltip>
    <el-tooltip content="删除" effect="dark" placement="left">
      <div class="visual-tools__control" @click="deleteFn">
        <Icon icon="ep:delete" />
      </div>
    </el-tooltip>
    <el-tooltip content="选择父级" effect="dark" placement="left">
      <div class="visual-tools__control" @click="activeParent">
        <Icon icon="ep:files" />
      </div>
    </el-tooltip>
    <el-tooltip content="配置响应" effect="dark" placement="left">
      <div class="visual-tools__control" @click="handleEditReactive">
        <Icon class="text-base cursor-pointer" icon="ion:link-sharp" />
      </div>
    </el-tooltip>
    <!-- 响应配置弹窗 -->
    <VisualReactivePropsModal v-if="showReactivePropsModal" v-model="showReactivePropsModal" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import VisualReactivePropsModal from './components/VisualReactivePropsModal.vue'
import { useVisualUtils } from '@/visual-editor/hooks/useVisualUtils'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const { moveDown, moveUp, clone, deleteFn, activeParent } = useVisualUtils()
const { visualEditor } = storeToRefs(useVisualBoxStore())

const showReactivePropsModal = ref(false)

const handleEditReactive = () => {
  if (!visualEditor.value) return ElMessage.warning('请先选择组件')
  showReactivePropsModal.value = true
}
</script>

<style scoped lang="scss">
.VisualTools {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  .visual-tools__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    padding: 8px;
    border-bottom: 1px dashed var(--el-border-color-light);
    color: var(--el-text-color-regular);
  }

  .visual-tools__control {
    cursor: pointer;
    padding: 8px;
    border-radius: var(--el-border-radius-base);
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
    transition: var(--el-transition-all);

    &:hover {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }
}
</style>
