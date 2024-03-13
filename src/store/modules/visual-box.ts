import { basicOptions } from '@/data/visual.data'
import { VisualBoxComponents, VisualBasic, VisualBoxTarget } from '@/types/visual-box'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface VisualBoxState {
  visualBoxTemplates: VisualBasic[]
  flatVisualBoxTemplates: VisualBasic[] // 扁平化的模板数组
  visualBoxComponents: VisualBasic[]
  activeVisualBox: VisualBoxTarget | null
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
    initVisualBox(templates: VisualBasic[]) {
      this.flatTemplatesHandler(templates)
      this.visualBoxTemplates = templates
    },

    // 锁定or解锁
    toggleLockVisualBox(template: VisualBasic) {
      template.isLocked = !template.isLocked
    },

    // 删除
    deleteVisualBox(template: VisualBasic) {
      const parentItem = this.flatVisualBoxTemplates.find((i) => i.children && i.children.includes(template))
      if (!parentItem) return
      parentItem.children = parentItem.children?.filter((i) => i.visualBoxKey !== template.visualBoxKey)
      this.flatTemplatesHandler(this.visualBoxTemplates)
    },

    // 上移
    moveVisualBoxUp(template: VisualBasic) {
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
    moveVisualBoxDown(template: VisualBasic) {
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
    flatTemplatesHandler(templates?: VisualBasic[]) {
      if (!templates) return
      templates.forEach((template) => {
        this.flatVisualBoxTemplates.push(template)
        this.flatTemplatesHandler(template.children)
      })
    },

    // 重新刷新列表
    reFlatTemplates() {
      this.flatVisualBoxTemplates = []
      this.flatTemplatesHandler(this.visualBoxTemplates)
    },

    // 选中
    toggleActive(template: VisualBasic) {
      this.flatVisualBoxTemplates.forEach((t) => (t.isActive = false))
      template.isActive = true
      this.activeVisualBox = new VisualBoxTarget(template, basicOptions)
      // this.activeVisualBox.initOptions()
      // this.activeVisualBox.initPropsOptions()
    },

    // 初始化组件列表
    initVisualComponents(components: VisualBoxComponents[]) {
      components.forEach((item) => {
        this.visualBoxComponents.push(...item.components)
      })
    },

    // 添加
    addVisualBox(currentKey: string, toKey: string, toIndex: number) {
      const moveItem = this.visualBoxComponents.find((i) => i.visualBoxKey === currentKey)
      const toItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === toKey)
      if (!moveItem || !toItem) return
      const addItem = cloneDeep(moveItem)
      addItem.visualBoxKey = uuidv4()
      toItem.children = toItem.children || []
      toItem.children.splice(toIndex, 0, addItem)
      this.flatTemplatesHandler(this.visualBoxTemplates)
      this.toggleActive(addItem)
    },

    // 更新propOptions
    updateVisualBoxProps() {
      if (!this.activeVisualBox) return
      this.activeVisualBox.applyPropsOptions()
    },

    // 更新基本信息
    updateVisualBoxOption() {
      if (!this.activeVisualBox) return
      this.activeVisualBox.applyOptions()
    },

    // 根据key获取组件
    getVisualBoxByKey(key: string) {
      return this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === key)
    },
  },
})
