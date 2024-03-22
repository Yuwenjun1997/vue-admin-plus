<template>
  <div
    :key="props.template.visualBoxKey"
    class="visual-box"
    :class="{
      active: isActive,
      'visual-box-darggable': isDraggable,
      'visual-box-locked': isLocked,
      'visual-box-disabled': isDisabled,
      'is-root': isRoot,
    }"
    :data-visual-box-key="props.template.visualBoxKey"
    :style="props.template.layoutStyle"
    :title="props.template.visualBoxName"
    @click.stop="handleClick"
  >
    <div
      ref="visualBoxWrap"
      class="visual-box__wrap"
      :class="classList"
      :data-visual-box-key="props.template.visualBoxKey"
      :style="wrapStyles"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" name="VisualBox">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { VisualBasic } from '@/types/visual-box'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()

const visualBoxStore = useVisualBoxStore()
const { activeVisualBox } = storeToRefs(visualBoxStore)
const { toggleActive, moveVisualBox, start, done } = visualBoxStore

const isRoot = computed(() => props.template.isRoot)
const isActive = computed(() => {
  return activeVisualBox.value && props.template.visualBoxKey === activeVisualBox.value.visualBoxKey
})
const isDisabled = computed(() => props.template.disabled)
const isLocked = computed(() => props.template.isLocked)
const isDraggable = computed(() => !isRoot.value && !isLocked.value)

const disabled = computed(() => !!(isLocked.value || isDisabled.value))

const classList = computed(() => {
  const layoutClassList = props.template.layoutClassList || []
  const customClassList = props.template.customClassList || []
  return [...layoutClassList, ...customClassList, { 'visual-root-wrap': isRoot.value }]
})

const wrapStyles = computed(() => {
  return [props.template.style, props.template.customStyle]
})

const visualBoxWrap = ref<HTMLElement>()

const handleClick = () => {
  toggleActive(props.template)
}

const sortableInstance = ref<Sortable>()

watchEffect(() => {
  sortableInstance.value?.option('disabled', disabled.value)
})

onBeforeUnmount(() => {
  sortableInstance.value?.destroy()
})

onMounted(() => {
  if (!visualBoxWrap.value) return
  sortableInstance.value = new Sortable(visualBoxWrap.value, {
    group: 'shared',
    animation: 100,
    fallbackOnBody: true,
    disabled: disabled.value,
    draggable: '.visual-box-darggable',
    chosenClass: 'visual-box-chosen',
    ghostClass: 'visual-box-ghost',
    dragClass: 'visual-box-drag',

    onEnd: async (evt: Sortable.SortableEvent) => {
      start()
      const currentKey = evt.item.dataset.visualBoxKey || ''
      const fromKey = evt.from.dataset.visualBoxKey || ''
      const toKey = evt.to.dataset.visualBoxKey || ''
      const { oldIndex = 0, newIndex = 0 } = evt
      if (fromKey !== toKey) {
        nextTick(() => evt.item.remove())
      }
      moveVisualBox(currentKey, fromKey, toKey, oldIndex, newIndex)
      done()
    },
  })
})
</script>

<style scoped lang="scss">
.visual-box {
  $outline-width: 2px;
  $min-size: 10px;
  position: relative;
  user-select: none;
  cursor: pointer;

  &-darggable {
    cursor: move !important;

    * {
      cursor: move !important;
    }
  }

  &.is-root {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    cursor: default;

    & > .visual-box__wrap {
      flex: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    display: block;
    border: 1px dotted var(--el-border-color);
  }

  &.active {
    outline: $outline-width solid var(--el-color-primary);
    z-index: 10;
  }

  &.visual-box-ghost {
    width: 100%;
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

  &__wrap {
    position: relative;
    min-height: $min-size;
    min-width: $min-size;
  }
}
</style>
