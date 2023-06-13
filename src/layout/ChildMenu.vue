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
    <router-link
      v-else
      :to="menu.path"
    >
      <el-menu-item
        :index="menu.id"
        @click="() => {
          $store.state.navMenus.active = menu.id
        }"
      >
        <template #title>
          <el-icon>
            <component :is="menu.icon" />
          </el-icon>
          <b> {{ menu.name }} </b>
        </template>
      </el-menu-item>
    </router-link>
  </template>
</template>

<script>
export default {
  name: 'ChildMenu',
  props: ['menus'],
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>