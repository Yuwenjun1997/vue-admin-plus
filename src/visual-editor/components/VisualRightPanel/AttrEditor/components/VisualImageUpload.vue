<template>
  <div class="w-full">
    <el-input v-model="value" clearable @blur="handleInputBlur">
      <template #append>
        <div class="flex items-center justify-center cursor-pointer" @click="handleChooseImage">
          <span class="mr-1">上传</span>
          <Icon icon="line-md:cloud-upload-loop" />
        </div>
      </template>
    </el-input>
    <input v-show="false" ref="fileInput" accept=".png,.jpg,.gif" type="file" @change="handleChange" />
  </div>
</template>

<script setup lang="ts" name="VisualImageUpload">
import { Icon } from '@iconify/vue'
import { useVModel } from '@vueuse/core'

interface Props {
  modelValue: string
}

const fileInput = ref<HTMLInputElement>()

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const value = useVModel(props, 'modelValue', emit)

const currentFile = ref<File>()

const handleChooseImage = () => {
  fileInput.value?.click()
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    currentFile.value = target.files[0]
  }
  value.value && URL.revokeObjectURL(value.value)
  target.value = ''
  handleUpload()
}

const handleUpload = () => {
  if (!currentFile.value) return
  value.value = URL.createObjectURL(currentFile.value)
  const formData = new FormData()
  formData.append('file', currentFile.value)
  // TODO 文件上传
  // uploadFile(formData).then((res) => {
  //   value.value = res.data.url
  // })
  emit('change', value.value)
}

const handleInputBlur = () => {
  emit('change', value.value)
}
</script>

<style scoped></style>
