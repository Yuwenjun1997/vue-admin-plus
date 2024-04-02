<template>
  <div ref="sortable">
    <slot />
  </div>
</template>

<script setup lang="ts" name="SortableBox">
import Sortable from 'sortablejs'

interface Props {
  options?: Sortable.Options
}

const defaultOptions: Sortable.Options = {
  group: 'visualGroup',
  animation: 0,
  onChoose: (evt) => emit('onChoose', evt),
  onUnchoose: (evt) => emit('onUnchoose', evt),
  onStart: (evt) => emit('onStart', evt),
  onEnd: (evt) => emit('onEnd', evt),
  onAdd: (evt) => emit('onAdd', evt),
  onUpdate: (evt) => emit('onUpdate', evt),
  onSort: (evt) => emit('onSort', evt),
  onRemove: (evt) => emit('onRemove', evt),
  onFilter: (evt) => emit('onFilter', evt),
  onMove: (evt, originalEvent) => emit('onMove', evt, originalEvent),
  onClone: (evt) => emit('onClone', evt),
  onChange: (evt) => emit('onChange', evt),
}

const emit = defineEmits<{
  (e: 'onChoose', event: Sortable.SortableEvent): void
  (e: 'onUnchoose', event: Sortable.SortableEvent): void
  (e: 'onStart', event: Sortable.SortableEvent): void
  (e: 'onEnd', event: Sortable.SortableEvent): void
  (e: 'onAdd', event: Sortable.SortableEvent): void
  (e: 'onUpdate', event: Sortable.SortableEvent): void
  (e: 'onSort', event: Sortable.SortableEvent): void
  (e: 'onRemove', event: Sortable.SortableEvent): void
  (e: 'onFilter', event: Sortable.SortableEvent): void
  (e: 'onMove', event: Sortable.MoveEvent, originEvent: Event): void
  (e: 'onClone', event: Sortable.SortableEvent): void
  (e: 'onChange', event: Sortable.SortableEvent): void
}>()

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
})

const sortable = ref<HTMLElement>()
const sortableInstance = ref<Sortable>()

watchEffect(() => {
  sortableInstance.value?.option('disabled', props.options.disabled)
})

onMounted(() => {
  if (!sortable.value) return
  sortableInstance.value = new Sortable(sortable.value, Object.assign(defaultOptions, props.options))
})

onBeforeUnmount(() => {
  sortableInstance.value?.destroy()
})
</script>

<style lang="scss" scoped>
.visual-box-darggable {
  cursor: move !important;

  * {
    cursor: move !important;
  }
}

.visual-box-drag {
  opacity: 0;
}

.visual-box-ghost {
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
</style>
