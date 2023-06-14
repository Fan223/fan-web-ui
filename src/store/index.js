import { createStore } from 'vuex'

const store = createStore({
  mutations: {
    SET_TOP_MENUS(state, menus) {
      state.navMenus.top = menus
    },
    SET_ASIDE_MENUS(state, menus) {
      state.navMenus.aside = menus
    }
  },
  state: {
    navMenus: {
      isRoute: false,
      active: {
        top: '35585005145239552',
        aside: ''
      },
      top: [],
      aside: []
    }
  }
})

export default store