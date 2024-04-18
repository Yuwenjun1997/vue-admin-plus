<template>
  <el-dialog v-if="visible" :model-value="visible" title="配置响应字段" width="1200">
    <el-scrollbar height="400px">
      <el-table border :data="tableData" size="small">
        <el-table-column label="绑定来源" prop="sourceKey">
          <template #default="{ row }">
            <el-select v-model="row.sourceKey" clearable size="small">
              <el-option label="全局store" value="$store" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="绑定字段" prop="bindProp">
          <template #default="{ row }">
            <el-select v-model="row.bindProp" allow-create clearable :disabled="!row.sourceKey" filterable size="small">
              <el-option v-for="item in bindProps" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="变量名" prop="propName">
          <template #default="{ row }">
            <el-select v-model="row.propName" clearable size="small">
              <template #prefix>$props.</template>
              <el-option v-for="(_item, key) in visualEditor?.props" :key="key" :label="key" :value="key" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="变量描述" prop="propName">
          <template #default="{ row }">
            <span v-if="visualEditor && visualEditor.props">
              {{ visualEditor.props[row.propName]?.label }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" prop="address">
          <template #default>
            <div class="flex justify-center">
              <Icon icon="ion:trash-outline" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-button class="w-full mt-2" size="small"> <Icon icon="ep:plus" />添加字段 </el-button>
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
import { VisualReactiveProp } from '@/visual-editor/types'
import { Icon } from '@iconify/vue'
import { useVModel } from '@vueuse/core'
import { storeToRefs } from 'pinia'

interface Props {
  modelValue: boolean
}

const { visualEditor } = storeToRefs(useVisualBoxStore())

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const props = defineProps<Props>()

const visible = useVModel(props, 'modelValue', emit)

const bindProps = ['prop1', 'prop2']

const tableData = ref<VisualReactiveProp[]>([
  {
    bindProp: '',
    propName: '',
    sourceKey: '',
  },
])

const handleConfirm = () => {
  console.log(tableData.value)
}
</script>

<style scoped></style>
