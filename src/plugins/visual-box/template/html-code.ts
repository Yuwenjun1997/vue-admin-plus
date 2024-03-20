export function getHtmlTemplate(templateStr: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css">
    </head>

    <body>
      ${templateStr}
    </body>
  </html>
  `
}
