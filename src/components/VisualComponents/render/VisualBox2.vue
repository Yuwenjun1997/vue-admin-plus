<template>
  <div :class="classList" :style="wrapStyles">
    <template v-if="props.template.component">
      <component :is="props.template.component" :template="props.template" />
    </template>
    <template v-else-if="props.template.children && props.template.children.length">
      <VisualBox2 v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
    </template>
  </div>
</template>

<script lang="ts" setup name="VisualBox2">
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()

const classList = computed(() => {
  const layoutClassList = props.template.layoutClassList || []
  const customClassList = props.template.customClassList || []
  return [...layoutClassList, ...customClassList]
})

const wrapStyles = computed(() => {
  return [props.template.style, props.template.layoutStyle, props.template.customStyle]
})
</script>
