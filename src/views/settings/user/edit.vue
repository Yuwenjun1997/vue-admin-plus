<template>
  <VadContainer :before-back="onBeforeBack">
    <template #extra>
      <el-button type="primary" @click="handleSave">保存用户</el-button>
    </template>
    <el-form ref="formRef" label-position="left" :label-width="70" :model="form" :rules="editUserRules">
      <div class="grid grid-cols-3 gap-2">
        <el-card class="col-span-2" shadow="never">
          <template #header>基本信息</template>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group>
              <el-checkbox label="管理员" value="管理员" />
              <el-checkbox label="审核员" value="审核员" />
              <el-checkbox label="普通用户" value="普通用户" />
            </el-checkbox-group>
          </el-form-item>
        </el-card>
        <el-card class="col-span-1" shadow="never">
          <template #header>其它信息</template>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="用户头像">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-card>
      </div>
    </el-form>
  </VadContainer>
</template>

<script setup lang="ts">
import { createUser, getUserDetail, updateUser } from '@/apis/user/api'
import { UserDetail, UserEditForm } from '@/apis/user/type'
import VadContainer from '@/components/VadContainer/index.vue'
import { useMessageBox } from '@/hooks/useMessageBox'
import { useTabsStore } from '@/layout/store/tabs'
import { FormInstance } from 'element-plus'
import { editUserRules } from './config/formRules'

const onBeforeBack = () => Promise.resolve(false)

const { success } = useMessageBox()
const { delTab } = useTabsStore()

const route = useRoute()
route.params.userId

const formRef = ref<FormInstance>()
const form = ref(new UserEditForm())

if (route && route.params.userId) {
  form.value.id = Number(route.params.userId)
  console.log(form.value)
}

const initForm = async () => {
  const { data } = await getUserDetail<UserDetail>({ id: route.params.userId })
  form.value.id = data.id
  form.value.username = data.username
  form.value.mobile = data.mobile
  form.value.nickname = data.nickname
  form.value.email = data.email
}

onMounted(() => {
  if (route.params.userId) {
    initForm()
  }
})

const handleSave = async () => {
  try {
    await formRef.value?.validate()
    if (typeof form.value.id === 'number') {
      await updateUser<boolean, UserEditForm>(form.value)
      success('用户修改成功')
    } else {
      await createUser<boolean, UserEditForm>(form.value)
      success('用户创建成功')
    }
    delTab(route.meta)
  } catch (error) {
    console.log(error)
  }
}
</script>
