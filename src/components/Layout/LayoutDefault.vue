<template>
  <el-container class="xy-layout__container">
    <el-aside width="260px" class="xy-layout__aside">
      <div class="xy-logo">
        <div class="xy-logo--pic"><img src="/vite.svg" alt="" /></div>
        <div class="xy-logo-right">
          <div class="xy-logo--label">Vue Admin Plus</div>
          <el-divider>首页</el-divider>
        </div>
      </div>
      <div class="xy-layout__aside--container">
        <div class="xy-layout__aside--left h-full">
          <LeftTabs />
        </div>
        <div class="xy-layout__aside--right h-full">
          <RightMenu />
        </div>
      </div>
    </el-aside>
    <el-container class="xy-layout__container">
      <el-header class="xy-layout__header">
        <Navbar />
        <ActiveTags />
      </el-header>
      <el-main class="xy-layout__main">
        <el-scrollbar height="100%"> </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LeftTabs from './components/LeftTabs.vue'
import RightMenu from './components/Menu/RightMenu.vue'
import Navbar from './components/Navbar/index.vue'
import ActiveTags from './components/ActiveTags/index.vue'
</script>

<style scoped lang="scss">
.xy-layout__container {
  height: 100%;
}

.xy-layout__header {
  // --el-header-height: 80px;
  --el-header-height: calc(var(--xy-layout-navbar-height) + var(--xy-layout-active-tags-height));
  background-color: var(--xy-layout-header-bg-color);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.xy-layout__aside {
  background-color: var(--xy-layout-aside-bg-color);

  .xy-layout__aside--left {
    width: var(--xy-layout-aside--left-width);
  }

  .xy-layout__aside--right {
    width: calc(100% - var(--xy-layout-aside--left-width));
  }

  .xy-layout__aside--container {
    display: flex;
    height: calc(100% - var(--xy-logo-height));
  }
}

.xy-layout__main {
  background-color: var(--xy-layout-main-bg-color);
}

.xy-logo {
  display: flex;
  align-items: stretch;
  height: var(--xy-logo-height);

  :deep(.el-divider--horizontal) {
    position: absolute;
    bottom: 0;
    margin: 0 !important;
  }

  .xy-logo--pic,
  .xy-logo-right,
  .xy-logo--label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .xy-logo-right {
    position: relative;
    flex: 1;
    flex-direction: column;
    margin: 0 var(--xy-layout-spacing);
    padding: var(--xy-layout-spacing) 0;
  }

  .xy-logo--pic {
    width: var(--xy-logo-pic-width);
    background-color: var(--xy-layout-tabs-background-color);
  }

  .xy-logo--label {
    font-size: 20px;
  }
}
</style>
