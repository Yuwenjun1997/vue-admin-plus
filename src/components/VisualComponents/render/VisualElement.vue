<template>
  <component :is="props.template.component" v-bind="props.template.props">
    <slot />
    <template v-if="props.template.children">
      <VisualBox2 v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
    </template>
  </component>
</template>

<script setup lang="ts" name="VisualElement">
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic
}

const props = defineProps<Props>()
</script>

<style scoped></style>
