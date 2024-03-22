import { VisualBoxBindProp } from '@/types/visual-box'

export function getVue3Template(
  template: string,
  styleSheet: string,
  bindProps: VisualBoxBindProp[],
  bindMethodTokens: string[]
) {
  return `
  <template>
    ${template || '<!-- empty template -->'}
  </template>

  <script lang="ts" setup>
    ${bindProps.map((item) => `const ${item.bindPropName} = ${item.defaultValue}`).join('\n')}
    ${bindMethodTokens.join('\n')}
    // TODO anything...
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
