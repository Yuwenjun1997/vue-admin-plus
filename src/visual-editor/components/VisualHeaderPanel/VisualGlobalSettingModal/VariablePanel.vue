<template>
  <div>
    <div>
      <el-button size="small" type="primary" @click="handleAdd">新增变量</el-button>
      <el-button size="small" type="primary" @click="handleEditJson">编辑JSON</el-button>
    </div>
    <el-alert v-if="isRepeatVariableName" class="!mt-2" :closable="false" :title="repeatTitle" type="warning" />
    <el-table border class="mt-2" :data="variables" size="small" stripe>
      <el-table-column label="变量名称" prop="name" />
      <el-table-column label="变量标识" prop="variableName" />
      <el-table-column label="值类型" prop="valueType" />
      <el-table-column :formatter="(row) => row.description || '-'" label="描述" prop="description" />
      <el-table-column :formatter="(row) => row.defaultValue || '-'" label="默认值" prop="defaultValue" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-if="showEditModal"
      v-model="showEditModal"
      append-to-body
      destroy-on-close
      draggable
      title="编辑变量"
      width="40%"
    >
      <VadCodeEditor v-if="showModalType === 'json'" v-model="variablesJson" :min-lines="20" />
      <el-form v-else ref="formValidate" label-width="70" :model="form" :rules="rules" size="small">
        <el-form-item label="变量名称" prop="name">
          <el-input v-model="form.name" placeholder="变量名称" />
        </el-form-item>
        <el-form-item label="变量标识" prop="variableName">
          <el-input v-model="form.variableName" placeholder="变量标识（例如：name）" />
        </el-form-item>
        <el-form-item label="值类型" prop="valueType">
          <el-select v-model="form.valueType" placeholder="请选择值类型">
            <el-option label="字符串" value="string" />
            <el-option label="数字" value="number" />
            <el-option label="布尔值" value="boolean" />
            <el-option label="对象" value="object" />
            <el-option label="数组" value="array" />
            <el-option label="函数" value="function" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="描述" />
        </el-form-item>
        <el-form-item label="默认值" prop="defaultValue">
          <!-- <VadCodeEditor v-model="form.defaultValue" class="w-full" :max-lines="20" :user-worker="false" /> -->
          <el-input v-model="form.defaultValue" placeholder="默认值" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditModal = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import VadCodeEditor from '@/components/VadCodeEditor/index.vue'
import { useVisualGlobal } from '@/visual-editor/store/visual-global'
import { VariableType, VisualGlobalVariable } from '@/visual-editor/types'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const visualGlobalStore = useVisualGlobal()
const { variables } = storeToRefs(visualGlobalStore)

class Variable implements VisualGlobalVariable {
  uuid: string = uuidv4()
  name: string = ''
  variableName: string = ''
  description: string = ''
  valueType: VariableType = 'string'
  defaultValue: string = ''
}

const repeatTitle = '检测到有重复的变量标识，请确保变量标识唯一'
const isRepeatVariableName = computed(() => {
  const map = new Map<string, boolean>()
  let isRepeat: boolean = false
  variables.value.forEach((variable) => {
    if (isRepeat) return
    isRepeat = map.get(variable.variableName) || false
    map.set(variable.variableName, true)
  })
  return isRepeat
})

const showEditModal = ref(false)
const showModalType = ref<string>('form')

const variablesJson = ref<string>('')
const handleEditJson = () => {
  showModalType.value = 'json'
  variablesJson.value = JSON.stringify(variables.value, null, 2)
  showEditModal.value = true
}

const formValidate = ref<FormInstance>()
const form = ref<VisualGlobalVariable>(new Variable())
const rules: FormRules<VisualGlobalVariable> = {
  name: [{ required: true, message: '请输入变量名称', trigger: 'blur' }],
  variableName: [{ required: true, message: '请输入变量标识', trigger: 'blur' }],
  valueType: [{ required: true, message: '请选择值类型', trigger: 'change' }],
}

const handleEdit = (row: VisualGlobalVariable) => {
  showModalType.value = 'form'
  form.value = { ...row }
  showEditModal.value = true
}

const handleAdd = () => {
  showModalType.value = 'form'
  form.value = new Variable()
  showEditModal.value = true
}

const handleRemove = async (row: VisualGlobalVariable) => {
  try {
    await ElMessageBox.confirm('确定要删除该变量吗？', '提示', { type: 'warning' })
    visualGlobalStore.removeVariable(row)
  } catch (error) {
    console.log(error)
  }
}

const handleSave = async () => {
  try {
    if (showModalType.value === 'form') {
      await formValidate.value?.validate()
      visualGlobalStore.saveVariable(unref(form))
    } else {
      const variables = JSON.parse(unref(variablesJson)) as VisualGlobalVariable[]
      visualGlobalStore.variables = variables
    }
    showEditModal.value = false
    ElMessage.success('保存成功')
  } catch (error: any) {
    ElMessage.warning(error.message)
  }
}
</script>

<style scoped></style>
