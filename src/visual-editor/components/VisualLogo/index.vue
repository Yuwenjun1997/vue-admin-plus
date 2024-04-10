<template>
  <div class="VisualLogo flex items-center">
    <img alt="" src="/vite.svg" />
    <div class="ml-2">
      <div>可视化设计</div>
      <div class="VisualLogo-en">visual design</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.VisualLogo {
  font-size: var(--el-font-size-extra-large);
  color: var(--el-text-color-regular);

  .VisualLogo-en {
    color: var(--el-text-color-secondary);
    font-size: 10px;
    text-align: justify;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 2px;
  }
}
</style>
