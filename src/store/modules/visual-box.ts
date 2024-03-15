import { basicOptions, templates, visualComponentGroups } from '@/data/visual.data'
import { VisualBoxTarget } from '@/helper/visual.helper'
import { VisualBoxGroup, VisualBasic } from '@/types/visual-box'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

class HsitoryTrack<T> {
  historyNo: number = 0
  historyTrack: Map<number, T> = new Map()

  // 撤销
  undo(): T | undefined {
    this.historyNo--
    if (this.historyNo < 1) {
      this.historyNo = 1
      ElMessage.warning('已经是最早的历史记录了')
    }
    return this.historyTrack.get(this.historyNo)
  }

  // 重做
  redo(): T | undefined {
    this.historyNo++
    if (this.historyNo > this.historyTrack.size) {
      this.historyNo = this.historyTrack.size
      ElMessage.warning('已经是最新的历史记录了')
    }
    return this.historyTrack.get(this.historyNo)
  }

  // 添加历史记录
  add(data: T) {
    this.historyNo++
    this.historyTrack.set(this.historyNo, cloneDeep(data))
    this.historyTrack.forEach((_v, key) => {
      if (key > this.historyNo) this.historyTrack.delete(key)
    })
  }

  clear() {
    this.historyTrack.clear()
    this.historyNo = 0
  }
}

interface VisualBoxState {
  isFullscreen: boolean
  historyTrack: HsitoryTrack<VisualBasic[]>
  visualBoxTemplates: VisualBasic[]
  flatVisualBoxTemplates: VisualBasic[] // 扁平化的模板数组
  visualBoxComponents: VisualBasic[]
  activeVisualBox: VisualBoxTarget | null
}

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    isFullscreen: false,
    historyTrack: new HsitoryTrack<VisualBasic[]>(),
    flatVisualBoxTemplates: [],
    visualBoxTemplates: [],
    visualBoxComponents: [],
    activeVisualBox: null,
  }),

  actions: {
    // 初始化
    setup() {
      this.initVisualBox(templates)
      this.initVisualComponents(visualComponentGroups)
    },

    // 初始化
    initVisualBox(templates: VisualBasic[]) {
      this.activeVisualBox = null
      this.historyTrack.clear()
      this.visualBoxTemplates = templates
      this.reFlatTemplates()
      this.historyTrack.add(this.visualBoxTemplates)
    },

    // 清空
    clearAllVisualBox() {
      this.initVisualBox(templates)
    },

    // 锁定or解锁
    toggleLockVisualBox(template: VisualBasic) {
      template.isLocked = !template.isLocked
      this.historyTrack.add(this.visualBoxTemplates)
    },

    // 删除
    deleteVisualBox(template: VisualBasic) {
      const parentItem = this.flatVisualBoxTemplates.find((i) => i.children && i.children.includes(template))
      if (!parentItem) return
      parentItem.children = parentItem.children?.filter((i) => i.visualBoxKey !== template.visualBoxKey)
      this.reFlatTemplates()
      this.activeVisualBox = null
      this.historyTrack.add(this.visualBoxTemplates)
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
      this.historyTrack.add(this.visualBoxTemplates)
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
      this.historyTrack.add(this.visualBoxTemplates)
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
      this.historyTrack.add(this.visualBoxTemplates)
    },

    // 扁平化
    flatTemplatesHandler(templates?: VisualBasic[]) {
      if (!templates) return
      templates.forEach((template) => {
        template.isActive = false
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
      if (this.activeVisualBox && this.activeVisualBox.visualBoxKey === template.visualBoxKey) return
      this.activeVisualBox = new VisualBoxTarget(template, basicOptions)
    },

    // 选中父级
    toggleActiveParent(template: VisualBasic) {
      const parent = this.flatVisualBoxTemplates.find((t) => {
        const keys = t.children?.map((c) => c.visualBoxKey) || []
        return keys.includes(template.visualBoxKey)
      })
      if (!parent) return
      this.toggleActive(parent)
    },

    // 初始化组件列表
    initVisualComponents(components: VisualBoxGroup[]) {
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
      this.reFlatTemplates()
      this.historyTrack.add(this.visualBoxTemplates)
      this.toggleActive(addItem)
    },

    // 更新propOptions
    updateVisualBoxProps() {
      if (!this.activeVisualBox) return
      this.activeVisualBox.applyPropsOptions()
      this.historyTrack.add(this.visualBoxTemplates)
    },

    // 更新基本信息
    updateVisualBoxOption() {
      if (!this.activeVisualBox) return
      this.activeVisualBox.applyOptions()
      this.historyTrack.add(this.visualBoxTemplates)
    },

    // 根据key获取组件
    getVisualBoxByKey(key: string) {
      return this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === key)
    },

    // 撤销
    undo() {
      const templates = this.historyTrack.undo() || []
      this.visualBoxTemplates = cloneDeep(templates)
      this.reFlatTemplates()
      this.activeVisualBox = null
    },

    // 重做
    redo() {
      const templates = this.historyTrack.redo() || []
      this.visualBoxTemplates = cloneDeep(templates)
      this.reFlatTemplates()
      this.activeVisualBox = null
    },
  },
})
