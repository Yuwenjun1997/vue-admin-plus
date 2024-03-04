<template>
  <el-menu-item :index="item.meta.menuId">
    <router-link :to="item.path">
      <div class="flex items-center">
        <template v-if="item.meta.icon">
          <Icon :class="prefixCls + 'menu__item--icon'" :icon="item.meta.icon" />
        </template>
        <span>{{ item.meta.title }}</span>
      </div>
    </router-link>
  </el-menu-item>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { prefixCls } from '@/layout/config/index'
import { MenuOption } from '@/layout/types'

interface Props {
  itemOrMenu: MenuOption
}

const props = defineProps<Props>()
const item = computed(() => props.itemOrMenu)
</script>
