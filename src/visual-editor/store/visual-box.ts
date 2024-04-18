import { defineStore } from 'pinia'
import { VisualEditorBlockData, VisualEditorComponent, VisualEditorPage } from '../types'
import { visualConfig } from '../visual.config'
import { cloneDeep } from 'lodash'
import { createNewBlock } from '../visual-editor.utils'
import { CssEditorOption, cssEditorOptions } from '../configs/css-editor-options'
import { CSSProperties } from 'vue'

interface VisualBoxState {
  isDrag: boolean
  device: string
  isFullscreen: boolean
  currentBlock: VisualEditorBlockData | null
  visualEditor: VisualEditorComponent | null
  cssEditorOptions: CssEditorOption[]
  visualPages: VisualEditorPage[]
  currentPage: VisualEditorPage | null
  reactiveMap: Record<string, Record<string, any>>
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

export const useVisualBoxStore = defineStore('visualBox', {
  state: (): VisualBoxState => ({
    isDrag: false,
    device: 'h5',
    isFullscreen: false,
    currentBlock: null,
    visualEditor: null,
    cssEditorOptions: [],
    visualPages: [],
    currentPage: null,
    reactiveMap: {},
  }),

  actions: {
    setDevice(name: string) {
      this.device = name
    },

    setCurrentPage(page: VisualEditorPage | null) {
      this.currentPage = page
      this.currentBlock = null
      this.visualEditor = null
    },

    setCurrentBlock(block: VisualEditorBlockData) {
      this.currentBlock = block
      this.initVisualEditor()
    },

    sortVisualBlocks() {
      if (!this.currentPage) return
      this.currentPage.blocks.sort((a, b) => Number(a.draggable) - Number(b.draggable))
    },

    initVisualEditor() {
      if (!this.currentBlock) return
      const visualEditor = cloneDeep(visualConfig.componentMap[this.currentBlock.componentKey])

      const _vid = this.currentBlock._vid

      Object.entries(visualEditor.props || {}).forEach(([key, value]) => {
        visualEditor.props = visualEditor.props || {}
        value.defaultValue = this.currentBlock?.props[key]
        value.reactive = Object.keys(this.reactiveMap[_vid] || {}).includes(key)
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

      // 处理响应式属性
      const reactiveMap = {} as Record<string, any>
      this.reactiveMap[this.currentBlock._vid] = reactiveMap
      Object.entries(this.visualEditor.props || {}).forEach(([key, value]) => {
        if (value.reactive) reactiveMap[key] = value.defaultValue
      })
    },
  },
})
