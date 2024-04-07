import { VisualBasic, VisualBoxGroup, VisualOptionMap } from '@/types/visual-box'
export { basicOptions } from './options/index'

const modules = import.meta.glob('./components/**/*.ts', { eager: true })
export const visualComponents: VisualBasic[] = []
export const visualOptionMap: Map<string, VisualOptionMap> = new Map()

Object.keys(modules).forEach((key) => {
  const mod = modules[key] as any
  const component = mod.default.component
  visualComponents.push(mod.default.component)
  visualOptionMap.set(component.name, {
    name: component.name,
    options: mod.default.options || [],
    bindOptions: mod.default.bindOptions || [],
  })
})

export const visualBasicGroupItems = visualComponents.filter((item) => item.group === 'basic')
export const visualContainerGroupItems = visualComponents.filter((item) => item.group === 'container')

console.log(visualOptionMap)

export const visualComponentGroups: VisualBoxGroup[] = [
  { group: 'container', groupName: '容器组件', components: visualContainerGroupItems },
  { group: 'basic', groupName: '基础组件', components: visualBasicGroupItems },
]
