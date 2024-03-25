<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <!-- 渲染组件 -->
  <template v-if="props.template.component">
    <component
      :is="props.template.component"
      :class="classList"
      :data-visual-box-key="visualBoxKey"
      :style="wrapStyles"
      :template="templateType === 'visual' ? props.template : undefined"
      v-bind="templateType === 'visual' ? undefined : props.template.props"
    >
      <template v-if="props.template.children">
        <VisualBox2 v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
      </template>
      <template v-else-if="props.template.content">
        <template v-if="isBindContentProp">{{ bindPropStr }}</template>
        <template v-else>{{ props.template.content }}</template>
      </template>
    </component>
  </template>
  <!-- 渲染子元素 -->
  <div v-else-if="props.template.children" :class="classList" :data-visual-box-key="visualBoxKey" :style="wrapStyles">
    <VisualBox2 v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
  </div>
  <!-- 渲染内容 -->
  <div v-else :class="classList" :data-visual-box-key="visualBoxKey" :style="wrapStyles">
    <template v-if="props.template.content">
      <template v-if="isBindContentProp">{{ bindPropStr }}</template>
      <template v-else>{{ props.template.content }}</template>
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

const visualBoxKey = computed(() => props.template.visualBoxKey)

const isBindContentProp = computed(() => {
  if (!props.template.bindPropMap) return false
  return Object.keys(props.template.bindPropMap).some((key) => key === 'content')
})

const bindPropStr = computed(() => {
  return `{{${props.template.bindPropMap?.content}}}`
})
</script>
