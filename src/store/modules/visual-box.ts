import { basicOptions, templates, visualComponentGroups } from '@/data/visual.data'
import { VisualBoxTarget } from '@/helper/visual.helper'
import { VisualBoxGroup, VisualBasic } from '@/types/visual-box'
import { ElMessage } from 'element-plus'
import { cloneDeep, debounce } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface VisualBoxState {
  isFullscreen: boolean
  historyTrack: HsitoryTrack<VisualBasic[]>
  visualBoxTemplates: VisualBasic[]
  flatVisualBoxTemplates: VisualBasic[]
  visualBoxComponents: VisualBasic[]
  activeVisualBox: VisualBoxTarget | null
}

class HsitoryTrack<T> {
  historyNo: number = -1
  historyTrack: T[] = []

  // 撤销
  undo(): T | undefined {
    if (this.historyNo === 0) {
      ElMessage.warning('已经是最早的历史记录了')
      return
    }
    return this.historyTrack[--this.historyNo]
  }

  // 重做
  redo(): T | undefined {
    if (this.historyNo === this.historyTrack.length - 1) {
      ElMessage.warning('已经是最新的历史记录了')
      return
    }
    return this.historyTrack[++this.historyNo]
  }

  // 添加历史记录
  add(data: T) {
    this.historyTrack = this.historyTrack.slice(0, this.historyNo + 1)
    this.historyTrack.push(cloneDeep(data))
    this.historyNo = this.historyTrack.length - 1
    console.log(this.historyTrack)
  }

  clear() {
    this.historyTrack = []
    this.historyNo = 0
  }
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
    historyTrack: new HsitoryTrack<VisualBasic[]>(),
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
      this.activeVisualBox = null
      todoHanlder(source, (source) => (this.visualBoxTemplates = source))
    },

    // 初始化组件列表
    initVisualComponents(components: VisualBoxGroup[]) {
      components.forEach((item) => this.visualBoxComponents.push(...item.components))
    },

    // 清空
    clearAllVisualBox() {
      this.initVisualBoxTemplates(templates)
      this.historyTrack.clear()
    },

    flatVisualBoxHandler() {
      const flatHandler = (templates: VisualBasic[]) => {
        templates.forEach((item) => {
          this.flatVisualBoxTemplates.push(item)
          if (item.children) flatHandler(item.children)
        })
      }
      this.flatVisualBoxTemplates = []
      flatHandler(this.visualBoxTemplates)
    },

    // 选中
    toggleActive(template: VisualBasic) {
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
        parent.children = parent.children?.filter((i) => i.visualBoxKey !== template.visualBoxKey)
        this.visualBoxTemplates = source
        this.activeVisualBox = null
        this.flatVisualBoxHandler()
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
        this.flatVisualBoxHandler()
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
        this.flatVisualBoxHandler()
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
        this.flatVisualBoxHandler()
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
        this.visualBoxTemplates = source
        this.flatVisualBoxHandler()
      })
    },

    // 更新propOptions
    updateVisualBoxProps() {
      console.log('更新propOptions')
      todoHanlderFn(this.visualBoxTemplates, (source, flatList) => {
        if (!this.activeVisualBox) return
        this.activeVisualBox.applyPropsOptions()
        const target = flatList.find((i) => i.visualBoxKey === this.activeVisualBox?.target.visualBoxKey)
        if (!target) return
        Object.assign(target, this.activeVisualBox.target)
        this.visualBoxTemplates = source
        this.flatVisualBoxHandler()
      })
    },

    // 更新基本信息
    updateVisualBoxOption() {
      todoHanlderFn(this.visualBoxTemplates, (source, flatList) => {
        console.log('更新基本信息')
        if (!this.activeVisualBox) return
        this.activeVisualBox.applyOptions()
        const target = flatList.find((i) => i.visualBoxKey === this.activeVisualBox?.target.visualBoxKey)
        if (!target) return
        Object.assign(target, this.activeVisualBox.target)
        this.visualBoxTemplates = source
        this.flatVisualBoxHandler()
      })
    },

    // 根据key获取组件
    getVisualBoxByKey(key: string) {
      return this.flatVisualBoxTemplates.find((i) => i.visualBoxKey === key)
    },

    // 撤销
    undo() {
      const data = this.historyTrack.undo()
      if (data) {
        todoHanlder(data, (source) => {
          this.visualBoxTemplates = source
          this.flatVisualBoxHandler()
        })
      }
    },

    // 重做
    redo() {
      const data = this.historyTrack.redo()
      if (data) {
        todoHanlder(data, (source) => {
          this.visualBoxTemplates = source
          this.flatVisualBoxHandler()
        })
      }
    },
  },
})
