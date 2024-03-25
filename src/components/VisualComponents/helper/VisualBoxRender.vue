<template>
  <VisualBox :template="props.template">
    <!-- 渲染组件 -->
    <template v-if="props.template.component">
      <component :is="props.template.component" v-bind="bindAttrs" :template="bindTemplate">
        <!-- 渲染子组件 -->
        <template v-if="props.template.children && props.template.children.length">
          <VisualBoxRender v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
        </template>
        <!-- 渲染内容 -->
        <template v-else-if="props.template.content">{{ props.template.content }}</template>
      </component>
    </template>
    <!-- 渲染子组件 -->
    <template v-else-if="props.template.children && props.template.children.length">
      <VisualBoxRender v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
    </template>
    <!-- 渲染内容 -->
    <template v-else-if="props.template.content">{{ props.template.content }}</template>
  </VisualBox>
</template>

<script lang="ts" setup name="VisualBoxRender">
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()

const templateType = computed(() => props.template.componentType)

const bindAttrs = computed(() => {
  return templateType.value === 'visual' ? undefined : props.template.props
})

const bindTemplate = computed(() => {
  return templateType.value === 'visual' ? props.template : undefined
})
</script>
