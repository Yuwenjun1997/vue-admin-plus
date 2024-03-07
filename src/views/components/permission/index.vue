<template>
  <div class="p-4 vad-bg-color">
    <div class="mb-2">账号切换</div>
    <el-radio-group v-model="accountRole">
      <el-radio-button label="admin" value="admin" />
      <el-radio-button label="editor" value="editor" />
      <el-radio-button label="test" value="test" />
    </el-radio-group>
    <div class="mt-4 mb-2">当前账号</div>
    <el-table border :data="tableData" style="width: 800px">
      <el-table-column label="角色" prop="roles" width="240">
        <template #default="{ row }">
          <el-tag>{{ row.roles }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限" prop="permissions">
        <template #default="{ row }">
          <el-tag>{{ row.permissions }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 mb-2">按钮权限</div>
    <div class="flex items-center gap-4">
      <VadPermission permission="settings:add" :show-tip="false">
        <el-button type="primary">拥有settings:add权限的按钮</el-button>
      </VadPermission>
      <VadPermission permission="settings:edit" :show-tip="false">
        <el-button type="warning">拥有settings:edit权限的按钮</el-button>
      </VadPermission>
    </div>
    <div class="mt-4 mb-2">内容权限</div>
    <VadPermission permission="settings:add">
      <el-tag>权限`settings:menu`能看到的内容</el-tag>
    </VadPermission>
    <div class="my-2" />
    <VadPermission permission="settings:icon" tip="权限`settings:icon`能看到的内容已隐藏！">
      <el-tag>权限`settings:icon`能看到的内容</el-tag>
    </VadPermission>
  </div>
</template>

<script setup lang="ts" name="ComponentPermission">
import { useUserStore } from '@/store/modules/user'

const accountRole = ref<string>('admin')

const useStore = useUserStore()

const tableData = [
  {
    roles: useStore.roles,
    permissions: useStore.permissions,
  },
]
</script>

<style scoped></style>
