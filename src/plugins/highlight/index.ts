import 'highlight.js/styles/github-dark-dimmed.min.css'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)

import { App } from 'vue'

export function setupHighlight(app: App) {
  app.use(hljsVuePlugin)
}
