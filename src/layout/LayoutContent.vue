<template>
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>

    <el-main>
      <router-view> </router-view>
    </el-main>
  </el-container>
</template>

<script>
import Aside from './Aside.vue';

export default {
  name: 'LayoutContent',
  components: {
    Aside
  }
}
</script>

<style scoped>
</style>