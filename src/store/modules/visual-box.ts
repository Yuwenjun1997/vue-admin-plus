import { VisualBoxTemplate } from '@/types/visual-box'
import { defineStore } from 'pinia'

interface VisualBoxState {
  visualBoxTemplates: VisualBoxTemplate[]
  flatVisualBoxTemplates: VisualBoxTemplate[] // 扁平化的模板数组
}

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    flatVisualBoxTemplates: [],
    visualBoxTemplates: [],
  }),

  actions: {
    initVisualBox(templates: VisualBoxTemplate[]) {
      this.flatTemplatesHandler(templates)
      this.visualBoxTemplates = templates
    },

    flatTemplatesHandler(templates?: VisualBoxTemplate[]) {
      if (!templates) return
      templates.forEach((template) => {
        this.flatVisualBoxTemplates.push(template)
        this.flatTemplatesHandler(template.children)
      })
    },

    toggleActive(template: VisualBoxTemplate) {
      const oldStatus = template.isActive
      this.flatVisualBoxTemplates.forEach((t) => (t.isActive = false))
      template.isActive = !oldStatus
    },
  },
})
