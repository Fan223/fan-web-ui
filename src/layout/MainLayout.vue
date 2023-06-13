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
.el-header {
  line-height: 60px;
  padding: 0;
}
.el-main {
  padding: 0;
}
</style>