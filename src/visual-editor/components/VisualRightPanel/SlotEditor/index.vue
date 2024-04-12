<template>
  <div>
    <div v-for="(option, index) in props.options" :key="index">
      <AttrEditor :options="option" @on-change="triggerHandler" />
    </div>
  </div>
</template>

<script setup lang="ts" name="SlotEditor">
import AttrEditor from '../AttrEditor/index.vue'
import { VisualBlockSlot } from '@/visual-editor/types'

interface Props {
  options?: VisualBlockSlot[]
  triggerHandler?: (e: any) => void
}

const props = defineProps<Props>()
</script>

<style scoped></style>
