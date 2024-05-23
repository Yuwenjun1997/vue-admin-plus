<template>
  <el-dialog v-model="visible" :title="props.title">
    <el-form>
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入邮箱" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '编辑用户',
})

const visible = ref(false)

const open = () => {
  visible.value = true
}

defineExpose({ open })
</script>

<style scoped></style>
