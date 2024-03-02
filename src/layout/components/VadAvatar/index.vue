<template>
  <el-dropdown :class="prefixCls + 'avatar'">
    <div class="flex items-center outline-none">
      <el-avatar :size="30" :src="avatarUrl" />
      <span class="mx-1">admin</span>
      <Icon icon="line-md:chevron-small-down" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <template #default>
            <Icon icon="line-md:account" />
            <span>个人中心</span>
          </template>
        </el-dropdown-item>
        <el-dropdown-item>
          <template #default>
            <Icon icon="line-md:logout" />
            <span>退出登录</span>
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { prefixCls } from '@/layout/config/index'
import { Icon } from '@iconify/vue'
const avatarUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
</script>
