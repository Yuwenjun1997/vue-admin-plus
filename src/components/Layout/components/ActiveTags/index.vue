<template>
  <el-tabs type="card" class="xy-active-tags" closable v-model="activeTab">
    <el-tab-pane :label="item.title" :name="item.name" v-for="item in list" :key="item.name"></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
const activeTab = ref('first')

const list = ref([
  {
    title: '工作台',
    name: 'first',
  },
  {
    title: '收银开单',
    name: 'second',
  },
])
</script>

<style scoped lang="scss">
.xy-active-tags {
  --el-tabs-header-height: 30px;
  height: var(--xy-layout-active-tags-height);
  padding-top: calc(var(--xy-layout-active-tags-height) - var(--el-tabs-header-height));
  border: 0;
  border-top: 1px var(--el-border-color) var(--el-border-style);
  background: transparent;

  :deep(.el-tabs__content) {
    display: none;
  }

  :deep(.el-tabs__header) {
    border-bottom: 0;
    margin-bottom: 0;
    background-color: transparent;

    .el-tabs__nav-wrap {
      margin-bottom: 0;

      .el-tabs__nav {
        border: 0;
      }

      .el-tabs__item {
        border: 0;
        mask: url('@/assets/mask.png');
        mask-size: 100% 100%;

        &:nth-child(1) {
          margin-left: 0;
        }

        &.is-active {
          background-color: var(--el-menu-hover-bg-color) !important;
        }

        &:hover {
          background-color: #f1f1f1;
        }
      }
    }
  }
}
</style>
