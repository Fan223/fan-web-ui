import { createStore } from 'vuex'

const store = createStore({
  mutations: {
    SET_TOP_MENUS(state, menus) {
      state.navMenus.top = menus
    },
    SET_ASIDE_MENUS(state, menus) {
      state.navMenus.aside = menus
    },
    ADD_TAB(state, asideMenu) {
      let index = state.tabs.data.findIndex(tab => tab.name === asideMenu.id);

      if (-1 === index) {
        state.tabs.data.push({
          name: asideMenu.id,
          title: asideMenu.name,
        });
      }

      state.tabs.activeName = asideMenu.id;
      state.navMenus.active.aside = asideMenu.id
    }
  },
  state: {
    collapse: {
      aside: false,
      drawer: false,
      blogHeader: true
    },
    navMenus: {
      isRoute: false,
      active: {
        top: '',
        aside: ''
      },
      top: [],
      aside: []
    },
    tabs: {
      activeName: '',
      home: {
        // 定义默认空值刷新页面时会先显示激活首页然后再过渡
        // name: '',
        title: '首页'
      },
      data: []
    },
    userInfo: {
      username: 'Fan',
      avatar: 'https://s2.loli.net/2023/04/21/rsBDYjpvRC7X3nE.jpg'
    }
  }
})

export default store