<template>
  <el-popover ref="popoverRef" :trigger="props.trigger" :width="props.width">
    <template #reference>
      <slot>
        <el-button>
          <template #icon>
            <Icon :icon="props.modelValue" />
          </template>
          <slot>
            <span class="mr-1">图标选择器</span>
            <Icon icon="ep:arrow-down" />
          </slot>
        </el-button>
      </slot>
    </template>

    <div>
      <div class="flex items-center gap-2">
        <span class="whitespace-nowrap">图标名称</span>
        <el-input v-model="keyword" />
        <el-button type="primary" @click="onSearch()">
          <template #icon>
            <Icon icon="line-md:search-twotone" />
          </template>
          <span>搜索</span>
        </el-button>
      </div>

      <div class="grid gap-2 grid-cols-5 mt-4">
        <div v-for="icon in icons" :key="icon" class="text-center cursor-pointer">
          <div class="flex flex-col items-center justify-center py-3 border" @click="handleClick(icon)">
            <Icon class="text-xl" :icon="icon" />
          </div>
        </div>
      </div>

      <div class="flex items-start justify-center mt-4">
        <el-pagination
          background
          layout="total,prev,next"
          :page-size="pageSize"
          :total="iconTotal"
          @current-change="onCurrentChange"
        />
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts" name="VadIconPicker">
import { Icon } from '@iconify/vue'
import { useIconList } from '@/hooks/useIconList'
import { PopoverInstance } from 'element-plus'

interface Props {
  modelValue: string
  trigger: 'hover' | 'click'
  width: number | string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'ep:add-location',
  trigger: 'click',
  width: 360,
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const popoverRef = ref<PopoverInstance>()

const iconListUtils = useIconList({ pageSize: 25 })
const { pageSize, iconTotal, icons, keyword } = iconListUtils
const { onCurrentChange, onSearch } = iconListUtils

const handleClick = (icon: string) => {
  emit('update:modelValue', icon)
  popoverRef.value?.hide()
}
</script>

<style scoped></style>
