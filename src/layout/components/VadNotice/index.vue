<template>
  <el-tooltip :class="prefixCls + 'notice'" content="消息通知" effect="dark">
    <Icon :class="prefixCls + 'tools-btn__icon'" icon="line-md:bell-loop" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { prefixCls } from '@/layout/config/index'
</script>
