<template>
  <el-tabs
    v-model="$store.state.tabs.activeName"
    type="card"
    @tab-click="routerTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      :name="$store.state.tabs.home.name"
      :label="$store.state.tabs.home.title"
    >
    </el-tab-pane>

    <el-tab-pane
      v-for="tab in $store.state.tabs.data"
      :key="tab.name"
      :name="tab.name"
      :label="tab.title"
      closable
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tabs',
  setup() {
    const store = useStore()
    const router = useRouter()

    // 点击标签跳转路由
    function routerTab(tab) {
      let tabName = tab.props.name
      if (tabName === store.state.tabs.activeName) {
        return;
      }

      store.state.tabs.activeName = tabName
      if (tabName === store.state.navMenus.active.top) {
        store.state.navMenus.active.aside = ''
      } else {
        store.state.navMenus.active.aside = tabName
      }

      router.push({ name: tab.props.name })
    }

    // 移除标签页并跳转到邻近标签页
    function removeTab(removeName) {
      let activeTab = store.state.tabs.activeName
      let tabs = store.state.tabs.data

      // 假如移除的 tab 为当前 tab
      if (activeTab === removeName) {
        tabs.forEach((tab, index) => {
          // 获取下一个激活的 tab 为移除 tab 的右一个或左一个 tab, 假如不存在则为首页
          if (tab.name === removeName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]

            if (nextTab) {
              activeTab = nextTab.name
            } else {
              activeTab = store.state.tabs.home.name
            }
          }
        })

        // 重新设置激活 tab 的 name, 然后进行跳转
        store.state.tabs.activeName = activeTab

        if (activeTab === store.state.navMenus.active.top) {
          store.state.navMenus.active.aside = ''
        } else {
          store.state.navMenus.active.aside = activeTab
        }

        router.push({ name: activeTab })
      }

      // 移除 tab
      store.state.tabs.data = tabs.filter(tab => tab.name !== removeName)
    }

    return {
      routerTab, removeTab
    }
  }
}
</script>

<style scoped>
.el-tabs {
  box-shadow: 0px 1px 2px #0a0a0a;
}
:deep(.el-tabs__header) {
  margin: 0;
  border: none;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__item) {
  border: none !important;
  border-left: 1px solid #0a0a0a !important;
}
</style>