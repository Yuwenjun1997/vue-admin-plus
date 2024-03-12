<template>
  <el-form class="p-2" label-position="left" label-width="100px" size="small">
    <el-form-item v-for="item in props.options" :key="item.property" :label="item.label">
      <template v-if="item.formControlType === 'input'">
        <el-input v-model="item.value" :disabled="item.disabled" @blur="handleChange" />
      </template>
      <template v-if="item.formControlType === 'textarea'">
        <el-input v-model="item.value" :disabled="item.disabled" type="textarea" @blur="handleChange" />
      </template>
      <template v-if="item.formControlType === 'colorPicker'">
        <el-color-picker v-model="item.value" :disabled="item.disabled" @change="handleChange" />
      </template>
      <template v-if="item.formControlType === 'select'">
        <el-select v-model="item.value" :disabled="item.disabled" @change="handleChange">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
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
