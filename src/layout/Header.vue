<template>
  <el-row class="left">
    <el-col :span="4">
      <el-button
        dark
        text
        v-if="$store.state.collapse.aside"
        @click="$router.go(0)"
        class="title"
      >
        <b style="font-size: 16px;"> Fan's Web </b>
      </el-button>

      <el-button
        dark
        text
        v-if="!$store.state.collapse.aside"
        @click="(event) => {
          $store.state.collapse.drawer = !$store.state.collapse.drawer
          this.unFocus(event)
        }"
      >
        <el-icon>
          <Grid />
        </el-icon>
      </el-button>
    </el-col>

    <el-col :span="16">
      <el-menu
        :default-active="$store.state.navMenus.active.top"
        mode="horizontal"
        class="verticalStyle"
      >
        <!-- 递归渲染菜单 -->
        <ChildMenu :menus="$store.state.navMenus.top"> </ChildMenu>
      </el-menu>
    </el-col>

    <el-col :span="4">
      <el-dropdown trigger="click">
        <el-avatar
          :size="45"
          :src="$store.state.userInfo.avatar"
        />

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="() => {
              $router.push('/user/center')
              let addTab = {
                id: 'USER_CENTER',
                name: '个人中心'
              }
              $store.commit('ADD_TAB', addTab)
            }"> 个人中心 </el-dropdown-item>

            <el-dropdown-item @click="logout"> 注销 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ChildMenu from './ChildMenu'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  setup() {
    const store = useStore()
    const router = useRouter()

    function logout() {
      localStorage.removeItem('JWT')
      store.state.tabs.data = []
      router.push('/login')
    }

    return {
      logout
    }
  },
  components: {
    ChildMenu,
  }
}
</script>

<style scoped>
.left .el-button:not(.title) {
  height: 95%;
  width: 50px;
}
.left .el-button:hover:not(.title) {
  background-color: #222429 !important;
}
.left .title {
  height: 95%;
  width: 110px;
}
.left .title:hover {
  background-color: #1d2025;
}
.el-menu {
  margin-top: 10px;
  height: 40px;
  border: none;
}
.el-dropdown {
  margin-top: 8px;
  float: right;
  margin-right: 40px;
}
</style>