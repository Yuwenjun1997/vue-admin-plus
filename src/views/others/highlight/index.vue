<!-- eslint-disable vue/no-v-html -->
<template>
  <hljsVuePlugin :code="code" language="ts" />
</template>

<script setup lang="ts">
import hljsVuePlugin from '@highlightjs/vue-plugin'

const code = `
export const BORDER_WIDTH_VALUES = {
  ALL: 'var(--visual-border-width,0px)',
  ONLY_TOP: 'var(--visual-border-width,0px) 0 0',
  ONLY_BOTTOM: '0 0 var(--visual-border-width,0px)',
  ONLY_LEFT: '0 0 0 var(--visual-border-width,0px)',
  ONLY_RIGHT: '0 var(--visual-border-width,0px) 0 0',
  TOP_AND_BOTTOM: 'var(--visual-border-width,0px) 0',
  LEFT_AND_RIGHT: '0 var(--visual-border-width,0px) 0',
  TOP_AND_LEFT: 'var(--visual-border-width,0px) 0 0 var(--visual-border-width,0px)',
  TOP_AND_RIGHT: 'var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  BOTTOM_AND_LEFT: '0 0 var(--visual-border-width,0px) var(--visual-border-width,0px)',
  BOTTOM_AND_RIGHT: '0 var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  NOT_TOP: '0 var(--visual-border-width,0px) var(--visual-border-width,0px)',
  NOT_BOTTOM: 'var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  NOT_LEFT: 'var(--visual-border-width,0px) var(--visual-border-width,0px) var(--visual-border-width,0px) 0',
  NOT_RIGHT: 'var(--visual-border-width,0px) 0 var(--visual-border-width,0px) var(--visual-border-width,0px)',
}

export const BOX_SHADOW_VALUE =
  'var(--visual-box-shadow-inset,) var(--visual-box-shadow-x,0px) var(--visual-box-shadow-y,0px) var(--visual-box-shadow-offset,0px) var(--visual-box-shadow-color,rgba(0,0,0,.1))'

export const TEXT_SHADOW_VALUE =
  'var(--visual-text-shadow-x,0px) var(--visual-text-shadow-y,0px) var(--visual-text-shadow-offset,0px) var(--visual-text-shadow-color,rgba(0,0,0,.1))'
`
</script>

<style scoped></style>
