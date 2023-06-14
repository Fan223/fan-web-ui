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
      if (4 === menu.type) {
        window.open(menu.path, '_blank');
        return;
      }

      if (store.state.navMenus.active === menu.id) {
        return;
      }

      if ('top' === menu.postion) {
        store.state.navMenus.active.top = menu.id
      } else if ('left' === menu.postion) {
        store.state.navMenus.active.aside = menu.id
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
a {
  text-decoration: none;
}
</style>