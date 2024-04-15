<template>
  <div class="VisualCssPxInput">
    <el-input v-model.number="inputValue" clearable type="number" @blur="handleInputBlur" />
    <el-select v-model="unit" style="width: 80px" @change="handleUnitChange">
      <el-option label="px" value="px" />
      <el-option label="vw" value="vw" />
      <el-option label="vh" value="vh" />
      <el-option label="em" value="em" />
      <el-option label="rem" value="rem" />
      <el-option label="%" value="%" />
    </el-select>
    <el-popover placement="top-end" trigger="click" :width="200">
      <el-slider v-model.number="sliderValue" :max="100" @change="handleSliderChange" />
      <template #reference>
        <el-button text>
          <Icon icon="line-md:chevron-down" />
        </el-button>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts" name="VisualCssInput">
import { useExtractValueAndUnit } from '@/visual-editor/hooks/useExtractValueAndUnit'
import { Icon } from '@iconify/vue'

interface Props {
  modelValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const unit = ref<string>('px')
const sliderValue = ref<number>(0)
const inputValue = ref<number | string>()

const spliceValue = computed(() => {
  if (inputValue.value === '') return ''
  return inputValue.value ? `${inputValue.value}${unit.value}` : ''
})

const handleSliderChange = () => {
  inputValue.value = sliderValue.value
  emit('update:modelValue', spliceValue.value)
  emit('change', spliceValue.value)
}

const handleInputBlur = () => {
  sliderValue.value = Number(inputValue.value) || 0
  emit('update:modelValue', spliceValue.value)
  emit('change', spliceValue.value)
}

const handleUnitChange = () => {
  emit('update:modelValue', spliceValue.value)
  emit('change', spliceValue.value)
}

watchEffect(() => {
  if (props.modelValue) {
    const result = useExtractValueAndUnit(props.modelValue)
    if (!result) return
    inputValue.value = sliderValue.value = Number(result[0])
    unit.value = (result[1] as string).toLowerCase()
  } else {
    inputValue.value = undefined
    unit.value = 'px'
    sliderValue.value = 0
  }
})
</script>

<style scoped lang="scss">
.VisualCssPxInput {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  &:hover {
    border-color: var(--el-color-primary);
  }

  :deep(.el-input) {
    .el-input__wrapper {
      box-shadow: unset;
      border-radius: 0;
      background-color: transparent;
    }
  }

  :deep(.el-select) {
    .el-select__wrapper {
      box-shadow: unset;
      border-left: 1px solid var(--el-border-color);
      border-right: 1px solid var(--el-border-color);
      border-radius: 0;
    }

    .el-select__suffix {
      display: none;
    }

    .el-select__placeholder {
      text-align: center;
    }
  }
}
</style>
