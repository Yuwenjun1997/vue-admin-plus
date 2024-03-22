<template>
  <el-dialog
    v-if="showSettingModal"
    v-model="showSettingModal"
    append-to-body
    destroy-on-close
    draggable
    title="全局设置"
    width="1200px"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="页面属性" name="property">页面属性</el-tab-pane>
      <el-tab-pane label="变量设置" name="variable">
        <VariablePanel />
      </el-tab-pane>
      <el-tab-pane label="事件管理" name="event">
        <MethodPanel />
      </el-tab-pane>
      <el-tab-pane label="接口设置" name="interface">接口设置</el-tab-pane>
      <el-tab-pane label="生命周期" name="lifeCycle">生命周期</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import VariablePanel from './VariablePanel.vue'
import MethodPanel from './MethodPanel.vue'

const showSettingModal = ref<boolean>(false)

const activeName = ref<string>('property')

const showModal = () => {
  activeName.value = 'property'
  showSettingModal.value = true
}

defineExpose({ showModal })
</script>

<style lang="scss" scoped></style>
