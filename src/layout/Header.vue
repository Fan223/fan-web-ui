<template>
  <el-row>
    <el-col :span="4">
      left
    </el-col>

    <el-col :span="16">
      <el-menu
        :default-active="$store.state.navMenus.active"
        mode="horizontal"
      >
        <!-- 递归渲染菜单 -->
        <ChildMenu :menus="$store.state.navMenus.top"> </ChildMenu>
      </el-menu>
    </el-col>

    <el-col :span="4">
      right
    </el-col>
  </el-row>
</template>

<script>
import ChildMenu from './ChildMenu'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  components: {
    ChildMenu
  }
}
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>