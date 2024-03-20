import * as parse5 from 'parse5'
import { renderVisualBox } from './render'
import { getHtmlTemplate } from './template/html-code'
import { getVue2Template } from './template/vue2-code'
import { getVue3Template } from './template/vue3-code'
import { getPreviewTemplate } from './template/preview-code'

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

const FILTER_ATTR_NAMES = ['data-visual-box-key', 'style', 'id', 'title', 'draggable']
const CLASS_NAME_PREFIX = 'gen_'
let CLASS_NAME_INDEX = 0

const styleSheetMap = new Map()

const nodeList: Parse5Node[] = []

function handleClassAndStyle(node: Parse5Node) {
  const style = node.attrs.find((attr) => attr.name === 'style')
  if (!style || !style.value) return
  style.value = style.value.replace(/(^|[\s;])\S+:\s*(normal|none|unset);/g, '')
  if (!style.value.trim()) return
  const className = `${CLASS_NAME_PREFIX}${++CLASS_NAME_INDEX}`
  const classAttr = node.attrs.find((attr) => attr.name === 'class')
  styleSheetMap.set(className, style.value)
  if (classAttr) {
    classAttr.value = `${classAttr.value} ${className}`
  } else {
    node.attrs.push({ name: 'class', value: className })
  }
}

function traverseAST(node: Parse5Node) {
  nodeList.push(node)
  if (node.attrs) {
    handleClassAndStyle(node)
    node.attrs = node.attrs.filter((attr) => attr.value && !FILTER_ATTR_NAMES.includes(attr.name))
  }
  if (node.childNodes) {
    node.childNodes.forEach((childNode) => traverseAST(childNode))
  }
}

function genCssSheet() {
  return Array.from(styleSheetMap.keys())
    .map((className) => `.${className} { \n ${styleSheetMap.get(className)} }`)
    .join('')
}

export function genHtml() {
  CLASS_NAME_INDEX = 0
  styleSheetMap.clear()
  const htmlStr = renderVisualBox()
  const rootNode: Parse5Node = parse5.parseFragment(htmlStr, {}) as unknown as Parse5Node
  traverseAST(rootNode)
  return {
    html: getHtmlTemplate(parse5.serialize(rootNode as any)),
    css: genCssSheet(),
  }
}

export function genVue() {
  CLASS_NAME_INDEX = 0
  styleSheetMap.clear()
  const htmlStr = renderVisualBox()
  const rootNode: Parse5Node = parse5.parseFragment(htmlStr, {}) as unknown as Parse5Node
  traverseAST(rootNode)
  const templateStr = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  return {
    vue2: getVue2Template(templateStr, styleSheet),
    vue3: getVue3Template(templateStr, styleSheet),
  }
}

export function genPreviewHtml() {
  CLASS_NAME_INDEX = 0
  styleSheetMap.clear()
  const htmlStr = renderVisualBox()
  const rootNode: Parse5Node = parse5.parseFragment(htmlStr, {}) as unknown as Parse5Node
  traverseAST(rootNode)
  const templateStr = parse5.serialize(rootNode as any)
  const styleSheet = genCssSheet()
  return getPreviewTemplate(templateStr, styleSheet)
}
