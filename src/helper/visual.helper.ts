import { VisualBasic, VisualBoxGlobal, VisualBoxOption, VisualBoxRenderOption } from '@/types/visual-box'
import { cloneDeep } from 'lodash'
import { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useVisualGlobal } from '@/store/modules/visual-global'
import { generateRandomFunctionName } from '@/utils'

export class VisualBoxTarget<T = any> {
  orderCount: number = 1
  target: VisualBasic<T>
  key: string
  name?: string
  basicOptions: VisualBoxOption[]
  customOptions: VisualBoxOption[]
  bindOptions: VisualBoxOption[]
  renderBasicOptions: VisualBoxRenderOption[]
  renderCustomOptions: VisualBoxRenderOption[]
  renderBindOptions: VisualBoxRenderOption[] = []

  constructor(target: VisualBasic<T>, basicOptions: VisualBoxOption[] = []) {
    this.target = target
    this.key = this.target.key
    this.name = this.target.name
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
      } else if (option.target === 'props' && this.target.props) {
        // @ts-ignore
        option.value = this.target.props[option.property] || option.value
      } else if (option.target === 'bindMethodMap' && this.target.bindMethodMap) {
        option.value = this.target.bindMethodMap[option.property] || option.value
      } else if (option.target === 'customMethod' && this.target.customMethod) {
        option.value = this.target.customMethod[option.property] || option.value
        option.bindMehodName = option.bindMehodName || generateRandomFunctionName()
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
    const customStyle: CSSProperties = {}
    const props: Record<string, any> = {}
    const bindMethodMap: Record<string, any> = {}
    const bindPropMap: Record<string, any> = {}
    const customMethod: Record<string, any> = {}

    // @ts-ignore
    this.target.props = this.target.props || {}
    this.target.customStyle = this.target.customStyle || {}
    this.target.bindPropMap = this.target.bindPropMap || {}
    this.target.bindMethodMap = this.target.bindMethodMap || {}
    this.target.customMethod = this.target.customMethod || {}

    const applyOptions = [...this.basicOptions, ...this.customOptions, ...this.bindOptions]
    applyOptions.forEach((option) => {
      if (option.bindAble && option.bindProp) {
        const { variables } = useVisualGlobal()
        const variable = variables.find((v) => v.variableName === option.bindProp)
        option.value = variable?.defaultValue
        // @ts-ignore
        bindPropMap[option.property] = option.bindProp
      }
      if (option.target === 'root') {
        // @ts-ignore
        this.target[option.property] = option.value
      } else if (option.target === 'customStyle') {
        // @ts-ignore
        customStyle[option.property] = option.value
      } else if (option.target === 'props') {
        props[option.property] = option.value
      } else if (option.target === 'bindMethodMap') {
        bindMethodMap[option.property] = option.value
      } else if (option.target === 'customMethod') {
        customMethod[option.property] = option.value
      }
    })

    // @ts-ignore
    Object.assign(this.target.props, props)
    Object.assign(this.target.customStyle, customStyle)
    Object.assign(this.target.bindPropMap, bindPropMap)
    Object.assign(this.target.bindMethodMap, bindMethodMap)
    Object.assign(this.target.customMethod, customMethod)
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
