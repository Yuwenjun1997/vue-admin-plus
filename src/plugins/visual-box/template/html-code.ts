import { VisualBoxBindPropOption } from '@/types/visual-box'
import { genPropValue } from '../code-generator'

export function getHtmlTemplate(
  template: string,
  bindProps: VisualBoxBindPropOption[],
  bindMethodNames: string[],
  bindMethodTokens: string[]
) {
  const genReturnTokens = () => {
    const bindPropNames = bindProps.map((item) => item.bindPropName)
    return bindPropNames.concat(bindMethodNames).join(',')
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/vant@4/lib/index.css">
      <script src="//unpkg.com/vue@3"></script>
      <script src="https://fastly.jsdelivr.net/npm/vant@4/lib/vant.min.js"></script>
    </head>

    <body>
      <div id="app">${template}</div>

      <script>
        const App = {
          setup(){
            ${bindProps.map((item) => `const ${item.bindPropName} = Vue.ref(${genPropValue(item)});`).join('\n')}
            ${bindMethodTokens.join('\n')}
            return {
              ${genReturnTokens()}
            }
          }
        };
        const app = Vue.createApp(App);
        app.use(vant);
        app.use(vant.Lazyload);
        app.mount("#app");
      </script>
    </body>
  </html>
  `
}
