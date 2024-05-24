<template>
  <div class="VadContainer select-none">
    <div class="p-4 vad-bg-color rounded-sm">
      <el-page-header @back="onBack">
        <template #title>{{ props.backTitle }}</template>
        <template #icon><Icon :icon="props.icon" /></template>
        <template #content>{{ showTitle }}</template>
        <template #extra><slot name="extra" /></template>
      </el-page-header>
    </div>
    <div class="mt-2 rounded-sm" :class="{ 'vad-bg-color': props.background }">
      <slot />
    </div>
    <template v-if="props.showFooter">
      <div class="mt-2 rounded-sm" :class="{ 'vad-bg-color': props.background }">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  backTitle?: string
  title?: string
  icon?: string
  background?: boolean
  showFooter?: boolean
  beforeBack?: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  backTitle: '返回',
  icon: 'line-md:arrow-small-left',
  title: '',
  background: false,
  showFooter: false,
  beforeBack: () => Promise.resolve(true),
})

const route = useRoute()

const showTitle = computed(() => props.title || route.meta.title || '页面标题')

const router = useRouter()
const onBack = async () => {
  if (typeof props.beforeBack === 'function') {
    const doBack = await props.beforeBack()
    if (!doBack) return
  }
  router.back()
}
</script>

<style scoped lang="scss"></style>
