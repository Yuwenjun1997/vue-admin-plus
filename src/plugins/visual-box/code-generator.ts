import * as parse5 from 'parse5'
import { renderVisualBox } from './render'
import { getHtmlTemplate } from './template/html-code'
import { getVue2Template } from './template/vue2-code'
import { getVue3Template } from './template/vue3-code'
import { getPreviewTemplate } from './template/preview-code'
import { isNumberStr } from '@/utils'
import { VisualBasic, VisualBoxBindMethod, VisualBoxBindPropOption } from '@/types/visual-box'
import { storeToRefs } from 'pinia'
import { useVisualGlobal } from '@/store/modules/visual-global'
import { groupBy, map, unionBy } from 'lodash'

interface Parse5Node {
  mode?: string
  attrs: { [key: string]: string }[]
  childNodes: Parse5Node[]
  nodeName: string
  tagName: string
  namespaceURI?: string
  parentNode?: Parse5Node
  value?: string
}

const { methods: globalMethods, variables: globalVariables } = storeToRefs(useVisualGlobal())

const FILTER_ATTR_NAMES = ['style', 'id', 'title', 'data-visual-box-key']
const CLASS_NAME_PREFIX = 'gen_'
let CLASS_NAME_INDEX = 0

let styleSheetList: Record<string, string>[] = []

let bindProps: VisualBoxBindPropOption[] = []

let BIND_METHOD_INDEX = 0
let bindMethods: VisualBoxBindMethod[] = []

// 将style抽离出来生成class
function handleClassAndStyle(node: Parse5Node) {
  const style = node.attrs.find((attr) => attr.name === 'style')
  if (!style || !style.value) return
  style.value = style.value.replace(/(^|[\s;])\S+:\s*(normal|none|unset);/g, '')
  if (!style.value.trim()) return
  const item = styleSheetList.find((item) => item.style === style.value)
  const className = item ? item.className : `${CLASS_NAME_PREFIX}${++CLASS_NAME_INDEX}`
  const classAttr = node.attrs.find((attr) => attr.name === 'class')
  if (!item) {
    styleSheetList.push({ className: className, style: style.value })
  }
  if (classAttr) {
    classAttr.value = `${classAttr.value} ${className}`.trim()
  } else {
    node.attrs.push({ name: 'class', value: className })
  }
}

// 处理事件
function handleEvents(node: Parse5Node) {
  const visualBoxKey = node.attrs.find((attr) => attr.name === 'data-visual-box-key')?.value
  if (!visualBoxKey) return
  const bindMethodList = bindMethods.filter((item) => item.visualBoxKey === visualBoxKey)
  bindMethodList.forEach((method) => {
    if (!method.bindMethodName) return
    node.attrs.push({ name: `@${method.trigger}`, value: method.bindMethodName })
  })
  // 合并同名属性
  node.attrs = map(groupBy(node.attrs, 'name'), (values, name) => ({ name, value: map(values, 'value').join(',') }))
}

// 递归处理ast
function traverseAST(node: Parse5Node) {
  if (node.attrs) {
    handleEvents(node)
    handleClassAndStyle(node)
    node.attrs = node.attrs.filter((attr) => attr.value && !FILTER_ATTR_NAMES.includes(attr.name))
    node.attrs = node.attrs.filter((attr) => attr.value !== 'false')
    node.attrs.forEach((attr) => {
      const bindProp = bindProps.find((item) => item.propName === attr.name)
      if (bindProp && bindProp.bindPropName) {
        attr.name = `:${attr.name}`
        attr.value = bindProp.bindPropName
      } else if (attr.value === 'true' || isNumberStr(attr.value)) {
        attr.name = `:${attr.name}`
      }
    })
  }
  if (node.childNodes) {
    node.childNodes.forEach((childNode) => traverseAST(childNode))
  }
}

// 生成样式表
function genCssSheet() {
  return styleSheetList.map((item) => `.${item.className} { \n ${item.style} }`).join('')
}

