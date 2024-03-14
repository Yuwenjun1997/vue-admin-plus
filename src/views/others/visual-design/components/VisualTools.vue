<template>
  <div class="VisualTools" @click.stop>
    <div class="visual-tools__icon">
      <Icon icon="bi:tools" />
    </div>
    <template v-if="!isLocked">
      <div class="visual-tools__control" @click="handeUp">
        <Icon icon="line-md:arrow-up" />
      </div>
      <div class="visual-tools__control" @click="handleDown">
        <Icon icon="line-md:arrow-down" />
      </div>
      <div class="visual-tools__control" @click="handleDelete">
        <Icon icon="ep:delete" />
      </div>
    </template>
    <div class="visual-tools__control" @click="toggleLock">
      <Icon :icon="!isLocked ? 'ep:unlock' : 'ep:lock'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'

const visualBoxStore = useVisualBoxStore()
const { moveVisualBoxUp, moveVisualBoxDown, deleteVisualBox, toggleLockVisualBox } = visualBoxStore
const { activeVisualBox } = storeToRefs(visualBoxStore)

const current = computed(() => activeVisualBox.value?.target)

const isDeletable = computed(() => current.value?.isDeletable)
const isLocked = computed(() => current.value?.isLocked)

const handeUp = () => {
  if (!current.value) return ElMessage.warning('当前未选中组件')
  moveVisualBoxUp(current.value)
}

const handleDown = () => {
  if (!current.value) return ElMessage.warning('当前未选中组件')
  moveVisualBoxDown(current.value)
}

const toggleLock = () => {
  if (!current.value) return ElMessage.warning('当前未选中组件')
  toggleLockVisualBox(current.value)
}

const handleDelete = async () => {
  if (!current.value) return ElMessage.warning('当前未选中组件')
  if (!isDeletable.value) return ElMessage.warning('当前组件不可删除')
  try {
    await ElMessageBox.confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    deleteVisualBox(current.value)
    ElMessage({ type: 'success', message: '删除成功!' })
  } catch (error) {
    console.log(error)
  }
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
    padding: 8px;
    border-radius: var(--el-border-radius-base);
    transition: var(--el-transition-all);
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    cursor: pointer;

    &:hover {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }
}
</style>
