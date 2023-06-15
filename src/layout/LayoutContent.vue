<template>
  <el-container>
    <!-- 侧栏 -->
    <el-aside v-show="$store.state.collapse.aside">
      <Aside />
    </el-aside>
    <!-- 侧栏抽屉 -->
    <el-drawer
      v-model="$store.state.collapse.drawer"
      direction="ltr"
      :show-close="false"
      :with-header="false"
      size="300px"
    >
      <Aside />
    </el-drawer>

    <!-- 折叠按钮 -->
    <el-button
      dark
      text
      v-if="$store.state.collapse.aside"
      @click="$store.state.collapse.aside = !$store.state.collapse.aside"
    >
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
    </el-button>
    <el-button
      dark
      text
      v-if="!$store.state.collapse.aside"
      @click="$store.state.collapse.aside = !$store.state.collapse.aside"
    >
      <el-icon>
        <ArrowRightBold />
      </el-icon>
    </el-button>

    <el-container
      direction="vertical"
      class="content"
    >
      <Tabs />
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './Aside.vue';
import Tabs from './Tabs.vue';

export default {
  name: 'LayoutContent',
  components: {
    Aside, Tabs
  }
}
</script>

<style scoped>
.el-aside {
  box-shadow: 3px 0px 3px #0a0a0a;
  z-index: 5;
}
.el-button {
  height: 100%;
  width: 25px;
}
.el-button:hover {
  background-color: #222429 !important;
}
:deep(.el-drawer__body) {
  padding: 0;
}
.content {
  min-width: 700px;
}
</style>