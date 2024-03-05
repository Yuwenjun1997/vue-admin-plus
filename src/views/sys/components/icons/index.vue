<template>
  <div class="p-4 rounded-sm vad-bg-color">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="whitespace-nowrap">图标名称</span>
        <el-input v-model="keyword" class="!w-48" />
        <el-button type="primary" @click="onSearch()">
          <template #icon>
            <Icon icon="line-md:search-twotone" />
          </template>
          <span>搜索</span>
        </el-button>
      </div>
      <div class="flex items-center gap-2">
        <span>仅拷贝名称</span>
        <el-switch v-model="onlyName" />
      </div>
      <div class="flex items-center gap-2">
        <span>多彩图标</span>
        <el-switch v-model="dye" />
      </div>
    </div>

    <el-alert class="!mt-4" title="请点击图标复制到剪切板" type="success" />

    <div class="grid gap-4 lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 mt-4">
      <div v-for="icon in icons" :key="icon" class="text-center cursor-pointer">
        <div class="flex flex-col items-center justify-center py-3 border" @click="copyIcon(icon)">
          <Icon class="text-2xl" :icon="icon" :style="{ color: dyeIcon() }" />
        </div>
      </div>
    </div>

    <div class="flex items-start justify-center mt-4">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :page-size="pageSize"
        :total="iconTotal"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIconList } from '@/hooks/useIconList'
import { Icon } from '@iconify/vue'

const iconListUtils = useIconList()
const { pageSize, iconTotal, icons, keyword, onlyName, dye } = iconListUtils
const { dyeIcon, copyIcon, onCurrentChange, onSearch } = iconListUtils
</script>

<style scoped></style>
