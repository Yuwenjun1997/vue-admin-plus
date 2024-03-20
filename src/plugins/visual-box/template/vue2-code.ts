export function getVue2Template(templateStr: string, styleSheet: string) {
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

      methods:{}
    }
  </script>

  <style scoped>
    ${styleSheet}
  </style>
  `
}
