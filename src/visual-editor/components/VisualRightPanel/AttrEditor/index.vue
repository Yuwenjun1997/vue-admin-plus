<template>
  <el-form size="small">
    <el-form-item v-for="(option, key) in props.options" :key="key" :label="option.label">
      <template v-if="option.type === VisualEditorPropsType.input">
        <el-input v-model="option.defaultValue" clearable @blur="triggerHandler" />
      </template>
      <template v-if="option.type === VisualEditorPropsType.inputNumber">
        <el-input-number
          v-model="option.defaultValue"
          clearable
          :max="option.max"
          :min="option.min"
          @change="triggerHandler"
        />
      </template>
      <template v-if="option.type === VisualEditorPropsType.switch">
        <el-switch v-model="option.defaultValue" @change="triggerHandler" />
      </template>
      <template v-if="option.type === VisualEditorPropsType.select">
        <el-select v-model="option.defaultValue" clearable @change="triggerHandler">
          <el-option v-for="(item, i) in option.options" :key="i" :label="item.label" :value="item.value" />
        </el-select>
      </template>
      <template v-if="option.type === VisualEditorPropsType.color">
        <el-color-picker v-model="option.defaultValue" @change="triggerHandler" />
      </template>
      <template v-if="option.type === VisualEditorPropsType.cssInput">
        <VisualCssInput v-model="option.defaultValue" @change="triggerHandler" />
      </template>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="AttrEditor">
import VisualCssInput from './components/VisualCssInput.vue'
import { VisualEditorProps, VisualEditorPropsType } from '@/visual-editor/types'

interface Props {
  options?: Record<string, VisualEditorProps> | null
  triggerHandler?: (e: any) => void
}

const props = defineProps<Props>()
</script>

<style scoped></style>
