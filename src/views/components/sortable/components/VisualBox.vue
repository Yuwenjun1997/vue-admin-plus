<template>
  <div class="visual-box p-4" :class="{ active: isActive }" @click.stop="toggleActive(props.template)">
    <div ref="visualBoxWrap" class="visual-box__wrap">
      <slot />
    </div>
    <div v-show="isActive" class="visual-box__tools" @click.stop>
      <template v-if="!isRoot">
        <Icon class="visual-box__tools--control move" icon="bi:arrows-move" />
      </template>
      <Icon class="visual-box__tools--control" icon="ep:delete" />
      <template v-if="!isRoot">
        <Icon class="visual-box__tools--control" icon="line-md:arrow-up" />
      </template>
      <template v-if="!isRoot">
        <Icon class="visual-box__tools--control" icon="line-md:arrow-down" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { VisualBoxTemplate } from '@/types/visual-box'
import { Icon } from '@iconify/vue'
import Sortable from 'sortablejs'

interface Props {
  template: VisualBoxTemplate
}

const props = defineProps<Props>()

const { toggleActive } = useVisualBoxStore()

const isActive = computed(() => props.template.isActive)
const isRoot = computed(() => props.template.isRoot)

const visualBoxWrap = ref<HTMLElement>()

onMounted(() => {
  if (!visualBoxWrap.value) return
  new Sortable(visualBoxWrap.value, {
    group: 'shared',
    animation: 300,
    handle: '.visual-box__tools--control.move',
  })
})
</script>

<style scoped lang="scss">
.visual-box {
  $outline-width: 2px;
  min-height: 40px;
  position: relative;

  &.active {
    outline: $outline-width solid var(--el-color-primary);
  }

  &__wrap {
    position: relative;
  }

  &__tools {
    position: absolute;
    padding: 4px;
    top: 0;
    left: -$outline-width;
    transform: translateY(calc(-100% - #{$outline-width}));
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-bottom: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    &--control {
      cursor: pointer;
      transition: var(--el-transition-all);

      &.move {
        cursor: move;
      }

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
