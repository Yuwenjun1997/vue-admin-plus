<template>
  <el-form class="p-2" label-position="left" label-width="100px" size="small">
    <el-form-item
      v-for="item in props.options"
      :key="item.property + Math.random()"
      :label="item.label"
      :required="item.required"
    >
      <template v-if="item.formType === 'input'">
        <el-input v-model="item.value" clearable :disabled="item.disabled" @blur="handleChange" />
      </template>
      <template v-if="item.formType === 'cssInput'">
        <VadIntersection style="min-height: 26px">
          <VisualCssInput v-model="item.value" @change="handleChange" />
        </VadIntersection>
      </template>
      <template v-if="item.formType === 'textarea'">
        <el-input
          v-model="item.value"
          clearable
          :disabled="item.disabled"
          :rows="5"
          type="textarea"
          @blur="handleChange"
        />
      </template>
      <template v-if="item.formType === 'methodInput'">
        <el-input v-model="item.value" clearable disabled type="textarea" />
        <el-button class="!w-full mt-1" size="small" type="primary" @click="handleShowCodeEditor(item)">
          打开编辑器
        </el-button>
      </template>
      <template v-if="item.formType === 'colorPicker'">
        <el-color-picker
          v-model="item.value"
          :disabled="item.disabled"
          :predefine="predefineColors"
          show-alpha
          @change="handleChange"
        />
      </template>
      <template v-if="item.formType === 'select'">
        <el-select v-model="item.value" clearable :disabled="item.disabled" @change="handleChange">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <template v-if="item.formType === 'numberInput'">
        <div class="w-full text-right">
          <el-input-number v-model.number="item.value" clearable :disabled="item.disabled" @change="handleChange" />
        </div>
      </template>
      <template v-if="item.formType === 'switch'">
        <div class="w-full text-right">
          <el-switch
            v-model="item.value"
            :active-value="item.trueValue"
            :disabled="item.disabled"
            :inactive-value="item.falseValue"
            @change="handleSwitchChange"
          />
        </div>
      </template>
      <template v-if="item.formType === 'slider'">
        <el-slider
          v-model="item.value"
          :max="item.max"
          :min="item.min"
          show-stops
          :step="item.step"
          @change="handleChange"
        />
      </template>
    </el-form-item>

    <el-dialog
      v-if="showCodeModal"
      v-model="showCodeModal"
      align-center
      append-to-body
      destroy-on-close
      draggable
      title="代码片段"
      width="1200px"
    >
      <VadCodeEditor v-model="methodCode" :user-worker="false" />
      <template #footer>
        <el-button type="primary" @click="handleCancelCode">取消</el-button>
        <el-button type="primary" @click="handleSaveCode">保存</el-button>
      </template>
    </el-dialog>
  </el-form>
</template>

<script setup lang="ts" name="VisualControlsRender">
import VadIntersection from '@/components/VadIntersection/index.vue'
import { VisualBoxOption } from '@/types/visual-box'

interface Props {
  options: VisualBoxOption[]
}

const emit = defineEmits<{
  (e: 'change'): void
}>()

const props = defineProps<Props>()

const handleChange = async () => {
  emit('change')
}

const handleSwitchChange = () => {
  emit('change')
}

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const showCodeModal = ref(false)
const methodCode = ref<string>('')
const currentOption = ref<VisualBoxOption>()
const handleShowCodeEditor = (item: VisualBoxOption) => {
  currentOption.value = item
  methodCode.value = item.value || ''
  showCodeModal.value = true
}
const handleCancelCode = () => {
  showCodeModal.value = false
  methodCode.value = ''
}
const handleSaveCode = () => {
  showCodeModal.value = false
  if (!currentOption.value) return
  currentOption.value.value = methodCode.value
  emit('change')
  console.log(currentOption.value)
}
</script>

<style scoped></style>
