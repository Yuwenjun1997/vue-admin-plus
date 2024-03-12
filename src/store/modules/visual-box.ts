import { VisualBoxComponents, VisualBoxTemplate } from '@/types/visual-box'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface VisualBoxState {
  visualBoxTemplates: VisualBoxTemplate[]
  flatVisualBoxTemplates: VisualBoxTemplate[] // 扁平化的模板数组
  visualBoxComponents: VisualBoxTemplate[]
  activeVisualBox: VisualBoxTemplate | null
}

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    flatVisualBoxTemplates: [],
    visualBoxTemplates: [],
    visualBoxComponents: [],
    activeVisualBox: null,
  }),

  actions: {
    // 初始化
    initVisualBox(templates: VisualBoxTemplate[]) {
      this.flatTemplatesHandler(templates)
      this.visualBoxTemplates = templates
    },

    // 锁定or解锁
    toggleLockVisualBox(template: VisualBoxTemplate) {
      template.isLocked = !template.isLocked
    },

    // 删除
    deleteVisualBox(template: VisualBoxTemplate) {
      const parentItem = this.flatVisualBoxTemplates.find((i) => i.children && i.children.includes(template))
      if (!parentItem) return
      parentItem.children = parentItem.children?.filter((i) => i.visualBoxKey !== template.visualBoxKey)
      this.flatTemplatesHandler(this.visualBoxTemplates)
    },

    // 上移
    moveVisualBoxUp(template: VisualBoxTemplate) {
      const parentItem = this.flatVisualBoxTemplates.find((i) => i.children && i.children.includes(template))
      if (!parentItem) return
      parentItem.children = parentItem.children || []
      const index = parentItem.children.indexOf(template)
      if (index === 0) {
        ElMessage.warning('当前元素已经在第一个位置了')
      } else {
        parentItem.children = parentItem.children.filter((i) => i !== template)
        parentItem.children.splice(index - 1, 0, template)
      }
    },

    // 下移
    moveVisualBoxDown(template: VisualBoxTemplate) {
      const parentItem = this.flatVisualBoxTemplates.find((i) => i.children && i.children.includes(template))
      if (!parentItem) return
      parentItem.children = parentItem.children || []
      const index = parentItem.children.indexOf(template)
      if (index === parentItem.children.length - 1) {
        ElMessage.warning('当前元素已经在最后一个位置了')
      } else {
        parentItem.children = parentItem.children.filter((i) => i !== template)
        parentItem.children.splice(index + 1, 0, template)
      }
    },

    // 移动
    moveVisualBox(currentKey: string, fromKey: string, toKey: string, fromIndex: number, toIndex: number) {
      const moveItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === currentKey)
      const fromItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === fromKey)
      const toItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === toKey)
      if (!moveItem || !fromItem || !toItem) return
      fromItem.children = fromItem.children || []
      toItem.children = toItem.children || []
      fromItem.children.splice(fromIndex, 1)
      toItem.children.splice(toIndex, 0, moveItem)
    },

    // 扁平化
    flatTemplatesHandler(templates?: VisualBoxTemplate[]) {
      if (!templates) return
      templates.forEach((template) => {
        this.flatVisualBoxTemplates.push(template)
        this.flatTemplatesHandler(template.children)
      })
    },

    // 选中
    toggleActive(template: VisualBoxTemplate) {
      this.flatVisualBoxTemplates.forEach((t) => (t.isActive = false))
      template.isActive = true
      const current = cloneDeep(template)
      delete current.children
      this.refreshOptons(current)
      this.activeVisualBox = current
      console.log(current)
    },

    // 初始化组件配置信息
    refreshOptons(template: VisualBoxTemplate) {
      template.propOptions?.forEach((i) => (i.value = template.props[i.property]))
      template.options?.forEach((item) => {
        if (item.target === 'normal') {
          item.options.forEach((i) => {
            i.value = template[i.property as keyof VisualBoxTemplate]
          })
        } else if (item.target === 'style') {
          item.options.forEach((i) => {
            i.value = template.style && template.style[i.property]
          })
        }
      })
    },

    // 初始化组件列表
    initVisualComponents(components: VisualBoxComponents[]) {
      components.forEach((item) => {
        this.visualBoxComponents.push(...item.components)
      })
    },

    // 添加
    addVisualBox(currentKey: string, toKey: string, toIndex: number) {
      console.log(currentKey, toKey, toIndex)
      const moveItem = this.visualBoxComponents.find((i) => i.visualBoxKey === currentKey)
      const toItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === toKey)
      if (!moveItem || !toItem) return
      const addItem = cloneDeep(moveItem)
      addItem.visualBoxKey = uuidv4()
      toItem.children = toItem.children || []
      toItem.children.splice(toIndex, 0, addItem)
      this.flatTemplatesHandler(this.visualBoxTemplates)
      console.log(this.visualBoxTemplates)
    },

    // 更新propOptions
    updateVisualBoxProps(template: VisualBoxTemplate) {
      const current = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === template.visualBoxKey)
      if (!current) return
      current.propOptions = template.propOptions || []
      current.propOptions.forEach((item) => {
        current.props = Object.assign(current.props || {}, { [item.property]: item.value })
      })
    },

    // 更新基本信息
    updateVisualBoxOption(template: VisualBoxTemplate) {
      const current = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === template.visualBoxKey)
      if (!current) return
      current.options = template.options || []
      current.options.forEach((item) => {
        if (item.target === 'normal') {
          item.options.forEach((i) => {
            Object.assign(current, { [i.property]: i.value })
          })
        } else if (item.target === 'style') {
          item.options.forEach((i) => {
            current.style = Object.assign(current.style || {}, { [i.property]: i.value })
          })
        }
      })
    },
  },
})
