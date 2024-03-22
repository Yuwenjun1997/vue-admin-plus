import { VisualBoxBindPropOption } from '@/types/visual-box'
import { genPropValue } from '../code-generator'

export function getVue2Template(
  template: string,
  styleSheet: string,
  bindProps: VisualBoxBindPropOption[],
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
          ${bindProps.map((item) => `${item.bindPropName}:${genPropValue(item) || '\'\''}`)}
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
