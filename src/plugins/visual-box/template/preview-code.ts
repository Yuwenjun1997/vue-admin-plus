export function getPreviewTemplate(templateStr: string, styleSheet: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css">
      <style>
        *{box-sizing: border-box;}
        body{margin: 0;}
      </style>
      <style>${styleSheet}</style>
    </head>

    <body>
      ${templateStr}
    </body>
  </html>
  `
}
