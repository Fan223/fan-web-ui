<template>
  <el-menu :default-active="$store.state.navMenus.active.aside">
    <!-- 递归渲染菜单 -->
    <ChildMenu :menus="$store.state.navMenus.aside"> </ChildMenu>
  </el-menu>
</template>

<script>
import ChildMenu from './ChildMenu.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Aside',
  components: {
    ChildMenu
  }
}
</script>

<style scoped>
.el-menu {
  /* height: 100%; */
  /* border: 1px solid red; */
}
a {
  text-decoration: none;
}
</style>