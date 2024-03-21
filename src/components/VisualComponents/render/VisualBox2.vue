<template>
  <div :class="classList" :style="wrapStyles">
    <!-- 渲染组件 -->
    <template v-if="props.template.component">
      <VisualElement v-if="templateType === 'element'" :template="props.template" />
      <component :is="props.template.component" v-else :template="props.template" />
    </template>
    <!-- 渲染子元素 -->
    <template v-else-if="props.template.children">
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

const templateType = computed(() => props.template.componentType)

const classList = computed(() => {
  const layoutClassList = props.template.layoutClassList || []
  const customClassList = props.template.customClassList || []
  return [...layoutClassList, ...customClassList]
})

const wrapStyles = computed(() => {
  return [props.template.style, props.template.layoutStyle, props.template.customStyle]
})
</script>
