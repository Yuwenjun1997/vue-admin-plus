import * as parse5 from 'parse5'

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

const FILTER_ATTR_NAMES = ['data-visual-box-key', 'style', 'id', 'title']
const CLASS_NAME_PREFIX = 'gen_'
let CLASS_NAME_INDEX = 0

const styleSheetMap = new Map()

const nodeList: Parse5Node[] = []

function handleHtmlHead(node: Parse5Node) {
  node.childNodes.push({
    nodeName: 'link',
    tagName: 'link',
    attrs: [
      { name: 'rel', value: 'stylesheet' },
      { name: 'href', value: '//unpkg.com/element-plus/dist/index.css' },
    ],
    namespaceURI: 'http://www.w3.org/1999/xhtml',
    childNodes: [],
  })
}

function handleClassAndStyle(node: Parse5Node) {
  const style = node.attrs.find((attr) => attr.name === 'style')
  if (!style || !style.value) return
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
  if (node.nodeName === 'html') {
    node.attrs.push({ name: 'lang', value: 'en' })
  }
  if (node.nodeName === 'head') {
    handleHtmlHead(node)
  }
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
    .map((className) => `.${className} { ${styleSheetMap.get(className)} }`)
    .join('')
}

export function genHtml(htmlStr: string) {
  CLASS_NAME_INDEX = 0
  styleSheetMap.clear()
  const rootNode: Parse5Node = parse5.parse(htmlStr, {}) as unknown as Parse5Node
  traverseAST(rootNode)
  return {
    html: `<!DOCTYPE html>${parse5.serialize(rootNode as any)}`,
    css: genCssSheet(),
  }
}

export function genVue(htmlStr: string) {
  CLASS_NAME_INDEX = 0
  styleSheetMap.clear()
  const rootNode: Parse5Node = parse5.parseFragment(htmlStr, {}) as unknown as Parse5Node
  traverseAST(rootNode)
  return {
    vue2: `
          <template>
            ${parse5.serialize(rootNode as any)}
          </template>

          <script>
            export default {
              props:{},
              data(){
                return {}
              },
              created(){
                console.log('created')
              },
              mounted(){
                console.log('mounted')
              },
              methods:{}
            }
          </script>

          <style scoped>
            ${genCssSheet()}
          </style>
          `,
    vue3: `
          <template>
            ${parse5.serialize(rootNode as any)}
          </template>

          <script lang="ts" setup>
          // TODO anything...
          </script>

          <style scoped>
            ${genCssSheet()}
          </style>
          `,
  }
}
