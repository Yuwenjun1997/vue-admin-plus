<template>
  <div
    class="visual-box"
    :class="{ 'is-active': isActive, 'visual-box-disabled': isLocked }"
    :data-visual-box-key="props.template.key"
    :style="visualStyles"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts" name="VisualBox">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { VisualBasic } from '@/types/visual-box'
import { storeToRefs } from 'pinia'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()

const visualBoxStore = useVisualBoxStore()
const { activeVisualBox } = storeToRefs(visualBoxStore)
const { toggleActive } = visualBoxStore

const isActive = computed(() => {
  return activeVisualBox.value && props.template.key === activeVisualBox.value.key
})
const isLocked = computed(() => props.template.isLocked)

const visualStyles = computed(() => {
  return [props.template.layoutStyle, props.template.normalStyle, props.template.customStyle]
})

const handleClick = (event: MouseEvent) => {
  if (props.template.isEditable) event.stopPropagation()
  toggleActive(props.template)
}
</script>

<style scoped lang="scss">
.visual-box {
  $outline-width: 2px;
  $min-size: 10px;
  position: relative;
  user-select: none;
  cursor: pointer;
  min-height: $min-size;
  min-width: $min-size;
  cursor: move !important;

  * {
    cursor: move !important;
  }

  &.visual-box-drag {
    opacity: 0;
  }

  &.visual-box-ghost {
    height: 8px;
    min-height: 8px;
    overflow: hidden;
    outline: none !important;

    &::before {
      display: none;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background-color: var(--el-color-primary);
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px dotted var(--el-border-color);
    z-index: 10;
  }

  &.is-active {
    outline: $outline-width solid var(--el-color-primary);
    z-index: 10;
  }
}
</style>
