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
  onEnd: (evt) => emit('onEnd', evt),
}

const emit = defineEmits<{
  (e: 'onEnd', event: Sortable.SortableEvent): void
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
