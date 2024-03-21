import * as parse5 from 'parse5'
import { renderVisualBox } from './render'
import { getHtmlTemplate } from './template/html-code'
import { getVue2Template } from './template/vue2-code'
import { getVue3Template } from './template/vue3-code'
import { getPreviewTemplate } from './template/preview-code'
import { isNumberStr } from '@/utils'
import { VisualBasic } from '@/types/visual-box'

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

let flatVisualBoxs: VisualBasic[] = []

const FILTER_ATTR_NAMES = ['style', 'id', 'title', 'data-visual-box-key']
const CLASS_NAME_PREFIX = 'gen_'
let CLASS_NAME_INDEX = 0

let styleSheetList: Record<string, string>[] = []

let nodeList: Parse5Node[] = []

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

function handleEvents(node: Parse5Node) {
  const visualBoxKey = node.attrs.find((attr) => attr.name === 'data-visual-box-key')?.value
  if (!visualBoxKey) return
  const visualBox = flatVisualBoxs.find((item) => item.visualBoxKey === visualBoxKey)
  if (!visualBox || !visualBox.methods) return
  Object.keys(visualBox.methods).forEach((key) => {
    const [trigger, methodName] = key.split(':')
    node.attrs.push({ name: `@${trigger}`, value: methodName })
  })
}

function traverseAST(node: Parse5Node) {
  nodeList.push(node)
  if (node.attrs) {
    handleEvents(node)
    handleClassAndStyle(node)
    node.attrs = node.attrs.filter((attr) => attr.value && !FILTER_ATTR_NAMES.includes(attr.name))
    node.attrs = node.attrs.filter((attr) => attr.value !== 'false')
    node.attrs.forEach((attr) => {
      if (attr.value === 'true' || isNumberStr(attr.value)) {
        attr.name = `:${attr.name}`
      }
    })
  }
  if (node.childNodes) {
    node.childNodes.forEach((childNode) => traverseAST(childNode))
  }
}

function genCssSheet() {
  return styleSheetList.map((item) => `.${item.className} { \n ${item.style} }`).join('')
}

function genVueMethods(type: 'vue2' | 'vue3') {
  const methodNames: string[] = []
  const methodTokens = flatVisualBoxs.map((template) => {
    if (!template.methods) return []
    const names: string[] = Object.keys(template.methods)
    methodNames.push(...names.map((key) => key.split(':')[1]))
    return names.map((key) => {
      const fnName = key.split(':')[1]
      return `${type === 'vue3' ? 'function ' : ''}${fnName}() { \n ${template.methods && template.methods[key]} \n }`
    })
  })
  return { methodNames, methodTokens: methodTokens.filter((item) => item.length > 0) }
}

function genSetup(templates: VisualBasic[]): Parse5Node {
  CLASS_NAME_INDEX = 0
  styleSheetList = []
  nodeList = []
  flatVisualBoxs = templates
  const htmlStr = renderVisualBox()
  const rootNode: Parse5Node = parse5.parseFragment(htmlStr) as unknown as Parse5Node
  traverseAST(rootNode)
  return rootNode
}

export function genHtml(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const { methodNames, methodTokens } = genVueMethods('vue3')
  const methodStr = methodTokens.map((item) => item.join('\n')).join('\n')
  const templateStr = parse5.serialize(rootNode as any)
  return {
    html: getHtmlTemplate(templateStr, methodStr, methodNames),
    css: genCssSheet(),
  }
}

export function genVue(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const vue2MethodTokens = genVueMethods('vue2').methodTokens
  const vue2MethodStr = vue2MethodTokens.map((item) => item.join(',')).join(',')
  const vue3MethodTokens = genVueMethods('vue3').methodTokens
  const vue3MethodStr = vue3MethodTokens.map((item) => item.join('\n')).join('\n')
  const templateStr = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  return {
    vue2: getVue2Template(templateStr, styleSheet, vue2MethodStr),
    vue3: getVue3Template(templateStr, styleSheet, vue3MethodStr),
  }
}

export function genPreviewHtml(templates: VisualBasic[]) {
  const rootNode = genSetup(templates)
  const templateStr = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  const { methodNames, methodTokens } = genVueMethods('vue3')
  const methodStr = methodTokens.map((item) => item.join('\n')).join('\n')
  return getPreviewTemplate(templateStr, styleSheet, methodStr, methodNames)
}
