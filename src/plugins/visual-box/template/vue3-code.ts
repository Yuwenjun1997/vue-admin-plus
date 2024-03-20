export function getVue3Template(templateStr: string, styleSheet: string) {
  return `
  <template>
    ${templateStr || '<!-- empty template -->'}
  </template>

  <script lang="ts" setup>
    // TODO anything...
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
