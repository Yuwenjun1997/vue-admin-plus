<template>
  <div class="xy-navbar">
    <div class="xy-navbar__left">
      <div class="xy-collapse__btn">
        <Icon icon="line-md:menu-fold-left" />
        <!-- <Icon icon="line-md:menu-fold-right" /> -->
      </div>
      <Breadcrumb />
    </div>
    <div class="xy-navbar__right">
      <Toobar />
      <Dropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Breadcrumb from './Breadcrumb.vue'
import Dropdown from './Dropdown.vue'
import Toobar from './Toobar.vue'
</script>

<style scoped lang="scss">
.xy-navbar {
  --xy-collapse-btn-size: 18px;

  height: var(--xy-layout-navbar-height);
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  padding: var(--xy-layout-spacing) 0;

  .xy-navbar__left,
  .xy-navbar__right {
    display: flex;
    align-items: center;
  }
}

.xy-collapse__btn {
  margin-right: 20px;
  font-size: var(--xy-collapse-btn-size);
  color: var(--xy-layout-toolbar-color);
  cursor: pointer;
}
</style>
