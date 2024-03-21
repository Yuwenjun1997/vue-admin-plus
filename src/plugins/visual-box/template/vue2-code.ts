export function getVue2Template(templateStr: string, styleSheet: string, methodStr: string) {
  return `
  <template>
    <div>
    ${templateStr || '<!-- empty template -->'}
    </div>
  </template>

  <script>
    export default {
      props:{},

      data(){
        return {}
      },

      created(){
        console.log('created')
      },

      methods:{
        ${methodStr}
      }
    }
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
