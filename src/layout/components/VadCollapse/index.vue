<template>
  <transition name="el-zoom-in-center">
    <div v-if="showMenu" :class="prefixCls + 'collapse__btn'" @click="toggle()">
      <Icon :class="prefixCls + 'tools-btn__icon'" :icon="collapseIcon" />
    </div>
  </transition>
</template>

<script setup lang="ts" name="VadCollapse">
import { Icon } from '@iconify/vue'
import { prefixCls } from '@/layout/config/index'
import { useMenuCollapse } from '@/layout/hooks/useMenuCollapse'

const { toggle, menuCollapse, showMenu } = useMenuCollapse()
const collapseIcon = computed(() => `line-md:menu-fold-${menuCollapse.value ? 'right' : 'left'}`)
</script>
