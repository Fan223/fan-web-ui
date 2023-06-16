export default {
  methods: {
    // 让按钮点击后自动失焦
    unFocus(event) {
      let target = event.target

      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (target.nodeName !== 'BUTTON') {
          target = target.parentNode
        } else {
          break
        }
      }

      target.blur()
    },
    refreshNavMenus() {
      console.log('更新菜单');
    },
    refreshTabs(menu) {
      console.log(menu, '更新 Tab');
    }
  }
}