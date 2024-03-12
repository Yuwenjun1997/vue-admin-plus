<template>
  <el-container class="visual-design-container">
    <el-aside class="vad-bg-color">
      <el-tabs v-model="activeTab1" stretch>
        <el-tab-pane label="组件库" name="Components">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="item in visualBoxComponents" :key="item.type" :name="item.type">
              <template #title>
                <span class="font-bold p-2">{{ item.title }}</span>
              </template>
              <div ref="visualGridItem" class="visualGridItem grid grid-cols-2 gap-2 p-2">
                <div
                  v-for="component in item.components"
                  :key="component.visualBoxKey"
                  class="visual-item"
                  :data-visual-box-key="component.visualBoxKey"
                >
                  <Icon v-if="component.visualBoxIcon" :icon="component.visualBoxIcon" />
                  <span class="ml-2">{{ component.visualBoxName }}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
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
        <el-tab-pane label="组件样式" name="ComponentStyle">
          <el-form
            v-if="activeVisualBox && activeVisualBox.render && activeVisualBox.render.props"
            class="p-2"
            label-position="left"
            label-width="100px"
            :modal="activeVisualBox.render.props"
            size="small"
          >
            <el-form-item v-for="item in activeVisualBox.render.options" :key="item.property" :label="item.label">
              <template v-if="item.formControlType === 'input'">
                <el-input v-model="item.value" />
              </template>
              <template v-if="item.formControlType === 'textarea'">
                <el-input v-model="item.value" type="textarea" />
              </template>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="组件数据" name="ComponentData">组件数据</el-tab-pane>
      </el-tabs>
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'
import { visualBoxComponents, templates } from '@/data/visual.data'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates, activeVisualBox } = storeToRefs(visualBoxStore)
visualBoxStore.initVisualBox(templates)
visualBoxStore.initVisualComponents(visualBoxComponents)

const activeTab1 = ref<string>('Components')
const activeTab2 = ref<string>('ComponentStyle')

const activeNames = ref<string[]>(['1'])

const visualGridItem = ref<HTMLElement[]>([])

onMounted(() => {
  if (!visualGridItem.value) return
  visualGridItem.value.forEach((item) => {
    new Sortable(item, {
      group: {
        name: 'shared',
        pull: 'clone',
        put: false,
      },
      animation: 100,
      fallbackOnBody: true,
      onEnd: (evt: Sortable.SortableEvent) => {
        nextTick(() => evt.item.remove())
        const visualboxkey = evt.item.dataset.visualBoxKey || ''
        const toKey = evt.to.dataset.visualBoxKey || ''
        const toIndex = evt.newIndex || 0
        visualBoxStore.addVisualBox(visualboxkey, toKey, toIndex)
      },
    })
  })
})
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

  :deep(.el-collapse-item__content) {
    padding-bottom: 8px;
  }

  .visual-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: var(--el-border-radius-base);
    border: 1px solid var(--el-border-color-light);
    cursor: pointer;
  }
}
</style>
