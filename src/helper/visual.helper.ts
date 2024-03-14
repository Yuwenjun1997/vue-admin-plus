import { VisualBasic, VisualBoxOption, VisualBoxRenderOption } from '@/types/visual-box'
import { cloneDeep } from 'lodash'
import { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export class VisualBoxTarget<T = any> {
  target: VisualBasic<T>
  visualBoxKey: string
  visualBoxName?: string
  options: VisualBoxOption[]
  propsOptions: VisualBoxOption[]
  renderOptions: VisualBoxRenderOption[]
  renderPropsOptions: VisualBoxRenderOption[] = []

  constructor(target: VisualBasic<T>, basicOptions: VisualBoxOption[] = []) {
    this.target = target
    this.visualBoxKey = target.visualBoxKey
    this.visualBoxName = target.visualBoxName
    this.options = cloneDeep(basicOptions).concat(target.options || [])
    this.propsOptions = target.propsOptions || []
    this.renderOptions = this.initOptions()
    this.renderPropsOptions = this.initPropsOptions()
  }

  initOptions(): VisualBoxRenderOption[] {
    const results: VisualBoxRenderOption[] = []
    this.options.forEach((option) => {
      if (option.target === 'root') {
        option.value = this.target[option.property as keyof VisualBasic]
      }
      if (option.target === 'customStyle' && this.target.customStyle) {
        option.value = this.target.customStyle[option.property as keyof CSSProperties]
      }
      if (option.target === 'layoutStyle' && this.target.layoutStyle) {
        option.value = this.target.layoutStyle[option.property as keyof CSSProperties]
      }
      const group = results.find((r) => r.groupName === option.groupName)
      if (group) {
        group.options.push(option)
      } else {
        results.push({ groupName: option.groupName, options: [option], groupId: uuidv4() })
      }
    })
    return results
  }

  applyOptions() {
    this.target.customStyle = {}
    this.target.layoutStyle = {}
    this.options.forEach((option) => {
      if (option.target === 'customStyle') {
        // @ts-ignore
        this.target.customStyle[option.property] = option.value
      }
      if (option.target === 'layoutStyle') {
        // @ts-ignore
        this.target.layoutStyle[option.property] = option.value
      }
      if (option.target === 'root') {
        // @ts-ignore
        this.target[option.property] = option.value
      }
    })
  }

  initPropsOptions(): VisualBoxRenderOption[] {
    const results: VisualBoxRenderOption[] = []
    this.propsOptions.forEach((option) => {
      // @ts-ignore
      option.value = this.target.props[option.property]
      const group = results.find((r) => r.groupName === option.groupName)
      if (group) {
        group.options.push(option)
      } else {
        results.push({ groupName: option.groupName, options: [option], groupId: uuidv4() })
      }
    })
    return results
  }

  applyPropsOptions() {
    this.propsOptions.forEach((option) => {
      if (option.target === 'props') {
        // @ts-ignore
        this.target.props[option.property] = option.value
      }
    })
  }
}
