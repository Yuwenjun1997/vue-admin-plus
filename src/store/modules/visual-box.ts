import { basicOptions, templates, visualComponentGroups } from '@/data/visual.data'
import { VisualBoxTarget } from '@/helper/visual.helper'
import { VisualBoxGroup, VisualBasic } from '@/types/visual-box'
import { sleep } from '@/utils'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface VisualBoxState {
  actionUid: string
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
    actionUid: uuidv4(),
    isLoading: false,
    device: 'h5',
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
      this.actionUid = uuidv4()
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
      if (!template.isEditable) return this.toggleActiveParent(template)
      if (template.key === this.activeVisualBox?.key) return
      this.start()
      this.activeVisualBox = new VisualBoxTarget(template, basicOptions)
      this.done()
    },

    // 选中父级
    toggleActiveParent(template: VisualBasic) {
      const parent = this.flatVisualBoxTemplates.find((t) => t.key === template.parentKey)
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
      if (template.parentKey === 'root') {
        this.visualBoxTemplates = this.visualBoxTemplates.filter((i) => i.key !== template.key)
      } else {
        const parent = this.flatVisualBoxTemplates.find((i) => i.key === template.parentKey)
        if (!parent) return
        parent.children = parent.children?.filter((i) => i.key !== template.key)
      }
      this.activeVisualBox = null
      this.flatVisualBox()
    },

    // 上移
    moveVisualBoxUp(template: VisualBasic) {
      if (template.parentKey === 'root') {
        const index = this.visualBoxTemplates.findIndex((i) => i.key === template.key)
        if (index === 0) {
          ElMessage.warning('当前元素已经在第一个位置了')
        } else {
          this.visualBoxTemplates = this.visualBoxTemplates.filter((i) => i.key !== template.key)
          this.visualBoxTemplates.splice(index - 1, 0, template)
        }
      } else {
        const parent = this.flatVisualBoxTemplates.find((i) => i.key === template.parentKey)
        if (!parent) return
        parent.children = parent.children || []
        const index = parent.children.findIndex((c) => c.key === template.key)
        if (index === 0) {
          ElMessage.warning('当前元素已经在第一个位置了')
        } else {
          parent.children = parent.children.filter((i) => i.key !== template.key)
          parent.children.splice(index - 1, 0, template)
        }
      }
    },

    // 下移
    moveVisualBoxDown(template: VisualBasic) {
      if (template.parentKey === 'root') {
        const index = this.visualBoxTemplates.findIndex((i) => i.key === template.key)
        if (index === this.visualBoxTemplates.length - 1) {
          ElMessage.warning('当前元素已经在第一个位置了')
        } else {
          this.visualBoxTemplates = this.visualBoxTemplates.filter((i) => i.key !== template.key)
          this.visualBoxTemplates.splice(index + 1, 0, template)
        }
      } else {
        const parent = this.flatVisualBoxTemplates.find((i) => i.key === template.parentKey)
        if (!parent) return
        parent.children = parent.children || []
        const index = parent.children.findIndex((c) => c.key === template.key)
        if (index === parent.children.length - 1) {
          ElMessage.warning('当前元素已经在第一个位置了')
        } else {
          parent.children = parent.children.filter((i) => i.key !== template.key)
          parent.children.splice(index + 1, 0, template)
        }
      }
    },

    // 移动
    moveVisualBox(currentKey: string, fromKey: string, toKey: string, fromIndex: number, toIndex: number) {
      if (fromKey === toKey && fromIndex === toIndex) return
      const moveItem = this.flatVisualBoxTemplates.find((i) => i.key === currentKey)
      if (!moveItem) return
      if (fromKey === 'root') {
        this.visualBoxTemplates = this.visualBoxTemplates.filter((i) => i.key !== currentKey)
      } else {
        const fromItem = this.flatVisualBoxTemplates.find((i) => i.key === fromKey)
        if (!fromItem || !fromItem.children) return
        fromItem.children = fromItem.children.filter((i) => i.key !== currentKey)
      }
      if (toKey === 'root') {
        moveItem.parentKey = 'root'
        this.visualBoxTemplates.splice(toIndex, 0, moveItem)
      } else {
        const toItem = this.flatVisualBoxTemplates.find((i) => i.key === toKey)
        if (!toItem) return
        moveItem.parentKey = toKey
        toItem.children = toItem.children || []
        toItem.children.splice(toIndex, 0, moveItem)
      }
      this.flatVisualBox()
      console.log(this.visualBoxTemplates)
    },

    // 添加
    addVisualBox(currentKey: string, toKey: string, toIndex: number) {
      const moveItem = this.visualBoxComponents.find((i) => i.key === currentKey)
      if (!moveItem) return
      const addItem = cloneDeep(moveItem)
      if (toKey === 'root') {
        this.handleVisualBoxKey(addItem)
        this.visualBoxTemplates.splice(toIndex, 0, addItem)
      } else {
        const toItem = this.flatVisualBoxTemplates.find((i) => i.key === toKey)
        if (!toItem) return
        this.handleVisualBoxKey(addItem, toItem.key)
        toItem.children = toItem.children || []
        toItem.children.splice(toIndex, 0, addItem)
      }
      this.flatVisualBox()
      this.toggleActive(addItem)
    },

    // 复制
    copyVisualBox(currentKey?: string) {
      if (!currentKey) currentKey = this.activeVisualBox?.target.key
      if (!currentKey) return
      const current = this.flatVisualBoxTemplates.find((i) => i.key === currentKey)
      if (!current) return
      const copyItem = cloneDeep(current)
      if (current.parentKey === 'root') {
        const index = this.visualBoxTemplates.findIndex((i) => i.key === currentKey)
        this.handleVisualBoxKey(copyItem)
        this.visualBoxTemplates.splice(index + 1, 0, copyItem)
      } else {
        const parent = this.flatVisualBoxTemplates.find((i) => i.key === current?.parentKey)
        if (!parent || !parent.children) return
        const index = parent.children.findIndex((i) => i.key === currentKey)
        this.handleVisualBoxKey(copyItem, parent.key)
        parent.children.splice(index + 1, 0, copyItem)
      }
      this.flatVisualBox()
      this.toggleActive(copyItem)
    },

    // 处理添加组件的key及其子组件key
    handleVisualBoxKey(template: VisualBasic, parentKey: string = 'root') {
      template.key = uuidv4()
      template.parentKey = parentKey
      if (template.children && template.children.length > 0) {
        template.children.forEach((i) => this.handleVisualBoxKey(i, template.key))
      }
    },

    // 更新信息
    updateVisualBoxOption() {
      if (!this.activeVisualBox) return
      this.activeVisualBox.applyOptions()
    },

    // 根据key获取组件
    getVisualBoxByKey(key: string) {
      return this.flatVisualBoxTemplates.find((i) => i.key === key)
    },
  },
})
