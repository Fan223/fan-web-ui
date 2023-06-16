<template>
  <template
    v-for="menu in menus"
    :key="menu.id"
  >
    <!-- 有 Children 就显示子菜单 -->
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0"
      :index="menu.id"
    >
      <template #title>
        <el-icon>
          <component :is="menu.icon" />
        </el-icon>
        <b> {{ menu.name }} </b>
      </template>

      <!-- 递归调用 -->
      <ChildMenu :menus="menu.children"></ChildMenu>
    </el-sub-menu>

    <!-- 没有 Children 就显示为单菜单 -->
    <el-menu-item
      v-else
      :index="menu.id"
      @click="routerMenu(menu)"
    >
      <template #title>
        <el-icon>
          <component :is="menu.icon" />
        </el-icon>
        <b> {{ menu.name }} </b>
      </template>
    </el-menu-item>
  </template>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'ChildMenu',
  props: ['menus'],
  setup() {
    const store = useStore()
    const router = useRouter()

    function routerMenu(menu) {
      // 类型为链接, 直接跳转
      if (4 === menu.type) {
        window.open(menu.path, '_blank');
        return;
      }

      // 菜单为顶层菜单并为当前激活的顶层菜单, 返回该菜单首页
      if ('top' === menu.position && store.state.navMenus.active.top === menu.id) {
        if (store.state.navMenus.active.aside) {
          store.state.navMenus.active.aside = ''
          store.state.tabs.activeName = menu.id
          router.push(menu.path)
        }
        return;
      }

      // 侧栏菜单, 添加标签页
      if ('aside' === menu.position) {
        store.commit('ADD_TAB', menu)
        store.state.collapse.drawer = false
      }

      router.push(menu.path)
    }

    return {
      routerMenu
    }
  }
}
</script>

<style scoped>
.el-sub-menu b,
.el-menu-item b {
  overflow: hidden;
  text-overflow: ellipsis;
}
a {
  text-decoration: none;
}
</style>