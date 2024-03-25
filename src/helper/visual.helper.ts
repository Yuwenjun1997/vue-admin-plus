import { VisualBasic, VisualBoxGlobal, VisualBoxOption, VisualBoxRenderOption } from '@/types/visual-box'
import { cloneDeep } from 'lodash'
import { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useVisualGlobal } from '@/store/modules/visual-global'

export class VisualBoxTarget<T = any> {
  orderCount: number = 1
  target: VisualBasic<T>
  visualBoxKey: string
  visualBoxName?: string
  basicOptions: VisualBoxOption[]
  customOptions: VisualBoxOption[]
  bindOptions: VisualBoxOption[]
  renderBasicOptions: VisualBoxRenderOption[]
  renderCustomOptions: VisualBoxRenderOption[]
  renderBindOptions: VisualBoxRenderOption[] = []

  constructor(target: VisualBasic<T>, basicOptions: VisualBoxOption[] = []) {
    this.target = target
    this.visualBoxKey = this.target.visualBoxKey
    this.visualBoxName = this.target.visualBoxName
    this.basicOptions = cloneDeep(basicOptions)
    this.customOptions = this.target.options || []
    this.bindOptions = this.target.bindOptions || []
    this.renderBasicOptions = this.initOptions(this.basicOptions)
    this.renderCustomOptions = this.initOptions(this.customOptions)
    this.renderBindOptions = this.initOptions(this.bindOptions)
  }

  initOptions(options: VisualBoxOption[]): VisualBoxRenderOption[] {
    const results: VisualBoxRenderOption[] = []
    options.forEach((option) => {
      option.order = option.order || this.orderCount++
      if (option.target === 'root') {
        option.value = this.target[option.property as keyof VisualBasic] || option.value
      } else if (option.target === 'customStyle' && this.target.customStyle) {
        option.value = this.target.customStyle[option.property as keyof CSSProperties] || option.value
      } else if (option.target === 'layoutStyle' && this.target.layoutStyle) {
        option.value = this.target.layoutStyle[option.property as keyof CSSProperties] || option.value
      } else if (option.target === 'props' && this.target.props) {
        // @ts-ignore
        option.value = this.target.props[option.property] || option.value
      } else if (option.target === 'bindMethodMap' && this.target.bindMethodMap) {
        option.value = this.target.bindMethodMap[option.property] || option.value
      }
      if (option.bindAble && option.bindProp) {
        const { variables } = useVisualGlobal()
        const variable = variables.find((v) => v.variableName === option.bindProp)
        option.value = variable?.defaultValue
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
    // @ts-ignore
    this.target.props = {}
    this.target.bindMethodMap = {}
    this.target.bindPropMap = {}
    const applyOptions = [...this.basicOptions, ...this.customOptions, ...this.bindOptions]
    applyOptions.forEach((option) => {
      if (option.bindAble && option.bindProp) {
        const { variables } = useVisualGlobal()
        const variable = variables.find((v) => v.variableName === option.bindProp)
        option.value = variable?.defaultValue
        // @ts-ignore
        this.target.bindPropMap[option.property] = option.bindProp
      }
      if (option.target === 'customStyle') {
        // @ts-ignore
        this.target.customStyle[option.property] = option.value
      } else if (option.target === 'layoutStyle') {
        // @ts-ignore
        this.target.layoutStyle[option.property] = option.value
      } else if (option.target === 'root') {
        // @ts-ignore
        this.target[option.property] = option.value
      } else if (option.target === 'props') {
        // @ts-ignore
        this.target.props[option.property] = option.value
      } else if (option.target === 'bindMethodMap') {
        // @ts-ignore
        this.target.bindMethodMap[option.property] = option.value
      }
    })
    console.log(this.target)
  }
}

export class VisualBoxExportJsonData {
  visualBoxTemplates: VisualBasic[] = []
  visaulBoxGlobalOption: VisualBoxGlobal

  constructor() {
    const { methods, variables } = useVisualGlobal()
    this.visaulBoxGlobalOption = { methods, variables }
  }
}
