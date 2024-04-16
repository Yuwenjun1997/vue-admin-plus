import { defineStore } from 'pinia'
import { VisualEditorBlockData, VisualEditorComponent } from '../types'
import { visualConfig } from '../visual.config'
import { cloneDeep } from 'lodash'
import { createNewBlock, generateNanoid } from '../visual-editor.utils'
import { CssEditorOption, cssEditorOptions } from '../configs/css-editor-options'
import { CSSProperties } from 'vue'
import { ElMessage } from 'element-plus'

interface VisualBoxState {
  isDrag: boolean
  device: string
  isFullscreen: boolean
  currentBlock: VisualEditorBlockData | null
  visualEditor: VisualEditorComponent | null
  cssEditorOptions: CssEditorOption[]
  visualBlocks: VisualEditorBlockData[]
}

const replaceProps = (source: Record<string, any>, target: Record<string, any>) => {
  const len1 = Object.keys(source).length
  const len2 = Object.keys(target).length
  if (len1 > len2) {
    Object.keys(source).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        source[key] = target[key]
      } else {
        // 删除多余的属性
        delete source[key]
      }
    })
  } else {
    Object.assign(source, target)
  }
}

const moveComponet = (blocks: VisualEditorBlockData[], formIndex: number, toIndex: number) => {
  const element = blocks.splice(formIndex, 1)[0]
  blocks.splice(toIndex, 0, element)
}

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    isDrag: false,
    device: 'h5',
    isFullscreen: false,
    currentBlock: null,
    visualEditor: null,
    cssEditorOptions: [],
    visualBlocks: [],
  }),

  actions: {
    findVisualWrap(components: VisualEditorBlockData[]) {
      let blocks: VisualEditorBlockData[] = []
      let currentIndex: number = 0
      let parent: VisualEditorBlockData | null = null

      const recursion = (components: VisualEditorBlockData[], prevParent: VisualEditorBlockData | null) => {
        components.forEach((item, index) => {
          if (item._vid === this.currentBlock?._vid) {
            blocks = components
            currentIndex = index
            parent = prevParent
          } else if (item.slots && Object.keys(item.slots).length) {
            Object.entries(item.slots).forEach(([_key, value]) => recursion(value.children, item))
          }
        })
      }
      recursion(components, null)
      return { blocks, currentIndex, parent }
    },

    setCurrentBlock(block: VisualEditorBlockData) {
      this.currentBlock = block
      this.initVisualEditor()
    },

    initVisualEditor() {
      if (!this.currentBlock) return
      const visualEditor = cloneDeep(visualConfig.componentMap[this.currentBlock.componentKey])
      // 处理属性
      Object.keys(visualEditor.props || {}).forEach((propKey) => {
        visualEditor.props = visualEditor.props || {}
        visualEditor.props[propKey].defaultValue = this.currentBlock?.props[propKey]
      })
      // 处理插槽
      visualEditor.initSlotsOptions && visualEditor.initSlotsOptions(this.currentBlock.slots)

      // 处理css样式
      if (!this.cssEditorOptions.length) {
        this.cssEditorOptions = cloneDeep(cssEditorOptions)
      }
      this.cssEditorOptions.forEach((item) => {
        Object.entries(item.optionMap).forEach(([key, value]) => {
          value.defaultValue = this.currentBlock?.styles[key as keyof CSSProperties]
        })
      })
      this.visualEditor = visualEditor
    },

    applyVisualEditor() {
      if (!this.visualEditor || !this.currentBlock) return
      const block = createNewBlock(this.visualEditor)
      replaceProps(this.currentBlock.props, block.props)
      replaceProps(this.currentBlock.slots, block.slots)

      this.cssEditorOptions.forEach((item) => {
        const cssRule = Object.entries(item.optionMap).reduce((cssRule: Record<string, any>, [key, value]) => {
          cssRule[key] = value.defaultValue
          return cssRule
        }, {})
        Object.assign(this.currentBlock?.styles || {}, cssRule)
      })
    },

    setDevice(name: string) {
      this.device = name
    },

    moveUp() {
      if (!this.currentBlock) return ElMessage.warning('请先选中一个组件')
      const { currentIndex, blocks } = this.findVisualWrap(this.visualBlocks)
      if (currentIndex === 0) return ElMessage.warning('当前组件已在第一个位置')
      moveComponet(blocks, currentIndex, currentIndex - 1)
    },

    moveDown() {
      if (!this.currentBlock) return ElMessage.warning('请先选中一个组件')
      const { currentIndex, blocks } = this.findVisualWrap(this.visualBlocks)
      if (currentIndex === blocks.length - 1) return ElMessage.warning('当前组件已在最后一个位置')
      moveComponet(blocks, currentIndex, currentIndex + 1)
    },

    clone() {
      if (!this.currentBlock) return ElMessage.warning('请先选中一个组件')
      const clone = cloneDeep(this.currentBlock)
      clone.label = `${clone.label}(clone)`
      clone._vid = generateNanoid()
      const { currentIndex, blocks } = this.findVisualWrap(this.visualBlocks)
      blocks.splice(currentIndex + 1, 0, clone)
      this.setCurrentBlock(clone)
    },

    deleteFn() {
      if (!this.currentBlock) return ElMessage.warning('请先选中一个组件')
      const { currentIndex, blocks } = this.findVisualWrap(this.visualBlocks)
      blocks.splice(currentIndex, 1)
      this.currentBlock = null
      this.visualEditor = null
    },

    activeParent() {
      if (!this.currentBlock) return ElMessage.warning('请先选中一个组件')
      const { parent } = this.findVisualWrap(this.visualBlocks)
      if (!parent) return ElMessage.warning('已经是顶级组件')
      this.currentBlock.isActive = false
      this.setCurrentBlock(parent)
    },

    clear() {
      this.visualBlocks = []
      this.currentBlock = null
      this.visualEditor = null
    },
  },
})
