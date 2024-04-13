import { defineStore } from 'pinia'
import { VisualEditorBlockData, VisualEditorComponent, VisualEditorProps } from '../types'
import { visualConfig } from '../visual.config'
import { cloneDeep } from 'lodash'
import { createNewBlock } from '../visual-editor.utils'
import { cssEditorOptions } from '../configs/css-editor-options'
import { CSSProperties } from 'vue'

interface VisualBoxState {
  device: string
  isFullscreen: boolean
  currentBlock: VisualEditorBlockData | null
  visualEditor: VisualEditorComponent | null
  cssEditorOptions: Record<string, VisualEditorProps> | null
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
    device: 'h5',
    isFullscreen: false,
    currentBlock: null,
    visualEditor: null,
    cssEditorOptions: null,
  }),

  actions: {
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
      this.visualEditor = visualEditor
      // 处理css样式
      this.cssEditorOptions = cloneDeep(cssEditorOptions)
      Object.entries(this.cssEditorOptions).forEach(([key, value]) => {
        value.defaultValue = this.currentBlock?.styles[key as keyof CSSProperties]
      })
      console.log(this.cssEditorOptions)
    },
    applyVisualEditor() {
      if (!this.visualEditor || !this.currentBlock) return
      const block = createNewBlock(this.visualEditor)
      replaceProps(this.currentBlock.props, block.props)
      replaceProps(this.currentBlock.slots, block.slots)
      if (this.cssEditorOptions) {
        const cssRule = Object.entries(this.cssEditorOptions).reduce((cssRule: Record<string, any>, [key, value]) => {
          cssRule[key] = value.defaultValue
          return cssRule
        }, {})
        Object.assign(this.currentBlock.styles, cssRule)
      }
    },
    setDevice(name: string) {
      this.device = name
    },
  },
})
