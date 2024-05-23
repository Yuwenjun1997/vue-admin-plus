<template>
  <div class="p-4 vad-bg-color h-full flex flex-col">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <el-button type="primary">
          <template #icon><Icon icon="line-md:plus" /></template>
          <span>添加</span>
        </el-button>
      </div>
      <div class="flex items-center">
        <el-input class="!w-64 mr-3" placeholder="请输入内容" />
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="mt-4 flex-1">
      <vxe-table border :data="list" height="auto" size="mini">
        <vxe-column align="center" type="seq" width="60" />
        <vxe-column field="username" title="用户名">
          <template #default="{ row }">{{ row.username || '-' }}</template>
        </vxe-column>
        <vxe-column field="nickname" title="昵称">
          <template #default="{ row }">{{ row.nickname || '-' }}</template>
        </vxe-column>
        <vxe-column title="手机号">
          <template #default="{ row }">{{ row.mobile || '-' }}</template>
        </vxe-column>
        <vxe-column title="邮箱">
          <template #default="{ row }">{{ row.email || '-' }}</template>
        </vxe-column>
        <vxe-column field="createDate" title="创建时间" />
        <vxe-column field="updateDate" title="修改时间">
          <template #default="{ row }">{{ row.updateDate || '-' }}</template>
        </vxe-column>
        <vxe-column title="操作" />
      </vxe-table>
    </div>
    <div v-if="total" class="mt-4">
      <VadPagination v-model:page-num="listQuery.pageNum" v-model:page-size="listQuery.pageSize" :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts" name="SettingUser">
import { PageInfo } from '@/apis/type'
import { getUserList } from '@/apis/user/api'
import { UserDetail, UserListQuery } from '@/apis/user/type'
import VadPagination from '@/components/VadPagination/index.vue'
import { Icon } from '@iconify/vue'

const listQuery = ref(new UserListQuery())
const total = ref<number>(10)
const list = ref<UserDetail[]>([])

const fetchUserList = async () => {
  const { data } = await getUserList<PageInfo<UserDetail>, UserListQuery>(listQuery.value)
  list.value = data.records
  total.value = data.total
}

fetchUserList()
</script>

<style scoped lang="scss"></style>
