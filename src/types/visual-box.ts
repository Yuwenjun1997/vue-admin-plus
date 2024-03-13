import { CSSProperties } from 'vue'

interface VisualBoxRenderOption {
  groupName: string
  options: VisualBoxOption[]
}

export interface VisualBasic<T = any> {
  visualBoxKey: string
  visualBoxName?: string
  visualBoxCover?: string
  visualBoxIcon?: string
  showTools?: boolean
  isDraggable?: boolean
  isDeletable?: boolean
  isEditable?: boolean
  isRoot?: boolean
  isActive?: boolean
  isLocked?: boolean
  disabled?: boolean
  layoutStyle?: CSSProperties
  layoutClassList?: string[]
  style?: CSSProperties
  classList?: string[]
  component?: string
  props?: T
  propsOptions?: VisualBoxOption[]
  options?: VisualBoxOption[]
  children?: VisualBasic[]
}

export interface VisualBoxOptionItem {
  label: string
  value: string
}

export interface VisualBoxOption {
  formType: string
  groupName: string
  target: 'style' | 'props' | 'root'
  label: string
  property: string
  value?: any
  options?: VisualBoxOptionItem[]
  disabled?: boolean
  required?: boolean
}

export interface VisualBoxComponents {
  type: string
  title: string
  components: VisualBasic[]
}

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
    this.options = basicOptions.concat(target.options || [])
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
      if (option.target === 'style' && this.target.style) {
        option.value = this.target.style[option.property as keyof CSSProperties]
      }
      const group = results.find((r) => r.groupName === option.groupName)
      if (group) {
        group.options.push(option)
      } else {
        results.push({ groupName: option.groupName, options: [option] })
      }
    })
    return results
  }

  applyOptions() {
    this.target.style = {}
    this.options.forEach((option) => {
      if (option.target === 'style') {
        // @ts-ignore
        this.target.style[option.property] = option.value
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
        results.push({ groupName: option.groupName, options: [option] })
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
