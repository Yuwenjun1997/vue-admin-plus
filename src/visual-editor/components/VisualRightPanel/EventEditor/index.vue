<template>
  <div class="event-editor">
    <el-collapse v-model="activeIndex">
      <el-collapse-item v-for="(item, key) in currentBlock?.events" :key="key" :name="key">
        <template #title>
          <el-tooltip :content="getToolTipContent(key)" placement="left">
            <Icon class="tooltip-icon" icon="bi:question-diamond-fill" />
          </el-tooltip>
          <div class="flex items-center justify-between flex-1 pr-2">
            <span class="ml-1">{{ key }}事件</span>
            <Icon class="event-editor__btn" icon="ion:android-add-circle" @click.stop="handleAdd(key)" />
          </div>
        </template>
        <div v-for="(method, index) in item" :key="index" class="event-box">
          <div class="flex items-center justify-between">
            <div>{{ method.custom ? '自定义事件' : '内置事件' }}</div>
            <div class="flex items-center gap-1">
              <Icon class="event-editor__btn" icon="ion:create-outline" @click="handleEdit(method)" />
              <Icon class="event-editor__btn" icon="ion:trash-outline" @click="handleRemove(method)" />
            </div>
          </div>
          <div class="text-xs">描述：{{ method.description }}</div>
        </div>
        <el-empty v-if="!item.length" description="暂未添加事件" />
      </el-collapse-item>
    </el-collapse>

    <!-- 编辑弹窗 -->
    <EventFormModal
      v-model="visible"
      v-model:form-data="editForm"
      v-model:title="modalTitle"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts" name="EventEditor">
import { Icon } from '@iconify/vue'
import EventFormModal from './components/EventFormModal.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { VisualEventData } from '@/visual-editor/types'
import { ElMessageBox } from 'element-plus'
import { useVisualEvents } from '@/visual-editor/hooks/useVisualEvents'

class VisualEventDataFrom implements VisualEventData {
  _vid: string | undefined
  key: string = ''
  custom: boolean = false
  eventValue?: string | undefined
  methodToken: string = ''
  description: string = ''
}

const { currentBlock, visualEditor } = storeToRefs(useVisualBoxStore())

const activeIndex = ref<string[]>([])

const getToolTipContent = (key: string) => {
  return visualEditor.value?.events?.find((item) => item.eventName === key)?.label
}

const visible = ref<boolean>(false)
const modalTitle = ref<string>('添加绑定事件')
const editForm = ref<VisualEventData>(new VisualEventDataFrom())

const { add, remove, update } = useVisualEvents()

const handleEdit = (method: VisualEventData) => {
  editForm.value = { ...method }
  modalTitle.value = '编辑绑定事件'
  visible.value = true
}
const handleRemove = (method: VisualEventData) => {
  ElMessageBox.confirm('确定要删除该事件吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => remove(method))
    .catch(() => {})
}

const handleAdd = (key: string) => {
  editForm.value = new VisualEventDataFrom()
  editForm.value.key = key
  modalTitle.value = '添加绑定事件'
  visible.value = true
}

const handleConfirm = () => {
  editForm.value._vid ? update(editForm.value) : add(editForm.value)
}
</script>

<style scoped lang="scss">
.event-editor {
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }

  .tooltip-icon {
    color: var(--el-text-color-regular);
  }

  .event-editor__btn {
    color: var(--el-text-color-regular);
    cursor: pointer;
    transition: var(--el-transition-all);

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .event-box {
    padding: 10px;
    border: 1px solid var(--el-color-info-light-9);
    margin-bottom: 12px;
    background-color: var(--el-color-info-light-9);

    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
