<template>
  <div :class="clsObj">
    <VadRefresh />
    <VadFullscreen />
    <VadNotice />
    <VadTheme />
    <VadToggleDark />
  </div>
</template>

<script setup lang="ts" name="VadTools">
import VadFullscreen from '../VadFullscreen/index.vue'
import VadNotice from '../VadNotice/index.vue'
import VadRefresh from '../VadRefresh/index.vue'
import VadTheme from '../VadTheme/index.vue'
import VadToggleDark from '../VadToggleDark/index.vue'
import { prefixCls } from '@/layout/config/index'

interface Props {
  align: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
})

const clsObj = computed(() => {
  return {
    [prefixCls + 'tools']: true,
    [`${prefixCls}tools__${props.align}`]: true,
  }
})
</script>