// 生成vue对应版本的method tokens并返回全部methodNames
function genVueMethodTokens(type: 'vue2' | 'vue3') {
  const methods = unionBy(bindMethods, 'methodName') // 去重
  const methodNames: string[] = methods.map((item) => item.methodName || '').filter((item) => item)
  const methodTokens = methods.map((item) => {
    if (!item.bindMethodName) return ''
    return `${type === 'vue3' ? 'function ' : ''}${item.bindMethodName}{${item.methodToken}\n}`
  })
  return { methodNames, methodTokens: methodTokens.filter((item) => item.length > 0) }
}

// 处理函数绑定
function handleBindMethods(template: VisualBasic) {
  if (!template.methods) return
  Object.keys(template.methods).forEach((key) => {
    const [prefix, suffix] = key.split(':')
    const value = template.methods && template.methods[key]
    if (!value) return
    if (prefix === '#bind') {
      const globalMethod = globalMethods.value.find((m) => m.methodName === value)
      if (!globalMethod) return
      bindMethods.push({
        trigger: globalMethod.trigger,
        methodName: globalMethod.methodName,
        bindMethodName: `${globalMethod.methodName}($evt${globalMethod.params})`,
        visualBoxKey: template.visualBoxKey,
        methodToken: globalMethod.methodToken,
      })
    } else {
      const methodName = `${suffix}_${++BIND_METHOD_INDEX}`
      bindMethods.push({
        trigger: prefix,
        methodName: methodName,
        bindMethodName: `${methodName}($evt)`,
        visualBoxKey: template.visualBoxKey,
        methodToken: value,
      })
    }
  })
}

// 处理属性绑定
function handleBindProps(template: VisualBasic) {
  if (!template.bindProps) return
  Object.keys(template.bindProps).forEach((key) => {
    const bindPropName = template.bindProps && template.bindProps[key]
    if (!bindPropName) return
    const globalVariable = globalVariables.value.find((v) => v.variableName === bindPropName)
    if (!globalVariable) return
    bindProps.push({
      propName: key,
      bindPropName: bindPropName,
      propType: globalVariable.valueType,
      defaultValue: globalVariable.defaultValue,
      visualBoxKey: template.visualBoxKey,
    })
  })
}

// 处理属性值
export function genPropValue(prop: VisualBoxBindPropOption) {
  const { defaultValue, propType } = prop
  if (propType === 'string') return `'${defaultValue}'`
  return defaultValue
}

// 初始化并返回处理后的node
function genSetup(templates: VisualBasic[]): Parse5Node {
  BIND_METHOD_INDEX = 0
  CLASS_NAME_INDEX = 0
  styleSheetList = []
  bindProps = []
  bindMethods = []
  templates.forEach((template) => {
    handleBindMethods(template)
    handleBindProps(template)
  })
  const htmlStr = renderVisualBox()
  const rootNode: Parse5Node = parse5.parseFragment(htmlStr) as unknown as Parse5Node
  traverseAST(rootNode)
  return rootNode
}

// 生成html版本的vue文件
export function genHtml(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const { methodNames, methodTokens } = genVueMethodTokens('vue3')
  const template = parse5.serialize(rootNode as any)
  return {
    html: getHtmlTemplate(template, bindProps, methodNames, methodTokens),
    css: genCssSheet(),
  }
}

// 生成工程化vue2 sfc文件
export function genVue2(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const { methodTokens } = genVueMethodTokens('vue2')
  const template = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  return getVue2Template(template, styleSheet, bindProps, methodTokens)
}

// 生成工程化vue3 sfc文件
export function genVue3(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const { methodTokens } = genVueMethodTokens('vue3')
  const template = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  return getVue3Template(template, styleSheet, bindProps, methodTokens)
}

// 生成预览(html版本)
export function genPreviewHtml(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const { methodNames, methodTokens } = genVueMethodTokens('vue3')
  const template = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  return getPreviewTemplate(template, styleSheet, bindProps, methodNames, methodTokens)
}
