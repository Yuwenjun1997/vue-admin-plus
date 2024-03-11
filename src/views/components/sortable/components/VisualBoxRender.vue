<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <VisualBox v-for="temp in templates" :key="temp.visualBoxKey" :template="temp">
    <VisualBoxRender v-if="temp.children" :templates="temp.children" />
  </VisualBox>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import VisualBox from './VisualBox.vue'
import { VisualBoxTemplate } from '@/types/visual-box'

export default defineComponent({
  name: 'VisualBoxRender',
  components: {
    VisualBox,
  },
  props: {
    templates: {
      type: Array as PropType<VisualBoxTemplate[]>,
      default: () => [],
    },
  },
  setup() {},
})
</script>

<style scoped></style>
