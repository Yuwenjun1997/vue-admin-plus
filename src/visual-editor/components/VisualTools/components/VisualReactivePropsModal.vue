<template>
  <el-dialog v-model="visible" title="配置响应字段" width="1200">
    <el-scrollbar height="400px">
      <el-table border :data="tableData" size="small">
        <el-table-column label="响应来源" prop="sourceKey">
          <template #default="{ row }">
            <el-select v-model="row.bindSourceKey" size="small">
              <el-option label="全局" value="global" />
              <el-option label="当前页面" value="currentPage" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="响应字段" prop="bindProp">
          <template #default="{ row }">
            <el-select v-model="row.bindProp" allow-create :disabled="!row.bindSourceKey" filterable size="small">
              <template #prefix>${{ row.bindSourceKey }}.</template>
              <el-option v-for="item in bindProps(row.bindSourceKey)" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="绑定属性" prop="propName">
          <template #default="{ row }">
            <el-select v-model="row.propName" size="small">
              <template #prefix>$props.</template>
              <el-option v-for="(_item, key) in visualEditor?.props" :key="key" :label="key" :value="key" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性描述">
          <template #default="{ row }">
            {{ getDescription(row.propName) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性值">
          <template #default="{ row }">
            <el-tag v-if="getDefaultValue(row.propName)">{{ getDefaultValue(row.propName) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" prop="address">
          <template #default="{ $index }">
            <div class="flex justify-center">
              <Icon class="remove-btn" icon="ion:trash-outline" @click="handleRemove($index)" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-button class="w-full mt-2" size="small" @click="handleAddProp"> <Icon icon="ep:plus" />添加字段 </el-button>
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { VisualBindProp } from '@/visual-editor/types'
import { Icon } from '@iconify/vue'
import { useVModel } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

interface Props {
  modelValue: boolean
}

const { visualEditor, visualStore, currentPage } = storeToRefs(useVisualBoxStore())
const { applyVisualEditor } = useVisualBoxStore()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const props = defineProps<Props>()

const visible = useVModel(props, 'modelValue', emit)

const bindProps = (key: string) => {
  if (key === 'global') return Object.keys(visualStore.value) || []
  if (key === 'currentPage') return Object.keys(currentPage.value?.store || {})
  return []
}

const getDescription = (propName: string) => {
  if (!visualEditor.value?.props) return ''
  return visualEditor.value.props[propName]?.label
}

const getDefaultValue = (propName: string) => {
  if (!visualEditor.value?.props) return ''
  const value = visualEditor.value.props[propName]?.defaultValue
  if (typeof value === 'string' && !value.length) return ''
  return JSON.stringify(value)
}

const tableData = ref<VisualBindProp[]>(Object.values(visualEditor.value?.bindProps || {}))

const handleConfirm = () => {
  const valid = tableData.value.every((item) => item.bindProp && item.propName && item.bindSourceKey)
  if (!valid) return ElMessage.warning('请填写完整')
  if (!visualEditor.value) return
  visualEditor.value.bindProps = tableData.value.reduce((prev: Record<string, VisualBindProp>, current) => {
    prev[current.propName] = current
    return prev
  }, {})
  Object.entries(visualEditor.value.props || {}).forEach(([key, value]) => {
    value.reactive = tableData.value.some((item) => item.propName === key)
  })
  applyVisualEditor()
  visible.value = false
}

const handleAddProp = () => {
  tableData.value.push({ bindProp: '', propName: '', bindSourceKey: 'currentPage' })
}

const handleRemove = (index: number) => {
  tableData.value.splice(index, 1)
}
</script>

<style scoped>
.remove-btn {
  color: var(--el-color-danger);
  cursor: pointer;
}
</style>
