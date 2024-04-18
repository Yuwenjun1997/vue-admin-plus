<template>
  <el-dialog v-if="visible" :model-value="visible" :title="showTitle" width="500">
    <el-form ref="formRef" :label-width="90" :model="form" :rules="rules" size="small">
      <el-form-item label="是否是自定义" prop="custom">
        <el-switch v-model="form.custom" />
      </el-form-item>
      <el-form-item v-if="form.custom" label="自定义事件" prop="methodToken">
        <VadCodeEditor v-model="form.methodToken" class="w-full" :max-lines="30" :min-lines="10" />
      </el-form-item>
      <el-form-item v-else label="绑定事件" prop="eventValue">
        <el-cascader v-model="form.eventValue" :options="options" :props="{ emitPath: false }" />
      </el-form-item>
      <el-form-item label="事件描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入事件描述" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="EventFormModal">
import VadCodeEditor from '@/components/VadCodeEditor/index.vue'
import { VisualEventData } from '@/visual-editor/types'
import { useVModel } from '@vueuse/core'
import { FormInstance } from 'element-plus'

interface Props {
  modelValue: boolean
  title?: string
  formData: VisualEventData
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:title', value: string): void
  (e: 'update:formData', value: VisualEventData): void
  (e: 'confirm'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  title: 'Tips',
})

const visible = useVModel(props, 'modelValue', emit)
const showTitle = useVModel(props, 'title', emit)
const form = useVModel(props, 'formData', emit)

const formRef = ref<FormInstance>()

const rules = {
  description: [{ required: true, message: '请输入事件描述', trigger: 'blur' }],
  methodToken: [{ required: true, message: '请输入自定义事件', trigger: 'blur' }],
  eventValue: [{ required: true, message: '请选择绑定事件', trigger: 'change' }],
}

const handleConfirm = () => {
  formRef.value?.validate((valid) => {
    if (!valid) return
    emit('confirm')
    visible.value = false
  })
}

const options = [
  {
    value: 'guide',
    label: 'Guide',
  },
]
</script>

<style scoped></style>
