<template>
  <VisualBox :template="props.template">
    <template v-if="props.template.content">{{ props.template.content }}</template>
    <template v-else-if="props.template.component">
      <template v-if="props.template.componentType === 'element'">
        <component :is="props.template.component" v-bind="props.template.props">
          <template v-if="props.template.children && props.template.children.length">
            <VisualBoxRender v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
          </template>
        </component>
      </template>
      <component :is="props.template.component" v-else :template="props.template" />
    </template>
    <template v-else-if="props.template.children && props.template.children.length">
      <VisualBoxRender v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
    </template>
  </VisualBox>
</template>

<script lang="ts" setup name="VisualBoxRender">
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()
</script>
