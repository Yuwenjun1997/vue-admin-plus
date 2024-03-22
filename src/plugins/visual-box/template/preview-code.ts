import { VisualBoxBindPropOption } from '@/types/visual-box'
import { genPropValue } from '../code-generator'

export function getPreviewTemplate(
  template: string,
  styleSheet: string,
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
      <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css">
      <script src="//unpkg.com/vue@3"></script>
      <script src="//unpkg.com/element-plus"></script>
      <style>
        *{box-sizing: border-box;}
        body{margin: 0;}
      </style>
      <style>${styleSheet}</style>
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
        app.use(ElementPlus);
        app.mount("#app");
      </script>
    </body>
  </html>
  `
}
