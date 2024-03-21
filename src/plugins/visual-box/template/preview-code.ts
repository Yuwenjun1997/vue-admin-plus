export function getPreviewTemplate(templateStr: string, styleSheet: string, methodStr: string, methodNames: string[]) {
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
      <div id="app">${templateStr}</div>
      <script>
        const App = {
          setup(){

            ${methodStr}

            return {
              ${methodNames.join(',')}
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
