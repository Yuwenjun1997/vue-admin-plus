<template>
  <component :is="renderLayout" :template="props.template">
    <template v-if="props.template.component">
      <component :is="props.template.component" v-bind="bindAttrs" :template="bindTemplate">
        <template v-if="props.template.children && props.template.children.length">
          <VisualBoxRender v-for="t in props.template.children" :key="t.key" :template="t" />
        </template>
        <template v-else-if="props.template.content">{{ props.template.content }}</template>
      </component>
    </template>
    <template v-else-if="props.template.children && props.template.children.length">
      <VisualBoxRender v-for="t in props.template.children" :key="t.key" :template="t" />
    </template>
    <template v-else-if="props.template.content">{{ props.template.content }}</template>
  </component>
</template>

<script lang="ts" setup name="VisualBoxRender">
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()

const templateType = computed(() => props.template.componentType)

const renderLayout = computed(() => {
  return props.template.isDragable ? 'VisualSortable' : 'VisualBox'
})

const bindAttrs = computed(() => {
  return templateType.value === 'visual' ? undefined : props.template.props
})

const bindTemplate = computed(() => {
  return templateType.value === 'visual' ? props.template : undefined
})
</script>
