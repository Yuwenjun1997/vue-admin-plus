import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { VisualEditorBlockData } from '../types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash'
import { generateNanoid } from '../visual-editor.utils'

const moveComponet = (blocks: VisualEditorBlockData[], formIndex: number, toIndex: number) => {
  const element = blocks.splice(formIndex, 1)[0]
  blocks.splice(toIndex, 0, element)
}

export const useVisualUtils = () => {
  const { currentBlock, visualEditor, currentPage, isDrag } = storeToRefs(useVisualBoxStore())
  const { setCurrentBlock } = useVisualBoxStore()

  const isActive = (block: VisualEditorBlockData) => currentBlock.value && currentBlock.value._vid === block._vid

  const hasSlots = (block: VisualEditorBlockData) => Object.keys(block.slots).length > 0

  const findVisualWrap = (components: VisualEditorBlockData[]) => {
    let blocks: VisualEditorBlockData[] = []
    let currentIndex: number = 0
    let parent: VisualEditorBlockData | null = null

    const recursion = (components: VisualEditorBlockData[], prevParent: VisualEditorBlockData | null) => {
      components.forEach((item, index) => {
        if (item._vid === currentBlock.value?._vid) {
          blocks = components
          currentIndex = index
          parent = prevParent
        } else if (item.slots && Object.keys(item.slots).length) {
          Object.entries(item.slots).forEach(([_key, value]) => recursion(value.children, item))
        }
      })
    }
    recursion(components, null)
    return { blocks, currentIndex, parent }
  }

  const moveUp = () => {
    if (!currentPage.value) return
    if (!currentBlock.value) return ElMessage.warning('请先选中一个组件')
    const { currentIndex, blocks } = findVisualWrap(currentPage.value.blocks)
    if (currentIndex === 0) return ElMessage.warning('当前组件已在第一个位置')
    moveComponet(blocks, currentIndex, currentIndex - 1)
  }

  const moveDown = () => {
    if (!currentPage.value) return
    if (!currentBlock.value) return ElMessage.warning('请先选中一个组件')
    const { currentIndex, blocks } = findVisualWrap(currentPage.value.blocks)
    if (currentIndex === blocks.length - 1) return ElMessage.warning('当前组件已在最后一个位置')
    moveComponet(blocks, currentIndex, currentIndex + 1)
  }

  const clone = () => {
    if (!currentPage.value) return
    if (!currentBlock.value) return ElMessage.warning('请先选中一个组件')
    const updateVid = (clone: VisualEditorBlockData) => {
      clone._vid = `vid_${generateNanoid()}`
      Object.entries(clone.slots).forEach(([_key, value]) => value.children.forEach(updateVid))
    }
    const clone = cloneDeep(currentBlock.value)
    updateVid(clone)
    const { currentIndex, blocks } = findVisualWrap(currentPage.value.blocks)
    blocks.splice(currentIndex + 1, 0, clone)
    setCurrentBlock(clone)
  }

  const deleteFn = () => {
    if (!currentBlock.value) return ElMessage.warning('请先选中一个组件')
    ElMessageBox.confirm('确定删除该组件吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        if (!currentPage.value) return
        const { currentIndex, blocks } = findVisualWrap(currentPage.value.blocks)
        blocks.splice(currentIndex, 1)
        currentBlock.value = null
        visualEditor.value = null
      })
      .catch(() => {})
  }

  const activeParent = () => {
    if (!currentPage.value) return
    if (!currentBlock.value) return ElMessage.warning('请先选中一个组件')
    const { parent } = findVisualWrap(currentPage.value.blocks)
    if (!parent) return ElMessage.warning('已经是顶级组件')
    currentBlock.value.isActive = false
    setCurrentBlock(parent)
  }

  const clear = () => {
    if (currentPage.value) {
      currentPage.value.blocks = []
    }
    currentBlock.value = null
    visualEditor.value = null
  }

  const dragStart = () => {
    isDrag.value = true
  }

  const dragEnd = () => {
    isDrag.value = false
  }

  return {
    isActive,
    hasSlots,
    moveUp,
    moveDown,
    clone,
    deleteFn,
    activeParent,
    clear,
    dragStart,
    dragEnd,
  }
}
