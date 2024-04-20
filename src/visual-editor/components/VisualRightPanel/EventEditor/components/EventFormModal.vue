<template>
  <el-dialog v-if="visible" append-to-body draggable :model-value="visible" :title="showTitle" width="1000">
    <el-form ref="formRef" :label-width="120" :model="form" :rules="rules" size="small">
      <el-form-item label="是否是自定义" prop="custom">
        <el-switch v-model="form.custom" />
      </el-form-item>
      <el-form-item v-if="form.custom" label="自定义事件" prop="methodToken">
        <VadCodeEditor
          v-model="form.methodToken"
          class="w-full"
          :max-lines="30"
          :min-lines="30"
          :placeholder="placeholder"
        />
      </el-form-item>
      <template v-else>
        <el-form-item label="绑定事件" prop="eventName">
          <el-select v-model="form.eventName" placeholder="请选择绑定事件">
            <el-option label="路由" value="routerEvent" />
            <el-option label="接口" value="apiEvent" />
          </el-select>
        </el-form-item>
        <!-- 路由事件参数 -->
        <template v-if="form.eventName === 'routerEvent'">
          <el-form-item label="跳转页面" prop="eventParams.path">
            <el-cascader
              v-model="form.eventParams.path"
              :options="visualPagesTree"
              placeholder="请选择跳转页面"
              :props="cascaderProps"
            />
          </el-form-item>
          <el-form-item label="关闭当前页面" prop="eventParams.replace">
            <el-switch v-model="form.eventParams.replace" />
          </el-form-item>
        </template>
        <!-- 接口事件参数 -->
      </template>
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
import { useVisualPages } from '@/visual-editor/hooks/useVisualPages'
import { VisualEventData } from '@/visual-editor/types'
import { useVModel } from '@vueuse/core'
import { FormInstance } from 'element-plus'

const placeholder = `
/**
------------------------------------------
可通过this访问以下属性：
_vid          -当前组件id
$ref          -当前组件引用
$refs         -当前页面组件引用列表
$props        -当前组件属性
$block        -当前页面组件列表
$events       -事件列表
$store        -全局store（响应式）
$pageStore    -当前页面store（响应式）
------------------------------------------
*/

// TODO
// play your javascript code;
`

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
  eventName: [{ required: true, message: '请选择绑定事件', trigger: 'change' }],
  'eventParams.path': [{ required: true, message: '请选择跳转页面', trigger: 'change' }],
}

const { visualPagesTree } = useVisualPages()

const cascaderProps = {
  value: 'path',
  label: 'title',
  emitPath: false,
  checkStrictly: true,
}

const handleConfirm = () => {
  formRef.value?.validate((valid) => {
    if (!valid) return
    emit('confirm')
    visible.value = false
  })
}
</script>

<style scoped></style>
