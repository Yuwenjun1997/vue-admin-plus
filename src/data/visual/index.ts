import { VisualBasic, VisualBoxGroup } from '@/types/visual-box'
export { basicOptions } from './options/index'

const modules = import.meta.glob('./components/**/*.ts', { eager: true })
export const visualComponents: VisualBasic[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key] as any
  visualComponents.push(mod.default)
})

export const visualBasicGroupItems = visualComponents.filter((item) => item.visualBoxGroup === 'basic')
export const visualContainerGroupItems = visualComponents.filter((item) => item.visualBoxGroup === 'container')
export const visualFormGroupItems = visualComponents.filter((item) => item.visualBoxGroup === 'form')

export const visualComponentGroups: VisualBoxGroup[] = [
  { group: 'container', groupName: '容器组件', components: visualContainerGroupItems },
  { group: 'basic', groupName: '基础组件', components: visualBasicGroupItems },
  { group: 'form', groupName: '表单组件', components: visualFormGroupItems },
]
