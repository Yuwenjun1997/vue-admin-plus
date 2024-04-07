<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <VisualCenter class="VisualCenterPanel-wrap" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  background-color: var(--el-bg-color);
  padding: 2px;

  &.pc {
    width: 100%;
  }

  &.h5 {
    width: 390px;
  }

  &.pad {
    width: 768px;
  }
}

:deep(.el-loading-mask) {
  background-color: transparent !important;
}

.el-scrollbar {
  :deep(.el-scrollbar__view) {
    min-height: calc(100% - 4px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
