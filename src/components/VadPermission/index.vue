<template>
  <div v-if="hasPermission"><slot /></div>
  <el-alert v-else type="warning">
    <template #title>
      <div class="flex items-center">
        <Icon icon="bi:person-lock" />
        <span class="ml-2">{{ props.tip }}</span>
      </div>
    </template>
  </el-alert>
</template>

<script setup lang="ts" name="VadPermission">
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/store/modules/user'

const instanse = getCurrentInstance()

interface Props {
  // 权限标识
  permission?: string
  // 显示提示
  showTip?: boolean
  // 提示类容
  tip?: string
}

const props = withDefaults(defineProps<Props>(), {
  permission: '',
  showTip: true,
  tip: '当前账号无权查看，请联系管理员！',
})

const userStore = useUserStore()

const hasPermission = computed<boolean>(() => {
  if (props.permission === undefined) return true
  return userStore.permissions.includes(props.permission)
})

onMounted(() => {
  if (!hasPermission.value && !props.showTip) {
    instanse?.proxy?.$el.remove()
  }
})
</script>

<style scoped></style>
