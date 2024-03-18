<template>
  <div ref="target">
    <transition name="el-fade-in-linear">
      <div v-if="targetIsVisible || defaultVisibility">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  defaultVisibility?: boolean
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), { once: true, defaultVisibility: false })

const target = ref<HTMLElement>()

const targetIsVisible = ref(false)

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
  props.once && isIntersecting && stop()
})
</script>

<style scoped></style>
