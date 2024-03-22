import { VisualBoxBindProp } from '@/types/visual-box'

export function getVue2Template(
  template: string,
  styleSheet: string,
  bindProps: VisualBoxBindProp[],
  bindMethodTokens: string[]
) {
  return `
  <template>
    <div>
    ${template || '<!-- empty template -->'}
    </div>
  </template>

  <script>
    export default {
      data(){
        return {
          ${bindProps.map((item) => `${item.bindPropName}:${item.defaultValue || '\'\''}`)}
        }
      },

      methods:{
        ${bindMethodTokens.join(',')}
      }
    }
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
