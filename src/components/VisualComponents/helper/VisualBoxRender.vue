<template>
  <VisualBox :template="props.template">
    <template v-if="props.template.component">
      <component :is="props.template.component" :template="props.template" />
    </template>
    <template v-else-if="props.template.children">
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
