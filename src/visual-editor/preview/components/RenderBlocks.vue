<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <ComponentRender v-for="element in props.blocks" :key="element._vid" :element="element">
    <template v-for="(value, key) in element.slots" :key="key" #[key]>
      <RenderBlocks :blocks="value.children" />
    </template>
  </ComponentRender>
</template>

<script lang="ts" setup>
import ComponentRender from './ComponentRender'
import type { VisualEditorBlockData } from '@/visual-editor/types'

defineOptions({
  name: 'RenderBlocks',
})

interface Props {
  blocks: Array<VisualEditorBlockData>
}

const props = withDefaults(defineProps<Props>(), {
  blocks: () => [],
})
</script>

<style lang="scss" scoped></style>
