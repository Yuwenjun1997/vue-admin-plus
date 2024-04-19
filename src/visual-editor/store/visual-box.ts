import { defineStore } from 'pinia'
import { VisualBindProp, VisualEditorBlockData, VisualEditorComponent, VisualEditorPage } from '../types'
import { visualConfig } from '../visual.config'
import { cloneDeep } from 'lodash'
import { createNewBlock } from '../visual-editor.utils'
import { CssEditorOption, cssEditorOptions } from '../configs/css-editor-options'
import { CSSProperties } from 'vue'

interface VisualBoxState {
  isDrag: boolean
  device: string
  isFullscreen: boolean
  hideFullscreen: boolean
  currentBlock: VisualEditorBlockData | null
  visualEditor: VisualEditorComponent | null
  cssEditorOptions: CssEditorOption[]
  visualPages: VisualEditorPage[]
  currentPage: VisualEditorPage | null
  visualStore: Record<string, any>
  visualBindProps: VisualBindProp[]
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
    hideFullscreen: false,
    currentBlock: null,
    visualEditor: null,
    cssEditorOptions: [],
    visualPages: [],
    currentPage: null,
    visualStore: {},
    visualBindProps: [],
  }),

  actions: {
    setDevice(name: string) {
      this.device = name
    },

    setVisualStore(state: Record<string, any>) {
      this.visualStore = state
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

    initVisualEditor() {
      if (!this.currentBlock) return
      const visualEditor = cloneDeep(visualConfig.componentMap[this.currentBlock.componentKey])

      const bindPropKeys = Object.keys(this.currentBlock.bindProps)

      // 处理属性
      Object.entries(visualEditor.props || {}).forEach(([key, value]) => {
        visualEditor.props = visualEditor.props || {}
        value.defaultValue = this.currentBlock?.props[key]
        value.reactive = !!bindPropKeys.includes(key)
      })

      // 处理绑定属性
      if (bindPropKeys.length) {
        visualEditor.bindProps = Object.assign({}, this.currentBlock.bindProps)
      }

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

      // 合并属性
      replaceProps(this.currentBlock.props, block.props)
      // 合并插槽
      replaceProps(this.currentBlock.slots, block.slots)
      // 合并绑定属性
      replaceProps(this.currentBlock.bindProps, block.bindProps)

      // 向store中添加属性
      Object.entries(this.currentBlock.bindProps).forEach(([key, value]) => {
        if (value.bindSourceKey === 'currentPage' && this.currentPage) {
          this.currentPage.store = this.currentPage.store || {}
          if (!Object.prototype.hasOwnProperty.call(this.currentPage.store, key)) {
            if (value.bindProp) {
              this.currentPage.store[value.bindProp] = this.currentBlock?.props[key]
            }
          }
        } else if (value.bindSourceKey === 'global' && this.visualStore) {
          if (!Object.prototype.hasOwnProperty.call(this.visualStore, key)) {
            if (value.bindProp) {
              this.visualStore[value.bindProp] = this.currentBlock?.props[key]
            }
          }
        }
      })

      // 合并css样式
      this.cssEditorOptions.forEach((item) => {
        const cssRule = Object.entries(item.optionMap).reduce((cssRule: Record<string, any>, [key, value]) => {
          cssRule[key] = value.defaultValue
          return cssRule
        }, {})
        Object.assign(this.currentBlock?.styles || {}, cssRule)
      })
    },
  },
})
