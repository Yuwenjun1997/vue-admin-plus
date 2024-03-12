<template>
  <div
    :key="props.template.visualBoxKey"
    class="visual-box"
    :class="layoutClassList"
    :data-visual-box-key="props.template.visualBoxKey"
    :style="props.template.layoutStyle"
    @click="handleClick"
  >
    <div
      ref="visualBoxWrap"
      class="visual-box__wrap"
      :class="props.template.classList"
      :data-visual-box-key="props.template.visualBoxKey"
      :style="props.template.style"
    >
      <slot />
    </div>
    <div v-if="isActive && showTools && !isRoot" class="visual-box__tools" @click.stop>
      <template v-if="!isLocked">
        <template v-if="isDraggable">
          <Icon class="visual-box__tools--control move" icon="bi:arrows-move" />
        </template>
        <template v-if="isDeletable">
          <Icon class="visual-box__tools--control" icon="ep:delete" @click="handleDelete" />
        </template>
        <Icon class="visual-box__tools--control" icon="line-md:arrow-up" @click="moveVisualBoxUp(props.template)" />
        <Icon class="visual-box__tools--control" icon="line-md:arrow-down" @click="moveVisualBoxDown(props.template)" />
      </template>
      <Icon
        class="visual-box__tools--control"
        :icon="!isLocked ? 'ep:unlock' : 'ep:lock'"
        @click="toggleLockVisualBox(props.template)"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="VisualBox">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { VisualBoxTemplate } from '@/types/visual-box'
import { Icon } from '@iconify/vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Sortable from 'sortablejs'

interface Props {
  template: VisualBoxTemplate
}

const props = defineProps<Props>()

const { toggleActive, moveVisualBox, moveVisualBoxUp, moveVisualBoxDown, deleteVisualBox, toggleLockVisualBox } =
  useVisualBoxStore()

const isRoot = computed(() => props.template.isRoot)
const isActive = computed(() => props.template.isActive)
const isDraggable = computed(() => props.template.isDraggable)
const isDeletable = computed(() => props.template.isDeletable)
const showTools = computed(() => props.template.showTools)
const isDisabled = computed(() => props.template.disabled)
const isEditable = computed(() => props.template.isEditable)
const isLocked = computed(() => props.template.isLocked)

const layoutClassList = computed(() => {
  const classList = props.template.layoutClassList || []
  return [{ active: isActive.value }, ...classList]
})

const visualBoxWrap = ref<HTMLElement>()

const handleClick = (evt: MouseEvent) => {
  if (isEditable.value) evt.stopPropagation()
  toggleActive(props.template)
}

const handleDelete = () => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteVisualBox(props.template)
      ElMessage({
        type: 'success',
        message: '删除成功!',
      })
    })
    .catch(() => {})
}

onMounted(() => {
  if (!visualBoxWrap.value) return
  new Sortable(visualBoxWrap.value, {
    group: 'shared',
    animation: 100,
    handle: '.visual-box__tools--control.move',
    fallbackOnBody: true,
    disabled: isDisabled.value,
    draggable: '.visual-box',
    chosenClass: 'visual-box-chosen',
    ghostClass: 'visual-box-ghost',

    onEnd: (evt: Sortable.SortableEvent) => {
      nextTick(() => evt.item.remove())
      const currentKey = evt.item.dataset.visualBoxKey || ''
      const fromKey = evt.from.dataset.visualBoxKey || ''
      const toKey = evt.to.dataset.visualBoxKey || ''
      const { oldIndex = 0, newIndex = 0 } = evt
      moveVisualBox(currentKey, fromKey, toKey, oldIndex, newIndex)
    },
  })
})
</script>

<style scoped lang="scss">
.visual-box {
  $outline-width: 2px;
  $min-height: 20px;
  position: relative;
  cursor: pointer;
  user-select: none;

  &.visual-box-ghost {
    width: 100%;
    height: 8px;
    overflow: hidden;
    outline: none !important;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      background-color: var(--el-color-primary);
    }
  }

  &.active {
    outline: $outline-width solid var(--el-color-primary);
    z-index: 10;
  }

  &__wrap {
    position: relative;
    min-height: $min-height;
  }

  &__tools {
    position: absolute;
    top: 0;
    // left: -$outline-width;
    left: 0;
    // transform: translateY(calc(-100% - #{$outline-width}));
    // background-color: var(--el-bg-color);
    background-color: var(--el-color-primary);
    // border: 1px solid var(--el-border-color-light);
    border-bottom: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    height: $min-height;
    padding: 0 6px;

    &--control {
      cursor: pointer;
      transition: var(--el-transition-all);

      &.move {
        cursor: move;
      }

      color: var(--el-color-white);

      // &:hover {
      //   color: var(--el-color-primary);
      // }
    }
  }
}
</style>
