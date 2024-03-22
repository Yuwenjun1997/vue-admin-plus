import { VisualBoxBindPropOption } from '@/types/visual-box'
import { genPropValue } from '../code-generator'

export function getVue3Template(
  template: string,
  styleSheet: string,
  bindProps: VisualBoxBindPropOption[],
  bindMethodTokens: string[]
) {
  return `
  <template>
    ${template || '<!-- empty template -->'}
  </template>

  <script lang="ts" setup>
    ${bindProps.map((item) => `const ${item.bindPropName} = ref(${genPropValue(item)})`).join('\n')}
    ${bindMethodTokens.join('\n')}
    // TODO anything...
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
