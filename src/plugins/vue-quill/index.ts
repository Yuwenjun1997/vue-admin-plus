import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { App } from 'vue'

export function setupVueQuill(app: App) {
  app.component('QuillEditor', QuillEditor)
}
