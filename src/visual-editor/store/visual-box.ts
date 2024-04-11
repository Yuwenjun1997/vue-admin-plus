import { defineStore } from 'pinia'
import { VisualEditorBlockData, VisualEditorComponent } from '../types'
import { visualConfig } from '../visual.config'
import { cloneDeep } from 'lodash'
import { createNewBlock } from '../visual-editor.utils'

interface VisualBoxState {
  device: string
  isFullscreen: boolean
  currentBlock: VisualEditorBlockData | null
  visualEditor: VisualEditorComponent | null
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
  }),

  actions: {
    setCurrentBlock(block: VisualEditorBlockData) {
      this.currentBlock = block
      this.initVisualEditor()
    },
    initVisualEditor() {
      if (!this.currentBlock) return
      const visualEditor = cloneDeep(visualConfig.componentMap[this.currentBlock.componentKey])
      if (Object.keys(visualEditor.props || {}).length > 0) {
        Object.keys(visualEditor.props || {}).forEach((propKey) => {
          if (visualEditor.props) {
            visualEditor.props[propKey].defaultValue = this.currentBlock?.props[propKey]
          }
        })
      }
      this.visualEditor = visualEditor
      console.log(this.visualEditor)
    },
    applyVisualEditor() {
      if (!this.visualEditor || !this.currentBlock) return
      const block = createNewBlock(this.visualEditor)
      console.log(block.props)
      replaceProps(this.currentBlock.props, block.props)
      console.log(this.currentBlock.props)
    },
    setDevice(name: string) {
      this.device = name
    },
  },
})
