import { basicOptions, templates, visualComponentGroups } from '@/data/visual.data'
import { VisualBoxTarget } from '@/helper/visual.helper'
import { VisualBoxGroup, VisualBasic } from '@/types/visual-box'
import { ElMessage } from 'element-plus'
import { cloneDeep, debounce } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface VisualBoxState {
  isFullscreen: boolean
  visualBoxTemplates: VisualBasic[]
  flatVisualBoxTemplates: VisualBasic[]
  visualBoxComponents: VisualBasic[]
  activeVisualBox: VisualBoxTarget | null
}

function todoHanlder(source: VisualBasic[], callback: (source: VisualBasic[], flatList: VisualBasic[]) => void) {
  const templates = cloneDeep(source)
  const flatTemplates: VisualBasic[] = []
  const flatHandler = (templates: VisualBasic[]) => {
    templates.forEach((item) => {
      flatTemplates.push(item)
      if (item.children) flatHandler(item.children)
    })
  }
  flatHandler(templates)
  callback(templates, flatTemplates)
}

const todoHanlderFn = debounce(todoHanlder, 500)

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    isFullscreen: false,
    visualBoxTemplates: [],
    flatVisualBoxTemplates: [],
    visualBoxComponents: [],
    activeVisualBox: null,
  }),

  actions: {
    // 初始化
    setup() {
      this.initVisualComponents(visualComponentGroups)
      this.initVisualBoxTemplates(templates)
    },

    // 重新刷新列表
    initVisualBoxTemplates(source: VisualBasic[]) {
      todoHanlder(source, (source, flatList) => {
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 初始化组件列表
    initVisualComponents(components: VisualBoxGroup[]) {
      components.forEach((item) => this.visualBoxComponents.push(...item.components))
    },

    // 清空
    clearAllVisualBox() {
      this.initVisualBoxTemplates(templates)
    },

    // 选中
    toggleActive(template: VisualBasic) {
      if (template.visualBoxKey === this.activeVisualBox?.visualBoxKey) return
      this.activeVisualBox = new VisualBoxTarget(template, basicOptions)
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
      todoHanlder(this.visualBoxTemplates, (source, flatList) => {
        const parent = flatList.find((i) => i.visualBoxKey === template.visualBoxParentKey)
        if (!parent) return
        this.activeVisualBox = null
        parent.children = parent.children?.filter((i) => i.visualBoxKey !== template.visualBoxKey)
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 上移
    moveVisualBoxUp(template: VisualBasic) {
      todoHanlder(this.visualBoxTemplates, (source, flatList) => {
        const parent = flatList.find((i) => i.visualBoxKey === template.visualBoxParentKey)
        if (!parent) return
        parent.children = parent.children || []
        const index = parent.children.findIndex((c) => c.visualBoxKey === template.visualBoxKey)
        if (index === 0) {
          ElMessage.warning('当前元素已经在第一个位置了')
        } else {
          parent.children = parent.children.filter((i) => i.visualBoxKey !== template.visualBoxKey)
          parent.children.splice(index - 1, 0, cloneDeep(template))
        }
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 下移
    moveVisualBoxDown(template: VisualBasic) {
      todoHanlder(this.visualBoxTemplates, (source, flatList) => {
        const parent = flatList.find((i) => i.visualBoxKey === template.visualBoxParentKey)
        if (!parent) return
        parent.children = parent.children || []
        const index = parent.children.findIndex((c) => c.visualBoxKey === template.visualBoxKey)
        if (index === parent.children.length - 1) {
          ElMessage.warning('当前元素已经在第一个位置了')
        } else {
          parent.children = parent.children.filter((i) => i.visualBoxKey !== template.visualBoxKey)
          parent.children.splice(index + 1, 0, cloneDeep(template))
        }
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 移动
    moveVisualBox(currentKey: string, fromKey: string, toKey: string, fromIndex: number, toIndex: number) {
      if (fromKey === toKey && fromIndex === toIndex) return
      todoHanlder(this.visualBoxTemplates, (source, flatList) => {
        const moveItem = flatList.find((i) => i.visualBoxKey === currentKey)
        const fromItem = flatList.find((i) => i.visualBoxKey === fromKey)
        const toItem = flatList.find((i) => i.visualBoxKey === toKey)
        if (!moveItem || !fromItem || !toItem) return
        moveItem.visualBoxParentKey = toKey
        if (fromItem.children) fromItem.children.splice(fromIndex, 1)
        toItem.children = toItem.children || []
        toItem.children.splice(toIndex, 0, moveItem)
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 添加
    addVisualBox(currentKey: string, toKey: string, toIndex: number) {
      todoHanlder(this.visualBoxTemplates, (source, flatList) => {
        const moveItem = this.visualBoxComponents.find((i) => i.visualBoxKey === currentKey)
        const toItem = flatList.find((i) => i.visualBoxKey === toKey)
        if (!moveItem || !toItem) return
        const addItem = cloneDeep(moveItem)
        addItem.visualBoxKey = uuidv4()
        addItem.visualBoxParentKey = toItem.visualBoxKey
        toItem.children = toItem.children || []
        toItem.children.splice(toIndex, 0, addItem)
        flatList.push(addItem)
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
        this.toggleActive(addItem)
      })
    },

    // 更新propOptions
    updateVisualBoxProps() {
      todoHanlderFn(this.visualBoxTemplates, (source, flatList) => {
        if (!this.activeVisualBox) return
        this.activeVisualBox.applyPropsOptions()
        const target = flatList.find((i) => i.visualBoxKey === this.activeVisualBox?.target.visualBoxKey)
        if (!target) return
        Object.assign(target, this.activeVisualBox.target)
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 更新基本信息
    updateVisualBoxOption() {
      todoHanlderFn(this.visualBoxTemplates, (source, flatList) => {
        if (!this.activeVisualBox) return
        this.activeVisualBox.applyOptions()
        const target = flatList.find((i) => i.visualBoxKey === this.activeVisualBox?.target.visualBoxKey)
        if (!target) return
        Object.assign(target, this.activeVisualBox.target)
        this.visualBoxTemplates = source
        this.flatVisualBoxTemplates = flatList
      })
    },

    // 根据key获取组件
    getVisualBoxByKey(key: string) {
      return this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === key)
    },
  },
})
