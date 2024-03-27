<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <!-- 组件渲染 -->
  <template v-if="props.template.component">
    <component
      v-bind="bindProps"
      :is="props.template.component"
      :class="classList"
      :data-visual-box-key="visualBoxKey"
      :style="wrapStyles"
      :template="bindTemplate"
    >
      <VisualBox2Content :template="props.template" />
    </component>
  </template>
  <!-- 无标签渲染 -->
  <template v-else-if="template.noWrapper">
    <VisualBox2Content :template="props.template" />
  </template>
  <!-- 默认方式渲染 -->
  <div v-else :class="classList" :data-visual-box-key="visualBoxKey" :style="wrapStyles">
    <VisualBox2Content :template="props.template" />
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

const visualBoxKey = computed(() => props.template.visualBoxKey)

const bindProps = computed(() => (templateType.value === 'visual' ? undefined : props.template.props))
const bindTemplate = computed(() => (templateType.value === 'visual' ? props.template : undefined))
</script>
