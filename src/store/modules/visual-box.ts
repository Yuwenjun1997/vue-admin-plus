import { basicOptions, templates, visualComponentGroups } from '@/data/visual.data'
import { VisualBoxTarget } from '@/helper/visual.helper'
import { VisualBoxGroup, VisualBasic } from '@/types/visual-box'
import { sleep } from '@/utils'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface VisualBoxState {
  isLoading: boolean
  device: string
  isFullscreen: boolean
  visualBoxTemplates: VisualBasic[]
  flatVisualBoxTemplates: VisualBasic[]
  visualBoxComponents: VisualBasic[]
  activeVisualBox: VisualBoxTarget | null
}

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    isLoading: false,
    device: 'pc',
    isFullscreen: false,
    visualBoxTemplates: [],
    flatVisualBoxTemplates: [],
    visualBoxComponents: [],
    activeVisualBox: null,
  }),

  actions: {
    start() {
      this.isLoading = true
    },

    done() {
      sleep(300).then(() => (this.isLoading = false))
    },

    // 初始化
    setup() {
      this.initVisualComponents(visualComponentGroups)
      this.initVisualBoxTemplates(templates)
    },

    setDevice(name: string) {
      this.device = name
    },

    // 重新刷新列表
    initVisualBoxTemplates(source: VisualBasic[]) {
      this.visualBoxTemplates = cloneDeep(source)
      this.flatVisualBox()
    },

    // 扁平化处理组件列表
    flatVisualBox(templates?: VisualBasic[]) {
      const templatesList = templates || this.visualBoxTemplates
      const flatTemplates: VisualBasic[] = []
      const flatHandler = (templates: VisualBasic[]) => {
        templates.forEach((item) => {
          flatTemplates.push(item)
          if (item.children) flatHandler(item.children)
        })
      }
      flatHandler(templatesList)
      this.flatVisualBoxTemplates = flatTemplates
    },

    // 初始化组件列表
    initVisualComponents(components: VisualBoxGroup[]) {
      components.forEach((item) => this.visualBoxComponents.push(...item.components))
    },

    // 清空
    clearAllVisualBox() {
      this.initVisualBoxTemplates(templates)
      this.setDevice(this.device)
    },

    // 选中
    toggleActive(template: VisualBasic) {
      if (!template.isEditable) return
      if (template.visualBoxKey === this.activeVisualBox?.visualBoxKey) return
      this.start()
      this.activeVisualBox = new VisualBoxTarget(template, basicOptions)
      this.done()
    },

    // 选中父级
    toggleActiveParent(template: VisualBasic) {
      const parent = this.flatVisualBoxTemplates.find((t) => t.visualBoxKey === template.visualBoxParentKey)
      if (parent) this.toggleActive(parent)
    },

    // 锁定or解锁
    toggleLockVisualBox() {
      if (!this.activeVisualBox) return
      const target = this.activeVisualBox.target
      target.isLocked = !target.isLocked
    },

    // 删除
    deleteVisualBox(template: VisualBasic) {
      const parent = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === template.visualBoxParentKey)
      if (!parent) return
      parent.children = parent.children?.filter((i) => i.visualBoxKey !== template.visualBoxKey)
      this.activeVisualBox = null
      this.flatVisualBox()
    },

    // 上移
    moveVisualBoxUp(template: VisualBasic) {
      const parent = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === template.visualBoxParentKey)
      if (!parent) return
      parent.children = parent.children || []
      const index = parent.children.findIndex((c) => c.visualBoxKey === template.visualBoxKey)
      if (index === 0) {
        ElMessage.warning('当前元素已经在第一个位置了')
      } else {
        parent.children = parent.children.filter((i) => i.visualBoxKey !== template.visualBoxKey)
        parent.children.splice(index - 1, 0, cloneDeep(template))
      }
    },

    // 下移
    moveVisualBoxDown(template: VisualBasic) {
      const parent = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === template.visualBoxParentKey)
      if (!parent) return
      parent.children = parent.children || []
      const index = parent.children.findIndex((c) => c.visualBoxKey === template.visualBoxKey)
      if (index === parent.children.length - 1) {
        ElMessage.warning('当前元素已经在第一个位置了')
      } else {
        parent.children = parent.children.filter((i) => i.visualBoxKey !== template.visualBoxKey)
        parent.children.splice(index + 1, 0, cloneDeep(template))
      }
    },

    // 移动
    moveVisualBox(currentKey: string, fromKey: string, toKey: string, fromIndex: number, toIndex: number) {
      if (fromKey === toKey && fromIndex === toIndex) return
      const moveItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === currentKey)
      const fromItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === fromKey)
      const toItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === toKey)
      if (!moveItem || !fromItem || !toItem) return
      moveItem.visualBoxParentKey = toKey
      if (fromItem.children) {
        fromItem.children = fromItem.children.filter((i) => i.visualBoxKey !== currentKey)
      }
      toItem.children = toItem.children || []
      toItem.children.splice(toIndex, 0, moveItem)
      this.flatVisualBox()
    },

    // 添加
    addVisualBox(currentKey: string, toKey: string, toIndex: number) {
      const moveItem = this.visualBoxComponents.find((i) => i.visualBoxKey === currentKey)
      const toItem = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === toKey)
      if (!moveItem || !toItem) return
      const addItem = cloneDeep(moveItem)
      this.handleVisualBoxKey(addItem, toItem.visualBoxKey)
      toItem.children = toItem.children || []
      toItem.children.splice(toIndex, 0, addItem)
      this.flatVisualBox()
      this.toggleActive(addItem)
    },

    // 复制
    copyVisualBox(currentKey?: string) {
      if (!currentKey) currentKey = this.activeVisualBox?.target.visualBoxKey
      if (!currentKey) return
      const current = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === currentKey)
      const parent = this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === current?.visualBoxParentKey)
      if (!current || !parent) return
      if (!parent.children) return
      const index = parent.children.findIndex((i) => i.visualBoxKey === currentKey)
      const copyItem = cloneDeep(current)
      this.handleVisualBoxKey(copyItem, parent.visualBoxKey)
      parent.children.splice(index + 1, 0, copyItem)
      this.flatVisualBox()
      this.toggleActive(copyItem)
    },

    // 处理添加组件的key及其子组件key
    handleVisualBoxKey(template: VisualBasic, parentKey: string) {
      template.visualBoxKey = uuidv4()
      template.visualBoxParentKey = parentKey
      if (template.children && template.children.length > 0) {
        template.children.forEach((i) => this.handleVisualBoxKey(i, template.visualBoxKey))
      }
    },

    // 更新信息
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
