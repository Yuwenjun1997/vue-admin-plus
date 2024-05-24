<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between vad-bg-color p-4">
      <div class="flex items-center gap-2">
        <div class="flex-shrink-0 !w-48">
          <el-input
            v-model="listQuery.title"
            clearable
            placeholder="请输入菜单标题"
            @clear="handleFilter"
            @keyup.enter="handleFilter"
          />
        </div>
        <div class="flex-shrink-0 !w-48">
          <el-input
            v-model="listQuery.name"
            clearable
            placeholder="请输入路由名称"
            @clear="handleFilter"
            @keyup.enter="handleFilter"
          />
        </div>
        <div class="flex-shrink-0 !w-40">
          <el-select v-model="listQuery.jumpType" clearable placeholder="请选择跳转类型" @change="handleFilter">
            <el-option label="路由" :value="MenuType.ROUTER" />
            <el-option label="链接" :value="MenuType.LINK" />
          </el-select>
        </div>
        <el-button type="primary" @click="handleFilter">查询</el-button>
      </div>
      <div class="flex items-center">
        <el-button type="primary">
          <template #icon><Icon icon="line-md:plus" /></template>
          <span>添加</span>
        </el-button>
      </div>
    </div>

    <div class="grid grid-cols-5 gap-2 flex-1 mt-2">
      <el-card class="col-span-1" shadow="never">
        <template #header>菜单列表</template>
        <el-tree :data="menuTreeData" node-key="id" :props="defaultProps" show-checkbox @check="handleCheckChange">
          <template #default="{ node, data }">
            <div class="flex items-center justify-between flex-1">
              <span>{{ node.label }}</span>
              <span class="flex items-center gap-2">
                <Icon icon="ep:edit-pen" @click.stop="handleEdit(data)" />
                <Icon icon="ep:delete" @click.stop="handleRemove(data)" />
              </span>
            </div>
          </template>
        </el-tree>
      </el-card>
      <el-card class="table-cotnainer col-span-4" shadow="never">
        <vxe-table border :data="menuList" height="auto" :loading="listLoading" size="small">
          <vxe-column align="center" fixed="left" type="seq" width="60" />
          <vxe-column field="title" fixed="left" min-width="110" title="菜单名称" />
          <vxe-column align="center" field="icon" title="图标" width="60">
            <template #default="{ row }">
              <div class="flex justify-center">
                <Icon :icon="row.icon" />
              </div>
            </template>
          </vxe-column>
          <vxe-column align="center" field="jumpType" title="跳转类型" width="80" />
          <vxe-column align="center" field="hidden" title="隐藏菜单" width="80">
            <template #default="{ row }">
              {{ row.hidden ? '不显示' : '显示' }}
            </template>
          </vxe-column>
          <vxe-column field="name" min-width="180" title="路由名称" />
          <vxe-column field="path" min-width="180" title="路由路径" />
          <vxe-column field="component" min-width="250" title="菜单组件" />
          <vxe-column field="link" min-width="180" title="外部连接" />
          <vxe-column field="permission" min-width="180" title="权限">
            <template #default="{ row }">
              {{ row.permission ? row.permission.identifier : '-' }}
            </template>
          </vxe-column>
          <vxe-column field="createDate" min-width="140" title="创建时间" />
          <vxe-column align="center" fixed="right" min-width="100">
            <template #default="{ row }">
              <el-button link size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link size="small" type="primary" @click="handleRemove(row)">删除</el-button>
            </template>
          </vxe-column>
        </vxe-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="SettingMenu">
import { deleteMenu, getMenuList, getMenuTree } from '@/apis/menu/api'
import { MenuItem, MenuItemTree, MenuListQuery, MenuType } from '@/apis/menu/type'
import { useMessageBox } from '@/hooks/useMessageBox'
import { Icon } from '@iconify/vue'

const { alert, success } = useMessageBox()

const router = useRouter()

const defaultProps = {
  children: 'children',
  label: 'title',
}

const menuTreeData = ref<MenuItemTree[]>([])

const fetchMenuTree = async () => {
  try {
    const { data } = await getMenuTree<MenuItemTree[]>()
    menuTreeData.value = data
  } catch (error) {
    console.log(error)
  }
}

const listLoading = ref<boolean>(false)
const listQuery = ref(new MenuListQuery())
const menuList = ref<MenuItem[]>([])
const fetchMenuList = async () => {
  try {
    listLoading.value = true
    const { data } = await getMenuList<MenuItem[]>(listQuery.value)
    menuList.value = data
  } catch (error) {
    console.log(error)
  } finally {
    listLoading.value = false
  }
}

fetchMenuTree()
fetchMenuList()

const handleFilter = () => {
  listQuery.value.pageNum = 1
  fetchMenuList()
}

const handleCheckChange = (_node: MenuItem, data: any) => {
  listQuery.value.parentIds = data.checkedKeys.join(',')
  handleFilter()
}

const handleEdit = (menu: MenuItem) => {
  router.push({ name: 'SettingMenuEdit', params: { id: menu.id } })
}
const handleRemove = async (menu: MenuItem) => {
  try {
    await alert('确定要删除该菜单吗？')
    await deleteMenu({ id: menu.id })
    success('删除成功')
    fetchMenuList()
    fetchMenuTree()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="scss">
.table-cotnainer {
  :deep(.el-card__body) {
    height: 100%;
  }
}
</style>
