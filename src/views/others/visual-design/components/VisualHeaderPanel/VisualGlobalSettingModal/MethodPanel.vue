<template>
  <div>
    <div>
      <el-button size="small" type="primary" @click="handleAdd">新增事件</el-button>
      <el-button size="small" type="primary" @click="handleEditJson">编辑JSON</el-button>
    </div>
    <el-alert v-if="isRepeatMethodName" class="!mt-2" :closable="false" :title="repeatTitle" type="warning" />
    <el-table border class="mt-2" :data="methods" size="small" stripe>
      <el-table-column label="事件名称" prop="name" />
      <el-table-column label="事件标识" prop="methodName" />
      <el-table-column label="事件类型" prop="trigger" />
      <el-table-column :formatter="(row) => row.params || '-'" label="参数" prop="params" />
      <el-table-column :formatter="(row) => row.description || '-'" label="描述" prop="description" />
      <el-table-column label="代码片段" prop="methodToken" />
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
      title="编辑事件"
      width="40%"
    >
      <VadCodeEditor v-if="showModalType === 'json'" v-model="methodsJson" :min-lines="20" />
      <el-form v-else ref="formValidate" label-width="70" :model="form" :rules="rules" size="small">
        <el-form-item label="事件名称" prop="name">
          <el-input v-model="form.name" placeholder="事件名" />
        </el-form-item>
        <el-form-item label="事件标识" prop="methodName">
          <el-input v-model="form.methodName" placeholder="事件标识（例如：handleClick）" />
        </el-form-item>
        <el-form-item label="事件类型" prop="trigger">
          <el-select v-model="form.trigger" placeholder="请选择值类型">
            <el-option label="点击" value="click" />
            <el-option label="悬浮" value="hover" />
            <el-option label="输入" value="input" />
            <el-option label="选中" value="select" />
            <el-option label="变动" value="change" />
            <el-option label="获取焦点" value="focus" />
          </el-select>
        </el-form-item>
        <el-form-item label="参数列表" prop="params">
          <el-input v-model="form.params" placeholder="参数列表（用英文逗号分割）" />
        </el-form-item>
        <el-form-item label="事件描述" prop="description">
          <el-input v-model="form.description" placeholder="描述" />
        </el-form-item>
        <el-form-item label="代码片段" prop="methodToken">
          <VadCodeEditor v-model="form.methodToken" class="w-full" :max-lines="20" :min-lines="10" />
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
import { useVisualGlobal } from '@/store/modules/visual-global'
import { MethodTriggerType, VisualBoxGlobalMethod } from '@/types/visual-box'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { storeToRefs } from 'pinia'

const visualGlobalStore = useVisualGlobal()
const { methods } = storeToRefs(visualGlobalStore)

class Method implements VisualBoxGlobalMethod {
  name: string = ''
  methodName: string = ''
  trigger: MethodTriggerType = 'click'
  params: string = ''
  methodToken: string = ''
  description: string = ''
}

const repeatTitle = '检测到有重复的事件标识，请确保事件标识唯一'
const isRepeatMethodName = computed(() => {
  const map = new Map<string, boolean>()
  let isRepeat: boolean = false
  methods.value.forEach((method) => {
    if (isRepeat) return
    isRepeat = map.get(method.methodName) || false
    map.set(method.methodName, true)
  })
  return isRepeat
})

const showEditModal = ref(false)
const showModalType = ref<string>('form')

const methodsJson = ref<string>('')
const handleEditJson = () => {
  showModalType.value = 'json'
  methodsJson.value = JSON.stringify(methods.value, null, 2)
  showEditModal.value = true
}

const formValidate = ref<FormInstance>()
const form = ref<VisualBoxGlobalMethod>(new Method())
const rules: FormRules<VisualBoxGlobalMethod> = {
  name: [{ required: true, message: '请输入事件名称', trigger: 'blur' }],
  methodName: [{ required: true, message: '请输入事件标识', trigger: 'blur' }],
  trigger: [{ required: true, message: '请选择触发方式', trigger: 'change' }],
  methodToken: [{ required: true, message: '请输入代码片段', trigger: 'change' }],
}

const handleEdit = (row: VisualBoxGlobalMethod) => {
  showModalType.value = 'form'
  form.value = { ...row }
  showEditModal.value = true
}

const handleAdd = () => {
  showModalType.value = 'form'
  form.value = new Method()
  showEditModal.value = true
}

const handleRemove = async (row: VisualBoxGlobalMethod) => {
  try {
    await ElMessageBox.confirm('确定要删除该事件吗？', '提示', { type: 'warning' })
    visualGlobalStore.removeMethod(row)
  } catch (error) {
    console.log(error)
  }
}

const handleSave = async () => {
  try {
    if (showModalType.value === 'form') {
      await formValidate.value?.validate()
      visualGlobalStore.addMethod(unref(form))
    } else {
      const methods = JSON.parse(unref(methodsJson)) as VisualBoxGlobalMethod[]
      visualGlobalStore.methods = methods
    }
    showEditModal.value = false
    ElMessage.success('保存成功')
  } catch (error: any) {
    if (!error.message) return
    ElMessage.warning(error.message)
  }
}
</script>

<style scoped></style>
