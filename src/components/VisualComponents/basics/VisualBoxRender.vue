<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <VisualBox v-for="temp in templates" :key="temp.visualBoxKey" :template="temp">
    <component :is="temp.render.component" v-if="temp.render" />
    <VisualBoxRender v-if="temp.children" :templates="temp.children" />
  </VisualBox>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { VisualBoxTemplate } from '@/types/visual-box'

export default defineComponent({
  name: 'VisualBoxRender',
  props: {
    templates: {
      type: Array as PropType<VisualBoxTemplate[]>,
      default: () => [],
    },
  },
  setup() {},
})
</script>
