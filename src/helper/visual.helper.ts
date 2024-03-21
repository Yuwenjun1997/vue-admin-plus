import { VisualBasic, VisualBoxOption, VisualBoxRenderOption } from '@/types/visual-box'
import { cloneDeep } from 'lodash'
import { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export class VisualBoxTarget<T = any> {
  orderCount: number = 1
  target: VisualBasic<T>
  visualBoxKey: string
  visualBoxName?: string
  basicOptions: VisualBoxOption[]
  customOptions: VisualBoxOption[]
  propsOptions: VisualBoxOption[]
  renderBasicOptions: VisualBoxRenderOption[]
  renderCustomOptions: VisualBoxRenderOption[]
  renderPropsOptions: VisualBoxRenderOption[] = []

  constructor(target: VisualBasic<T>, basicOptions: VisualBoxOption[] = []) {
    this.target = target
    this.visualBoxKey = this.target.visualBoxKey
    this.visualBoxName = this.target.visualBoxName
    this.basicOptions = cloneDeep(basicOptions)
    this.customOptions = this.target.options || []
    this.propsOptions = this.target.propsOptions || []
    this.renderBasicOptions = this.initOptions(this.basicOptions)
    this.renderCustomOptions = this.initOptions(this.customOptions)
    this.renderPropsOptions = this.initOptions(this.propsOptions)
  }

  initOptions(options: VisualBoxOption[]): VisualBoxRenderOption[] {
    const results: VisualBoxRenderOption[] = []
    options.forEach((option) => {
      option.order = option.order || this.orderCount++
      if (option.target === 'root') {
        option.value = this.target[option.property as keyof VisualBasic] || option.value
      }
      if (option.target === 'customStyle' && this.target.customStyle) {
        option.value = this.target.customStyle[option.property as keyof CSSProperties] || option.value
      }
      if (option.target === 'layoutStyle' && this.target.layoutStyle) {
        option.value = this.target.layoutStyle[option.property as keyof CSSProperties] || option.value
      }
      if (option.target === 'props' && this.target.props) {
        // @ts-ignore
        option.value = this.target.props[option.property] || option.value
      }
      if (option.target === 'methods' && this.target.methods) {
        option.value = this.target.methods[option.property] || option.value
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
    const allOptions: VisualBoxOption[] = [...this.basicOptions, ...this.customOptions, ...this.propsOptions]
    allOptions.forEach((option) => {
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
      if (option.target === 'props') {
        // @ts-ignore
        this.target.props[option.property] = option.value
      }
      if (option.target === 'methods') {
        // @ts-ignore
        this.target.methods[option.property] = option.value
      }
    })
  }
}
