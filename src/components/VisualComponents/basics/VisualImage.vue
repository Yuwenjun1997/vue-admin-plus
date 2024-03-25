<template>
  <div>
    <img :src="props.template.props?.src" :style="styles" />
  </div>
</template>

<script setup lang="ts">
import { VisualImageProps } from '@/data/visual/components/visual-image'
import { VisualBasic } from '@/types/visual-box'

interface Props {
  template: VisualBasic<VisualImageProps>
}

const props = defineProps<Props>()

const styles = computed(() => {
  return {
    width: '100%',
    height: '100%',
    objectFit: props.template.props?.fit,
  }
})
</script>

<style scoped></style>
