<template>
  <el-form class="p-2" label-position="left" label-width="100px" size="small">
    <el-form-item v-for="item in props.options" :key="item.property" :label="item.label" :required="item.required">
      <template v-if="item.formType === 'input'">
        <el-input v-model="item.value" :disabled="item.disabled" @blur="handleChange" />
      </template>
      <template v-if="item.formType === 'cssInput'">
        <VisualCssInput v-model="item.value" @change="handleChange" />
      </template>
      <template v-if="item.formType === 'textarea'">
        <el-input v-model="item.value" :disabled="item.disabled" type="textarea" @blur="handleChange" />
      </template>
      <template v-if="item.formType === 'colorPicker'">
        <el-color-picker v-model="item.value" :disabled="item.disabled" @change="handleChange" />
      </template>
      <template v-if="item.formType === 'select'">
        <el-select v-model="item.value" :disabled="item.disabled" @change="handleChange">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <template v-if="item.formType === 'numberInput'">
        <div class="w-full text-right">
          <el-input-number v-model.number="item.value" :disabled="item.disabled" @change="handleChange" />
        </div>
      </template>
      <template v-if="item.formType === 'switch'">
        <div class="w-full text-right">
          <el-switch v-model.number="item.value" :disabled="item.disabled" @change="handleChange" />
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="VisualControlsRender">
import { VisualBoxOption } from '@/types/visual-box'

interface Props {
  options: VisualBoxOption[]
}

const emit = defineEmits<{
  (e: 'change'): void
}>()

const props = defineProps<Props>()

const handleChange = () => {
  emit('change')
}
</script>

<style scoped></style>
