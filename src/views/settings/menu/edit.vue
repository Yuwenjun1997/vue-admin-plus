<template>
  <VadContainer>
    <template #extra>
      <el-button type="primary" @click="handleSave">保存菜单</el-button>
    </template>
    <el-form ref="formRef" :label-width="80" :model="form" :rules="editMenuRules">
      <div class="grid grid-cols-3 gap-2">
        <el-card class="col-span-2" shadow="never">
          <template #header>基本信息</template>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入菜单标题" />
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <VadIconPicker v-model="form.icon" />
          </el-form-item>
          <el-form-item label="是否隐藏" prop="icon">
            <el-switch v-model="form.hidden" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item label="跳转类型">
            <el-radio-group v-model="form.jumpType" prop="jumpType">
              <el-radio :label="MenuType.ROUTER">路由</el-radio>
              <el-radio :label="MenuType.LINK">外部链接</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="form.jumpType === MenuType.ROUTER">
            <el-form-item label="路由名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入路由名称" />
            </el-form-item>
            <el-form-item label="路由路径" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由路径" />
            </el-form-item>
            <el-form-item label="引用组件" prop="component">
              <el-input v-model="form.component" placeholder="请输入引用组件" />
            </el-form-item>
            <el-form-item label="重定向" prop="redirect">
              <el-input v-model="form.redirect" placeholder="请输入重定向路由" />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="跳转链接" prop="link">
              <el-input v-model="form.link" placeholder="请输入跳转链接" />
            </el-form-item>
          </template>
        </el-card>
        <el-card class="col-span-1" shadow="never">
          <template #header>权限信息</template>
          <el-form-item label="绑定权限" prop="permissionId">
            <el-input v-model="form.permissionId" placeholder="请输入昵称" />
          </el-form-item>
        </el-card>
      </div>
    </el-form>
  </VadContainer>
</template>

<script setup lang="ts">
import { MenuEditForm, MenuItem, MenuType } from '@/apis/menu/type'
import VadContainer from '@/components/VadContainer/index.vue'
import VadIconPicker from '@/components/VadIconPicker/index.vue'
import { editMenuRules } from './config/formRules'
import { createMenu, getMenuDetail, updateMenu } from '@/apis/menu/api'
import { FormInstance } from 'element-plus'
import { useMessageBox } from '@/hooks/useMessageBox'
import { useTabsStore } from '@/layout/store/tabs'

const route = useRoute()
const router = useRouter()
const { success } = useMessageBox()
const { delTab } = useTabsStore()

const formRef = ref<FormInstance>()
const form = ref(new MenuEditForm())

const isEdit = computed(() => !!route.params.id)

const initForm = async (id: string) => {
  const { data } = await getMenuDetail<MenuItem>({ id })
  form.value.id = data.id
  form.value.parentId = data.parentId
  form.value.title = data.title
  form.value.name = data.name
  form.value.jumpType = data.jumpType
  form.value.component = data.component
  form.value.icon = data.icon
  form.value.redirect = data.redirect
  form.value.link = data.link
  form.value.path = data.path
  form.value.hidden = data.hidden
  if (data.permission) {
    form.value.permissionId = data.permission.id
  }
}

onMounted(() => {
  if (isEdit.value) {
    initForm(route.params.id as string)
  }
})

const handleSave = async () => {
  try {
    await formRef.value?.validate()
    if (isEdit.value) {
      await updateMenu(form.value)
      success('菜单修改成功')
    } else {
      await createMenu(form.value)
      success('菜单创建成功')
    }
    delTab(route.meta)
    router.back()
  } catch (error) {
    console.log(error)
  }
}
</script>
