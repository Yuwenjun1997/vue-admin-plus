export function getVue3Template(templateStr: string, styleSheet: string, methodStr: string) {
  return `
  <template>
    ${templateStr || '<!-- empty template -->'}
  </template>

  <script lang="ts" setup>
    // TODO anything...
    ${methodStr}
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
