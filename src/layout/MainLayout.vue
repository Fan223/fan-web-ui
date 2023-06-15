<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>

    <el-main>
      <router-view> </router-view>
    </el-main>
  </el-container>
</template>

<script>
import Header from './Header';

export default {
  name: 'MainLayout',
  components: {
    Header
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  height: 60px;
  line-height: 60px;
  padding: 0;
  box-shadow: 0px 3px 3px #0a0a0a;
  z-index: 10;
}
.el-main {
  padding: 0;
}
</style>