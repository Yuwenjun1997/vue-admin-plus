<template>
  <div class="visual-preview-container" :style="pageStyles">
    <RenderBlocks v-if="currentPage" :blocks="currentPage.blocks" />
  </div>
</template>

<script setup lang="ts">
import { useVisualTheme } from '@/visual-editor/hooks/useVisualTheme'
import RenderBlocks from './components/RenderBlocks.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

const { currentPage } = storeToRefs(useVisualBoxStore())
const { setCurrentPage, setVisualStore } = useVisualBoxStore()
const { pageStyles } = useVisualTheme()

const init = () => {
  try {
    const currentPageStr = localStorage.getItem('currentPage')
    const storeStateStr = localStorage.getItem('storeState')
    if (!localStorage.getItem('storeState')) return
    const currentPage = currentPageStr ? JSON.parse(currentPageStr) : {}
    const storeState = storeStateStr ? JSON.parse(storeStateStr) : {}
    if (typeof currentPage === 'object') {
      setCurrentPage(currentPage)
    }
    if (typeof storeState === 'object') {
      setVisualStore(storeState)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  init()
})
</script>
