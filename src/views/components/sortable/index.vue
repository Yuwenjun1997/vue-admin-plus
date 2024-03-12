<template>
  <el-container class="visual-design-container">
    <el-aside class="vad-bg-color">
      <el-tabs v-model="activeTab1" stretch>
        <el-tab-pane label="组件库" name="Components">
          <VisualComponents />
        </el-tab-pane>
        <el-tab-pane label="模板" name="Templates">模板</el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-container>
      <el-header class="vad-bg-color" />
      <el-main class="!p-0">
        <el-scrollbar height="100%">
          <div class="p-2">
            <div class="vad-bg-color">
              <VisualBoxRender
                v-for="template in visualBoxTemplates"
                :key="template.visualBoxKey"
                :template="template"
              />
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-aside class="vad-bg-color">
      <el-tabs v-model="activeTab2" stretch>
        <el-tab-pane label="组件属性" name="ComponentStyle">
          <template v-if="activeVisualBox && activeVisualBox.options">
            <div v-for="(item, index) in activeVisualBox.options" :key="index">
              <el-divider>{{ item.title }}</el-divider>
              <VisualOptionsRender :options="item.options" @change="handleOptionsChange" />
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="组件内容" name="ComponentData">
          <template v-if="activeVisualBox && activeVisualBox.propOptions">
            <VisualOptionsRender :options="activeVisualBox.propOptions" @change="handlePropOptionsChange" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import VisualComponents from './components/VisualComponents.vue'
import VisualOptionsRender from './components/VisualOptionsRender.vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'
import { visualBoxComponents, templates } from '@/data/visual.data'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates, activeVisualBox } = storeToRefs(visualBoxStore)
visualBoxStore.initVisualBox(templates)
visualBoxStore.initVisualComponents(visualBoxComponents)

const activeTab1 = ref<string>('Components')
const activeTab2 = ref<string>('ComponentStyle')

const handlePropOptionsChange = () => {
  if (!activeVisualBox.value) return
  visualBoxStore.updateVisualBoxProps(activeVisualBox.value)
}

const handleOptionsChange = () => {
  if (!activeVisualBox.value) return
  visualBoxStore.updateVisualBoxOption(activeVisualBox.value)
}
</script>

<style lang="scss" scoped>
.visual-design-container {
  height: 100%;

  .el-aside {
    --el-aside-width: 260px;
  }

  .el-header {
    --el-header-height: 38px;
  }
}
</style>
