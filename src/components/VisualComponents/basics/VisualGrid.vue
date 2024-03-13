<template>
  <el-row
    v-if="props.template.children"
    :align="props.template.props?.align"
    :gutter="props.template.props?.gutter"
    :justify="props.template.props?.justify"
  >
    <VisualCol v-for="t in props.template.children" :key="t.visualBoxKey" :template="t" />
  </el-row>
</template>

<script setup lang="ts" name="VisualGrid">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { VisualBasic } from '@/types/visual-box'
import { v4 as uuidv4 } from 'uuid'

interface Options {
  columns: number
  gutter: number
  justify: 'space-around' | 'space-between' | 'space-evenly' | 'center' | 'end' | 'start' | undefined
  align: 'top' | 'bottom' | 'middle' | undefined
}

interface Props {
  template: VisualBasic<Options>
}

const props = defineProps<Props>()

const { getVisualBoxByKey, reFlatTemplates } = useVisualBoxStore()

const genVisualBox = (): VisualBasic => ({
  visualBoxKey: uuidv4(),
  isDraggable: false,
  isEditable: true,
  layoutStyle: {
    border: '1px dashed #ccc',
    outlineOffset: '-1px',
  },
  style: {
    minHeight: '36px',
  },
  props: {
    span: 6,
    offset: 0,
    push: 0,
    pull: 0,
  },
  propsOptions: [
    {
      groupName: '基本信息',
      formType: 'numberInput',
      target: 'props',
      label: '栅格大小',
      property: 'span',
    },
    {
      groupName: '基本信息',
      formType: 'numberInput',
      target: 'props',
      label: '左侧间隔格数',
      property: 'offset',
    },
    {
      groupName: '基本信息',
      formType: 'numberInput',
      target: 'props',
      label: '右移动格数',
      property: 'push',
    },
    {
      groupName: '基本信息',
      formType: 'numberInput',
      target: 'props',
      label: '左移动格数',
      property: 'pull',
    },
  ],
})

watchEffect(() => {
  const columns = props.template.props?.columns || 0
  if (columns) {
    const item = getVisualBoxByKey(props.template.visualBoxKey)
    if (!item) return
    if (!item.children) item.children = []
    item.children = item.children.slice(0, columns)
    const len = item.children.length
    if (len !== columns) {
      for (let i = 0; i < columns - len; i++) {
        item.children.push(genVisualBox())
      }
    }
    reFlatTemplates()
  }
})
</script>

<style scoped></style>
