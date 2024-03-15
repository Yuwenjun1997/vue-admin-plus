<template>
  <Teleport :disabled="!props.isFullscreen" to="body">
    <div class="vad-full-screen" :class="{ active: props.isFullscreen }">
      <div class="vad-full-screen__container">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isFullscreen: boolean
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.vad-full-screen {
  height: 100%;

  .vad-full-screen__container {
    height: 100%;
  }

  &.active {
    .vad-full-screen__container {
      position: fixed;
      inset: 0;
      z-index: 999;
      background-color: var(--el-bg-color-page);
      overflow: auto;
    }
  }
}
</style>
