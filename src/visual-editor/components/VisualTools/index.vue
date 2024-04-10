<template>
  <div class="VisualTools" @click.stop>
    <div class="visual-tools__icon">
      <Icon icon="bi:tools" />
    </div>
    <template v-if="!isLocked">
      <el-tooltip content="上移" effect="dark" placement="left">
        <div class="visual-tools__control" @click="handeUp">
          <Icon icon="line-md:arrow-close-up" />
        </div>
      </el-tooltip>
      <el-tooltip content="下移" effect="dark" placement="left">
        <div class="visual-tools__control" @click="handleDown">
          <Icon icon="line-md:arrow-close-down" />
        </div>
      </el-tooltip>
      <el-tooltip content="复制" effect="dark" placement="left">
        <div class="visual-tools__control" @click="handleCopy">
          <Icon icon="bi:copy" />
        </div>
      </el-tooltip>
      <el-tooltip content="删除" effect="dark" placement="left">
        <div class="visual-tools__control" @click="handleDelete">
          <Icon icon="ep:delete" />
        </div>
      </el-tooltip>
    </template>
    <el-tooltip :content="isLocked ? '解锁' : '锁定'" effect="dark" placement="left">
      <div class="visual-tools__control" @click="toggleLock">
        <Icon :icon="!isLocked ? 'ep:unlock' : 'ep:lock'" />
      </div>
    </el-tooltip>
    <el-tooltip content="选择父级" effect="dark" placement="left">
      <div class="visual-tools__control" @click="handleCurrentParent">
        <Icon icon="ep:files" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const isLocked = computed(() => false)

const handeUp = () => {}

const handleDown = () => {}

const toggleLock = () => {}

const handleCopy = () => {}

const handleDelete = async () => {}

// 父级
const handleCurrentParent = () => {}
</script>

<style scoped lang="scss">
.VisualTools {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  .visual-tools__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    padding: 8px;
    border-bottom: 1px dashed var(--el-border-color-light);
    color: var(--el-text-color-regular);
  }

  .visual-tools__control {
    cursor: pointer;
    padding: 8px;
    border-radius: var(--el-border-radius-base);
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
    transition: var(--el-transition-all);

    &:hover {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }
}
</style>
