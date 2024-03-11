<template>
  <div class="p-4 vad-bg-color">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <el-button type="primary">
          <template #icon><Icon icon="line-md:plus" /></template>
          <span>添加</span>
        </el-button>
        <el-button type="danger">
          <template #icon><Icon icon="ep:delete" /></template>
          <span>批量删除</span>
        </el-button>
      </div>
      <div class="flex items-center">
        <el-input class="!w-64 mr-3" placeholder="请输入内容" />
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <vxe-table
      align="center"
      border
      class="mt-4"
      :data="data"
      round
      :row-config="{ isCurrent: true, isHover: true }"
      size="mini"
      stripe
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-column type="seq" width="60" />
      <vxe-column field="nickname" resizable title="昵称" />
      <vxe-column title="邮箱" />
      <vxe-column title="角色" />
      <vxe-column title="修改时间" />
      <vxe-column title="操作" />
    </vxe-table>
  </div>
</template>

<script setup lang="ts" name="SettingUser">
import { Icon } from '@iconify/vue'

const data = ref<any[]>([{ nickname: '喻文俊' }, { nickname: '喻文俊' }])
</script>

<style scoped></style>
