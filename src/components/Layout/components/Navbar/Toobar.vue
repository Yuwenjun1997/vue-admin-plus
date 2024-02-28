<template>
  <div class="xy-toolbar">
    <el-tooltip effect="dark" content="全屏">
      <Icon class="xy-toolbar__icon" icon="material-symbols:fullscreen" />
    </el-tooltip>
    <el-tooltip effect="dark" content="退出全屏">
      <Icon class="xy-toolbar__icon" icon="material-symbols:fullscreen-exit" />
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新">
      <Icon class="xy-toolbar__icon" icon="material-symbols:refresh" />
    </el-tooltip>
    <el-tooltip effect="dark" content="消息通知">
      <Icon class="xy-toolbar__icon" icon="line-md:bell-loop" />
    </el-tooltip>
    <el-tooltip effect="dark" content="主题设置">
      <Icon class="xy-toolbar__icon" icon="line-md:discord" />
    </el-tooltip>
    <el-tooltip effect="dark" content="访问GitHub">
      <Icon class="xy-toolbar__icon" icon="line-md:github-loop" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped lang="scss">
.xy-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;

  .xy-toolbar__icon {
    font-size: 20px;
    color: var(--xy-layout-toolbar-color);
    cursor: pointer;
    outline: none;
  }
}
</style>
